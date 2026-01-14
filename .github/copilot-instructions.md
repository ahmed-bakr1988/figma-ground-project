# Ground Protection - Copilot Instructions

## 🏗️ Architecture Overview

**Full-stack bilingual (Arabic/English) application** for a lightning protection company.

```
Frontend (React 18 + Vite)  →  Backend API (Laravel 11 + Sanctum)  →  MySQL
       ↓                              ↓
   localhost:3000               localhost:8000/api
                                       ↓
                            Filament Admin Panel
                               localhost:8000/admin
```

### Dual Authentication System
- **Sanctum API** (`api` guard) - Token-based Bearer authentication for React SPA (NO sessions/cookies/CSRF)
- **Filament Admin** (`web` guard) - Session-based for admin panel (has CSRF protection)
- Only `admin`/`staff` roles can access Filament (see `User::canAccessPanel()`)

**CRITICAL - Bearer Token Auth (Not Stateful):**
- API routes (`/api/*`) are **EXCLUDED from CSRF validation**
- React sends `Authorization: Bearer {token}` header
- No cookies/sessions used for API - completely stateless
- `EnsureFrontendRequestsAreStateful` is NOT used (would cause conflicts)
- See [CSRF_FIX_BEARER_TOKENS.md](CSRF_FIX_BEARER_TOKENS.md) for architecture details

**CRITICAL:** API uses Bearer tokens ONLY. Config has `withCredentials: false` to avoid CSRF 419 errors.

## 📁 Key Files & Patterns

### Frontend Services Layer
```
src/services/
├── api.js          # Axios instance with interceptors + all API service objects
├── AuthContext.jsx # React Context for auth state management
├── hooks.js        # Custom hooks: useServices(), useFaqs(), useContactForm()
```

**Pattern:** Always use custom hooks from `hooks.js`, never call API services directly:
```javascript
// ✅ Do this in components
const { data, loading, error } = useServices({ featured: true });

// ❌ Never do this in components
const data = await servicesService.getAll();
```

**Axios Interceptors (in api.js):**
- Request: Auto-adds `Authorization: Bearer {token}` and `Accept-Language: ar|en`
- Response: Auto-logout on 401, redirect to /maintenance on 503

### Backend API Structure
```
backend/app/
├── Traits/ApiResponseTrait.php    # Unified JSON responses (MANDATORY in all controllers)
├── Http/Controllers/Api/          # API endpoints
├── Http/Resources/                # JSON transformation layers
├── Http/Requests/                 # Form validation (Auth/, ContactRequest, etc.)
├── Models/                        # Eloquent models with SoftDeletes
```

**API Response Pattern** - Every controller MUST use `ApiResponseTrait`:
```php
// In controllers: use App\Traits\ApiResponseTrait;
return $this->successResponse($data, 'رسالة بالعربية', 200);
return $this->errorResponse('رسالة الخطأ', 400);
return $this->paginatedResponse(Service::paginate(15));
```

**Response Structure:**
```json
{
  "success": true,
  "message": "Operation message",
  "data": {...},
  "meta": {
    "timestamp": "2026-01-14T10:30:00Z",
    "version": "v1"
  }
}
```

## 🌐 Bilingual Content Pattern

**Backend Models use separate columns (NOT JSON):**
```php
// In Model (e.g., Service.php)
protected $fillable = ['title_ar', 'title_en', 'description_ar', 'description_en'];
protected $casts = ['features_ar' => 'array', 'features_en' => 'array'];

// Accessor for current locale
public function getTitleAttribute(): string {
    return app()->getLocale() === 'ar' ? $this->title_ar : $this->title_en;
}
```

**API Resources transform based on locale:**
```php
// In ServiceResource.php
$locale = app()->getLocale();
return [
    'title' => $locale === 'ar' ? $this->title_ar : $this->title_en,
    'title_ar' => $this->title_ar,  // Frontend gets both languages
    'title_en' => $this->title_en,
];
```

**Frontend language detection:**
```javascript
const { i18n } = useTranslation();
const title = service.title_ar;  // Or pick based on i18n.language
```

## 🎨 Frontend Conventions

**Stack:**
- **Styling:** Tailwind CSS with RTL support via `html[dir="rtl"]`
- **Animations:** Framer Motion for page transitions and interactions
- **Icons:** Lucide React (`import { Zap, Shield } from 'lucide-react'`)
- **Routing:** React Router v6, pages in `src/pages/`
- **i18n:** react-i18next with localStorage detection

**Brand Colors (from tailwind.config.js):**
```javascript
brand: {
  navy: '#0E3A5D',    // Primary
  blue: '#1F6FA8',    // Secondary
  gold: '#F2C94C',    // Accent/CTA
  earth: '#8A5A2B',   // Ground accent
  light: '#F7F9FB',   // Background
}
```

**RTL-aware Tailwind:**
```jsx
// Use conditional classes for directional spacing
<div className={`${isRTL ? 'pr-4 ml-2' : 'pl-4 mr-2'}`}>
```

