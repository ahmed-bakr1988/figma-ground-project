<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;
use Throwable;

/**
 * ================================
 * معالج الاستثناءات
 * ================================
 * 
 * يوفر استجابات خطأ موحدة لجميع أنواع الاستثناءات
 */
class Handler extends ExceptionHandler
{
    /**
     * الاستثناءات التي لا يتم تسجيلها
     */
    protected $dontReport = [
        AuthenticationException::class,
    ];

    /**
     * الحقول التي لا يتم عرضها في أخطاء التحقق
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * تسجيل معالجات الاستثناءات
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * عرض الاستثناء كـ JSON للـ API و Admin
     */
    public function render($request, Throwable $e)
    {
        // التأكد من أن الطلب للـ API أو Admin
        if ($request->expectsJson() || $request->is('api/*') || $request->is('admin/*')) {
            return $this->handleApiException($request, $e);
        }

        return parent::render($request, $e);
    }

    /**
     * معالجة استثناءات الـ API
     */
    protected function handleApiException($request, Throwable $e)
    {
        $statusCode = 500;
        $message = 'حدث خطأ في الخادم';
        $errors = [];

        // معالجة أنواع الاستثناءات المختلفة
        if ($e instanceof ValidationException) {
            $statusCode = 422;
            $message = 'فشل التحقق من البيانات';
            $errors = $e->errors();
        } elseif ($e instanceof AuthenticationException) {
            $statusCode = 401;
            $message = 'غير مصرح لك بالوصول';
        } elseif ($e instanceof ModelNotFoundException) {
            $statusCode = 404;
            $message = 'المورد المطلوب غير موجود';
        } elseif ($e instanceof NotFoundHttpException) {
            $statusCode = 404;
            $message = 'المسار المطلوب غير موجود';
        } elseif ($e instanceof MethodNotAllowedHttpException) {
            $statusCode = 405;
            $message = 'طريقة الطلب غير مسموحة';
        } elseif ($e instanceof TooManyRequestsHttpException) {
            $statusCode = 429;
            $message = 'تم تجاوز الحد المسموح من الطلبات. يرجى المحاولة لاحقاً.';
        }

        // في بيئة التطوير، أظهر المزيد من التفاصيل
        $debugInfo = [];
        if (config('app.debug')) {
            $debugInfo = [
                'exception' => get_class($e),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => collect($e->getTrace())->take(5)->toArray(),
            ];
        }

        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
            'meta' => array_merge([
                'timestamp' => now()->toIso8601String(),
            ], $debugInfo),
        ], $statusCode);
    }

    /**
     * معالجة استثناء المصادقة
     * التطبيق SPA - جميع المسارات ترجع JSON 401
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        return response()->json([
            'success' => false,
            'message' => 'غير مصرح لك بالوصول. يرجى تسجيل الدخول.',
            'errors' => [],
            'meta' => [
                'timestamp' => now()->toIso8601String(),
            ],
        ], 401);
    }
}
