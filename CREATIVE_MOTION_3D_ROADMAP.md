# Creative Motion & 3D Roadmap

**Project:** Tanmay Sarve Portfolio  
**Assessment date:** 2026-08-13  
**Recommended creative direction:** **Systems in Motion** — an interactive, cinematic portfolio built around a single evolving 3D “developer core,” with each view revealing a different layer of Tanmay's work.

## 1. Executive summary

The portfolio already has the right technical starting point for a motion-led experience:

- React 19 and Vite 8
- Framer Motion
- React Three Fiber, Drei, and Three.js
- A persistent full-screen 3D canvas
- A dark, technical visual language
- Project data separated from project components

The current site is a good prototype, but its creative elements do not yet tell one cohesive story. The background is a distorted sphere plus stars, while the interface alternates between a generic landing page, terminal window, glass contact card, and standard project grid. Motion is present, but most transitions use the same fade/slide/scale pattern. The 3D scene is decorative rather than meaningful.

The next version should **not add multiple unrelated effects or heavy models**. It should establish one recognizable visual idea, connect motion to navigation and content, and keep the HTML interface usable without WebGL. The recommended centerpiece is a lightweight modular 3D object that changes state for Home, About, Projects, and Contact.

## 2. Current-state audit

### What is working

| Area | Current strength |
| --- | --- |
| Foundation | Small React codebase with clear view components and centralized project data. |
| Visual baseline | Consistent dark palette, strong display type, electric-blue accent, and glass surfaces. |
| Motion baseline | Intro animation, view transitions, typewriter effect, hover elevation, and continuous 3D movement already exist. |
| 3D baseline | Canvas, lighting, camera rig, procedural material, stars, and controls are already integrated. |
| Content structure | Home, About, Projects, project details, and Contact provide a complete high-level portfolio flow. |
| Production build | `npm run build` succeeds. |
| Runtime dependency audit | `npm audit --omit=dev` reports zero vulnerabilities. |

### Main limitations

#### Creative direction

- The sphere and star field feel like a general “tech portfolio” treatment rather than a visual identity specific to Tanmay.
- The terminal About view, white Contact card, project grid, and 3D backdrop do not yet feel like parts of the same world.
- The opening “SYSTEM ONLINE” animation blocks access for 2.5 seconds on every page load and does not reveal useful content.
- The current visual hierarchy emphasizes effects before proof of work, outcomes, and technical depth.

#### Motion

- Most screens enter with a variation of opacity plus translation or scale; there is no reusable motion language.
- Navigation has no active indicator or shared-layout transition.
- Project cards only move upward; there is no image reveal, pointer response, focused state, or transition into project details.
- The About typewriter takes roughly 12 seconds for the full paragraph, making important information slow to consume.
- Motion does not respond to `prefers-reduced-motion`.
- Project-related star and orbit speeds (`25` and `26`) are visually aggressive and may cause discomfort.

#### 3D

- The scene contains a procedural distorted sphere, but no authored 3D model.
- The 3D object does not communicate skills, projects, or personality and has no direct interaction with the DOM content.
- Contact moves the camera nearly inside the sphere and sharply increases light, distortion, and material speed; this is likely to create a whiteout rather than a controlled transition.
- A new `THREE.Vector3` is allocated every frame in `CameraRig`.
- The scene always renders at up to 2x device pixel ratio with 5,000 stars and no adaptive quality tier.
- The loading fallback is `null`, there is no WebGL error fallback, and assets are not preloaded.
- `introFinished` is passed into `Scene` but never used.

#### UX and content

- View state is held only in React state. Pages have no shareable URLs, browser back/forward behavior, or direct project links.
- The Contact form prevents submission and does not send or validate data.
- Several contact/social links point to `#`.
- Project cards are clickable `div` elements rather than keyboard-accessible links/buttons.
- Icon-only controls need accessible names, active navigation needs `aria-current`, and focus states need improvement.
- Project descriptions focus on generic features instead of role, constraints, architecture, decisions, and measurable outcomes.
- Content needs proofreading and consistency: “Tanmay sarve,” “javascrpt,” “supabase,” and several sentence fragments should be corrected.
- The hardcoded project-detail condition in `OverlayUI` must be manually updated whenever a project is added.

