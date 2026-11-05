# Tanmay Sarve — Portfolio

A personal portfolio for a full-stack developer. Six case studies, a quiet
neutral palette, and motion used sparingly.

**Live:** https://tanmaysarve.vercel.app

## Stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 + Vite 8 |
| Routing | React Router 7 (SPA, rewrites on Vercel) |
| Styling | Tailwind CSS v4 (`@theme` tokens) |
| Components | shadcn/ui — Radix primitives + `cva` |
| Scroll & reveal | [motion.dev](https://motion.dev) (`motion/react`) |
| Text & counters | [anime.js v4](https://animejs.com) |
| Backgrounds | Fixed photographic backdrop + 21st.dev patterns (grid, dot-grid, aurora, marquee) |
| Type | Geist + Geist Mono, self-hosted via `@fontsource` |
| Icons | `lucide-react` |

## Backdrop

A generated dark alpine ridge sits behind the whole app (`public/backdrop.webp`,
1920px, 47 kB; a 10 kB portrait crop for phones). `src/components/backgrounds/site-backdrop.jsx`
stacks the photograph with a three-layer scrim — a vertical gradient that keeps the
top readable and fades to near-black past the fold, plus a radial vignette. Text
contrast was sampled against the composited result and clears WCAG AA
(5.6–8.3:1) across the hero.

To swap the image, replace `public/backdrop.webp` and `public/backdrop-mobile.webp`.
If you change the crop, re-check the hero: the scrim assumes the ridge sits in the
lower half and open sky in the top third.

## Theme

The palette follows the shadcn/ui token contract, so any shadcn component drops in
without colour edits. Based on the **Modern Minimal** theme from the
[21st.dev theme gallery](https://21st.dev/community/themes), adapted to a dark
canvas: near-black surfaces, one lime signal colour reserved for interactive
elements. Tokens live in `src/index.css` under `.dark`.

## Structure

```
src/
├── App.jsx                      routes, page transitions, scroll restoration
├── index.css                    Tailwind v4 setup + shadcn theme tokens
├── components/
│   ├── ui/                      shadcn primitives (button, card, badge, tabs,
│   │                            accordion, input, textarea, separator, tooltip)
│   ├── motion/                  reveal (motion.dev), split-text + counter (anime.js)
│   ├── backgrounds/             grid, dot-grid, aurora
│   ├── blocks/                  hero, project rows/cards, marquee
│   ├── nav.jsx · footer.jsx
│   └── project-visual.jsx       screenshot frame or generated SVG plate
├── data/
│   ├── projects.js              all case-study content
│   └── site.js                  identity, links, skills, timeline
├── lib/utils.js                 cn()
└── pages/                       home, work, project-detail, about, contact, not-found
```

## Editing content

- **Add a project** — append an object to `src/data/projects.js`. The Work index,
  homepage, case-study routes, next/previous navigation and JSON-LD all read from
  that array. Projects without a screenshot get a generated SVG plate keyed by
  `mark` (`collab`, `orbit`, `wave`, `grid`, `box`, `spark`).
- **Identity, links, skills** — `src/data/site.js`.
- **Palette** — `.dark` block in `src/index.css` (the `dark` class lives on `<html>`).
- **Backdrop image** — `public/backdrop.webp` + `backdrop-mobile.webp`.

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the build
npm run lint     # eslint + react-hooks rules
```

## Motion notes

- Reveals use `whileInView` with `viewport={{ once: true }}`.
- Headlines animate per word with anime.js `stagger`; stat figures count up once
  via `IntersectionObserver`.
- Marquee and aurora are pure CSS so they cost nothing on the main thread.
- Everything is disabled under `prefers-reduced-motion: reduce`.

## Deploying

Vercel, as a static SPA. `vercel.json` handles the catch-all rewrite to
`index.html`, immutable caching for hashed assets, and security headers. Vendor
code is split into separate chunks (react / motion / anime / ui) so repeat visits
stay cheap.
