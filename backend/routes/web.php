<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| هذه المسارات للـ Web (تستخدم للـ CSRF cookie فقط في حالة SPA)
|
*/

Route::get('/', function () {
    return response()->json([
        'name' => config('app.name'),
        'version' => config('app.api.version'),
        'documentation' => url('/api/docs'),
    ]);
});
