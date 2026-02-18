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
        // استثناء مسارات الـ API و Admin من CSRF
        // كلاهما يستخدم Bearer Tokens، لا يحتاج CSRF protection
        $middleware->validateCsrfTokens(except: [
            'api/*',
            'admin/*',
        ]);

        // مسارات admin و API تعمل بدون redirect (ترجع 401 JSON)
        // التطبيق SPA بالكامل، لا يوجد صفحة login على الباك إند
        $middleware->redirectGuestsTo(fn () => null);

        // إضافة Security Headers لجميع الطلبات
        $middleware->append(\App\Http\Middleware\SecurityHeaders::class);
        
        // تسجيل Middleware مخصصة
        $middleware->alias([
            'role' => \App\Http\Middleware\CheckUserRole::class,
            'json' => \App\Http\Middleware\ValidateJsonRequest::class,
            'maintenance.api' => \App\Http\Middleware\CheckMaintenanceMode::class,
            'log.api' => \App\Http\Middleware\LogApiRequests::class,
            'locale' => \App\Http\Middleware\SetLocale::class,
            'cache.headers' => \App\Http\Middleware\SetCacheHeaders::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // معالجة خطأ المصادقة - إرجاع 401 JSON مباشرة (بدون logging ثقيل)
        $exceptions->render(function (\Illuminate\Auth\AuthenticationException $e, $request) {
            return response()->json([
                'success' => false,
                'message' => 'غير مصرح لك بالوصول - يرجى تسجيل الدخول',
                'errors' => [],
                'meta' => ['timestamp' => now()->toIso8601String()],
            ], 401);
        });

        // معالجة استثناءات الـ API و Admin بشكل موحد (JSON responses)
        $exceptions->render(function (\Throwable $e, $request) {
            if ($request->expectsJson() || $request->is('api/*') || $request->is('admin/*')) {
                $handler = new \App\Exceptions\Handler(app());
                return $handler->render($request, $e);
            }
        });
    })->create();
