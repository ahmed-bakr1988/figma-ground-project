# Enterprise Migration Guide: Filament → Custom Admin
# Ground Protection - ground-eg.com

## ✅ Migration Summary (Completed)

### What Changed
| Phase | Action | Status |
|-------|--------|--------|
| 1 | Dependency & Compatibility Audit | ✅ Complete |
| 2 | PHP `^8.3` → `^8.2` in composer.json | ✅ Complete |
| 3 | Filament 4.0 Completely Removed | ✅ Complete |
| 4 | Custom Admin API (7 controllers, 55 routes) | ✅ Complete |
| 5 | Frontend AJAX Admin Layer (8 service objects) | ✅ Complete |
| 6 | Deployment Strategy | ✅ This document |

---

## 🗑️ Files Removed (Filament)
- `app/Filament/` — 6 resources + 16 page files (22 files)
- `app/Providers/Filament/AdminPanelProvider.php`
- `public/css/filament/` — 1 CSS file
- `public/js/filament/` — 28 JS files  
- `public/fonts/filament/` — 17 font files
- `bootstrap/cache/filament/` — cached panel manifest
- **Total: 70+ files removed**

## 📦 composer.json Changes
```diff
- "php": "^8.3",
+ "php": "^8.2",
- "filament/filament": "4.0",
- "@php artisan filament:upgrade"  (from scripts)
```

## 🆕 Files Created

### Admin Controllers (`app/Http/Controllers/Api/Admin/`)
| Controller | Endpoints | Methods |
|-----------|-----------|---------|
| `DashboardController.php` | 2 | stats, recentActivity |
| `ServiceController.php` | 8 | CRUD + restore, toggleActive, toggleFeatured |
| `ProjectController.php` | 8 | CRUD + restore, toggleActive, toggleFeatured |
| `BlogPostController.php` | 8 | CRUD + restore, togglePublished, toggleFeatured |
| `FaqController.php` | 8 | CRUD + restore, toggleActive, reorder |
| `ContactMessageController.php` | 7 | index, show, updateStatus, addNotes, delete, restore, bulkUpdateStatus |
| `QuoteRequestController.php` | 7 | index, show, updateStatus, addQuote, delete, restore, bulkUpdateStatus |
| `UserController.php` | 7 | CRUD + restore, toggleActive (admin-only) |

### Frontend Services (`src/services/api.js`)
8 new admin service objects: `adminDashboardService`, `adminServicesService`, `adminProjectsService`, `adminBlogService`, `adminFaqService`, `adminContactService`, `adminQuoteService`, `adminUsersService`

### Route Summary
- **Total routes: 101** (46 public + 55 admin)
- All admin routes: `api/admin/*`  
- Protected by: `auth:sanctum` + `role:admin,staff`
- User management: additionally restricted to `role:admin`

---

## 🚀 Deployment to Production (ground-eg.com)

### Pre-Deployment Checklist
```bash
# 1. Backup current production
mysqldump -u grounde2_admin -p grounde2_ground_eg_db > backup_$(date +%Y%m%d).sql

# 2. Verify PHP version on hosting
php -v  # Must show 8.2.x

# 3. Ensure .env.production has correct values
# Copy from .env.production.example and verify
```

### Step-by-Step Deployment

#### Step 1: Upload Files
```bash
# Upload these directories/files to production:
# - backend/app/Http/Controllers/Api/Admin/  (NEW - 7 files)
# - backend/app/Models/User.php              (MODIFIED - Filament removed)
# - backend/routes/api.php                   (MODIFIED - admin routes added)
# - backend/composer.json                    (MODIFIED - PHP 8.2, no Filament)
# - backend/bootstrap/providers.php          (MODIFIED - Filament provider removed)
# - src/services/api.js                      (MODIFIED - admin services added)
```

#### Step 2: Delete Filament Files from Production
```bash
cd /home/grounde2/public_html/backend

# Delete Filament app files
rm -rf app/Filament
rm -rf app/Providers/Filament

# Delete Filament published assets
rm -rf public/css/filament
rm -rf public/js/filament
rm -rf public/fonts/filament

# Delete Filament cache
rm -rf bootstrap/cache/filament
```

