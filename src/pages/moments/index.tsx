import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import { getMoments, Moment } from '@/utils/moments';

interface MomentsPageProps {
  moments: Moment[];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function MomentsPage({ moments }: MomentsPageProps) {
  const [navOpen, setNavOpen] = useState(false);

  const dates = moments.map((m) => m.date);

  return (
    <Layout
      title="Moments"
      description="Quick thoughts, observations, and links — a microblog by Jeroen Gordijn"
      slug="moments"
    >
      {moments.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          No moments yet. Check back soon!
        </p>
      ) : (
        <div className="lg:flex lg:gap-12">
          {/* Mobile date navigation */}
          <div className="lg:hidden mb-8">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-slate-900 transition-colors"
            >
              <svg
                className={`w-4 h-4 transition-transform ${navOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              Jump to date
            </button>
            {navOpen && (
              <ul className="mt-3 space-y-1 pl-6">
                {dates.map((date) => (
                  <li key={date}>
                    <a
                      href={`#${date}`}
                      onClick={() => setNavOpen(false)}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {formatDate(date)}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {moments.map((moment) => (
              <article key={moment.date} className="mb-12">
                <h2
                  id={moment.date}
                  className="text-xl font-bold text-slate-900 mb-4 scroll-mt-24"
                >
                  {formatDate(moment.date)}
                </h2>
                <div
                  className="prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: moment.html }}
                />
              </article>
            ))}
          </div>

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-48 shrink-0">
            <nav className="sticky top-24">
              <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                Dates
              </h3>
              <ul className="space-y-1">
                {dates.map((date) => (
                  <li key={date}>
                    <a
                      href={`#${date}`}
                      className="text-sm text-gray-600 hover:text-slate-900 transition-colors"
                    >
                      {formatDate(date)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<MomentsPageProps> = async () => {
  const moments = getMoments();

  return {
    props: {
      moments,
    },
  };
};
