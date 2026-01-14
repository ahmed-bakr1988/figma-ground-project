<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * ================================
 * المتحكم الأساسي
 * ================================
 * 
 * جميع المتحكمات ترث من هذا المتحكم
 */
class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