## 🔌 API Endpoints Quick Reference

| Resource | Endpoints | Auth Required |
|----------|-----------|---------------|
| Auth | `POST /api/auth/login`, `/register`, `/logout` | No (logout: Yes) |
| Services | `GET /api/services?featured=1`, `/services/{slug}` | No |
| Projects | `GET /api/projects`, `/projects/stats`, `/projects/{slug}` | No |
| Blog | `GET /api/blog`, `/blog/categories`, `/blog/{slug}` | No |
| FAQs | `GET /api/faqs`, `/faqs/categories` | No |
| Contact | `POST /api/contact/message`, `/contact/quote` | No |
| User | `GET /api/user`, `PUT /api/user/profile` | Yes |

**Query Parameters:**
- `?featured=1` - Get featured items only
- `?search=term` - Full-text search
- `?per_page=15` - Pagination (default: 15)
- `?all=1` - Skip pagination, get all items

## 🛠️ Developer Commands

```bash
# Frontend (from project root)
npm run dev          # Start Vite dev server (port 3000, auto-open browser)
npm run build        # Production build to dist/
npm run preview      # Preview production build

# Backend (from backend/ directory)
cd backend
php artisan serve    # Start API server (http://localhost:8000)
php artisan migrate  # Run pending migrations
php artisan migrate:fresh --seed  # Fresh DB + seed data
php artisan test     # Run PHPUnit feature tests
php artisan route:list  # List all API routes

# Filament Admin Panel (http://localhost:8000/admin)
php artisan make:filament-resource ModelName --generate  # Auto-generate CRUD
php artisan make:filament-user    # Create admin user interactively

# Development Workflow
# Terminal 1: cd backend && php artisan serve
# Terminal 2: npm run dev
```

## ⚠️ Important Notes

1. **Token Storage:** Auth token in `localStorage` as `auth_token`, user as `user`
2. **Token Expiration:** Tokens expire after 24 hours (configured in AuthController)
3. **Auto Language Header:** All API requests auto-include `Accept-Language: ar|en` from i18next
4. **CORS Config:** Backend allows `FRONTEND_URL` from .env (Production: https://ground-eg.com)
5. **Soft Deletes:** All models use `SoftDeletes` trait - nothing is permanently deleted
6. **API Rate Limiting (in routes/api.php):**
   - Auth login: 5 requests/minute
   - Password reset: 3/minute
   - Contact forms: 5/minute
   - General API: 60/minute
7. **Comments Language:** Backend comments are in Arabic (client requirement)
8. **Vite Port:** Frontend runs on port 3000 (vite.config.js), NOT 5173
9. **Security Headers:** Automatically added to all responses (SecurityHeaders middleware)
10. **Failed Login Logging:** All failed attempts logged with IP/User Agent for security monitoring

## 🔍 Common Patterns

### Adding a New API Endpoint
1. Create Request validator: `php artisan make:request StoreServiceRequest`
2. Create Resource: `php artisan make:resource ServiceResource`
3. Create Controller: `php artisan make:controller Api/ServiceController`
   - Add `use ApiResponseTrait;` trait
   - Use Resource for transformations
4. Add route in `backend/routes/api.php`
5. Frontend: Add service function in `src/services/api.js`
6. Frontend: Create custom hook in `src/services/hooks.js` (optional)

### Backend Model Scopes Pattern
```php
// In Model (e.g., Service.php)
public function scopeActive($query) {
    return $query->where('is_active', true);
}
public function scopeFeatured($query) {
    return $query->where('is_featured', true);
}
public function scopeOrdered($query) {
    return $query->orderBy('sort_order')->orderBy('created_at', 'desc');
}

// Usage in Controller
$services = Service::active()->featured()->ordered()->get();
```

### Frontend Page Animation
```jsx
import { motion } from 'framer-motion';

// In page component
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Page content */}
</motion.div>
```

## 🧪 Testing Patterns

**Backend tests** in `backend/tests/Feature/`:
```php
use Illuminate\Foundation\Testing\RefreshDatabase;

class ServiceTest extends TestCase {
    use RefreshDatabase;
    
    public function test_can_list_services() {
        $response = $this->getJson('/api/services');
        $response->assertStatus(200)
                 ->assertJsonStructure(['success', 'data', 'meta']);
    }
    
    public function test_authenticated_user_can_logout() {
        $user = User::factory()->create();
        $token = $user->createToken('test')->plainTextToken;
        
        $response = $this->withToken($token)->postJson('/api/auth/logout');
        $response->assertStatus(200);
    }
}
```

## 🚨 Common Gotchas

- **Database:** Default database name is `ground_protection` (see backend/.env.example)
- **Frontend base URL:** Check `VITE_API_URL` in .env (should be http://localhost:8000/api)
- **Filament access:** User role MUST be `admin` or `staff` to access /admin panel
- **API 401 errors:** Check if token is expired or missing in localStorage
- **RTL issues:** Always test with both Arabic and English, especially margins/paddings
