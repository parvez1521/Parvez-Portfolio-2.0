# PRD — Parvez Siddiqui Portfolio

## Original Problem Statement
Build a premium, modern, high-converting personal portfolio website for Parvez Siddiqui, freelance Video Editor & AI Content Creator. Dark creative-tech aesthetic (near-black #0A0A0C, electric lime #CCFF00 accent), editorial typography, smooth animations, subtle glassmorphism/grain. Sections: sticky glass navbar, kinetic hero with masked line reveal + small 3D character + availability badge + micro-stats, marquee, about, 6 services, filterable portfolio grid (visual centerpiece) with elegant project detail modal, 3 case studies, placeholder testimonials, placeholder client logo strip, "Building in Public" (@tech_hacks.ai: 150K+ IG, 11.8K+ Telegram, 4.9K+ YouTube), monochrome tools row, 4-step process, final CTA, contact section + form, minimal footer. No invented clients/testimonials/stats. Centralized portfolio data for easy editing. SEO metadata, OG tags, responsive, fast.

## User Personas
- Brands/creators/startups looking to hire a video editor (primary conversion target)
- Followers from Tech Hacks AI checking Parvez's services
- Parvez himself, maintaining and updating portfolio content

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + lenis (smooth scroll) + react-three-fiber/drei (hero 3D character, lazy-loaded). Single-page app, section anchors.
- Data: `frontend/src/data/projects.js` (portfolio projects — single source of truth), `frontend/src/data/content.js` (services, case studies, testimonials, tools, socials).
- Backend: FastAPI + MongoDB (motor). `POST /api/contact` — validates, rate-limits (5/hr/IP), stores inquiry in `inquiries` collection, emails owner via Emergent-managed Resend proxy. `GET /api/health`.
- Email: managed Resend (EMERGENT_EMAIL_KEY), from_name "Parvez Siddiqui", owner email Parvezsiddiqui018@gmail.com, reply-to same.
- SEO: static head (title/description/OG/Twitter/JSON-LD Person/noscript), robots.txt, llms.txt. No canonical/og:image/sitemap — pending a confirmed production domain.

## Implemented (2026-07 / build 1)
- Full single-page portfolio: Navbar, Hero (masked line reveal, 3D character, counters), editorial marquee, About, 6 Services, filterable Portfolio grid + project modal (video player slot, next-project nav), Case Studies, Testimonials (placeholders, clearly marked), Logo strip (placeholders), Building in Public, Tools, Process, CTA, Contact (working form → email + DB), Footer
- Lenis momentum scrolling, custom cursor, grain overlay, scroll reveals, parallax glow
- Contact form end-to-end: UI → FastAPI → MongoDB + email to owner (verified, toast shown)
- Responsive verified at 375/768/1366px; SEO head + robots.txt + llms.txt verified serving correctly

## Backlog
- P0: Replace 6 placeholder projects with real work (edit `src/data/projects.js`: thumbnail, videoUrl, title, client, tools)
- P0: Add real LinkedIn URL (currently `#` placeholder in `src/data/content.js`)
- P1: Replace placeholder testimonials + client logos with real ones
- P1: Replace About portrait with a real photo of Parvez
- P1: On deploy with a custom domain: add canonical/og:url/og:image + sitemap.xml, enable "Search Engine Crawling" toggle, verify with bot UAs
- P2: Case-study result metrics once real data exists; blog/journal for Tech Hacks AI cross-promotion

## Next Tasks
1. Swap in real portfolio videos/thumbnails
2. Provide LinkedIn profile URL
3. Collect 2–3 real client testimonials
4. Deploy + attach custom domain, then complete SEO absolute-URL tags
