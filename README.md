# Tanmay Sarve — Portfolio

A personal portfolio for a full-stack developer. Editorial layout, self-hosted
type, real case studies, and no UI framework — just React, Vite and hand-written CSS.

**Live:** https://tanmaysarve.vercel.app

## Stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 + Vite 8 |
| Routing | React Router 7 (client-side, SPA rewrites on Vercel) |
| Styling | Hand-written CSS with design tokens — no utility framework |
| Type | Inter Variable, Instrument Serif, JetBrains Mono via `@fontsource` (self-hosted) |
| Icons | `lucide-react` |
| Motion | CSS transitions + `IntersectionObserver` |

Total JS is ~292 kB uncompressed (~92 kB gzipped), fonts included in the bundle.

## Structure

```
src/
├── App.jsx                 route table, page transition, titles
├── main.jsx                BrowserRouter entry
├── components/
│   ├── Nav.jsx             sticky header, mobile sheet
│   ├── Footer.jsx          contact CTA + sitemap
│   ├── Reveal.jsx          scroll reveal (IntersectionObserver, no deps)
│   ├── ProjectVisual.jsx   screenshot frame or generated SVG "spec plate"
│   └── StructuredData.jsx  JSON-LD for Person / WebSite / ItemList
├── data/
│   ├── projects.js         all case-study content lives here
│   └── site.js             identity, links, skills, timeline
├── hooks/useLocalTime.js   live clock in the visitor's target time zone
├── pages/                  Home, Work, ProjectDetail, About, Contact, NotFound
└── styles/index.css        design tokens, typography, primitives
```

## Editing content

- **Add a project** — append an object to `src/data/projects.js`. The Work index,
  homepage, case-study routes, next/previous navigation and JSON-LD all read from
  that array. Projects without a screenshot automatically get a generated SVG
  plate keyed by `mark` (`collab`, `orbit`, `wave`, `grid`, `box`, `spark`).
- **Update identity, links or skills** — `src/data/site.js`.
- **Change the palette** — the `:root` block in `src/styles/index.css`.

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
npm run preview  # serve the build locally
npm run lint     # eslint, including react-hooks rules
```

## Deploying

Deployed on Vercel as a static SPA. `vercel.json` handles the catch-all rewrite to
`index.html`, long-lived caching for hashed assets, and basic security headers.
Any static host works — just make sure unknown paths resolve to `index.html`.

## Notes

- Screenshots in `public/shots/` are compressed WebP at 1400 px wide.
- Motion respects `prefers-reduced-motion`; reveals and route transitions are skipped.
- The contact form validates client-side and hands off to the visitor's mail client —
  there is no backend, and the site says so rather than pretending a message was sent.
