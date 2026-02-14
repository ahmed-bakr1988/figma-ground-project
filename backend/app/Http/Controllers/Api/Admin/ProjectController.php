<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * ================================
 * مُتحكم إدارة المشاريع
 * ================================
 */
class ProjectController extends Controller
{
    use ApiResponseTrait;

    /**
     * جلب جميع المشاريع (بما في ذلك غير النشطة)
     */
    public function index(Request $request): JsonResponse
    {
        $query = Project::with(['service'])->ordered();

        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        if ($serviceId = $request->input('service_id')) {
            $query->where('service_id', $serviceId);
        }

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title_ar', 'like', "%{$search}%")
                  ->orWhere('title_en', 'like', "%{$search}%")
                  ->orWhere('client_name', 'like', "%{$search}%")
                  ->orWhere('location_ar', 'like', "%{$search}%")
                  ->orWhere('location_en', 'like', "%{$search}%");
            });
        }

        $perPage = $request->input('per_page', 15);
        return $this->paginatedResponse($query->paginate($perPage), 'تم جلب المشاريع');
    }

    /**
     * جلب مشروع محدد
     */
    public function show(int $id): JsonResponse
    {
        $project = Project::with(['service', 'testimonials', 'creator'])
            ->withTrashed()
            ->findOrFail($id);

        return $this->successResponse(new ProjectResource($project), 'تم جلب المشروع');
    }

    /**
     * إنشاء مشروع جديد
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title_ar' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'description_ar' => 'required|string',
            'description_en' => 'required|string',
            'challenge_ar' => 'nullable|string',
            'challenge_en' => 'nullable|string',
            'solution_ar' => 'nullable|string',
            'solution_en' => 'nullable|string',
            'client_name' => 'required|string|max:255',
            'client_logo_url' => 'nullable|string|max:500',
            'client_testimonial_ar' => 'nullable|string',
            'client_testimonial_en' => 'nullable|string',
            'location_ar' => 'required|string|max:255',
            'location_en' => 'required|string|max:255',
            'start_date' => 'nullable|date',
            'completion_date' => 'nullable|date|after_or_equal:start_date',
            'duration_days' => 'nullable|integer|min:1',
            'project_type_ar' => 'required|string|max:255',
            'project_type_en' => 'required|string|max:255',
            'project_value' => 'nullable|numeric|min:0',
            'value_unit' => 'nullable|string|max:10',
            'area_sqm' => 'nullable|integer|min:1',
            'specifications' => 'nullable|array',
            'results_ar' => 'nullable|array',
            'results_en' => 'nullable|array',
            'roi_percentage' => 'nullable|integer|min:0|max:999',
            'thumbnail_url' => 'nullable|string|max:500',
            'cover_image_url' => 'nullable|string|max:500',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'string|max:500',
            'service_id' => 'nullable|exists:services,id',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'slug' => 'nullable|string|max:255|unique:projects,slug',
            'meta_title_ar' => 'nullable|string|max:255',
            'meta_title_en' => 'nullable|string|max:255',
            'meta_description_ar' => 'nullable|string',
            'meta_description_en' => 'nullable|string',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title_en']);
            $count = Project::where('slug', 'like', $validated['slug'] . '%')->count();
            if ($count > 0) {
                $validated['slug'] .= '-' . ($count + 1);
            }
        }

        $validated['created_by'] = auth()->id();

        $project = Project::create($validated);

        return $this->createdResponse(
            new ProjectResource($project->load('service')),
            'تم إنشاء المشروع بنجاح'
        );
    }

    /**
     * تحديث مشروع
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $project = Project::findOrFail($id);

        $validated = $request->validate([
            'title_ar' => 'sometimes|required|string|max:255',
            'title_en' => 'sometimes|required|string|max:255',
            'description_ar' => 'sometimes|required|string',
            'description_en' => 'sometimes|required|string',
            'challenge_ar' => 'nullable|string',
            'challenge_en' => 'nullable|string',
            'solution_ar' => 'nullable|string',
            'solution_en' => 'nullable|string',
            'client_name' => 'sometimes|required|string|max:255',
            'client_logo_url' => 'nullable|string|max:500',
            'client_testimonial_ar' => 'nullable|string',
            'client_testimonial_en' => 'nullable|string',
            'location_ar' => 'sometimes|required|string|max:255',
            'location_en' => 'sometimes|required|string|max:255',
            'start_date' => 'nullable|date',
            'completion_date' => 'nullable|date',
            'duration_days' => 'nullable|integer|min:1',
            'project_type_ar' => 'sometimes|required|string|max:255',
            'project_type_en' => 'sometimes|required|string|max:255',
            'project_value' => 'nullable|numeric|min:0',
            'value_unit' => 'nullable|string|max:10',
            'area_sqm' => 'nullable|integer|min:1',
            'specifications' => 'nullable|array',
            'results_ar' => 'nullable|array',
            'results_en' => 'nullable|array',
            'roi_percentage' => 'nullable|integer|min:0|max:999',
            'thumbnail_url' => 'nullable|string|max:500',
            'cover_image_url' => 'nullable|string|max:500',
            'gallery_images' => 'nullable|array',
            'gallery_images.*' => 'string|max:500',
            'service_id' => 'nullable|exists:services,id',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'slug' => 'nullable|string|max:255|unique:projects,slug,' . $id,
            'meta_title_ar' => 'nullable|string|max:255',
            'meta_title_en' => 'nullable|string|max:255',
            'meta_description_ar' => 'nullable|string',
            'meta_description_en' => 'nullable|string',
        ]);

        $project->update($validated);

        return $this->successResponse(
            new ProjectResource($project->fresh()->load('service')),
            'تم تحديث المشروع بنجاح'
        );
    }

    /**
     * حذف مشروع (Soft Delete)
     */
    public function destroy(int $id): JsonResponse
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return $this->deletedResponse('تم حذف المشروع بنجاح');
    }

    /**
     * استعادة مشروع محذوف
     */
    public function restore(int $id): JsonResponse
    {
        $project = Project::onlyTrashed()->findOrFail($id);
        $project->restore();
        return $this->successResponse(
            new ProjectResource($project->load('service')),
            'تم استعادة المشروع بنجاح'
        );
    }

    /**
     * تبديل حالة التفعيل
     */
    public function toggleActive(int $id): JsonResponse
    {
        $project = Project::findOrFail($id);
        $project->update(['is_active' => !$project->is_active]);
        return $this->successResponse(
            ['is_active' => $project->is_active],
            $project->is_active ? 'تم تفعيل المشروع' : 'تم إيقاف المشروع'
        );
    }

    /**
     * تبديل حالة التمييز
     */
    public function toggleFeatured(int $id): JsonResponse
    {
        $project = Project::findOrFail($id);
        $project->update(['is_featured' => !$project->is_featured]);
        return $this->successResponse(
            ['is_featured' => $project->is_featured],
            $project->is_featured ? 'تم تمييز المشروع' : 'تم إلغاء تمييز المشروع'
        );
    }
}
