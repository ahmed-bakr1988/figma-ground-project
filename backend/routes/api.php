<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\ContactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| جميع مسارات الـ API لموقع Ground Protection
|
*/

// ================================
// المسارات العامة (بدون مصادقة)
// ================================

// Health Check
Route::get('/health', function () {
    return response()->json([
        'success' => true,
        'message' => 'API is running',
        'data' => [
            'status' => 'healthy',
            'version' => config('app.api.version'),
            'timestamp' => now()->toIso8601String(),
        ],
    ]);
});

// ================================
// المصادقة (Authentication)
// ================================
Route::prefix('auth')->group(function () {
    // تسجيل مستخدم جديد
    Route::post('/register', [AuthController::class, 'register']);
    
    // تسجيل الدخول
    Route::post('/login', [AuthController::class, 'login'])
        ->middleware('throttle:5,1'); // 5 محاولات في الدقيقة
    
    // نسيت كلمة المرور
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])
        ->middleware('throttle:3,1');
    
    // إعادة تعيين كلمة المرور
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    
    // التحقق من البريد الإلكتروني
    Route::get('/verify-email/{id}/{hash}', [AuthController::class, 'verifyEmail'])
        ->name('verification.verify');
});

// ================================
// الخدمات (Services) - عام
// ================================
Route::prefix('services')->middleware('cache.headers:api')->group(function () {
    Route::get('/', [ServiceController::class, 'index']);
    Route::get('/featured', [ServiceController::class, 'featured']);
    Route::get('/{slug}', [ServiceController::class, 'show']);
});

// ================================
// المشاريع (Projects) - عام
// ================================
Route::prefix('projects')->middleware('cache.headers:api')->group(function () {
    Route::get('/', [ProjectController::class, 'index']);
    Route::get('/featured', [ProjectController::class, 'featured']);
    Route::get('/stats', [ProjectController::class, 'stats']);
    Route::get('/{slug}', [ProjectController::class, 'show']);
    Route::get('/{slug}/related', [ProjectController::class, 'related']);
});

// ================================
// المقالات (Blog) - عام
// ================================
Route::prefix('blog')->middleware('cache.headers:api')->group(function () {
    Route::get('/', [BlogController::class, 'index']);
    Route::get('/featured', [BlogController::class, 'featured']);
    Route::get('/latest', [BlogController::class, 'latest']);
    Route::get('/categories', [BlogController::class, 'categories']);
    Route::get('/tags', [BlogController::class, 'tags']);
    Route::get('/{slug}', [BlogController::class, 'show']);
    Route::get('/{slug}/related', [BlogController::class, 'related']);
});

// ================================
// الأسئلة الشائعة (FAQs) - عام
// ================================
Route::prefix('faqs')->middleware('cache.headers:api')->group(function () {
    Route::get('/', [FaqController::class, 'index']);
    Route::get('/categories', [FaqController::class, 'categories']);
    Route::get('/{id}', [FaqController::class, 'show']);
    Route::post('/{id}/feedback', [FaqController::class, 'feedback']);
});

// ================================
// التواصل (Contact) - عام
// ================================
Route::prefix('contact')->group(function () {
    Route::post('/message', [ContactController::class, 'sendMessage'])
        ->middleware(['throttle:5,1']);
    
    Route::post('/quote', [ContactController::class, 'requestQuote'])
        ->middleware('throttle:3,1');
    
    Route::post('/newsletter/subscribe', [ContactController::class, 'subscribe'])
        ->middleware('throttle:3,1');
    
    Route::get('/newsletter/unsubscribe/{token}', [ContactController::class, 'unsubscribe']);
});

