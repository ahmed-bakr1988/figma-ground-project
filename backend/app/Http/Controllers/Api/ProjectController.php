<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * ================================
 * مُتحكم المشاريع
 * ================================
 */
class ProjectController extends Controller
{
    use ApiResponseTrait;

    /**
     * جلب جميع المشاريع
     */
    public function index(Request $request): JsonResponse
    {
        $query = Project::with(['service'])->active()->ordered();

        // فلترة المشاريع المميزة
        if ($request->boolean('featured')) {
            $query->featured();
        }

        // فلترة حسب الخدمة
        if ($serviceId = $request->input('service_id')) {
            $query->byService($serviceId);
        }

        // البحث
        if ($search = $request->input('search')) {
            $query->where(function($q) use ($search) {
                $q->where('title_ar', 'like', "%{$search}%")
                  ->orWhere('title_en', 'like', "%{$search}%")
                  ->orWhere('client_name', 'like', "%{$search}%")
                  ->orWhere('location_ar', 'like', "%{$search}%")
                  ->orWhere('location_en', 'like', "%{$search}%");
            });
        }

        // فلترة حسب نوع المشروع
        if ($type = $request->input('type')) {
            $query->where(function($q) use ($type) {
                $q->where('project_type_ar', $type)
                  ->orWhere('project_type_en', $type);
            });
        }

        $perPage = $request->input('per_page', config('app.api.pagination_per_page'));
        $projects = $query->paginate($perPage);

        return $this->paginatedResponse($projects, 'تم جلب المشاريع بنجاح');
    }

    /**
     * جلب مشروع محدد
     */
    public function show(string $slug): JsonResponse
    {
        $project = Project::with(['service', 'testimonials'])
            ->where('slug', $slug)
            ->active()
            ->firstOrFail();

        return $this->successResponse(
            new ProjectResource($project),
            'تم جلب المشروع بنجاح'
        );
    }

    /**
     * جلب المشاريع المميزة
     */
    public function featured(): JsonResponse
    {
        $projects = Project::with(['service'])
            ->active()
            ->featured()
            ->ordered()
            ->limit(6)
            ->get();

        return $this->successResponse(
            ProjectResource::collection($projects),
            'تم جلب المشاريع المميزة بنجاح'
        );
    }

    /**
     * جلب المشاريع ذات الصلة
     */
    public function related(string $slug): JsonResponse
    {
        $project = Project::where('slug', $slug)->firstOrFail();

        $relatedProjects = Project::with(['service'])
            ->active()
            ->where('id', '!=', $project->id)
            ->where(function($q) use ($project) {
                $q->where('service_id', $project->service_id)
                  ->orWhere('project_type_ar', $project->project_type_ar);
            })
            ->ordered()
            ->limit(3)
            ->get();

        return $this->successResponse(
            ProjectResource::collection($relatedProjects),
            'تم جلب المشاريع ذات الصلة بنجاح'
        );
    }

    /**
     * جلب إحصائيات المشاريع
     */
    public function stats(): JsonResponse
    {
        $stats = [
            'total_projects' => Project::active()->count(),
            'total_value' => Project::active()->sum('project_value'),
            'total_area' => Project::active()->sum('area_sqm'),
            'avg_roi' => Project::active()->whereNotNull('roi_percentage')->avg('roi_percentage'),
            'by_type' => Project::active()
                ->selectRaw('project_type_ar, project_type_en, COUNT(*) as count')
                ->groupBy('project_type_ar', 'project_type_en')
                ->get(),
        ];

        return $this->successResponse($stats, 'تم جلب الإحصائيات بنجاح');
    }
}