#### Maintainability and performance

- There are approximately 93 inline style objects across the JSX components, making responsive changes and visual consistency difficult.
- `App.css` contains unused starter styles and is not imported. Several starter assets are also unused.
- All views and the Three.js stack are eagerly imported into one bundle.
- The production JavaScript bundle is currently about **1,242 kB minified / 348 kB gzip**, and Vite reports a chunk-size warning.
- Lint currently fails with 9 unused-import/unused-prop errors.
- The full dependency audit currently reports 5 development-tool vulnerabilities; the runtime-only audit is clean.
- The README is still the default Vite README and does not document this portfolio.

## 3. Recommended concept: “Systems in Motion”

### Core idea

Use one signature 3D object—a modular **developer core**—as the visual metaphor for building systems. It can be made from a central glass/crystal shape, a wireframe shell, orbital nodes, and connecting traces. It should feel designed, not like a stock model.

The core changes state according to the current view:

| View | 3D state | Motion meaning |
| --- | --- | --- |
| Home | Assembled core, slow breathing light, subtle pointer parallax | A complete system ready to build. |
| About | Shell separates into layers; skill nodes become visible | Revealing how the developer thinks and what is inside the system. |
| Projects | Three orbiting project nodes align with the project list | Work becomes a navigable constellation, not a disconnected card grid. |
| Project detail | Camera focuses on one node; its accent color and geometry take over | A deliberate deep dive into one case study. |
| Contact | The core opens and sends a single outward signal pulse | Starting a conversation, without moving the camera inside the model. |

### Why this direction fits

- It extends the existing “SYSTEM ONLINE” and terminal language without turning the whole site into a cliché command line.
- It supports both procedural Three.js geometry and a future custom GLB model.
- One model with multiple states is more memorable, maintainable, and performant than a different 3D scene on every screen.
- It makes 3D part of the information architecture while keeping project text and actions in accessible DOM elements.

### Art direction

- Keep the near-black background, but add a restrained warm off-white and one project-specific secondary accent.
- Replace the uniform star field with a sparse depth grid, particles that connect to the core, and soft volumetric-looking gradients made with lightweight sprites/shaders.
- Add a subtle grain/noise overlay to reduce the sterile CGI feel.
- Use a consistent surface system: dark glass panels throughout. Avoid changing Contact to an unrelated white modal.
- Preserve Space Grotesk for display text; consider a compact mono face only for metadata and system labels.
- Use oversized project numbers, small coordinate/status labels, and thin connector lines to build a recognizable editorial/technical style.

## 4. Motion design system

Motion should explain state changes, direct attention, and make the site feel responsive. Continuous movement should remain subtle.

### Suggested tokens

| Token | Timing | Use |
| --- | ---: | --- |
| Instant | 120–160 ms | Press feedback, icon response, focus/hover state. |
| Fast | 180–240 ms | Tooltips, nav indicator, tags, card overlays. |
| Standard | 320–450 ms | Content reveals and card transitions. |
| Scene | 650–900 ms | Camera and 3D state changes. |
| Cinematic | 900–1200 ms | First-load hero reveal only. |

- Primary easing: `[0.22, 1, 0.36, 1]`
- Exit easing: `[0.4, 0, 1, 1]`
- Pointer-follow movement: damped spring, not a duration tween
- Text stagger: 40–70 ms between lines, not between every character
- Continuous rotation: slow enough that the model's silhouette remains readable

### Signature motion moments

1. **Entry sequence:** show useful identity content immediately; reveal status label, name, headline lines, and core assembly in under 1.2 seconds. Add a visible “Skip intro” only if a longer intro is retained.
2. **Navigation:** animate a shared active marker between nav items using Framer Motion `layoutId`.
3. **View transition:** the core changes first, then the new DOM content enters from the direction implied by the camera movement.
4. **Project cards:** add image mask reveal, subtle 3D tilt, moving highlight, project index, and an arrow that responds to focus/hover. Disable tilt on touch devices.
5. **Project handoff:** use a shared-layout image/title transition from card to case-study header where practical.
6. **About:** replace the long character-by-character paragraph with fast line/word reveals and interactive skill nodes.
7. **Contact:** send a signal pulse from the 3D core when the form is focused and a confirmation pulse after a successful submission.
8. **Microinteractions:** magnetic CTAs only on fine pointers, animated external-link arrows, copy-email feedback, and tactile pressed states.

