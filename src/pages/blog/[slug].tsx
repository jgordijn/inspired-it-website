import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { getBlogPost, getAllBlogSlugs, getRelatedPosts } from '@/utils/blog';

interface BlogPostPageProps {
  slug: string;
}

export async function getStaticPaths() {
  const slugs = getAllBlogSlugs();
  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  const relatedPosts = getRelatedPosts(params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      relatedPosts,
    },
  };
}

export default function BlogPost({ 
  post, 
  relatedPosts 
}: { 
  post: any; 
  relatedPosts: any[] 
}) {
  return (
    <Layout title={post.title} description={post.description}>
      <article className="max-w-3xl mx-auto">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4 flex-wrap">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600 border-b border-gray-200 pb-4">
            <span>📅 {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</span>
            <span>⏱️ {post.readingTime} min read</span>
            <span>✍️ {post.author}</span>
          </div>
        </div>

        {/* Article Content */}
        <div
          className="blog-content prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        {/* Article Footer */}
        <div className="bg-gray-50 rounded-lg p-6 my-12 border-l-4 border-blue-600">
          <h3 className="font-bold text-lg mb-2">About the Author</h3>
          <p className="text-gray-700">
            {post.author} is a senior software developer and AI development advocate, focused on applying
            emerging AI capabilities in real-world systems while mentoring teams through the pace of
            change. Share your thoughts or reach out on <a href="https://www.linkedin.com/in/jeroengordijn/" className="text-blue-600 hover:underline">LinkedIn</a>.
          </p>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {relatedPost.description}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{relatedPost.date}</span>
                    <span>{relatedPost.readingTime} min</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to all articles
          </Link>
        </div>
      </article>
    </Layout>
  );
}
