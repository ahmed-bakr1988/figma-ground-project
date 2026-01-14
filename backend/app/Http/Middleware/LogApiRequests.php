<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

/**
 * ================================
 * Middleware لتسجيل طلبات الـ API
 * ================================
 */
class LogApiRequests
{
    /**
     * المسارات المستثناة من التسجيل
     */
    protected array $excludedPaths = [
        'api/health',
        'sanctum/csrf-cookie',
    ];

    /**
     * الحقول الحساسة التي يجب إخفاؤها
     */
    protected array $sensitiveFields = [
        'password',
        'password_confirmation',
        'current_password',
        'token',
        'api_key',
        'secret',
    ];

    public function handle(Request $request, Closure $next): Response
    {
        // تخطي المسارات المستثناة
        foreach ($this->excludedPaths as $path) {
            if ($request->is($path)) {
                return $next($request);
            }
        }

        $startTime = microtime(true);

        $response = $next($request);

        $duration = round((microtime(true) - $startTime) * 1000, 2);

        // تسجيل الطلب
        $logData = [
            'method' => $request->method(),
            'url' => $request->fullUrl(),
            'ip' => $request->ip(),
            'user_id' => $request->user()?->id,
            'user_agent' => $request->userAgent(),
            'request_body' => $this->sanitizeData($request->all()),
            'response_status' => $response->getStatusCode(),
            'duration_ms' => $duration,
        ];

        // تسجيل بمستوى مختلف حسب كود الاستجابة
        if ($response->getStatusCode() >= 500) {
            Log::error('API Request Error', $logData);
        } elseif ($response->getStatusCode() >= 400) {
            Log::warning('API Request Warning', $logData);
        } else {
            Log::info('API Request', $logData);
        }

        // إضافة headers للاستجابة
        $response->headers->set('X-Request-Duration', $duration . 'ms');

        return $response;
    }

    /**
     * إخفاء البيانات الحساسة
     */
    protected function sanitizeData(array $data): array
    {
        foreach ($this->sensitiveFields as $field) {
            if (isset($data[$field])) {
                $data[$field] = '***HIDDEN***';
            }
        }

        return $data;
    }
}
