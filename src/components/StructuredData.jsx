import { projects } from '../data/projects';
import { site } from '../data/site';

/** JSON-LD graph so search engines understand the person and the work. */
export default function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${site.url}/#person`,
        name: site.name,
        jobTitle: 'Full-stack developer',
        email: `mailto:${site.email}`,
        url: site.url,
        sameAs: [site.github, site.linkedin],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Pune',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN',
        },
        knowsAbout: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'REST APIs'],
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: `${site.name} — Portfolio`,
        publisher: { '@id': `${site.url}/#person` },
      },
      {
        '@type': 'ItemList',
        name: 'Selected work',
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: project.title,
          description: project.summary,
          url: `${site.url}/work/${project.slug}`,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Static, hand-authored object — safe to serialise.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
