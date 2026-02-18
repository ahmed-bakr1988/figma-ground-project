<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| مسارات الويب - تتضمن لوحة تحكم الإدارة
|
*/

Route::get('/', function () {
    return response()->json([
        'name' => config('app.name'),
        'version' => config('app.api.version'),
        'documentation' => url('/api/docs'),
    ]);
});

// ================================
// مسارات الإدارة (Admin Panel)
// ================================
// تعمل على مسار /admin بدلاً من /api/admin
// تستخدم Bearer Token عبر Sanctum للمصادقة
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
