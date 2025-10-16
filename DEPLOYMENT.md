# 🚀 Deployment Guide

Complete instructions for deploying your Inspired IT website to production.

## Pre-Deployment Checklist

Before deploying, make sure you've:

- [ ] Updated site title and metadata in `src/pages/_document.tsx`
- [ ] Changed all references from `inspired-it.nl` to your domain
- [ ] Updated contact email address
- [ ] Updated social media links
- [ ] Created at least one blog post
- [ ] Tested locally with `npm run dev`
- [ ] Built successfully with `npm run build`
- [ ] Customized About and Contact pages

## Option 1: Vercel (⭐ Recommended)

**Vercel is the creator of Next.js and offers the best integration.**

### Setup (5 minutes)

1. **Create GitHub repository**
   - Push your code to GitHub

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub account
   - Click "New Project"
   - Select your repository

3. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `out`
   - Install Command: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your site is live!

5. **Add Custom Domain**
   - In Vercel dashboard
   - Go to Settings → Domains
   - Add your domain
   - Follow DNS instructions

### Environment Variables (Optional)
If you add any `.env` variables later, add them in:
- Project Settings → Environment Variables

### Automatic Deployments
Every time you push to GitHub, Vercel automatically:
- Rebuilds your site
- Runs tests
- Deploys to production

---

## Option 2: Netlify

**Great alternative with excellent features.**

### Setup (5 minutes)

1. **Create GitHub repository**
   - Push code to GitHub

2. **Connect to Netlify**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Select GitHub
   - Authorize and select repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `out`

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your site is live at `yoursite.netlify.app`

5. **Add Custom Domain**
   - Domain settings
   - Add your custom domain
   - Update DNS records

### Netlify Features
- Form handling (if you add forms)
- Redirects and rewrites
- Analytics
- A/B testing

---

## Option 3: GitHub Pages + Custom Domain

**Free hosting via GitHub.**

### Setup (10 minutes)

1. **Create GitHub repository** (if you haven't)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourrepo.git
   git push -u origin main
   ```

2. **Configure GitHub Pages**
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /(root)

3. **Add GitHub Actions Workflow**
   - Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy

   on:
     push:
       branches: [main]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3

         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'

         - name: Install dependencies
           run: npm install

         - name: Build
           run: npm run build

         - name: Deploy
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

4. **Go to Pages settings**
   - Set Source to "GitHub Actions"

5. **Add Custom Domain (Optional)**
   - Domain settings → Custom domain
   - Enter your domain
   - Create DNS CNAME record

---

## Option 4: Traditional Web Host (cPanel, etc.)

**Works on any standard web hosting.**

### Setup (10 minutes)

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Upload the output**
   - Connect via FTP
   - Upload everything from `out/` folder to your `public_html` directory

3. **Configure as Static Site**
   - In cPanel: Go to Domains
   - Set document root to your domain's folder
   - No special configuration needed

4. **Test**
   - Visit your domain
   - All pages should work

### Important Notes
- Make sure your host supports serving `index.html` for routes
- 404 errors: Copy `index.html` to `404.html` if routing doesn't work
- You'll need to manually rebuild and upload when making changes

---

## Option 5: AWS S3 + CloudFront

**For more advanced users who want full control.**

### Setup (15-20 minutes)

1. **Create S3 Bucket**
   - AWS Console → S3
   - Create new bucket (name: `yoursite.com`)
   - Unblock public access
   - Enable static website hosting

2. **Upload Build Files**
   ```bash
   npm run build
   # Upload contents of 'out/' to your bucket
   ```

3. **Configure Bucket Policy**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::yoursite.com/*"
     }]
   }
   ```

4. **Create CloudFront Distribution**
   - Origin: Your S3 bucket
   - Enable compression
   - Add caching rules
   - Add SSL certificate

5. **Point Domain to CloudFront**
   - Route53 → Create alias record
   - Point to CloudFront distribution

---

## Post-Deployment Setup

### 1. Test Your Site

After deployment, test:
- [ ] Home page loads correctly
- [ ] Blog posts display properly
- [ ] All links work
- [ ] Contact form works
- [ ] Mobile layout is responsive
- [ ] Images load correctly
- [ ] Performance is good

### 2. Set Up Analytics (Optional)

Add Google Analytics:

1. Get tracking ID from Google Analytics
2. Add to `src/pages/_document.tsx`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 3. Monitor Search Engine Indexing

1. **Google Search Console**
   - Go to google.com/webmasters/tools
   - Add your site
   - Submit sitemap: `/sitemap.xml`

2. **Bing Webmaster Tools**
   - Go to bing.com/webmaster
   - Add your site
   - Submit sitemap

### 4. Set Up Email for Contact Form

Contact form currently opens email client. For automated email:

Option A: Use Netlify Forms
- Add `name="contact"` to form
- Works automatically

Option B: Use form service
- Formspree, Basin, or similar
- Add their endpoint to form

---

## Updating Your Site

### Make Changes Locally

```bash
npm run dev
# Edit files
# Test changes
```

### Rebuild

```bash
npm run build
```

### Deploy (Varies by Platform)

**Vercel/Netlify**: Automatic when you push to GitHub
**GitHub Pages**: Automatic via Actions workflow
**Traditional Host**: Upload `out/` folder via FTP
**AWS**: Use AWS CLI or management console

---

## Performance Optimization

After deployment:

1. **Enable Caching**
   - Set cache headers for static files
   - Usually automatic on modern platforms

2. **Enable Compression**
   - Gzip compression for CSS/JS
   - Usually enabled by default

3. **Use CDN**
   - Vercel/Netlify handle this
   - CloudFront for AWS

4. **Monitor Performance**
   - Use PageSpeed Insights
   - Check Core Web Vitals

---

## Troubleshooting Deployment

### Site shows 404
- Check your build output directory
- Ensure static export is enabled in `next.config.js`
- Verify all files uploaded correctly

### Routes don't work
- Server needs to serve `index.html` for unknown routes
- Configure error document as `index.html`

### Slow performance
- Check Core Web Vitals
- Optimize images
- Enable caching

### Blog posts don't show
- Ensure posts are in `content/blog/` folder
- Check YAML frontmatter format
- Rebuild and redeploy

---

## Recommended: Vercel Setup

For most users, I recommend Vercel because:
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Excellent performance
- ✅ Built for Next.js
- ✅ Simple custom domain setup
- ✅ No complicated configuration

---

## Next Steps After Deployment

1. **Share Your Site**
   - Post on LinkedIn
   - Share with network
   - Add to resume/portfolio

2. **Start Creating Content**
   - Use `/admin/markdown-converter`
   - Publish blog posts regularly
   - Optimize for SEO

3. **Monitor Analytics**
   - See who visits
   - Track engagement
   - Adjust content strategy

4. **Iterate and Improve**
   - Update design as needed
   - Add new features
   - Keep content fresh

---

**Your professional blog is now live! 🎉**
