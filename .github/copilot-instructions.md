# Ground Protection - Copilot Instructions

## 🏗️ Architecture Overview

**Static bilingual (Arabic/English) SPA** for a lightning protection company.
Contact forms submit to **Google Sheets** via Google Apps Script.

```
Frontend (React 18 + Vite)  →  Google Sheets (via Apps Script)
       ↓
   localhost:3000 (dev)
   Netlify/Vercel (prod)
```

### No Backend
- No Laravel, no MySQL, no authentication
- All content is static (hardcoded or in `src/data/` files)
- Contact forms send data to Google Sheets via `fetch()`

## 📁 Key Files & Patterns

### Frontend Structure
```
src/
├── services/api.js       # Google Sheets contact API (fetch-based)
├── services/hooks.js     # useContactForm(), useNewsletterSubscribe()
├── services/emailService.js  # Validation helpers
├── config/companyInfo.js # Company data + SEO titles (single source of truth)
├── config/seoSchema.js   # Schema.org generators (Organization, FAQ, etc.)
├── components/common/SEOHead.jsx  # Dynamic meta tags + schema injection
├── data/blogPosts.js     # Static blog posts (bilingual)
├── data/caseStudies.js   # Static case studies (bilingual)
├── pages/                # Top-level pages (*Page.jsx)
└── pages/services/       # Service pillar pages (e.g., EarthingSystemsPage.jsx)
```

**Pattern - Contact form hooks:**
```javascript
// ✅ Always use hooks from services/hooks.js
const { loading, error, success, sendMessage, reset } = useContactForm();
const { loading, error, success, subscribe, reset } = useNewsletterSubscribe();

// ❌ Never call contactService directly in components
```

## 🌐 Bilingual Content

**Frontend:** Use `i18n.language` to pick field:
```javascript
const { i18n } = useTranslation();
const title = i18n.language === 'ar' ? data.title_ar : data.title_en;
```

## 🔍 SEO Patterns (IMPORTANT)

### Adding a New Service Pillar Page
1. Create page: `src/pages/services/{ServiceName}Page.jsx`
2. Use `SEOHead` component with FAQ schema:
```jsx
import SEOHead from '../../components/common/SEOHead';
import { getFAQSchema } from '../../config/seoSchema';

const faqSchema = getFAQSchema(faqItems, locale);
<SEOHead
  title="Page Title | Ground Tech"
  description="150+ chars description with CTA"
  url={`${companyInfo.urls.website}/services/service-slug`}
  breadcrumbs={[...]}
  schema={faqSchema}
/>
```

3. Add route in `App.jsx` with lazy loading:
```jsx
const NewServicePage = lazy(() => import('./pages/services/NewServicePage'));
<Route path="/services/new-service" element={<NewServicePage />} />
```

4. Update these files for crawling:
   - `public/sitemap.xml` - Add URL with hreflang
   - `src/components/layout/Navbar.jsx` - Add to services dropdown
   - `src/components/layout/Footer.jsx` - Add to services links

### SEO Files Reference
- `public/sitemap.xml` - All pages with hreflang (ar/en)
- `public/robots.txt` - Crawl rules
- `public/manifest.json` - PWA manifest
- `public/sw.js` - Service Worker for offline/caching

## 🎨 Frontend Conventions

**Styling:** Tailwind CSS with RTL support
```jsx
<div className={`${isRTL ? 'text-right pr-4' : 'text-left pl-4'}`}>
```

**Animations:** Framer Motion pattern:
```jsx
<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
```

**Icons:** Lucide React only (`import { Zap, Shield } from 'lucide-react'`)

**Brand Colors:** `primary` (#0E3A5D), `secondary` (#1F6FA8), `accent` (#F2C94C)

## 🛠️ Developer Commands

```bash
npm run dev        # Vite dev server (port 3000)
npm run build      # Production build → dist/
npm run preview    # Preview production build
```

## ⚠️ Critical Rules

1. **No Backend:** This is a static site — no Laravel, no API server
2. **Google Sheets:** Contact forms send to Google Sheets via Apps Script
3. **Hooks:** Always use `useContactForm()` / `useNewsletterSubscribe()` from hooks.js
4. **Bilingual:** All static content has both AR and EN versions
5. **SEO:** New pages MUST update sitemap.xml + add to Navbar/Footer
6. **No Auth:** No login, register, or user management

## 🔌 Environment Variables

| Variable | Purpose |
|----------|---------|
| `VITE_GOOGLE_SHEETS_URL` | Google Apps Script Web App URL for contact forms |
| `VITE_APP_NAME` | Application name |
| `VITE_APP_VERSION` | Version number |
