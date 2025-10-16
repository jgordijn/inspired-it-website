import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { getBlogPosts, BlogPost } from '@/utils/blog';

interface BlogIndexProps {
  allPosts: BlogPost[];
  allTags: string[];
}

export default function BlogIndex({ allPosts = [], allTags = [] }: BlogIndexProps) {

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = allPosts.filter((post) => {
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <Layout title="Blog" description="Technical articles about software development, architecture, and best practices">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-4">Search</h3>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <h3 className="font-bold text-lg mb-4">Tags</h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedTag === null
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Articles
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-bold mb-3">Total Articles</h4>
              <p className="text-3xl font-bold text-blue-600">{filteredPosts.length}</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-3">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {post.tags.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>

                      <h2 className="text-2xl font-bold text-slate-900 mb-3">
                        {post.title}
                      </h2>

                      <p className="text-gray-600 mb-4">
                        {post.description}
                      </p>

                      <div className="flex gap-6 text-sm text-gray-500">
                        <span>📅 {post.date}</span>
                        <span>⏱️ {post.readingTime} min read</span>
                        <span>✍️ {post.author}</span>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 font-medium hover:text-blue-700 whitespace-nowrap mt-4 sm:mt-0"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getBlogPosts();
  const allTags = Array.from(
    new Set(allPosts.flatMap((post) => post.tags))
  ).sort();

  return {
    props: {
      allPosts,
      allTags,
    },
  };
}
