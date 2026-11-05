export const site = {
  name: 'Tanmay Sarve',
  firstName: 'Tanmay',
  role: 'Full-stack developer',
  focus: 'Backend & systems',
  location: 'Pune, India',
  timeZone: 'Asia/Kolkata',
  email: 'sarvetanmay276@gmail.com',
  availability: 'Open to internships & full-time roles',
  url: 'https://tanmaysarve.vercel.app',
  github: 'https://github.com/Tanmaybuilds14',
  linkedin: 'https://www.linkedin.com/in/tanmay-sarve-29a384391/',
  bio: 'I build full-stack products end to end — React interfaces on the surface, Node, Postgres and Redis underneath. I care most about the parts that are easy to get wrong.',
  intro:
    "I'm a full-stack developer from Pune, currently finishing a BCA. Most of my work lives in the browser but the interesting parts happen on the server: realtime sync, data models, and the seams where a UI has to be honest about what the backend is doing.",
};

export const socials = [
  { label: 'GitHub', href: site.github, handle: '@Tanmaybuilds14' },
  { label: 'LinkedIn', href: site.linkedin, handle: 'in/tanmay-sarve' },
  { label: 'Email', href: `mailto:${site.email}`, handle: site.email },
];

export const stats = [
  { value: '6', label: 'Projects shipped' },
  { value: '4', label: 'Live deployments' },
  { value: '2', label: 'Years writing code' },
];

export const skillGroups = [
  {
    title: 'Languages',
    items: ['JavaScript', 'TypeScript', 'SQL', 'HTML', 'CSS'],
  },
  {
    title: 'Frontend',
    items: ['React 19', 'Next.js 16', 'Tailwind CSS v4', 'Vite', 'CSS architecture'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'Prisma', 'REST APIs', 'WebSockets', 'Yjs CRDTs'],
  },
  {
    title: 'Data & infra',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase', 'Docker'],
  },
  {
    title: 'Tooling',
    items: ['Git', 'Vitest', 'Playwright', 'Vercel', 'Figma'],
  },
];

export const timeline = [
  {
    period: 'Ongoing',
    title: 'Data structures & algorithms',
    description:
      'Consistent problem-solving practice on LeetCode and GeeksforGeeks, with an emphasis on writing solutions I could actually defend in a code review.',
    kind: 'Practice',
  },
  {
    period: '2026',
    title: 'Inkwell — realtime collaborative documents',
    description:
      'A self-hostable document platform built on Yjs CRDTs: two people typing in the same paragraph at the same millisecond converges on every client. Separate sync service, Redis fan-out, Postgres snapshots and role-based permissions.',
    kind: 'Product',
  },
  {
    period: '2026',
    title: 'Freelance & full-stack product work',
    description:
      'Shipped AdsHub (AI ad creative platform), JobPortal (hiring workflow with recruiter and candidate roles) and an AI Spend Auditor that turns a tool-by-tool audit into a shareable report.',
    kind: 'Shipped',
  },
  {
    period: '2026',
    title: 'Interface studies',
    description:
      'Recreated production interfaces from their compiled bundles — a Next.js 16 + Tailwind v4 rebuild of Accredian Enterprise and a Spline-driven 3D landing page — to practise matching real-world design and scroll behaviour.',
    kind: 'Craft',
  },
  {
    period: '2024 — now',
    title: 'Bachelor of Computer Applications',
    description:
      'Coursework in databases, operating systems, algorithms and application architecture, alongside the projects above.',
    kind: 'Education',
  },
];

export const education = {
  degree: 'Bachelor of Computer Applications (BCA)',
  detail: 'Backend development focus — databases, algorithms and application architecture.',
};
