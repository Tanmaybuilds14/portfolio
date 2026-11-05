export const projects = [
  {
    slug: 'inkwell',
    category: 'Realtime & systems',
    title: 'Inkwell',
    tagline: 'Two people. One paragraph. Zero conflicts.',
    summary:
      'A self-hostable, realtime collaborative document platform built on Yjs CRDTs — with live presence, version history and server-enforced permissions.',
    year: '2026',
    role: 'Design & engineering',
    status: 'Source available',
    accent: '#8b5cf6',
    image: null,
    tags: ['Next.js 16', 'Yjs', 'Tiptap', 'PostgreSQL', 'Redis', 'Prisma'],
    liveUrl: null,
    sourceUrl: 'https://github.com/Tanmaybuilds14/Inkwell',
    featured: true,
    mark: 'collab',
    stats: [
      { value: '<300ms', label: 'Edit propagation' },
      { value: '4 roles', label: 'Server-enforced' },
      { value: '5 min', label: 'Snapshot interval' },
    ],
    overview: [
      'Most "collaborative" editors are last-write-wins with a lock. Inkwell is the other kind: documents are CRDTs, so two people typing into the same sentence at the same millisecond produce the same merged result on every client, in every order.',
      'It runs on infrastructure you own. A Next.js app handles the UI, CRUD and sharing, while a separate always-on WebSocket service owns live document rooms. Both share one Postgres database and one Redis, and both enforce the same permissions.',
    ],
    highlights: [
      {
        title: 'Conflict-free co-editing',
        description:
          'Yjs merges concurrent edits at the character level. Edits fan out across horizontally-scaled sync instances over a per-document Redis pub/sub channel.',
      },
      {
        title: 'Presence that reads like a person',
        description:
          'Every collaborator gets a stable palette colour. Carets carry name pills, remote selections render as translucent bands, and a connection pill reports Live, Connecting, Reconnecting or Offline — edits saved locally.',
      },
      {
        title: 'Permissions on every frame',
        description:
          'OWNER, EDITOR, COMMENTER and VIEWER are checked server-side on every HTTP request and every WebSocket frame. Share links use a signed, revocable token — never the document ID.',
      },
      {
        title: 'History as a hot-swap',
        description:
          'Snapshots every five minutes while a document is edited. Restore publishes the snapshot over Redis and every connected client receives the new state without a reload — and the pre-restore state is written to history first.',
      },
    ],
    stack: [
      { layer: 'Framework', value: 'Next.js 16 (App Router, RSC) · React 19' },
      { layer: 'Realtime', value: 'Yjs 13 CRDTs · y-websocket · y-protocols' },
      { layer: 'Editor', value: 'Tiptap 3 with slash commands, tables, code blocks' },
      { layer: 'Persistence', value: 'PostgreSQL via Prisma 7, Yjs state as bytes' },
      { layer: 'Fan-out', value: 'Redis 7 pub/sub, per-document channels' },
      { layer: 'Auth & jobs', value: 'Clerk sessions · Inngest background jobs · Resend' },
      { layer: 'Tested with', value: 'Vitest unit suites · Playwright Chromium E2E' },
    ],
    challenges: [
      {
        title: 'Merging is easy; converging is not',
        description:
          'CRDTs guarantee a merge, not a good experience. The work that mattered was making state legible: authorship runs coloured by author, awareness names that update live without a reload, and an offline mode that queues edits in IndexedDB and replays them when the socket returns.',
      },
    ],
  },
  {
    slug: 'adshub',
    category: 'Product & marketing',
    title: 'AdsHub',
    tagline: 'An ad studio for people who do not have one.',
    summary:
      'An AI ad-creation platform: upload product images and a model photo, and it produces lifestyle imagery plus short-form video sized for social.',
    year: '2026',
    role: 'Frontend & product',
    status: 'Live',
    accent: '#8b5cf6',
    image: '/shots/adshub.webp',
    tags: ['TypeScript', 'React', 'TailwindCSS', 'Vite'],
    liveUrl: 'https://adshub-io.vercel.app/',
    sourceUrl: 'https://github.com/Tanmaybuilds14/Adshub.io',
    featured: true,
    mark: 'spark',
    stats: [
      { value: '9:16', label: 'Social-ready output' },
      { value: '4 steps', label: 'Upload to export' },
      { value: 'Responsive', label: 'Mobile first' },
    ],
    overview: [
      'AdsHub is a SaaS product for digital marketers and small brands. Instead of hiring a photographer and an editor, you upload product shots and a model photo; the platform returns commercial-ready lifestyle imagery and short-form video.',
      'I built the marketing site and the product surface around the generation flow — the parts a visitor meets before they trust a tool with their brand: the hero, the credibility signals, the sample gallery and the pricing path.',
    ],
    highlights: [
      {
        title: 'Scroll choreography that stays out of the way',
        description:
          'Entrance animations are timed to content, not to the scrollbar. Nothing moves until it is on screen, and nothing blocks a click.',
      },
      {
        title: 'Conversion-led layout',
        description:
          'A single above-the-fold call to action, with trust signals — creator count, sample outputs, commercial rights — placed directly beneath it.',
      },
      {
        title: 'Fluid across breakpoints',
        description:
          'The gallery grid, nav and hero all reflow rather than scale, so the page reads correctly on a phone as well as an ultrawide display.',
      },
      {
        title: 'A real product visual language',
        description:
          'Dark surfaces, one violet accent, generous whitespace and a tight type scale, so the interface feels like a design tool rather than a landing page template.',
      },
    ],
    stack: [
      { layer: 'Frontend', value: 'React 19 · TypeScript · Vite' },
      { layer: 'Styling', value: 'Tailwind CSS · custom design tokens' },
      { layer: 'Motion', value: 'Scroll-triggered entrance animations' },
      { layer: 'Deployment', value: 'Vercel' },
    ],
    challenges: [
      {
        title: 'Making an AI product feel trustworthy',
        description:
          'Generated imagery is only persuasive if the interface around it looks deliberate. The work was in restraint: one accent colour, a consistent radius scale, and real sample output instead of stock abstractions.',
      },
    ],
  },
  {
    slug: 'jobportal',
    category: 'Full-stack apps',
    title: 'JobPortal',
    tagline: 'A hiring workflow, not a job board.',
    summary:
      'A full-stack application portal with separate recruiter and candidate experiences, covering posting, browsing, applying and tracking.',
    year: '2026',
    role: 'Full-stack',
    status: 'Live',
    accent: '#6366f1',
    image: '/shots/jobportal.webp',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
    liveUrl: 'https://jobportal-seven-chi.vercel.app/',
    sourceUrl: 'https://github.com/Tanmaybuilds14/JobPortal',
    featured: true,
    mark: 'orbit',
    stats: [
      { value: '2 roles', label: 'Recruiter & candidate' },
      { value: '5 states', label: 'Application lifecycle' },
      { value: 'REST', label: 'API surface' },
    ],
    overview: [
      'JobPortal started as a student project and grew into a two-sided product. Candidates browse roles and track every application in one place; recruiters post openings and move applicants through a pipeline.',
      'The interesting engineering is not the job list — it is the state machine underneath: who can see what, which transitions are legal, and what happens to an application when a role is closed.',
    ],
    highlights: [
      {
        title: 'Two audiences, one codebase',
        description:
          'Role-aware routing renders a candidate dashboard or a recruiter console from the same component library, so the product stays visually consistent.',
      },
      {
        title: 'Application tracking',
        description:
          'Every application carries an explicit status, with recruiter-side transitions and a candidate-side view of the same lifecycle.',
      },
      {
        title: 'Search that behaves',
        description:
          'Filters for role, location and type compose in the URL, so a filtered view is linkable and survives a refresh.',
      },
      {
        title: 'Authentication that the UI trusts',
        description:
          'Session-protected routes, with the client deriving its entire navigation from the authenticated role rather than hiding buttons.',
      },
    ],
    stack: [
      { layer: 'Frontend', value: 'React · Vite · Tailwind CSS' },
      { layer: 'Backend', value: 'Node.js · Express REST API' },
      { layer: 'Database', value: 'MongoDB with Mongoose schemas' },
      { layer: 'Auth', value: 'JWT sessions with role claims' },
      { layer: 'Deployment', value: 'Vercel (client) · hosted API' },
    ],
    challenges: [
      {
        title: 'Designing the lifecycle before the screen',
        description:
          'The first version had status as a free-text field, which made the recruiter view impossible to build honestly. Modelling the transitions first — and rejecting illegal ones on the server — made both dashboards straightforward.',
      },
    ],
  },
  {
    slug: 'ai-audit',
    category: 'Tools & AI',
    title: 'AI Spend Auditor',
    tagline: 'The AI bill, finally explained.',
    summary:
      'A free tool that audits a team’s AI tool spend, recommends concrete optimisations, and turns the result into a shareable report.',
    year: '2026',
    role: 'Full-stack',
    status: 'Live',
    accent: '#22d3ee',
    image: null,
    tags: ['React 19', 'TypeScript', 'Express', 'Anthropic API'],
    liveUrl: 'https://auditor-ochre-omega.vercel.app/',
    sourceUrl: 'https://github.com/Tanmaybuilds14/Ai_audit',
    featured: false,
    mark: 'wave',
    stats: [
      { value: 'Instant', label: 'Rule-based audit' },
      { value: 'Claude', label: 'Narrative summary' },
      { value: 'Shareable', label: 'Unique report URL' },
    ],
    overview: [
      'Most companies now pay for five or six AI tools and have no idea which seats they actually use. The AI Spend Auditor takes a short inventory of tools and seat counts and returns a defensible optimisation plan.',
      'Recommendations come from deterministic rules, not a chatbot: the numbers are reproducible and explainable. Claude is used only to turn the findings into a readable summary.',
    ],
    highlights: [
      {
        title: 'Deterministic maths, generative prose',
        description:
          'The audit logic is hard-coded per tool, so two people with identical inputs get identical savings. The model writes the narrative, never the numbers.',
      },
      {
        title: 'Shareable reports',
        description:
          'Every audit gets a unique URL, which turns a private calculation into something you can send to a finance lead.',
      },
      {
        title: 'Graceful degradation',
        description:
          'Without an API key the app falls back to a templated summary, so the tool is never broken — just less expressive.',
      },
      {
        title: 'High-contrast UI',
        description:
          'A deliberately plain, legible interface: one question per screen, results in a single scrollable report.',
      },
    ],
    stack: [
      { layer: 'Frontend', value: 'React 19 · TypeScript · Vite · vanilla CSS' },
      { layer: 'Backend', value: 'Node.js · Express' },
      { layer: 'AI', value: 'Anthropic Claude via official SDK' },
      { layer: 'Deployment', value: 'Vercel (client) · Node server' },
    ],
    challenges: [
      {
        title: 'Where the model belongs',
        description:
          'The temptation is to let the LLM do the whole audit. Splitting responsibilities — rules for money, model for language — made the output both trustworthy and pleasant to read.',
      },
    ],
  },
  {
    slug: 'accredian-enterprise',
    category: 'Interface studies',
    title: 'Accredian Enterprise',
    tagline: 'Rebuilt from its own bundles.',
    summary:
      'A pixel-faithful reconstruction of a live enterprise page in Next.js 16 and Tailwind v4 — reverse-engineered rather than guessed.',
    year: '2026',
    role: 'Interface engineering',
    status: 'Live',
    accent: '#f59e0b',
    image: null,
    tags: ['Next.js 16', 'React 19', 'Tailwind v4', 'lucide-react'],
    liveUrl: 'https://accredian-enterprise-page-clone-bay.vercel.app/',
    sourceUrl: 'https://github.com/Tanmaybuilds14/Accredian-enterprise-page-clone',
    featured: false,
    mark: 'grid',
    stats: [
      { value: 'Next 16', label: 'App Router · Turbopack' },
      { value: 'v4', label: 'Tailwind theme tokens' },
      { value: '0 guess', label: 'Copy sourced from bundles' },
    ],
    overview: [
      'The brief was simple: rebuild a live marketing page so closely that a visitor could not tell them apart. Content, copy, colour and layout were recovered from the production site’s compiled JavaScript and CSS bundles instead of being eyeballed from a screenshot.',
      'That constraint makes it an exercise in reading real code: section order, spacing tokens and component boundaries are decided by evidence rather than taste.',
    ],
    highlights: [
      {
        title: 'Evidence-led rebuild',
        description:
          'Section order, copy and styling were extracted from the shipped bundles, so the structure matches production exactly.',
      },
      {
        title: 'Theme tokens, not magic numbers',
        description:
          'Colours and type live in Tailwind v4 @theme inline tokens, which keeps the whole page consistent and easy to re-skin.',
      },
      {
        title: 'A licensed font, honestly handled',
        description:
          'The original uses a commercial typeface, so I substituted Plus Jakarta Sans — the closest open alternative — instead of shipping a font I do not have rights to.',
      },
      {
        title: 'Built for speed',
        description:
          'App Router, Turbopack and static rendering keep the page fast while the layout stays componentised.',
      },
    ],
    stack: [
      { layer: 'Framework', value: 'Next.js 16 App Router · Turbopack' },
      { layer: 'UI', value: 'React 19 · lucide-react icons' },
      { layer: 'Styling', value: 'Tailwind CSS v4 @theme inline tokens' },
      { layer: 'Type', value: 'Plus Jakarta Sans via next/font' },
    ],
    challenges: [
      {
        title: 'Faithful without copying assets',
        description:
          'Matching a page you cannot copy assets from means rebuilding layout, motion and type from scratch. The result preserves the feel while remaining entirely my own implementation.',
      },
    ],
  },
  {
    slug: '3d-interface',
    category: 'Interface studies',
    title: 'MCodes',
    tagline: 'A landing page with an actual third dimension.',
    summary:
      'A dark developer-tool landing page built around an interactive Spline scene — a metallic robot with floating 3D labels.',
    year: '2026',
    role: 'Frontend',
    status: 'Live',
    accent: '#a855f7',
    image: '/shots/mcode.webp',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Spline'],
    liveUrl: 'https://3-d-website-omega.vercel.app/',
    sourceUrl: 'https://github.com/Tanmaybuilds14/3D-website',
    featured: false,
    mark: 'box',
    stats: [
      { value: '1 scene', label: 'Interactive 3D centrepiece' },
      { value: '60fps', label: 'Target frame budget' },
      { value: '1 viewport', label: 'Single-screen hero' },
    ],
    overview: [
      'A study in making 3D serve the message rather than decorate it. The centrepiece is an animated robot flanked by floating "Front" and "End" labels — the page’s argument rendered as geometry.',
      'Everything else is deliberately quiet: a deep black canvas, a faint grid, and high-contrast type, so the scene stays the focal point at any window size.',
    ],
    highlights: [
      {
        title: 'A 3D hero that holds up',
        description:
          'The Spline scene responds fluidly to resizing, maintaining an impactful composition on laptops and large displays alike.',
      },
      {
        title: 'Developer-first typography',
        description:
          'Wide-tracked uppercase headings and restrained subcopy give the page the cadence of documentation rather than marketing.',
      },
      {
        title: 'Restrained palette',
        description:
          'One violet accent against near-black — enough to guide the eye, never enough to compete with the model.',
      },
      {
        title: 'Reliable first paint',
        description:
          'Layout and copy render before the 3D scene finishes loading, so the page is readable even on a slow connection.',
      },
    ],
    stack: [
      { layer: 'Markup & style', value: 'Semantic HTML5 · CSS3' },
      { layer: 'Interactivity', value: 'Vanilla JavaScript' },
      { layer: '3D', value: 'Spline runtime scene' },
      { layer: 'Deployment', value: 'Vercel' },
    ],
    challenges: [
      {
        title: 'Keeping a heavy asset cheap',
        description:
          'A 3D hero can cost you the first impression. Deferring the scene and painting the typographic layout first keeps the page usable while the model streams in.',
      },
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProject(slug) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index > 0 ? projects[index - 1] : projects[projects.length - 1],
    next: index < projects.length - 1 ? projects[index + 1] : projects[0],
  };
}
