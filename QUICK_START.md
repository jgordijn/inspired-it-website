# 🚀 Quick Start Guide

Get your professional blog site up and running in minutes!

## Step 1: Install Dependencies (2 minutes)

```bash
cd inspired-it-website
npm install
```

## Step 2: Start Development Server (1 minute)

```bash
npm run dev
```

Open your browser to **http://localhost:3000**

You'll see:
- ✅ Beautiful home page
- ✅ Blog section with one sample post
- ✅ About page
- ✅ Contact page
- ✅ Navigation menu

## Step 3: Try the Markdown Converter (5 minutes)

1. Navigate to **http://localhost:3000/admin/markdown-converter**
2. This is your blog publishing tool!
3. Try editing the Markdown on the left
4. Watch the HTML preview update in real-time
5. Click "Copy HTML to Clipboard" to use anywhere

## Step 4: Create Your First Blog Post (10 minutes)

### Option A: Using the Converter Tool (Easiest)
1. Go to `/admin/markdown-converter`
2. Edit the frontmatter (title, description, tags, date)
3. Write your blog post in Markdown
4. Click "Download Blog Post File"
5. Save it to `content/blog/` folder with a `.md` extension

### Option B: Manual File Creation
1. Create file: `content/blog/my-first-post.md`
2. Add this content:
```markdown
---
title: "My First Blog Post"
description: "This is my first professional blog post"
date: "2024-10-16"
author: "Your Name"
tags: ["first-post", "welcome"]
---

# My First Blog Post

Write your content in Markdown here...

## Section 1

Some text and ideas.

## Section 2

More content...
```

## Step 5: See Your Post Live

1. Stop the dev server (Ctrl+C)
2. Run: `npm run build`
3. Start again: `npm run dev`
4. Visit **http://localhost:3000/blog** - Your post is now live!

## Step 6: Customize Your Site

### Update Your Name & Info
Edit `src/components/Layout.tsx` and `src/pages/_document.tsx`:
- Replace "Jeroen Gordijn" with your name
- Update email addresses
- Update LinkedIn/GitHub links

### Customize the Home Page
Edit `src/pages/index.tsx`:
- Change the hero headline
- Update the "About You" section
- Modify the featured services

### Update About Page
Edit `src/pages/about/index.tsx`:
- Add your background
- List your skills
- Describe your services

## Step 7: Build for Production

When ready to deploy:

```bash
npm run build
```

This creates a `out/` folder with your complete static site. Ready to upload anywhere!

## 📚 File Structure to Know

```
content/blog/                    ← Put your blog posts here (.md files)
src/pages/index.tsx             ← Home page
src/pages/about/index.tsx       ← About page
src/pages/contact/index.tsx     ← Contact page
src/components/Layout.tsx       ← Header/footer/nav
```

## 🎯 Common Tasks

### Add a Blog Post
1. Create file: `content/blog/my-topic.md`
2. Add YAML frontmatter + Markdown content
3. Rebuild site: `npm run build`
4. Done!

### Change Site Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#your-color',
  accent: '#your-color',
}
```

### Update Navigation Links
Edit `src/components/Layout.tsx` - find the `<nav>` section

### Change Site Title
Edit `src/pages/_document.tsx` - find the `<title>` tag

## 🌐 Deploy Your Site

### Option 1: Vercel (Easiest)
1. Push your code to GitHub
2. Go to **vercel.com**
3. Import your repository
4. Done! It auto-deploys

### Option 2: Netlify
1. Push to GitHub
2. Go to **netlify.com**
3. New site from Git
4. Build command: `npm run build`
5. Publish directory: `out`

### Option 3: Any Web Host
1. Run `npm run build`
2. Upload `out/` folder via FTP
3. Configure to serve as static site

## ✅ Your Checklist

- [ ] Install dependencies
- [ ] Run `npm run dev`
- [ ] Visit `/admin/markdown-converter`
- [ ] Create first blog post
- [ ] Rebuild and see it on /blog
- [ ] Customize About page
- [ ] Update navigation links
- [ ] Update site title and meta description
- [ ] Build for production: `npm run build`
- [ ] Deploy to Vercel/Netlify
- [ ] Test deployed site

## 📞 Still Need Help?

**Common Issues:**

Q: Blog posts not showing?
A: Make sure file is in `content/blog/` with `.md` extension

Q: Changes not showing?
A: Rebuild with `npm run build` (dev server may need restart)

Q: Markdown not rendering?
A: Check YAML frontmatter is valid - it needs `---` on separate lines

Q: Deploy not working?
A: Make sure `next.config.js` has `output: 'export'` set

---

**You're all set! Start writing amazing content! 🎉**
