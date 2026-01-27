<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * ================================
 * Middleware لإضافة Cache Headers
 * ================================
 * 
 * يضيف HTTP Cache Headers للتحكم في التخزين المؤقت:
 * - Cache-Control للمتصفحات و CDN
 * - ETag للتحقق من التغييرات
 * - Vary header للتعامل مع اللغات
 * 
 * @usage Route::middleware('cache.headers:public') // للمحتوى الثابت
 * @usage Route::middleware('cache.headers:api')    // للـ API
 * @usage Route::middleware('cache.headers:private') // للمحتوى الخاص
 */
class SetCacheHeaders
{
    /**
     * معالجة الطلب وإضافة Cache Headers
     *
     * @param Request $request
     * @param Closure $next
     * @param string $cacheType نوع الكاش: 'public', 'api', 'private', 'none'
     * @return Response
     */
    public function handle(Request $request, Closure $next, string $cacheType = 'private'): Response
    {
        $response = $next($request);

        // تجاهل responses غير الناجحة
        if (!$response->isSuccessful()) {
            return $response;
        }

        // تجاهل responses التي تحتوي على بيانات حساسة
        if ($request->user() && $cacheType !== 'public') {
            $response->headers->set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            $response->headers->set('Pragma', 'no-cache');
            $response->headers->set('Expires', '0');
            return $response;
        }

        // ضبط Cache Headers بناءً على نوع المحتوى
        switch ($cacheType) {
            case 'public':
                // للمحتوى الثابت (صور، CSS، JS) - كاش طويل
                $response->headers->set('Cache-Control', 'public, max-age=31536000, immutable');
                break;

            case 'api':
                // للـ API responses - كاش قصير مع revalidation
                $response->headers->set('Cache-Control', 'public, max-age=60, s-maxage=120, stale-while-revalidate=86400');
                break;

            case 'page':
                // للصفحات HTML - كاش متوسط
                $response->headers->set('Cache-Control', 'public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400');
                break;

            case 'none':
                // بدون كاش
                $response->headers->set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
                $response->headers->set('Pragma', 'no-cache');
                $response->headers->set('Expires', '0');
                return $response;

            case 'private':
            default:
                // الافتراضي - كاش خاص قصير
                $response->headers->set('Cache-Control', 'private, max-age=300, must-revalidate');
                break;
        }

        // إضافة ETag للتحقق من التغييرات (إذا كان المحتوى نصي)
        $content = $response->getContent();
        if ($content && is_string($content) && strlen($content) < 1024 * 1024) { // < 1MB
            $etag = md5($content);
            $response->headers->set('ETag', '"' . $etag . '"');
            
            // التحقق من If-None-Match
            $ifNoneMatch = $request->header('If-None-Match');
            if ($ifNoneMatch && trim($ifNoneMatch, '"') === $etag) {
                $response->setStatusCode(304);
                $response->setContent('');
            }
        }

        // Vary header للتعامل مع اللغات والضغط
        $response->headers->set('Vary', 'Accept-Encoding, Accept-Language');

        return $response;
    }
}
