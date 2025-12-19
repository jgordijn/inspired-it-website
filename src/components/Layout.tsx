import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
  slug?: string;
}

export default function Layout({ children, title, description, ogImage, slug }: LayoutProps) {
  const pageTitle = title ? `${title} | Inspired IT` : 'Inspired IT';
  const pageDescription = description || 'AI development advocate and software architect';
  const pageUrl = slug ? `https://inspired-it.nl/${slug}` : 'https://inspired-it.nl';
  const imageUrl = ogImage || 'https://inspired-it.nl/logo.png';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
      
      <main className="flex-grow">
        {title && (
          <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-12">
            <div className="container-max">
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              {description && (
                <p className="text-lg text-slate-200">{description}</p>
              )}
            </div>
          </div>
        )}
        
        <div className="container-max py-12">
          {children}
        </div>
      </main>
      
        <Footer />
      </div>
    </>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container-max flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 sm:gap-4 text-slate-900 font-bold text-2xl">
          <Image
            src="/logo.svg"
            alt="Inspired IT logo"
            width={56}
            height={56}
            priority
            className="h-10 sm:h-14 w-auto"
          />
          <span className="tracking-tight text-xl sm:text-[28px] leading-none">Inspired IT</span>
        </Link>

        {/* Hamburger button - mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-gray-600 hover:text-slate-900"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <ul className="hidden lg:flex gap-8">
          <li>
            <Link
              href="/"
              className="text-gray-600 hover:text-slate-900 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-slate-900 transition-colors"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-gray-600 hover:text-slate-900 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-slate-900 transition-colors"
            >
              Contact
            </Link>
          </li>
          {process.env.NODE_ENV !== 'production' && (
            <li>
              <Link
                href="/admin/markdown-converter"
                className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
              >
                Tools
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <ul className="container-max py-4 space-y-4">
            <li>
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-600 hover:text-slate-900 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-600 hover:text-slate-900 transition-colors"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-600 hover:text-slate-900 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-600 hover:text-slate-900 transition-colors"
              >
                Contact
              </Link>
            </li>
            {process.env.NODE_ENV !== 'production' && (
              <li>
                <Link
                  href="/admin/markdown-converter"
                  onClick={() => setMenuOpen(false)}
                  className="block text-blue-600 hover:text-blue-700 transition-colors font-medium"
                >
                  Tools
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="container-max py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Inspired IT</h3>
            <p className="text-slate-400">
              Software development with AI, architecture, and technical expertise.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a
                  href="https://www.linkedin.com/in/jeroengordijn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/jgordijn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-8 flex justify-between items-center">
          <p className="text-slate-400">
            &copy; {currentYear} Inspired IT. All rights reserved.
          </p>
          <div className="flex gap-6 text-slate-400">
            <a href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </a>
            <a href="/rss.xml" className="hover:text-white transition-colors">
              RSS Feed
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
