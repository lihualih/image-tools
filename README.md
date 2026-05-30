# Image Tools

Free online image processing tools. Compress, convert, resize, crop, and remove backgrounds from images directly in your browser. No uploads, no servers, no accounts — 100% client-side processing.

## Features

### Image Compressor
- Compress JPG, PNG, and WebP images
- Reduce file size by up to 80% without visible quality loss
- Adjustable quality slider (1-100%)
- Optional max width constraint
- Convert format during compression
- Side-by-side before/after preview with size comparison

### Image Converter
- Convert between JPG, PNG, WebP, GIF, and BMP formats
- Adjustable quality for lossy formats (JPEG, WebP)
- Background color option for transparent-to-JPEG conversion
- Preserves original dimensions
- Instant conversion using Canvas API

### Image Resizer
- Resize to any custom dimension
- Quick presets: 1920x1080, 1280x720, 800x600, 640x480, 320x240, 150x150, 1080x1080, 1200x630 (OG image)
- Lock aspect ratio option
- High-quality resampling with `imageSmoothingQuality: 'high'`
- Output in any supported format

### Image Cropper
- Visual drag-to-crop selection on canvas
- Aspect ratio presets: Free, 1:1, 4:3, 16:9, 3:2, 2:3, 9:16
- Real-time selection dimensions display
- Touch support for mobile devices
- Dark overlay outside crop area for clarity

### Background Remover
- Remove solid color backgrounds
- Click-on-image color picker
- Auto-detect background color from corners
- Adjustable tolerance (1-150)
- Edge smoothing options (None, Basic, Enhanced)
- Output as transparent PNG

## Tech Stack

- **HTML5** — Semantic markup with accessibility attributes
- **CSS3** — CSS custom properties, Grid, Flexbox, transitions
- **Vanilla JavaScript** — No frameworks, no dependencies
- **Canvas API** — All image processing happens client-side
- **File API** — Drag and drop, file reading
- **LocalStorage** — Theme preference persistence

## Project Structure

```
plan-e-image-tools/
├── index.html              # Homepage with tool cards
├── css/
│   └── style.css           # Complete styles (dark mode, responsive)
├── js/
│   └── common.js           # Shared utilities
├── tools/
│   ├── compress.html       # Image compressor
│   ├── convert.html        # Image format converter
│   ├── resize.html         # Image resizer
│   ├── crop.html           # Image cropper
│   └── bg-remover.html     # Background remover
├── favicon.svg             # Site favicon
├── robots.txt              # Search engine directives
├── sitemap.xml             # XML sitemap
├── README.md               # This file
└── DEPLOY.md               # Deployment guide
```

## How to Use Each Tool

### Image Compressor
1. Visit the Compress page
2. Drag and drop an image or click to browse
3. Adjust quality slider (lower = smaller file)
4. Optionally set max width or change output format
5. Click "Compress Image"
6. Compare original vs compressed side by side
7. Download the compressed image

### Image Converter
1. Visit the Convert page
2. Upload your image
3. Select target format (JPEG, PNG, WebP, GIF, BMP)
4. Adjust quality if using JPEG/WebP
5. Set background color for transparent images converting to JPEG
6. Click "Convert Image"
7. Download the converted file

### Image Resizer
1. Visit the Resize page
2. Upload your image
3. Use quick presets or enter custom width/height
4. Toggle "Maintain aspect ratio" as needed
5. Select output format and quality
6. Click "Resize Image"
7. Download the resized image

### Image Cropper
1. Visit the Crop page
2. Upload your image
3. Select an aspect ratio preset (or use Free)
4. Click and drag on the image to select the crop area
5. Click "Crop Image"
6. Download the cropped result

### Background Remover
1. Visit the BG Remover page
2. Upload your image
3. The tool auto-detects the background color from corners
4. Click on the image to manually pick a color, or use the color picker
5. Adjust tolerance slider for better results
6. Choose edge smoothing mode
7. Click "Remove Background"
8. Download the transparent PNG

## Deployment

See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions.

### Quick Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Quick Deploy to Cloudflare Pages
1. Push to GitHub
2. Connect repo in Cloudflare Pages dashboard
3. Set build output directory to `/` (root)
4. Deploy

### Quick Deploy to Netlify
1. Drag and drop the project folder to [app.netlify.com/drop](https://app.netlify.com/drop)

## Revenue Model

### Display Advertising
- Pre-designed ad placeholder slots (leaderboard 728x90, sidebar 300x250)
- Replace placeholder divs with Google AdSense, Media.net, or other ad network code
- Strategic placement: below hero, between tool sections, after results

### Affiliate Marketing
- Link to premium image editing software (Photoshop, Canva Pro, etc.)
- Recommend stock photo sites
- Promote related SaaS tools

### Premium Tier (Future)
- Unlimited batch processing
- AI-powered background removal
- Advanced compression algorithms
- API access for developers
- Remove ads

### Sponsorships
- Featured tool placements
- Sponsored blog content
- Brand partnerships

## Target Audience

- **Web developers** optimizing images for websites
- **Social media managers** preparing content for platforms
- **E-commerce sellers** processing product photos
- **Bloggers and content creators** compressing images for faster load times
- **Graphic designers** needing quick format conversions
- **Students and educators** working on projects
- **General users** who need simple image editing without installing software

## SEO Optimization

- Semantic HTML5 with proper heading hierarchy
- Meta tags (title, description, keywords, robots)
- Open Graph and Twitter Card tags
- JSON-LD structured data (WebApplication schema)
- XML sitemap
- robots.txt
- Canonical URLs
- Fast loading (no external dependencies)
- Mobile-friendly responsive design
- Clean URL structure

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Chrome (Android)
- Mobile Safari (iOS)

## License

MIT License. Free for personal and commercial use.
