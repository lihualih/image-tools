# Deployment Guide

This is a static site with no build step required. Deploy to any static hosting provider.

## Vercel

### Option 1: CLI
```bash
npm i -g vercel
vercel login
cd plan-e-image-tools
vercel --prod
```

### Option 2: Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository or drag-drop the folder
4. Framework Preset: **Other**
5. Root Directory: `.` (or `plan-e-image-tools` if in a monorepo)
6. Build Command: leave empty
7. Output Directory: `.`
8. Click Deploy

### Custom Domain
1. Go to Project Settings > Domains
2. Add your domain
3. Configure DNS records as instructed

## Cloudflare Pages

### Option 1: Dashboard
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to Pages > Create a project
3. Connect your Git repository
4. Set:
   - **Production branch**: `main`
   - **Framework preset**: None
   - **Build command**: leave empty
   - **Build output directory**: `/` (root of the project)
5. Click Save and Deploy

### Option 2: Wrangler CLI
```bash
npm i -g wrangler
wrangler login
wrangler pages project create image-tools --production-branch main
wrangler pages deploy . --project-name image-tools
```

### Custom Domain
1. Go to Pages > your project > Custom domains
2. Add your domain
3. Cloudflare handles SSL automatically

## Netlify

### Option 1: Drag & Drop
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire project folder onto the page
3. Done — instant deployment with a random URL

### Option 2: Git Deploy
1. Push project to GitHub/GitLab/Bitbucket
2. Go to [app.netlify.com](https://app.netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Set:
   - **Branch to deploy**: `main`
   - **Build command**: leave empty
   - **Publish directory**: `.` (or `plan-e-image-tools`)
6. Click Deploy site

### netlify.toml (Optional)
Create this file in the root for redirects and headers:
```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; script-src 'self' 'unsafe-inline';"

[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/js/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## GitHub Pages

1. Push project to GitHub
2. Go to repository Settings > Pages
3. Source: Deploy from a branch
4. Branch: `main`, folder: `/ (root)`
5. Click Save
6. Site will be at `https://username.github.io/repo-name`

Note: If deploying to a subdirectory, update the `<base>` tag and asset paths.

## Firebase Hosting

```bash
npm i -g firebase-tools
firebase login
firebase init hosting
# Select your project
# Public directory: .
# Single-page app: No
# Overwrite index.html: No
firebase deploy
```

## AWS S3 + CloudFront

```bash
# Create S3 bucket
aws s3 mb s3://image-tools-bucket

# Upload files
aws s3 sync . s3://image-tools-bucket --exclude ".git/*" --exclude "README.md" --exclude "DEPLOY.md"

# Enable static website hosting
aws s3 website s3://image-tools-bucket --index-document index.html --error-document index.html
```

Then set up CloudFront distribution pointing to the S3 bucket for CDN and HTTPS.

## Pre-Deployment Checklist

- [ ] Update `sitemap.xml` with your actual domain
- [ ] Update `robots.txt` with your actual domain
- [ ] Update canonical URLs in HTML `<link rel="canonical">` tags
- [ ] Update Open Graph URLs
- [ ] Replace ad placeholder divs with actual ad code
- [ ] Add Google Analytics or Plausible tracking
- [ ] Test all tools on mobile devices
- [ ] Run Lighthouse audit (aim for 95+ on all categories)
- [ ] Test dark mode on all pages
- [ ] Verify all downloads work correctly

## Performance Tips

1. **Enable gzip/brotli** compression on your hosting provider
2. **Set cache headers** for static assets (CSS, JS, favicon)
3. **Use a CDN** for global distribution (Cloudflare, Vercel Edge, etc.)
4. **Preconnect** to any external resources if added later
5. The site scores 95+ on Lighthouse by default — no build optimization needed

## Custom Domain Setup

### DNS Configuration
For most providers, add these DNS records:

**For apex domain (example.com):**
```
A     @     76.76.21.21          (Vercel)
A     @     104.21.xx.xx         (Cloudflare)
```

**For subdomain (www.example.com):**
```
CNAME  www   cname.vercel-dns.com
CNAME  www   your-project.pages.dev
```

### SSL
All recommended providers (Vercel, Cloudflare, Netlify) provide free SSL certificates automatically.
