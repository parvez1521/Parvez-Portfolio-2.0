export const CATEGORIES = ["All", "Short Form", "Long Form"];

// Replace video providers here without changing project metadata or UI code.
export const VIDEO_SOURCES = {
  gooseInstaCta: {
    videoUrl: "/videos/goose-insta-cta.mp4",
    webmUrl: "/videos/goose-insta-cta.webm",
    poster: "/videos/goose-insta-cta-poster.jpg",
  },
  polloAiLogo: {
    videoUrl: "/videos/pollo-ai-logo.mp4",
    webmUrl: "/videos/pollo-ai-logo.webm",
    poster: "/videos/pollo-ai-logo-poster.jpg",
  },
  hook2: {
    videoUrl: "/videos/hook-2.mp4",
    webmUrl: "/videos/hook-2.webm",
    poster: "/videos/hook-2-poster.jpg",
  },
  joshuaVsl: {
    videoUrl: "https://www.youtube.com/embed/7LWuN5gH6x4",
  },
  welixNewChanges: {
    videoUrl: "https://www.youtube.com/embed/pzZeu3hZCT0",
  },
  avadhutSatheSebiBan: {
    videoUrl: "https://www.youtube.com/embed/x-AFiKBeYgc",
  },
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
    ...VIDEO_SOURCES.gooseInstaCta,
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
    ...VIDEO_SOURCES.polloAiLogo,
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
    ...VIDEO_SOURCES.hook2,
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
    title: "Joshua VSL 2.00",
    client: "Joshua Jones",
    category: "Long Form",
    year: "2026",
    thumbnail: null,
    aspect: "aspect-[16/10]",
    ...VIDEO_SOURCES.joshuaVsl,
    description: "Long-form VSL edit with a clear narrative structure and polished delivery.",
    overview: "A long-form sales video edited for clarity, pacing and a focused viewing experience.",
    approach: "Structured the edit around the message, keeping transitions purposeful and the delivery easy to follow.",
    tools: ["Premiere Pro", "After Effects"],
  },
  {
    id: "welix-new-changes",
    title: "Welix New Changes",
    client: "Welix",
    category: "Long Form",
    year: "2026",
    thumbnail: null,
    aspect: "aspect-[16/10]",
    ...VIDEO_SOURCES.welixNewChanges,
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
    ...VIDEO_SOURCES.avadhutSatheSebiBan,
    description: "Short-form finance edit built for clear, attention-led delivery.",
    overview: "A vertical edit focused on keeping a timely topic direct, readable and engaging.",
    approach: "Used a tight opening, purposeful pacing and supporting motion to keep the message clear in a social feed.",
    tools: ["Premiere Pro", "After Effects"],
  },
];

export const configuredProjects = projects.filter((project) => Boolean(project.videoUrl));
