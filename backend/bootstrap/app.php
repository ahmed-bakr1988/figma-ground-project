<?php

/**
 * Bootstrap Application
 * تهيئة تطبيق Laravel
 */

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        apiPrefix: 'api',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // إعادة CSRF إلا لجميع مسارات الـ API
        // الـ API تستخدم Bearer Tokens، لا تحتاج CSRF protection
        $middleware->validateCsrfTokens(except: [
            'api/*',
        ]);

        // إضافة Security Headers لجميع الطلبات
        $middleware->append(\App\Http\Middleware\SecurityHeaders::class);
        
        // تسجيل Middleware مخصصة
        $middleware->alias([
            'role' => \App\Http\Middleware\CheckUserRole::class,
            'json' => \App\Http\Middleware\ValidateJsonRequest::class,
            'maintenance.api' => \App\Http\Middleware\CheckMaintenanceMode::class,
            'log.api' => \App\Http\Middleware\LogApiRequests::class,
            'locale' => \App\Http\Middleware\SetLocale::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // استخدام Handler المخصص
    })->create();
