# Ground Protection - Copilot Instructions

## 🏗️ Architecture Overview

**Full-stack bilingual (Arabic/English) SPA** for a lightning protection company.

```
Frontend (React 18 + Vite)  →  Backend API (Laravel 11 + Sanctum)  →  MySQL
       ↓                              ↓
   localhost:3000               localhost:8000/api
                                       ↓
                            Filament Admin Panel
                               localhost:8000/admin
```

### Authentication (CRITICAL)
- **API:** Bearer token ONLY (`Authorization: Bearer {token}`) - NO cookies/sessions/CSRF
- **Filament Admin:** Session-based with CSRF (separate `web` guard)
- Config: `withCredentials: false` in axios - NEVER change this

## 📁 Key Files & Patterns

### Frontend Structure
```
src/
├── services/api.js       # Axios + all API service objects
├── services/hooks.js     # useFetch(), useServices(), etc. - ALWAYS use these
├── config/companyInfo.js # Company data + SEO titles (single source of truth)
├── config/seoSchema.js   # Schema.org generators (Organization, FAQ, etc.)
├── components/common/SEOHead.jsx  # Dynamic meta tags + schema injection
├── pages/                # Top-level pages (*Page.jsx)
└── pages/services/       # Service pillar pages (e.g., EarthingSystemsPage.jsx)
```

**Pattern - Custom hooks for data fetching:**
```javascript
// ✅ Always use hooks from services/hooks.js
const { data, loading, error } = useServices({ featured: true });
const { data } = useFetch(() => servicesService.getAll(), []);

// ❌ Never call API directly in components
```

### Backend Structure
```
backend/app/
├── Traits/ApiResponseTrait.php   # MANDATORY in all controllers
├── Http/Controllers/Api/         # API endpoints
├── Http/Middleware/SetCacheHeaders.php  # Cache-Control for API responses
└── Models/                       # Eloquent with SoftDeletes + bilingual accessors
```

**API Response Pattern:**
```php
use App\Traits\ApiResponseTrait;  // Required in every controller
return $this->successResponse($data, 'رسالة', 200);
return $this->paginatedResponse(Service::paginate(15));
```

## 🌐 Bilingual Content

**Database:** Separate columns, NOT JSON:
```php
// Model
protected $fillable = ['title_ar', 'title_en', 'description_ar', 'description_en'];
public function getTitleAttribute(): string {
    return app()->getLocale() === 'ar' ? $this->title_ar : $this->title_en;
}
```

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

// In component:
const faqSchema = getFAQSchema(faqItems, locale);
<SEOHead
  title="Page Title | Ground Tech"
  description="150+ chars description with CTA"
  url={`${companyInfo.urls.website}/services/service-slug`}
  breadcrumbs={[...]}
  schema={faqSchema}  // FAQPage schema for rich results
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
// RTL-aware spacing
<div className={`${isRTL ? 'text-right pr-4' : 'text-left pl-4'}`}>
// Or use modifiers: className="rtl:pr-4 ltr:pl-4"
```

**Animations:** Framer Motion pattern:
```jsx
<motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
```

**Icons:** Lucide React only (`import { Zap, Shield } from 'lucide-react'`)

**Brand Colors:** `primary` (#0E3A5D), `secondary` (#1F6FA8), `accent` (#F2C94C)

## 🛠️ Developer Commands

```bash
# Frontend (project root)
npm run dev        # Vite dev server (port 3000)
npm run build      # Production build → dist/

# Backend (backend/ directory)
php artisan serve  # API server (port 8000)
php artisan migrate:fresh --seed  # Reset DB with seed data

# Development: Run both in separate terminals
```

## ⚠️ Critical Rules

1. **Bearer Auth:** Never add CSRF/cookies to API - causes 419 errors
2. **API Trait:** Every controller MUST use `ApiResponseTrait`
3. **Hooks:** Never call API services directly in components
4. **Bilingual:** Always provide both `_ar` and `_en` fields
5. **SEO:** New pages MUST update sitemap.xml + add to Navbar/Footer
6. **Soft Deletes:** All models use SoftDeletes - nothing permanently deleted
7. **Comments:** Backend comments in Arabic (client requirement)

## 🔌 API Quick Reference

| Resource | Endpoint | Auth |
|----------|----------|------|
| Services | `GET /api/services?featured=1` | No |
| Projects | `GET /api/projects` | No |
| Contact | `POST /api/contact/message` | No |
| Auth | `POST /api/auth/login` | No |
| User | `GET /api/user` | Yes |

Query params: `?featured=1`, `?search=term`, `?per_page=15`, `?all=1`