#### Step 3: Install Dependencies
```bash
cd /home/grounde2/public_html/backend

# Install without dev dependencies
composer install --no-dev --optimize-autoloader --no-interaction

# Clear all caches
php artisan optimize:clear

# Rebuild caches for production
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

#### Step 4: Verify
```bash
# Test API health
curl https://ground-eg.com/api/health

# Test routes are cached
php artisan route:list --path=api/admin | head -20
```

### Rollback Procedure (if needed)
```bash
# 1. Restore database
mysql -u grounde2_admin -p grounde2_ground_eg_db < backup_YYYYMMDD.sql

# 2. Restore files from backup
# Upload the previously backed-up files

# 3. Re-install dependencies
composer install --no-dev --optimize-autoloader

# 4. Clear caches
php artisan optimize:clear
```

---

## 🔒 Security Architecture

### Authentication Flow
```
React SPA → POST /api/auth/login → Bearer Token
         → All admin requests include: Authorization: Bearer {token}
         → Middleware stack: auth:sanctum → role:admin,staff
```

### RBAC (Role-Based Access Control)
| Role | Admin CRUD | User Management | Public API |
|------|-----------|-----------------|-----------|
| `admin` | ✅ Full | ✅ Full | ✅ |
| `staff` | ✅ Full | ❌ Denied | ✅ |
| `user` | ❌ Denied | ❌ Denied | ✅ |

### Admin Credentials (Seeded)
- Email: `admin@groundprotection.sa`
- Password: `Admin@123`
- **⚠️ Change immediately in production!**

---

## 📋 Admin API Endpoints Quick Reference

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard/stats` | إحصائيات شاملة |
| GET | `/api/admin/dashboard/activity` | آخر النشاطات |

### Services CRUD
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/services` | جلب الكل (مع filter, search, pagination) |
| POST | `/api/admin/services` | إنشاء خدمة |
| GET | `/api/admin/services/{id}` | جلب خدمة |
| PUT | `/api/admin/services/{id}` | تحديث خدمة |
| DELETE | `/api/admin/services/{id}` | حذف (soft) |
| POST | `/api/admin/services/{id}/restore` | استعادة |
| PATCH | `/api/admin/services/{id}/toggle-active` | تبديل التفعيل |
| PATCH | `/api/admin/services/{id}/toggle-featured` | تبديل التمييز |

### Same pattern for: projects, blog-posts, faqs

### Contact Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/contact-messages` | جلب الكل |
| GET | `/api/admin/contact-messages/{id}` | جلب + تحديث لـ "مقروءة" |
| PATCH | `/api/admin/contact-messages/{id}/status` | تحديث الحالة |
| PATCH | `/api/admin/contact-messages/{id}/notes` | إضافة ملاحظات |
| DELETE | `/api/admin/contact-messages/{id}` | حذف |
| POST | `/api/admin/contact-messages/{id}/restore` | استعادة |
| POST | `/api/admin/contact-messages/bulk-status` | تحديث جماعي |

### Quote Requests
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/quote-requests` | جلب الكل |
| GET | `/api/admin/quote-requests/{id}` | جلب طلب |
| PATCH | `/api/admin/quote-requests/{id}/status` | تحديث الحالة |
| POST | `/api/admin/quote-requests/{id}/quote` | إضافة عرض سعر |
| DELETE | `/api/admin/quote-requests/{id}` | حذف |
| POST | `/api/admin/quote-requests/{id}/restore` | استعادة |
| POST | `/api/admin/quote-requests/bulk-status` | تحديث جماعي |

### Users (admin only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | جلب الكل |
| POST | `/api/admin/users` | إنشاء مستخدم |
| GET | `/api/admin/users/{id}` | جلب مستخدم |
| PUT | `/api/admin/users/{id}` | تحديث |
| DELETE | `/api/admin/users/{id}` | حذف |
| POST | `/api/admin/users/{id}/restore` | استعادة |
| PATCH | `/api/admin/users/{id}/toggle-active` | تبديل التفعيل |
