export interface SEOMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

export function generateMetaTags(meta: SEOMeta): string {
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:type" content="${meta.ogType || 'website'}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
  ];

  if (meta.canonical) {
    tags.push(`<link rel="canonical" href="${escapeHtml(meta.canonical)}" />`);
    tags.push(`<meta property="og:url" content="${escapeHtml(meta.canonical)}" />`);
  }

  if (meta.ogImage) {
    tags.push(`<meta property="og:image" content="${escapeHtml(meta.ogImage)}" />`);
    tags.push(`<meta name="twitter:image" content="${escapeHtml(meta.ogImage)}" />`);
  }

  if (meta.noindex) {
    tags.push(`<meta name="robots" content="noindex" />`);
  }

  return tags.join('\n  ');
}

export function generateBlogStructuredData(
  title: string,
  description: string,
  datePublished: string,
  dateModified: string,
  author: string,
  url: string,
  image?: string
): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image || 'https://inspired-it.nl/og-image.png',
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://inspired-it.nl',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Inspired IT',
      logo: {
        '@type': 'ImageObject',
        url: 'https://inspired-it.nl/logo.png',
      },
    },
    url: url,
  };

  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

export function generateOrganizationStructuredData(): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Inspired IT',
    url: 'https://inspired-it.nl',
    description: 'Professional IT consulting and software development expertise',
    sameAs: [
      'https://linkedin.com/in/jeroen-gordijn',
      'https://github.com/jeroengordijn',
    ],
  };

  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
