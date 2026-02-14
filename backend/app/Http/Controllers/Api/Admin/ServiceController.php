<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * ================================
 * مُتحكم إدارة الخدمات
 * ================================
 */
class ServiceController extends Controller
{
    use ApiResponseTrait;

    /**
     * جلب جميع الخدمات (بما في ذلك غير النشطة)
     */
    public function index(Request $request): JsonResponse
    {
        $query = Service::query()->ordered();

        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title_ar', 'like', "%{$search}%")
                  ->orWhere('title_en', 'like', "%{$search}%")
                  ->orWhere('description_ar', 'like', "%{$search}%")
                  ->orWhere('description_en', 'like', "%{$search}%");
            });
        }

        if ($request->boolean('all')) {
            return $this->successResponse(
                ServiceResource::collection($query->get()),
                'تم جلب جميع الخدمات'
            );
        }

        $perPage = $request->input('per_page', 15);
        return $this->paginatedResponse($query->paginate($perPage), 'تم جلب الخدمات');
    }

    /**
     * جلب خدمة محددة
     */
    public function show(int $id): JsonResponse
    {
        $service = Service::withTrashed()->findOrFail($id);
        return $this->successResponse(new ServiceResource($service), 'تم جلب الخدمة');
    }

    /**
     * إنشاء خدمة جديدة
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title_ar' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'description_ar' => 'required|string',
            'description_en' => 'required|string',
            'short_description_ar' => 'nullable|string',
            'short_description_en' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'image_url' => 'nullable|string|max:500',
            'cover_image_url' => 'nullable|string|max:500',
            'features_ar' => 'nullable|array',
            'features_en' => 'nullable|array',
            'starting_price' => 'nullable|numeric|min:0',
            'price_unit' => 'nullable|string|max:10',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'slug' => 'nullable|string|max:255|unique:services,slug',
            'meta_title_ar' => 'nullable|string|max:255',
            'meta_title_en' => 'nullable|string|max:255',
            'meta_description_ar' => 'nullable|string',
            'meta_description_en' => 'nullable|string',
        ]);

        // توليد slug تلقائي إذا لم يُحدد
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title_en']);
            // التأكد من عدم التكرار
            $count = Service::where('slug', 'like', $validated['slug'] . '%')->count();
            if ($count > 0) {
                $validated['slug'] .= '-' . ($count + 1);
            }
        }

        $service = Service::create($validated);

        return $this->createdResponse(
            new ServiceResource($service),
            'تم إنشاء الخدمة بنجاح'
        );
    }

    /**
     * تحديث خدمة
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $service = Service::findOrFail($id);

        $validated = $request->validate([
            'title_ar' => 'sometimes|required|string|max:255',
            'title_en' => 'sometimes|required|string|max:255',
            'description_ar' => 'sometimes|required|string',
            'description_en' => 'sometimes|required|string',
            'short_description_ar' => 'nullable|string',
            'short_description_en' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'image_url' => 'nullable|string|max:500',
            'cover_image_url' => 'nullable|string|max:500',
            'features_ar' => 'nullable|array',
            'features_en' => 'nullable|array',
            'starting_price' => 'nullable|numeric|min:0',
            'price_unit' => 'nullable|string|max:10',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'slug' => 'nullable|string|max:255|unique:services,slug,' . $id,
            'meta_title_ar' => 'nullable|string|max:255',
            'meta_title_en' => 'nullable|string|max:255',
            'meta_description_ar' => 'nullable|string',
            'meta_description_en' => 'nullable|string',
        ]);

        $service->update($validated);

        return $this->successResponse(
            new ServiceResource($service->fresh()),
            'تم تحديث الخدمة بنجاح'
        );
    }

    /**
     * حذف خدمة (Soft Delete)
     */
    public function destroy(int $id): JsonResponse
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return $this->deletedResponse('تم حذف الخدمة بنجاح');
    }

    /**
     * استعادة خدمة محذوفة
     */
    public function restore(int $id): JsonResponse
    {
        $service = Service::onlyTrashed()->findOrFail($id);
        $service->restore();

        return $this->successResponse(
            new ServiceResource($service),
            'تم استعادة الخدمة بنجاح'
        );
    }

    /**
     * تبديل حالة التفعيل
     */
    public function toggleActive(int $id): JsonResponse
    {
        $service = Service::findOrFail($id);
        $service->update(['is_active' => !$service->is_active]);

        return $this->successResponse(
            ['is_active' => $service->is_active],
            $service->is_active ? 'تم تفعيل الخدمة' : 'تم إيقاف الخدمة'
        );
    }

    /**
     * تبديل حالة التمييز
     */
    public function toggleFeatured(int $id): JsonResponse
    {
        $service = Service::findOrFail($id);
        $service->update(['is_featured' => !$service->is_featured]);

        return $this->successResponse(
            ['is_featured' => $service->is_featured],
            $service->is_featured ? 'تم تمييز الخدمة' : 'تم إلغاء تمييز الخدمة'
        );
    }
}