### Reduced-motion behavior

When `prefers-reduced-motion: reduce` is active:

- Skip the timed intro and all typewriter effects.
- Replace camera travel with a short crossfade.
- Stop automatic orbiting, distortion, particle drift, and pointer parallax.
- Keep focus, hover color, and opacity changes so state remains understandable.
- Offer a static hero image/CSS gradient if WebGL is unavailable.

## 5. Target architecture

A modest restructure will make creative iteration safer:

```text
src/
  app/
    routes.jsx
    viewConfig.js
  components/
    layout/
      Header.jsx
      ViewTransition.jsx
    ui/
      Button.jsx
      ProjectCard.jsx
      StatusPill.jsx
  features/
    about/
    contact/
    projects/
  scene/
    PortfolioCanvas.jsx
    Experience.jsx
    CameraRig.jsx
    DeveloperCore.jsx
    ProjectNodes.jsx
    SceneFallback.jsx
    sceneStates.js
  motion/
    tokens.js
    variants.js
    useReducedMotionSettings.js
  data/
    projects.js
  styles/
    tokens.css
    global.css
    components.css
```

### Architecture decisions

- Replace string-condition chains with a single data-driven `viewConfig` that controls route, accent, camera, lighting, model state, and transition direction.
- Introduce URL routing for `/`, `/about`, `/projects`, `/projects/:slug`, and `/contact`. Lazy-load non-home views.
- Keep all important text, links, and forms in the DOM. Treat the canvas as progressive enhancement.
- Lazy-load the entire 3D experience after the initial shell, and render a designed CSS/image fallback while it loads.
- Move repeated inline styles into class-based component styles and design tokens.
- Use Framer Motion variants for DOM motion and damped values/state interpolation for the Three.js scene.
- Prefer Drei's existing helpers before adding another runtime dependency.

## 6. Phased implementation roadmap

The estimates assume one developer working part-time to full-time. Each phase should ship independently.

### Phase 0 — Stabilize the foundation

**Estimate:** 1–2 days  
**Priority:** Must do before visual expansion

Tasks:

- Fix all 9 lint errors and keep build/lint green in CI.
- Update dependencies to resolve development-tool audit findings, then re-run build and lint.
- Remove dead starter CSS/assets and rename the package from `tmp-app`.
- Replace hardcoded view checks with project-data-driven logic.
- Add URL routes and browser history; lazy-load About, Projects, Project detail, and Contact.
- Move core colors, spacing, type, radii, and motion values into shared tokens.
- Add a visible loading/fallback state instead of `Suspense fallback={null}`.
- Correct copy, casing, project tags, and dead social links.
- Make the Contact form either functional or replace it with honest email/copy-email actions until a backend/form service is connected.

**Exit criteria:**

- `npm run build` and `npm run lint` pass without warnings caused by application code.
- Every primary view has a direct URL and works with refresh/back/forward.
- The portfolio remains usable if the canvas fails to load.
- No dead links or fake submit behavior remain.

### Phase 1 — Establish the 2D visual and motion language

**Estimate:** 3–5 days  
**Priority:** High

Tasks:

- Create Framer Motion tokens and shared variants.
- Redesign the first-load sequence to finish within 1.2 seconds and reveal useful content immediately.
- Add active nav state and shared-layout indicator.
- Build a consistent view transition wrapper.
- Redesign project cards with index, role, year, concise outcome, image mask reveal, and keyboard interaction.
- Replace the long About typewriter with scannable sections: short bio, current focus, capabilities, tools, and learning.
- Restyle Contact into the same dark system as the rest of the site.
- Add reduced-motion logic before adding more animation.

**Exit criteria:**

- All interface motion uses documented timings/easings.
- Keyboard and touch interactions receive equivalent feedback to mouse hover.
- Reduced-motion mode removes all nonessential motion.
- The site still feels intentional with the 3D canvas disabled.

### Phase 2 — Prototype the signature 3D core

**Estimate:** 4–6 days  
**Priority:** High

