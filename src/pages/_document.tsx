import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* SEO Meta Tags - page-specific description/title handled by Layout */}
        <meta name="keywords" content="AI, Claude, OpenCode, Kotlin, Java, Software Architecture, Software Development, IT Consulting, Cloud" />
        <meta name="author" content="Jeroen Gordijn" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Social Media - page-specific og:title/description/url handled by Layout */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Inspired IT" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter - page-specific handled by Layout */}
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://inspired-it.nl" />
        
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/svg+xml" href="/favicon-white.svg" media="(prefers-color-scheme: dark)" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        
        {/* RSS Feed Discovery */}
        <link rel="alternate" type="application/rss+xml" title="Inspired IT Blog" href="/rss.xml" />
        
        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        {/* Organization Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Inspired IT',
            url: 'https://inspired-it.nl',
            logo: 'https://inspired-it.nl/logo.png',
            description: 'Professional IT consulting and software development services',
            sameAs: [
              'https://www.linkedin.com/in/jeroengordijn',
              'https://github.com/jgordijn',
            ],
            contact: {
              '@type': 'ContactPoint',
              telephone: '+31-612345678',
              contactType: 'Business',
              email: 'contact@inspired-it.nl',
            },
          })}
        </script>
        
        {/* Performance optimizations */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
