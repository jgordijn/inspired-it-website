# Inspired IT - Professional Blog Website

A modern, professional static website built with Next.js featuring a blog system, Markdown-to-HTML converter, and comprehensive SEO optimization.

## 🚀 Features

### Core Functionality
- **Modern Professional Design** - Clean, responsive layout built with Tailwind CSS
- **Fast Static Generation** - Pre-rendered at build time for maximum performance
- **SEO Optimized** - Sitemap, RSS feed, structured data, meta tags
- **Blog System** - Markdown-based blogging with automatic HTML conversion
- **Markdown Converter Tool** - Interactive tool to convert Markdown to HTML and create blog posts
- **Related Posts** - Smart algorithm to suggest related articles based on tags

### Technical Features
- **TypeScript** - Full type safety across the codebase
- **Next.js 14** - Latest React framework with static export
- **Tailwind CSS** - Utility-first styling
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Fast Performance** - Optimized images and static assets

## 📋 Requirements

- Node.js 18+ 
- npm or yarn

## 🛠️ Installation

1. **Clone or extract the project**
   ```bash
   cd inspired-it-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

## 📝 Creating Blog Posts

### Method 1: Using the Markdown Converter Tool (Easiest)

1. Go to `http://localhost:3000/admin/markdown-converter`
2. Edit the YAML frontmatter with your post metadata:
   - `title` - Post title
   - `description` - SEO description (shown in blog lists)
   - `date` - Publication date (YYYY-MM-DD)
   - `author` - Author name
   - `tags` - Array of tags for categorization
3. Write your content in Markdown format
4. See live HTML preview on the right
5. Click "Download Blog Post File"
6. Save the file to `content/blog/` folder
7. Rebuild: `npm run build`

### Method 2: Manual File Creation

1. Create a new `.md` file in `content/blog/` folder
2. Add YAML frontmatter at the top:
   ```markdown
   ---
   title: "Your Article Title"
   description: "Brief description for SEO"
   date: "2024-10-16"
   author: "Jeroen Gordijn"
   tags: ["tag1", "tag2"]
   ---

   # Your Article Title

   Your Markdown content here...
   ```
3. Save and rebuild

### Markdown Syntax Supported

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
`Inline code`

[Link text](https://example.com)

- Bullet list
- Item 2

1. Numbered list
2. Item 2

> Blockquote

```kotlin
code block
```
```

## 🏗️ Project Structure

```
inspired-it-website/
├── src/
│   ├── pages/
│   │   ├── index.tsx              # Home page
│   │   ├── about/index.tsx        # About page
│   │   ├── contact/index.tsx      # Contact page
│   │   ├── blog/
│   │   │   ├── index.tsx          # Blog listing
│   │   │   └── [slug].tsx         # Individual post
│   │   ├── admin/
│   │   │   └── markdown-converter # Converter tool
│   │   ├── sitemap.xml.ts         # SEO sitemap
│   │   ├── rss.xml.ts             # RSS feed
│   │   ├── _document.tsx          # HTML structure
│   │   └── _app.tsx               # App wrapper
│   ├── components/
│   │   └── Layout.tsx             # Main layout
│   ├── utils/
│   │   ├── blog.ts                # Blog utilities
│   │   └── seo.ts                 # SEO utilities
│   └── styles/
│       └── globals.css            # Global styles
├── content/
│   └── blog/                       # Markdown blog posts
├── public/
│   ├── robots.txt
│   └── favicon.ico
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## 🚢 Building for Production

```bash
npm run build
```

This generates a fully static site in the `out/` directory. Ready to deploy anywhere!

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub/GitLab
2. Import project in Vercel
3. Set build command: `npm run build`
4. Done! Auto-deploys on git push

### Netlify
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set publish directory: `out`

### Traditional Hosting
1. Run `npm run build` locally
2. Upload `out/` folder to your server
3. Configure web server to serve index.html for routes

## 📊 SEO Features

- ✅ Automatic sitemap generation (`sitemap.xml`)
- ✅ RSS feed for blog subscriptions (`rss.xml`)
- ✅ Meta tags and Open Graph tags
- ✅ Structured data (JSON-LD)
- ✅ Mobile-responsive design
- ✅ Fast loading times
- ✅ Clean URL structure
- ✅ Canonical tags
- ✅ Internal linking strategy

## 🎨 Customization

### Update Site Info
Edit `src/pages/_document.tsx`:
- Site title and description
- Social media links
- Organization details

### Update Colors
Edit `tailwind.config.ts`:
- Modify color scheme
- Adjust spacing and typography

### Update Layout
Edit `src/components/Layout.tsx`:
- Header/footer content
- Navigation links
- Social links

### Update Content Pages
- `src/pages/about/index.tsx` - About page
- `src/pages/contact/index.tsx` - Contact page
- Edit with your information

## 🔗 Important Links to Update

Before deploying, update these in the codebase:
1. Site URL: Replace `https://inspired-it.nl` with your domain
2. Contact email: Update `contact@inspired-it.nl`
3. Social links: Update LinkedIn, GitHub URLs
4. Phone number: Update your phone number
5. Author name: Replace "Jeroen Gordijn" where needed

## 📱 Performance Tips

- Use high-quality images (optimize with tools like TinyPNG)
- Keep blog posts organized with proper headings
- Use tags effectively for discoverability
- Update blog regularly for fresher content

## 🤝 Support & Further Development

### Adding Pages
Create new `.tsx` files in `src/pages/`:
```typescript
import Layout from '@/components/Layout';

export default function Page() {
  return (
    <Layout title="Page Title" description="Page description">
      {/* Content */}
    </Layout>
  );
}
```

### Styling Components
Use Tailwind CSS classes:
```typescript
<div className="bg-white rounded-lg p-6 shadow-lg">
  Content
</div>
```

## 📄 License

This project is provided as-is for personal and commercial use.

## ✨ What's Included

- ✅ Professional home page with hero section
- ✅ Fully functional blog with categorization
- ✅ About page template
- ✅ Contact page with LinkedIn call-to-action
- ✅ Markdown-to-HTML converter tool
- ✅ Automatic sitemap generation
- ✅ RSS feed for subscribers
- ✅ Mobile responsive design
- ✅ SEO meta tags and structured data
- ✅ Related posts algorithm
- ✅ Reading time estimation
- ✅ Tag-based filtering

## 🚀 Next Steps

1. Install dependencies: `npm install`
2. Start development: `npm run dev`
3. Visit the Markdown converter at `/admin/markdown-converter`
4. Create your first blog post
5. Customize the about/contact pages
6. Update site info in `_document.tsx`
7. Build and deploy!

---

**Built with ❤️ for professional developers and consultants**
