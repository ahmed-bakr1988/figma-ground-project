<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * ================================
 * Middleware لتحديد اللغة
 * ================================
 */
class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        // تحديد اللغة من الـ Header
        $locale = $request->header('Accept-Language', 'ar');
        
        // أو من Query Parameter
        if ($request->has('lang')) {
            $locale = $request->input('lang');
        }

        // التأكد من أن اللغة مدعومة
        $supportedLocales = ['ar', 'en'];
        $locale = in_array($locale, $supportedLocales) ? $locale : 'ar';

        app()->setLocale($locale);

        $response = $next($request);

        // إضافة اللغة للـ Response Headers
        $response->headers->set('Content-Language', $locale);

        return $response;
    }
}
