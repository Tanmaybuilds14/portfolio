/*
 * Fixed photographic backdrop sitting behind the entire app.
 * A dark alpine ridge (generated at 1920px, served as WebP) is darkened with a
 * gradient scrim: readable at the top, clearly visible through the hero, and
 * almost solid past the fold so long-form pages stay calm.
 */
export function SiteBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <picture>
        <source media="(min-width: 768px)" srcSet="/backdrop.webp" type="image/webp" />
        <source srcSet="/backdrop-mobile.webp" type="image/webp" />
        <img
          src="/backdrop.webp"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-[50%_38%]"
        />
      </picture>

      {/*
        Scrim: 28% at the very top keeps the ridge visible behind the nav,
        ~45% through the hero, then climbs to 96% so body copy sits on near-black.
      */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            color-mix(in oklab, var(--background) 30%, transparent) 0%,
            color-mix(in oklab, var(--background) 44%, transparent) 32%,
            color-mix(in oklab, var(--background) 66%, transparent) 58%,
            color-mix(in oklab, var(--background) 88%, transparent) 80%,
            var(--background) 100%
          )`,
        }}
      />

      {/* Soft vignette so the photograph never crowds the edges of the type */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 85% at 50% 22%, transparent 30%, color-mix(in oklab, var(--background) 72%, transparent) 100%)',
        }}
      />
    </div>
  );
}
