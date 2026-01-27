# 🧪 SEO Testing Guide - Quick Validation

Run these tests **after deployment** to verify SEO implementation:

---

## 1️⃣ Meta Tags Validation

### Google Rich Results Test
```
https://search.google.com/test/rich-results
```
- Enter: `https://ground-eg.com/`
- Check for Organization & BreadcrumbList schema
- Verify no errors or warnings

### Twitter Card Validator
```
https://cards-dev.twitter.com/validator
```
- Test URL: `https://ground-eg.com/contact`
- Verify card preview shows OG image & description

### Facebook Sharing Debugger
```
https://developers.facebook.com/tools/debug/
```
- Scrape URL: `https://ground-eg.com/contact`
- Check og:image displays correctly (1200x630px)
- Click "Scrape Again" if OG image doesn't show initially

---

## 2️⃣ Mobile & Performance

### Google PageSpeed Insights
```
https://pagespeed.web.dev/
```
**Test URLs:**
- Home: `https://ground-eg.com/`
- Contact: `https://ground-eg.com/contact`
- Services: `https://ground-eg.com/services`

**Target Scores:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: 100

### Google Mobile-Friendly Test
```
https://search.google.com/test/mobile-friendly
```
- All pages should pass as mobile-friendly

---

## 3️⃣ Search Console Setup

### Submit Sitemap
1. Go to: `https://search.google.com/search-console`
2. Add property: `https://ground-eg.com`
3. Verify ownership (HTML file or meta tag)
4. Submit sitemap: `https://ground-eg.com/sitemap.xml`

### Monitor Indexing
- Check "Coverage" report for indexed pages
- Review "Enhancements" for structured data issues
- Monitor "Core Web Vitals" for performance

---

## 4️⃣ Bing Webmaster Tools

```
https://www.bing.com/webmasters
```
- Add site: `https://ground-eg.com`
- Submit sitemap: `https://ground-eg.com/sitemap.xml`
- Verify hreflang tags in "International Targeting"

---

## 5️⃣ hreflang Validation

### Merkle hreflang Checker
```
https://technicalseo.com/tools/hreflang/
```
- Test URL: `https://ground-eg.com/contact`
- Verify AR, EN, x-default tags present
- Check no conflicting hreflang tags

---

## 6️⃣ Manual Checks

### Robots.txt
```
https://ground-eg.com/robots.txt
```
**Expected:**
- `User-agent: *`
- `Allow: /`
- `Disallow: /admin/`
- `Sitemap: https://ground-eg.com/sitemap.xml`

### Sitemap.xml
```
https://ground-eg.com/sitemap.xml
```
**Verify:**
- All major pages listed
- `<lastmod>` dates correct
- hreflang links present
- Image sitemap entries

### View Page Source (Ctrl+U)
**Check on Contact Page:**
1. `<title>` tag present and descriptive
2. Meta description (150-160 chars)
3. `<link rel="canonical">` present
4. `<link rel="alternate" hreflang="ar">` and `hreflang="en"` present
5. `<meta property="og:image">` points to OG image
6. JSON-LD script with Organization/BreadcrumbList schema

---

## 7️⃣ Command-Line Tests

### Check Gzip Compression
```bash
curl -H "Accept-Encoding: gzip" -I https://ground-eg.com/
```
**Look for:** `Content-Encoding: gzip`

### Check Brotli Compression
```bash
curl -H "Accept-Encoding: br" -I https://ground-eg.com/
```
**Look for:** `Content-Encoding: br`

### Verify Sitemap Accessibility
```bash
curl -I https://ground-eg.com/sitemap.xml
```
**Expected:** `200 OK`

### Test Robots.txt
```bash
curl https://ground-eg.com/robots.txt
```
**Verify:** Correct directives present

---

## 8️⃣ Image Optimization Check

### WebP Support
```bash
curl -I https://ground-eg.com/assets/images/og-contact.webp
```
**Expected:** `Content-Type: image/webp`

### Image Alt Tags
- Right-click any image → "Inspect"
- Verify `alt` attribute present and descriptive

---

## 9️⃣ Schema Markup Validation

### JSON-LD Test
1. View page source of any page
2. Find `<script type="application/ld+json">` tags
3. Copy JSON content
4. Paste into: `https://search.google.com/test/rich-results`
5. Verify no errors

**Pages with Schema:**
- Home: Organization, WebSite
- All pages: BreadcrumbList

---

## 🔟 Accessibility Audit

### WAVE Browser Extension
```
https://wave.webaim.org/extension/
```
- Install WAVE extension (Chrome/Firefox)
- Run on each page
- Fix any errors (missing alt, low contrast, etc.)

### Lighthouse Accessibility
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Run "Accessibility" audit
4. Target: 95+ score

---

## ✅ Quick Test Script (PowerShell)

```powershell
# Test all critical SEO endpoints
$baseUrl = "https://ground-eg.com"
$endpoints = @("/", "/contact", "/services", "/about", "/robots.txt", "/sitemap.xml")

foreach ($endpoint in $endpoints) {
    $url = "$baseUrl$endpoint"
    Write-Host "Testing: $url" -ForegroundColor Cyan
    $response = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing
    Write-Host "Status: $($response.StatusCode) $($response.StatusDescription)" -ForegroundColor Green
    Write-Host ""
}

# Check OG image
$ogImage = "$baseUrl/assets/images/og-contact.webp"
Write-Host "Testing OG Image: $ogImage" -ForegroundColor Cyan
Invoke-WebRequest -Uri $ogImage -Method Head -UseBasicParsing
Write-Host "OG Image exists!" -ForegroundColor Green
```

---

## 📊 Expected Results Summary

| Test | Tool | Expected Result |
|------|------|-----------------|
| Rich Results | Google | 0 errors, Organization schema valid |
| PageSpeed (Mobile) | Google PSI | > 90 Performance, 100 SEO |
| Mobile-Friendly | Google | Pass |
| OG Tags | Facebook Debugger | Image preview 1200x630 |
| hreflang | Merkle Checker | AR, EN, x-default present |
| Sitemap | Google Search Console | All URLs indexed |
| Accessibility | WAVE | 0 errors |
| Compression | curl | gzip or br present |

---

## 🚨 Common Issues & Fixes

### OG Image Not Showing
- Clear Facebook cache: Use "Scrape Again" button
- Verify image is publicly accessible (not behind auth)
- Check image size (min 200x200, recommended 1200x630)

### Schema Errors
- Validate JSON-LD syntax at `jsonlint.com`
- Ensure all required properties present (name, url, logo, etc.)
- Check for trailing commas in JSON

### hreflang Not Working
- Verify each page links to itself with correct lang code
- Include `x-default` for fallback
- Ensure URLs are absolute (https://)

### Slow PageSpeed Score
- Reduce unused JavaScript (code splitting)
- Optimize images further (reduce quality to 80%)
- Enable CDN for static assets
- Implement service worker for caching

---

**Next:** Run through this checklist and document results in a tracking sheet.