Tasks:

- Build the first core procedurally from optimized geometry and materials; do not wait for a custom Blender asset to validate the idea.
- Define camera, target, core transform, lighting, accent, and particle behavior for each route in `sceneStates.js`.
- Replace abrupt view booleans with smoothly interpolated scene state.
- Add restrained pointer parallax and model response using normalized pointer values.
- Replace `OrbitControls` auto-rotation as the primary behavior with a controlled camera rig; allow only limited user orbit if it supports the concept.
- Remove per-frame object allocations and guard refs in animation loops.
- Add a designed loading state and WebGL error boundary/fallback.
- Test a static mobile composition rather than simply scaling the desktop scene.

**Decision gate:** test the procedural prototype with real portfolio content. If the silhouette is distinctive enough, refine it. If not, author one custom GLB in Blender using the same state plan.

**Exit criteria:**

- All five view types have a readable, intentional 3D composition.
- Camera transitions do not obscure DOM content or move through geometry.
- Idle motion is subtle; interaction never blocks navigation or scrolling.
- The scene works on common mobile viewport sizes and has a static fallback.

### Phase 3 — Connect 3D to projects and interaction

**Estimate:** 4–6 days  
**Priority:** High

Tasks:

- Create one project node per project from project data.
- Synchronize DOM card hover/focus with the corresponding 3D node using shared React state.
- On project selection, move the camera and scene accent toward that node before completing the route transition.
- Use project colors/geometry sparingly; preserve a consistent global art direction.
- Add a scroll or section-progress signal to long project pages, but do not hijack native scrolling.
- Add the Contact signal-pulse interaction and a quiet success state.

**Exit criteria:**

- 3D changes clarify which project or view is active.
- Every 3D interaction has a DOM and keyboard equivalent.
- Navigating rapidly between views does not leave stale animations or camera states.

### Phase 4 — Turn project pages into case studies

**Estimate:** 3–5 days, depending on available content  
**Priority:** High for hiring impact

For each project, add:

- One-sentence outcome
- Role and collaborators
- Date/duration
- Problem and users
- Constraints
- Architecture/stack
- Two or three key decisions with reasoning
- Screens or short optimized clips showing real flows
- Challenge and resolution
- Result, metric, or honest qualitative outcome
- Live site and source link where available
- “Next project” navigation

Creative treatment:

- Use a cinematic but readable case-study header.
- Reveal diagrams/screens with masks tied to scroll progress.
- Use the 3D node as a small persistent context marker, not a distraction behind body copy.
- Add subtle depth to screenshots using perspective and lighting, with no autoplay-heavy video.

**Exit criteria:**

- A recruiter can understand Tanmay's contribution and technical decisions in under two minutes.
- Project claims match the actual tools used.
- Images include useful alt text, explicit dimensions, and modern optimized formats.

### Phase 5 — Performance, accessibility, and device hardening

**Estimate:** 3–4 days  
**Priority:** Release blocker

Tasks:

- Code-split the Three.js scene and route views.
- Add adaptive DPR and quality tiers using device capability/performance signals.
- Reduce particle count, material complexity, and post-processing on low-tier/mobile devices.
- Pause render activity when the document is hidden; use on-demand rendering where continuous animation is unnecessary.
- If a GLB is used, optimize it with Meshopt/Draco where appropriate and compress textures to WebP/KTX2.
- Add semantic landmarks, accessible names, `aria-current`, visible focus states, form errors/status, and keyboard-operable cards.
- Test at 320 px width, landscape phones, tablets, laptops, large displays, 200% zoom, keyboard only, reduced motion, and WebGL disabled.
- Add metadata, Open Graph image, canonical URL, structured data, sitemap, robots file, and a custom 404 route.
- Replace the default README with setup, architecture, asset pipeline, and deployment instructions.

**Performance budgets:**

| Metric | Target |
| --- | --- |
| LCP | Under 2.5 s on a mid-tier mobile connection/device |
| INP | Under 200 ms |
| CLS | Under 0.1 |
| Initial app shell JS | Under 180 kB gzip where practical |
| 3D chunk | Lazy-loaded; keep compressed transfer as small as practical |
| Hero GLB, if added | Ideally under 1.5 MB desktop with a smaller mobile/static alternative |
| Frame rate | Near 60 fps desktop; stable 30+ fps on supported mid-tier mobile |
| Draw calls | Prefer fewer than 50 in the primary scene |
| Hero model geometry | Aim below 50k visible triangles; lower for mobile |

