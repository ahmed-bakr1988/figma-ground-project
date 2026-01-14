# CSRF Token Mismatch Fix - Bearer Token Authentication

## ✅ Problem Fixed

**Error:** `CSRF token mismatch` (HTTP 419) when making API requests from React frontend

**Root Cause:** 
- Backend was configured for stateful authentication (Sanctum with sessions/cookies)
- React frontend uses Bearer token authentication (stateless)
- CSRF middleware was checking for tokens when requests were purely API-based
- `EnsureFrontendRequestsAreStateful` middleware was triggering session/cookie/CSRF logic

## 🔧 Solution Applied

### 1. **bootstrap/app.php** - Exclude API routes from CSRF validation
```php
$middleware->validateCsrfTokens(except: [
    'api/*',  // All API routes bypass CSRF (they use Bearer tokens)
]);
```

### 2. **config/sanctum.php** - Use API guard (not web) for Bearer tokens
```php
'stateful' => [],              // Empty - no stateful domains needed for Bearer tokens
'guard' => ['api'],            // Use 'api' guard instead of 'web'
```

### 3. **bootstrap/app.php** - Remove problematic stateful middleware
Commented out `EnsureFrontendRequestsAreStateful::class` prepend because:
- It forces session middleware to run
- React SPA uses Bearer tokens in `Authorization` header
- Sessions/Cookies + Bearer tokens create conflicts with CSRF

## 🔑 How It Works Now

### Authentication Flow (Bearer Tokens - No CSRF needed)
```
React Frontend (localhost:3000)
    ↓
    Authorization: Bearer {token}
    ↓
Laravel API (localhost:8000/api)
    ↓
    Sanctum validates token (api guard)
    ↓
    ✅ Stateless authentication (no sessions/cookies)
```

### Why CSRF Doesn't Apply
- **CSRF** protects against form-based attacks on **same-site origins**
- **API tokens** are cryptographically signed and can't be stolen via CSRF
- API routes don't set cookies, so no session hijacking vector

## 📝 Important: Two Auth Systems in This Project

| Guard | Type | Purpose | Tokens | CSRF |
|-------|------|---------|--------|------|
| **api** | Stateless | React SPA (Bearer tokens) | Required | ❌ No |
| **web** | Stateful | Filament Admin (Sessions) | Not used | ✅ Yes |

```php
// In your controllers:

// API endpoints - Use api guard (no CSRF)
Route::middleware('auth:sanctum')->post('/api/...');

// Filament (web) - Uses sessions (has CSRF)
// http://localhost:8000/admin uses web guard with CSRF
```

## ✨ Frontend Doesn't Need Changes

Your React code is already correct:

```javascript
// api.js - Already configured correctly!
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest', // ✅ Good for CORS
    'Accept': 'application/json',
    // withCredentials: false  // ✅ No cookies needed
  },
});

// Interceptor auto-adds token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;  // ✅ This works now!
  }
  return config;
});
```

## 🧪 Test the Fix

### 1. Start Backend
```bash
cd backend
php artisan serve
```

### 2. Test Login (should get Bearer token)
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "1|gp_abc123...",  // ✅ Bearer token
    "user": {...}
  }
}
```

### 3. Test API Request with Token
```bash
curl -X GET http://localhost:8000/api/services \
  -H "Authorization: Bearer 1|gp_abc123..."
```

Should work! No CSRF errors.

### 4. Test React Frontend
```bash
npm run dev  # From project root
```

Login form → Submit → Should successfully authenticate ✅

## 🚨 Troubleshooting

### Still getting "CSRF token mismatch"?

1. **Clear Laravel cache:**
   ```bash
   php artisan config:clear
   php artisan cache:clear
   ```

2. **Verify bootstrap/app.php was saved:**
   ```bash
   grep -A 2 "validateCsrfTokens" backend/bootstrap/app.php
   ```

3. **Check sanctum guard in config:**
   ```bash
   grep -A 2 "'guard'" backend/config/sanctum.php
   ```

4. **Make sure you're using Bearer token:**
   - Check browser DevTools → Network → check Authorization header
   - Should be `Authorization: Bearer {token}`, not empty

### 401 Unauthorized on protected routes?

- Token might be expired
- Token not stored in localStorage
- Wrong guard used in route middleware

```php
// ✅ Correct for API
Route::middleware('auth:sanctum')->get('/api/user', ...);

// ❌ Wrong (web guard uses sessions)
Route::middleware('auth:web')->get('/api/user', ...);
```

## 📚 Related Configuration Files

- [bootstrap/app.php](backend/bootstrap/app.php) - Middleware config
- [config/sanctum.php](backend/config/sanctum.php) - Auth guard settings
- [config/auth.php](backend/config/auth.php) - Guard definitions
- [routes/api.php](backend/routes/api.php) - API routes
- [src/services/api.js](src/services/api.js) - Frontend Axios config

## ✅ Summary

| Issue | Cause | Fix |
|-------|-------|-----|
| CSRF mismatch | Stateful + Stateless mix | Removed `EnsureFrontendRequestsAreStateful` |
| API rejected tokens | Wrong guard | Changed Sanctum guard from `web` → `api` |
| Sessions interfering | Empty stateful domains | Set `stateful: []` |
| 419 errors | CSRF middleware on `/api/*` | Added `except: ['api/*']` |

**Now your API is fully stateless with Bearer token authentication! 🎉**
