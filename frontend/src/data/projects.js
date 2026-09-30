export const CATEGORIES = ["All", "Short Form", "Long Form"];

const externalMedia = {
  avadhutShortForm:
    "https://xreracn7esnjiv3e.public.blob.vercel-storage.com/Avadhut%20Sathe%20SEBI%20Ban.mp4",
  joshuaVsl:
    "https://xreracn7esnjiv3e.public.blob.vercel-storage.com/Joshua%20VSL%202.00.mp4",
  welixShortForm:
    "https://xreracn7esnjiv3e.public.blob.vercel-storage.com/Welix%20new%20changes.mp4",
};

export const projects = [
  {
    id: "goose-insta-cta",
    title: "Goose — Instagram CTA",
    client: "Placeholder Client",
    category: "Short Form",
    year: "2026",
    thumbnail: null,
    aspect: "aspect-[9/16]",
    videoUrl: "/videos/goose-insta-cta.mp4",
    webmUrl: "/videos/goose-insta-cta.webm",
    poster: "/videos/goose-insta-cta-poster.jpg",
    description:
      "Short-form Instagram edit built around a clear call to action — hook, pacing and end-card timing.",
    overview:
      "A vertical Instagram edit where every second drives toward the call to action without feeling like an ad.",
    approach:
      "Front-loaded the strongest moment, kept cut density high through the middle, and gave the CTA end-card clean timing and space to land.",
    tools: ["Premiere Pro", "After Effects"],
  },
  {
    id: "pollo-ai-logo",
    title: "Pollo AI — Logo Reveal",
    client: "Placeholder Client",
    category: "Short Form",
    year: "2026",
    thumbnail: null,
    aspect: "aspect-[9/16]",
    videoUrl: "/videos/pollo-ai-logo.mp4",
    webmUrl: "/videos/pollo-ai-logo.webm",
    poster: "/videos/pollo-ai-logo-poster.jpg",
    description:
      "A vertical logo reveal — motion, timing and sound design built for social placements.",
    overview:
      "A brand logo reveal cut for vertical social formats, where the motion itself carries the brand's personality.",
    approach:
      "Choreographed the reveal around a single clean motion arc, tuned the easing for weight, and timed the sound design to the exact frame of the lockup.",
    tools: ["After Effects", "Premiere Pro"],
  },
  {
    id: "hook-2",
    title: "Hook — Short-Form Edit",
    client: "Placeholder Client",
    category: "Short Form",
    year: "2026",
    thumbnail: null,
    aspect: "aspect-[9/16]",
    videoUrl: "/videos/hook-2.mp4",
    webmUrl: "/videos/hook-2.webm",
    poster: "/videos/hook-2-poster.jpg",
    description:
      "A hook-driven vertical edit engineered to stop the scroll in the first seconds.",
    overview:
      "A short-form piece where the opening frames do the heavy lifting — designed for feeds where attention is won or lost instantly.",
    approach:
      "Built the edit around the hook first, then matched captions, punch-ins and cut rhythm to the energy of the delivery.",
    tools: ["Premiere Pro"],
  },
  {
    id: "joshua-vsl-2",
    title: "Joshua VSL",
    client: "Joshua Jones",
    category: "Long Form",
    year: "2026",
    thumbnail: null,
    aspect: "aspect-[16/10]",
    videoUrl: externalMedia.joshuaVsl,
    description: "Long-form VSL edit with a clear narrative structure and polished delivery.",
    overview: "A long-form sales video edited for clarity, pacing and a focused viewing experience.",
    approach: "Structured the edit around the message, keeping transitions purposeful and the delivery easy to follow.",
    tools: ["Premiere Pro", "After Effects"],
  },
  {
    id: "welix-new-changes",
    title: "Short-Form",
    client: "Welix",
    category: "Long Form",
    year: "2026",
    thumbnail: null,
    aspect: "aspect-[16/10]",
    videoUrl: externalMedia.welixShortForm,
    description: "Long-form finance content edit with structured pacing and visual support.",
    overview: "A client edit shaped for clear delivery, steady pacing and a polished viewing flow.",
    approach: "Kept the information moving with clean cuts, supporting visuals and deliberate emphasis on key points.",
    tools: ["Premiere Pro", "After Effects"],
  },
  {
    id: "avadhut-sathe-sebi-ban",
    title: "Avadhut Sathe — SEBI Ban",
    client: "Welix",
    category: "Short Form",
    year: "2026",
    thumbnail: null,
    aspect: "aspect-[9/16]",
    videoUrl: externalMedia.avadhutShortForm,
    description: "Short-form finance edit built for clear, attention-led delivery.",
    overview: "A vertical edit focused on keeping a timely topic direct, readable and engaging.",
    approach: "Used a tight opening, purposeful pacing and supporting motion to keep the message clear in a social feed.",
    tools: ["Premiere Pro", "After Effects"],
  },
];

export const configuredProjects = projects.filter((project) => Boolean(project.videoUrl));
