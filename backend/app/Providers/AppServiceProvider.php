<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

/**
 * مزود خدمة التطبيق الرئيسي
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * تسجيل أي خدمات للتطبيق
     */
    public function register(): void
    {
        //
    }

    /**
     * تهيئة أي خدمات للتطبيق
     */
    public function boot(): void
    {
        // إعداد الطول الافتراضي للنصوص في قاعدة البيانات
        Schema::defaultStringLength(191);
    }
}