**Exit criteria:**

- Lighthouse/Web Vitals targets are measured on the deployed build, not only local development.
- No critical automated accessibility errors; keyboard and screen-reader smoke tests pass.
- Mobile quality reduction is graceful rather than visibly broken.

### Phase 6 — Launch polish and measurement

**Estimate:** 1–2 days

Tasks:

- Add privacy-conscious analytics for project opens, live-site clicks, contact actions, reduced-motion usage, and WebGL fallback rate.
- Verify all external links and contact delivery.
- Test the Vercel production deployment on real iOS, Android, macOS, and Windows devices where available.
- Capture a polished social preview and fallback hero image.
- Document how to add a project without changing component logic.

**Exit criteria:**

- Deployment, metadata, links, forms, fallback, and analytics are verified.
- New project entries are added through data/content only.

## 7. 3D asset pipeline

If the Phase 2 procedural core is replaced or enhanced with Blender:

1. Model only the signature core and reusable project-node parts.
2. Keep topology simple and bake fine detail rather than modeling it.
3. Use a small material set and atlas textures where possible to reduce draw calls.
4. Export GLB with transforms applied and sensible object names.
5. Optimize and compress the GLB; compare visual quality before accepting automated reductions.
6. Generate a smaller mobile variant or use the procedural/static fallback.
7. Preload only the asset needed for the current or next likely view.
8. Store source `.blend` files outside the production public path; ship only optimized runtime assets.
9. Record license/source information for every third-party model, texture, or HDRI.

Avoid large HDR environments unless they materially improve the scene. A custom gradient environment or small compressed environment map will usually fit this art direction better.

## 8. Suggested delivery slices

Keep implementation reviewable with small pull-request-sized slices:

1. **Foundation:** lint, routing, cleanup, real links, form decision.
2. **Design system:** tokens, extracted styles, shared components.
3. **Motion system:** variants, nav, view transitions, reduced motion.
4. **3D core prototype:** scene architecture and route states.
5. **Projects integration:** nodes, card interaction, detail transition.
6. **Case-study content:** one project first, then apply the template to the rest.
7. **Performance/accessibility:** budgets, fallbacks, responsive QA.
8. **Launch:** metadata, analytics, README, deployment verification.

## 9. Priority backlog

### Must have

- Cohesive visual concept
- Fast, skippable/non-blocking entry
- Reduced-motion mode
- Semantic, keyboard-accessible UI
- Data-driven routes and project pages
- Meaningful 3D state per view
- Lazy-loaded scene and device quality tiers
- Real contact path
- Strong project case-study content

### Should have

- Shared card-to-detail transitions
- Project-linked 3D nodes
- Custom procedural or GLB signature model
- Scroll-linked case-study reveals
- WebGL/static fallback design
- Analytics and Web Vitals reporting

### Could have

- Theme/accent variation by project
- Interactive architecture diagrams
- Copy-email command palette action
- Lightweight easter egg in the terminal
- Optional limited free-orbit inspection mode

### Do not prioritize

- Multiple large 3D models on first load
- Physics simulations that do not explain content
- Scroll hijacking or custom scrollbars that impair native behavior
- Autoplay audio
- A custom cursor required for basic interaction
- Heavy bloom, chromatic aberration, or constant glitch effects
- Long typewriter sequences

## 10. Recommended first milestone

The best first milestone is a **one-week vertical slice**:

1. Fix lint and route architecture.
2. Implement shared motion tokens and reduced-motion handling.
3. Redesign Home and navigation using the “Systems in Motion” visual language.
4. Build a procedural developer-core prototype with Home and Projects states.
5. Lazy-load the Canvas and add a static fallback.
6. Test the result on desktop and mobile before investing in a custom GLB.

This slice validates the creative direction, motion feel, technical architecture, and performance cost early. If it succeeds, the same system can be extended to About, project details, and Contact without redesigning the app again.
