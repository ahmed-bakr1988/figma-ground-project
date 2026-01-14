<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * ================================
 * Middleware للتحقق من وضع الصيانة
 * ================================
 */
class CheckMaintenanceMode
{
    /**
     * المسارات المستثناة من وضع الصيانة
     */
    protected array $excludedPaths = [
        'api/health',
        'api/status',
    ];

    /**
     * عناوين IP المسموح لها أثناء الصيانة
     */
    protected array $allowedIps = [
        '127.0.0.1',
        '::1',
    ];

    public function handle(Request $request, Closure $next): Response
    {
        // التحقق من وضع الصيانة
        if (!env('MAINTENANCE_MODE', false)) {
            return $next($request);
        }

        // السماح للمسارات المستثناة
        foreach ($this->excludedPaths as $path) {
            if ($request->is($path)) {
                return $next($request);
            }
        }

        // السماح لعناوين IP المحددة
        if (in_array($request->ip(), $this->allowedIps)) {
            return $next($request);
        }

        // التحقق من الـ Secret Header
        $secret = env('MAINTENANCE_SECRET');
        if ($secret && $request->header('X-Maintenance-Secret') === $secret) {
            return $next($request);
        }

        return response()->json([
            'success' => false,
            'message' => 'الموقع قيد الصيانة حالياً. يرجى المحاولة لاحقاً.',
            'errors' => [],
            'meta' => [
                'timestamp' => now()->toIso8601String(),
                'maintenance_mode' => true,
            ],
        ], 503);
    }
}
