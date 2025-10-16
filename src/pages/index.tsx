import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { getBlogPosts, BlogPost } from '@/utils/blog';

interface HomeProps {
  posts: BlogPost[];
}

export default function Home({ posts = [] }: HomeProps) {

  return (
    <Layout title="Jeroen Gordijn" description="Software architecture, AI development advocacy, and technical consulting">
      {/* Hero Section */}
      <section className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm text-blue-700 font-semibold uppercase tracking-[0.5em] mb-4">
              My mission
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              I am inspired to make impact on software development in the projects I work for.
              Working as a consultant since 2005, I've had the opportunity to see many different
              companies and work within diverse domains. I combine software architecture design with
              hands-on delivery, joining teams to build the systems we envision.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Today my focus is on being an AI development advocate, keeping pace with the rapid change
              in the AI landscape, applying practical AI capabilities in my day-to-day work, and
              helping the teams around me grow with these new tools.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/jeroengordijn/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Connect on LinkedIn
              </a>
              <Link href="/blog" className="btn-secondary">
                Read My Blog
              </Link>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-slate-700 rounded-lg p-12 text-white">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">💻</span>
                <span>Software Architecture</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🤖</span>
                <span>AI Development Advocate</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">📚</span>
                <span>Technical Writing</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                <span>Best Practices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-slate-900 mb-12">Latest Articles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>{post.readingTime} min read</span>
                </div>
                
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-700"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/blog" className="btn-primary">
            View All Articles
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white rounded-lg p-12 my-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need Expert Consultation?</h2>
          <p className="text-lg text-slate-200 mb-8">
            I provide consulting services for software architecture, system design,
            and technical strategy. Let's connect and discuss your project.
          </p>
          <a
            href="https://www.linkedin.com/in/jeroengordijn/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Connect on LinkedIn
          </a>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPosts = getBlogPosts();
  const posts = allPosts.slice(0, 3);

  return {
    props: {
      posts,
    },
  };
}
