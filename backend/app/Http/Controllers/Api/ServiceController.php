<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * ================================
 * مُتحكم الخدمات
 * ================================
 */
class ServiceController extends Controller
{
    use ApiResponseTrait;

    /**
     * جلب جميع الخدمات
     */
    public function index(Request $request): JsonResponse
    {
        $query = Service::active()->ordered();

        // فلترة الخدمات المميزة
        if ($request->boolean('featured')) {
            $query->featured();
        }

        // البحث
        if ($search = $request->input('search')) {
            $query->where(function($q) use ($search) {
                $q->where('title_ar', 'like', "%{$search}%")
                  ->orWhere('title_en', 'like', "%{$search}%")
                  ->orWhere('description_ar', 'like', "%{$search}%")
                  ->orWhere('description_en', 'like', "%{$search}%");
            });
        }

        // Pagination أو جلب الكل
        if ($request->boolean('all')) {
            $services = $query->get();
            return $this->successResponse(
                ServiceResource::collection($services),
                'تم جلب جميع الخدمات بنجاح'
            );
        }

        $perPage = $request->input('per_page', config('app.api.pagination_per_page'));
        $services = $query->paginate($perPage);

        return $this->paginatedResponse($services, 'تم جلب الخدمات بنجاح');
    }

    /**
     * جلب خدمة محددة
     */
    public function show(string $slug): JsonResponse
    {
        $service = Service::where('slug', $slug)->active()->firstOrFail();

        return $this->successResponse(
            new ServiceResource($service),
            'تم جلب الخدمة بنجاح'
        );
    }

    /**
     * جلب الخدمات المميزة
     */
    public function featured(): JsonResponse
    {
        $services = Service::active()->featured()->ordered()->limit(6)->get();

        return $this->successResponse(
            ServiceResource::collection($services),
            'تم جلب الخدمات المميزة بنجاح'
        );
    }
}
