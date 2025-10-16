import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Professional IT consulting and technical blog by Jeroen Gordijn. Software architecture, Kotlin, Java, and cloud technologies." />
        <meta name="keywords" content="Kotlin, Java, Software Architecture, Software Development, IT Consulting, Cloud" />
        <meta name="author" content="Jeroen Gordijn" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Social Media */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://inspired-it.nl" />
        <meta property="og:title" content="Inspired IT - Professional Software Development" />
        <meta property="og:description" content="Technical expertise in Kotlin, Java, software architecture and consulting." />
        <meta property="og:site_name" content="Inspired IT" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://inspired-it.nl" />
        <meta name="twitter:title" content="Inspired IT - Professional Software Development" />
        <meta name="twitter:description" content="Technical expertise in Kotlin, Java, software architecture and consulting." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://inspired-it.nl" />
        
        {/* Favicons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
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
