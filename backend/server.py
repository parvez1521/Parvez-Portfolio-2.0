import os
import re
import ipaddress
import logging
import time
import uuid
from pathlib import Path
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from datetime import datetime, timezone
from collections import defaultdict

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, Request
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    async with httpx.AsyncClient(timeout=30) as client_http:
        resp = await client_http.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


class ContactInquiry(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    project_type: str = Field(min_length=2, max_length=80)
    budget: str = Field(min_length=1, max_length=80)
    message: str = Field(min_length=10, max_length=4000)


_rate_hits: dict[str, list[float]] = defaultdict(list)


def _rate_limit(ip: str, limit: int = 5, window: int = 3600) -> None:
    now = time.time()
    hits = [t for t in _rate_hits[ip] if now - t < window]
    if len(hits) >= limit:
        raise HTTPException(status_code=429, detail="Too many inquiries. Please try again later.")
    hits.append(now)
    _rate_hits[ip] = hits


@api_router.get("/")
async def root():
    return {"message": "Parvez Siddiqui Portfolio API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/contact")
async def create_inquiry(inquiry: ContactInquiry, request: Request):
    _rate_limit(request.client.host if request.client else "unknown")
    doc = inquiry.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.inquiries.insert_one(doc)

    name = escape(inquiry.name)
    email = escape(inquiry.email)
    ptype = escape(inquiry.project_type)
    budget = escape(inquiry.budget)
    message = escape(inquiry.message).replace("\n", "<br/>")
    subject = f"New project inquiry - {inquiry.project_type}"
    html = (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" '
        'style="background:#f5f5f2;padding:32px 0;font-family:Arial,Helvetica,sans-serif">'
        '<tr><td align="center">'
        '<table role="presentation" width="560" cellpadding="0" cellspacing="0" '
        'style="background:#ffffff;border:1px solid #e4e4e0;border-radius:12px;padding:32px">'
        '<tr><td>'
        '<p style="font-size:11px;letter-spacing:2px;color:#8a8a85;text-transform:uppercase;margin:0 0 8px">New project inquiry</p>'
        f'<h1 style="font-size:22px;color:#111111;margin:0 0 24px">{ptype} &middot; {budget}</h1>'
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;color:#333333">'
        f'<tr><td style="padding:6px 0;color:#8a8a85;width:110px">Name</td><td style="padding:6px 0"><strong>{name}</strong></td></tr>'
        f'<tr><td style="padding:6px 0;color:#8a8a85">Email</td><td style="padding:6px 0"><a href="mailto:{email}" style="color:#111111">{email}</a></td></tr>'
        f'<tr><td style="padding:6px 0;color:#8a8a85">Project type</td><td style="padding:6px 0">{ptype}</td></tr>'
        f'<tr><td style="padding:6px 0;color:#8a8a85">Budget</td><td style="padding:6px 0">{budget}</td></tr>'
        '</table>'
        '<p style="font-size:12px;letter-spacing:2px;color:#8a8a85;text-transform:uppercase;margin:24px 0 8px">Message</p>'
        f'<p style="font-size:14px;line-height:1.7;color:#333333;margin:0 0 24px">{message}</p>'
        f'<a href="mailto:{email}" style="display:inline-block;background:#111111;color:#ffffff;text-decoration:none;font-size:13px;padding:12px 24px;border-radius:999px">Reply to {name}</a>'
        '<hr style="border:none;border-top:1px solid #e4e4e0;margin:28px 0 16px"/>'
        f'<p style="font-size:11px;color:#8a8a85;margin:0">Sent from the contact form on the {escape(EMAIL_FROM_NAME)} portfolio website.</p>'
        '</td></tr></table></td></tr></table>'
    )

    email_sent = False
    try:
        await send_email(to=OWNER_EMAIL, subject=subject, html=html)
        email_sent = True
    except Exception as e:
        logger.error(f"Inquiry saved but email failed: {e}")

    return {"status": "success", "email_sent": email_sent}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
