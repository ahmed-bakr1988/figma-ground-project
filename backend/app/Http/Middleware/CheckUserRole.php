<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * ================================
 * Middleware للتحقق من دور المستخدم
 * ================================
 */
class CheckUserRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'غير مصرح لك بالوصول',
                'errors' => [],
                'meta' => ['timestamp' => now()->toIso8601String()],
            ], 401);
        }

        // التحقق من أن دور المستخدم ضمن الأدوار المسموحة
        if (!in_array($user->role, $roles)) {
            return response()->json([
                'success' => false,
                'message' => 'ليس لديك صلاحية للوصول إلى هذا المورد',
                'errors' => [],
                'meta' => ['timestamp' => now()->toIso8601String()],
            ], 403);
        }

        return $next($request);
    }
}
