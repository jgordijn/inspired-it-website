import React from 'react';
import Layout from '@/components/Layout';

export default function Contact() {
  return (
    <Layout
      title="Let's Connect"
      description="Connect with me on LinkedIn for consulting, collaboration, or inquiries"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xl text-gray-700 mb-8">
            I prefer to connect and communicate through LinkedIn. This helps me maintain
            professional connections and makes it easy to share insights and collaborate.
          </p>

          <a
            href="https://www.linkedin.com/in/jeroengordijn/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block btn-primary text-lg px-8 py-4"
          >
            Connect on LinkedIn
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl mb-4">💼</div>
            <h3 className="font-bold text-lg mb-3">Consultation Requests</h3>
            <p className="text-gray-700 text-sm">
              Need help adopting AI tools in your development workflow, or guidance on software architecture?
              Let's discuss your project.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl mb-4">🤝</div>
            <h3 className="font-bold text-lg mb-3">Collaboration</h3>
            <p className="text-gray-700 text-sm">
              Interested in collaborating on a project or discussing technical topics?
              Let's connect.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl mb-4">💡</div>
            <h3 className="font-bold text-lg mb-3">Technical Discussion</h3>
            <p className="text-gray-700 text-sm">
              Want to discuss AI development, Kotlin, software architecture, or other technical topics?
              I'm always happy to connect.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-slate-900 text-white rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Professional</h3>
              <div className="space-y-2">
                <a
                  href="https://www.linkedin.com/in/jeroengordijn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-slate-200 hover:text-white transition-colors"
                >
                  → LinkedIn Profile
                </a>
                <a
                  href="/blog"
                  className="block text-slate-200 hover:text-white transition-colors"
                >
                  → Read My Blog
                </a>
                <a
                  href="/about"
                  className="block text-slate-200 hover:text-white transition-colors"
                >
                  → About Me
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Info</h3>
              <div className="space-y-2 text-slate-200">
                <p>📍 Hilversum, Netherlands</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
