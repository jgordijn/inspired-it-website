import React, { useState } from 'react';
import Layout from '@/components/Layout';

export default function MarkdownConverter() {
  const [markdown, setMarkdown] = useState(`# Your Blog Post Title

## Introduction

Write your blog post in Markdown format. This will be converted to HTML automatically.

## Key Sections

You can use:
- **Bold text** with \`**text**\`
- *Italic text* with \`*text*\`
- [Links](https://example.com) with \`[text](url)\`

### Code Example

\`\`\`kotlin
fun example(): String {
  return "Hello, Kotlin!"
}
\`\`\`

## Features

1. Live preview
2. Copy HTML with one click
3. Perfect for blog posts

> Blockquotes are also supported!

---

Edit the markdown on the left to see the HTML preview on the right.
`);

  const [frontmatter, setFrontmatter] = useState(`---
title: "Your Article Title"
description: "Brief description for SEO"
date: "${new Date().toISOString().split('T')[0]}"
author: "Jeroen Gordijn"
tags: ["tag1", "tag2", "tag3"]
---`);

  const [copied, setCopied] = useState(false);

  // Simple markdown to HTML converter
  const markdownToHtml = (md: string): string => {
    let html = md;

    // Escape HTML
    html = html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Code blocks
    html = html.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      '<pre><code class="language-$1">$2</code></pre>'
    );

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headers
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // Lists
    html = html.replace(/<p>- (.*?)<\/p>/g, '<li>$1</li>');
    html = html.replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>');

    // Ordered lists
    html = html.replace(/<p>\d+\. (.*?)<\/p>/g, '<li>$1</li>');

    // Blockquotes
    html = html.replace(/^&gt; (.*?)$/gm, '<blockquote>$1</blockquote>');

    // Horizontal rules
    html = html.replace(/^---$/gm, '<hr>');

    // Clean up
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6])/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<pre)/g, '$1');
    html = html.replace(/(<\/pre>)<\/p>/g, '$1');
    html = html.replace(/<p>(<blockquote)/g, '$1');
    html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');
    html = html.replace(/<p>(<ul)/g, '$1');
    html = html.replace(/(<\/ul>)<\/p>/g, '$1');

    return html;
  };

  const html = markdownToHtml(markdown);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadBlogPost = () => {
    const content = `${frontmatter}\n\n${markdown}`;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `blog-post-${Date.now()}.md`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Layout 
      title="Markdown to HTML Converter" 
      description="Convert Markdown to HTML and create blog posts"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-lg mb-2">How to Use</h2>
          <p className="text-gray-700">
            1. Write or paste your markdown on the left • 2. See HTML preview on the right • 
            3. Copy the HTML or download the complete blog post file
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Frontmatter Editor */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-3">Blog Post Frontmatter (YAML)</h3>
            <textarea
              value={frontmatter}
              onChange={(e) => setFrontmatter(e.target.value)}
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
            />
            <p className="text-sm text-gray-600 mt-2">
              This YAML metadata will be included in your blog post file for proper formatting and organization.
            </p>
          </div>

          {/* Markdown Editor */}
          <div>
            <h3 className="font-bold text-lg mb-3">Markdown Input</h3>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your markdown here..."
            />
          </div>

          {/* HTML Preview */}
          <div>
            <h3 className="font-bold text-lg mb-3">HTML Preview</h3>
            <div
              className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg overflow-auto bg-white prose prose-sm"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => copyToClipboard(html)}
            className="btn-primary"
          >
            {copied ? '✓ Copied HTML!' : 'Copy HTML to Clipboard'}
          </button>

          <button
            onClick={() => copyToClipboard(`<div class="blog-content">\n${html}\n</div>`)}
            className="btn-secondary"
          >
            Copy with Wrapper
          </button>

          <button
            onClick={downloadBlogPost}
            className="btn-primary"
          >
            Download Blog Post File
          </button>

          <button
            onClick={() => {
              setMarkdown('# ');
              setFrontmatter(`---
title: "New Post"
description: ""
date: "${new Date().toISOString().split('T')[0]}"
author: "Jeroen Gordijn"
tags: []
---`);
            }}
            className="btn-secondary"
          >
            Clear All
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Complete Workflow</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Edit Frontmatter</h3>
                <p className="text-gray-700">
                  Update the YAML frontmatter with your post title, description, tags, and other metadata.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Write Your Content</h3>
                <p className="text-gray-700">
                  Write your blog post in Markdown format. Use headers, bold, italic, code blocks, and more.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Preview in Real-Time</h3>
                <p className="text-gray-700">
                  See your HTML preview instantly as you type. Check formatting and structure.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Download or Save</h3>
                <p className="text-gray-700">
                  Click "Download Blog Post File" to get a .md file. Save it to <code>content/blog/</code> folder. 
                  The site will automatically generate the blog post on next build!
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-600 text-white font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-2">Publish Automatically</h3>
                <p className="text-gray-700">
                  Build your site (<code>npm run build</code>). The blog post will appear on your blog page 
                  and homepage automatically with all SEO metadata!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
