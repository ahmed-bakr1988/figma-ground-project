<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * ================================
 * Middleware للتأكد من أن الطلب JSON
 * ================================
 */
class ValidateJsonRequest
{
    public function handle(Request $request, Closure $next): Response
    {
        // التأكد من أن الطلب يحتوي على Content-Type صحيح للـ POST/PUT/PATCH
        if (in_array($request->method(), ['POST', 'PUT', 'PATCH'])) {
            if (!$request->isJson() && !$request->hasFile('*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'يجب أن يكون Content-Type: application/json',
                    'errors' => [],
                    'meta' => ['timestamp' => now()->toIso8601String()],
                ], 415);
            }
        }

        // إضافة Accept: application/json تلقائياً
        $request->headers->set('Accept', 'application/json');

        return $next($request);
    }
}
