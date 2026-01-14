<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * ================================
 * Middleware لإضافة Security Headers
 * ================================
 * 
 * يضيف HTTP Security Headers للحماية من:
 * - XSS Attacks
 * - Clickjacking
 * - MIME Type Sniffing
 * - Information Disclosure
 */
class SecurityHeaders
{
    /**
     * معالجة الطلب
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // حماية من MIME Type Sniffing
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // حماية من Clickjacking
        $response->headers->set('X-Frame-Options', 'DENY');

        // حماية من XSS (قديم لكن مازال مفيد)
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        // Referrer Policy للخصوصية
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // HTTPS Strict Transport Security (Production only)
        if (config('app.env') === 'production') {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        }

        // Permissions Policy (تعطيل features غير مستخدمة)
        $response->headers->set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

        return $response;
    }
}
