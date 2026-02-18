<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\ContactController;
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
    Route::post('/register', [AuthController::class, 'register'])
        ->middleware('throttle:5,1'); // حماية من إنشاء حسابات وهمية
    
    // تسجيل الدخول
    Route::post('/login', [AuthController::class, 'login'])
        ->middleware('throttle:5,1'); // 5 محاولات في الدقيقة
    
    // نسيت كلمة المرور
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])
        ->middleware('throttle:3,1');
    
    // إعادة تعيين كلمة المرور
    Route::post('/reset-password', [AuthController::class, 'resetPassword'])
        ->middleware('throttle:5,1');
    
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
    Route::post('/{id}/feedback', [FaqController::class, 'feedback'])
        ->middleware('throttle:10,1'); // حماية من spam التقييمات
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
        Route::post('/change-password', [AuthController::class, 'changePassword'])
            ->middleware('throttle:5,1');
        Route::post('/send-verification', [AuthController::class, 'sendVerificationEmail'])
            ->middleware('throttle:3,1');
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
// ملاحظة: مسارات الإدارة (Admin) تم نقلها إلى routes/web.php
// تعمل الآن على مسار /admin بدلاً من /api/admin
// ================================
