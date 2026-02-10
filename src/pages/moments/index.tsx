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

  return (
    <Layout
      title="Moments"
      description="Quick thoughts, observations, and links — a microblog by Jeroen Gordijn"
      slug="moments"
    >
      {moments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-12">
          No moments yet. Check back soon!
        </p>
      ) : (
        <div className="lg:flex lg:gap-12">
          {/* Mobile date navigation */}
          <div className="lg:hidden mb-8">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-100 transition-colors"
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
                {moments.map((m) => (
                  <li key={m.date}>
                    <a
                      href={`#${m.date}`}
                      onClick={() => setNavOpen(false)}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      {formatDate(m.date)}
                      {m.publish_status === 'draft' && (
                        <span className="ml-1 inline-block align-middle text-[10px] font-semibold uppercase tracking-wide bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-1.5 py-0.5 rounded-full">
                          Draft
                        </span>
                      )}
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
                  className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-4 scroll-mt-24"
                >
                  {formatDate(moment.date)}
                  {moment.publish_status === 'draft' && (
                    <span className="ml-2 inline-block align-middle text-xs font-semibold uppercase tracking-wide bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded-full">
                      Draft
                    </span>
                  )}
                </h2>
                <div
                  className="moments-content"
                  dangerouslySetInnerHTML={{ __html: moment.html }}
                />
              </article>
            ))}
          </div>

          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-48 shrink-0">
            <nav className="sticky top-24">
              <h3 className="text-sm font-bold text-slate-900 dark:text-gray-100 mb-3 uppercase tracking-wider">
                Dates
              </h3>
              <ul className="space-y-1">
                {moments.map((m) => (
                  <li key={m.date}>
                    <a
                      href={`#${m.date}`}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-100 transition-colors"
                    >
                      {formatDate(m.date)}
                      {m.publish_status === 'draft' && (
                        <span className="ml-1 inline-block align-middle text-[10px] font-semibold uppercase tracking-wide bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-1.5 py-0.5 rounded-full">
                          Draft
                        </span>
                      )}
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