// ================================
// المسارات المحمية (تتطلب مصادقة)
// ================================
Route::middleware('auth:sanctum')->group(function () {
    
    // ================================
    // المستخدم الحالي
    // ================================
    Route::prefix('user')->group(function () {
        Route::get('/', [AuthController::class, 'user']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
        Route::post('/change-password', [AuthController::class, 'changePassword']);
        Route::post('/send-verification', [AuthController::class, 'sendVerificationEmail']);
        Route::get('/tokens', [AuthController::class, 'tokens']);
        Route::delete('/tokens/{tokenId}', [AuthController::class, 'revokeToken']);
    });
    
    // تسجيل الخروج
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/logout-all', [AuthController::class, 'logoutAll']);
    
    // ================================
    // طلبات عروض الأسعار للمستخدم
    // ================================
    Route::prefix('my-quotes')->group(function () {
        Route::get('/', [ContactController::class, 'myQuotes']);
        Route::get('/{id}', [ContactController::class, 'showQuote']);
    });
});

// ================================
// مسارات الإدارة (Admin)
// ================================
Route::middleware(['auth:sanctum', 'role:admin,staff'])->prefix('admin')->group(function () {
    
    // ================================
    // لوحة التحكم - الإحصائيات
    // ================================
    Route::get('/dashboard/stats', [\App\Http\Controllers\Api\Admin\DashboardController::class, 'stats']);
    Route::get('/dashboard/activity', [\App\Http\Controllers\Api\Admin\DashboardController::class, 'recentActivity']);

    // ================================
    // إدارة الخدمات
    // ================================
    Route::apiResource('services', \App\Http\Controllers\Api\Admin\ServiceController::class);
    Route::post('/services/{id}/restore', [\App\Http\Controllers\Api\Admin\ServiceController::class, 'restore']);
    Route::patch('/services/{id}/toggle-active', [\App\Http\Controllers\Api\Admin\ServiceController::class, 'toggleActive']);
    Route::patch('/services/{id}/toggle-featured', [\App\Http\Controllers\Api\Admin\ServiceController::class, 'toggleFeatured']);

    // ================================
    // إدارة المشاريع
    // ================================
    Route::apiResource('projects', \App\Http\Controllers\Api\Admin\ProjectController::class);
    Route::post('/projects/{id}/restore', [\App\Http\Controllers\Api\Admin\ProjectController::class, 'restore']);
    Route::patch('/projects/{id}/toggle-active', [\App\Http\Controllers\Api\Admin\ProjectController::class, 'toggleActive']);
    Route::patch('/projects/{id}/toggle-featured', [\App\Http\Controllers\Api\Admin\ProjectController::class, 'toggleFeatured']);

    // ================================
    // إدارة المقالات
    // ================================
    Route::apiResource('blog-posts', \App\Http\Controllers\Api\Admin\BlogPostController::class);
    Route::post('/blog-posts/{id}/restore', [\App\Http\Controllers\Api\Admin\BlogPostController::class, 'restore']);
    Route::patch('/blog-posts/{id}/toggle-published', [\App\Http\Controllers\Api\Admin\BlogPostController::class, 'togglePublished']);
    Route::patch('/blog-posts/{id}/toggle-featured', [\App\Http\Controllers\Api\Admin\BlogPostController::class, 'toggleFeatured']);

    // ================================
    // إدارة الأسئلة الشائعة
    // ================================
    Route::apiResource('faqs', \App\Http\Controllers\Api\Admin\FaqController::class);
    Route::post('/faqs/{id}/restore', [\App\Http\Controllers\Api\Admin\FaqController::class, 'restore']);
    Route::patch('/faqs/{id}/toggle-active', [\App\Http\Controllers\Api\Admin\FaqController::class, 'toggleActive']);
    Route::post('/faqs/reorder', [\App\Http\Controllers\Api\Admin\FaqController::class, 'reorder']);

    // ================================
    // إدارة رسائل التواصل
    // ================================
    Route::get('/contact-messages', [\App\Http\Controllers\Api\Admin\ContactMessageController::class, 'index']);
    Route::get('/contact-messages/{id}', [\App\Http\Controllers\Api\Admin\ContactMessageController::class, 'show']);
    Route::patch('/contact-messages/{id}/status', [\App\Http\Controllers\Api\Admin\ContactMessageController::class, 'updateStatus']);
    Route::patch('/contact-messages/{id}/notes', [\App\Http\Controllers\Api\Admin\ContactMessageController::class, 'addNotes']);
    Route::delete('/contact-messages/{id}', [\App\Http\Controllers\Api\Admin\ContactMessageController::class, 'destroy']);
    Route::post('/contact-messages/{id}/restore', [\App\Http\Controllers\Api\Admin\ContactMessageController::class, 'restore']);
    Route::post('/contact-messages/bulk-status', [\App\Http\Controllers\Api\Admin\ContactMessageController::class, 'bulkUpdateStatus']);

    // ================================
    // إدارة طلبات عروض الأسعار
    // ================================
    Route::get('/quote-requests', [\App\Http\Controllers\Api\Admin\QuoteRequestController::class, 'index']);
    Route::get('/quote-requests/{id}', [\App\Http\Controllers\Api\Admin\QuoteRequestController::class, 'show']);
    Route::patch('/quote-requests/{id}/status', [\App\Http\Controllers\Api\Admin\QuoteRequestController::class, 'updateStatus']);
    Route::post('/quote-requests/{id}/quote', [\App\Http\Controllers\Api\Admin\QuoteRequestController::class, 'addQuote']);
    Route::delete('/quote-requests/{id}', [\App\Http\Controllers\Api\Admin\QuoteRequestController::class, 'destroy']);
    Route::post('/quote-requests/{id}/restore', [\App\Http\Controllers\Api\Admin\QuoteRequestController::class, 'restore']);
    Route::post('/quote-requests/bulk-status', [\App\Http\Controllers\Api\Admin\QuoteRequestController::class, 'bulkUpdateStatus']);

    // ================================
    // إدارة المستخدمين (admin فقط)
    // ================================
    Route::middleware('role:admin')->group(function () {
        Route::apiResource('users', \App\Http\Controllers\Api\Admin\UserController::class);
        Route::post('/users/{id}/restore', [\App\Http\Controllers\Api\Admin\UserController::class, 'restore']);
        Route::patch('/users/{id}/toggle-active', [\App\Http\Controllers\Api\Admin\UserController::class, 'toggleActive']);
    });
});
