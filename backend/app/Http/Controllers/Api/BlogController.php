<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * ================================
 * مُتحكم المقالات
 * ================================
 */
class BlogController extends Controller
{
    use ApiResponseTrait;

    /**
     * جلب جميع المقالات
     */
    public function index(Request $request): JsonResponse
    {
        $query = BlogPost::with(['author'])->published();

        // فلترة المقالات المميزة
        if ($request->boolean('featured')) {
            $query->featured();
        }

        // فلترة حسب الفئة
        if ($category = $request->input('category')) {
            $query->byCategory($category);
        }

        // البحث
        if ($search = $request->input('search')) {
            $query->search($search);
        }

        // الترتيب
        $sortBy = $request->input('sort', 'published_at');
        $sortOrder = $request->input('order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $perPage = $request->input('per_page', config('app.api.pagination_per_page'));
        $posts = $query->paginate($perPage);

        return $this->paginatedResponse($posts, 'تم جلب المقالات بنجاح');
    }

    /**
     * جلب مقال محدد
     */
    public function show(string $slug): JsonResponse
    {
        $post = BlogPost::with(['author'])
            ->where('slug', $slug)
            ->published()
            ->firstOrFail();

        // زيادة عدد المشاهدات
        $post->incrementViews();

        return $this->successResponse(
            new BlogPostResource($post),
            'تم جلب المقال بنجاح'
        );
    }

    /**
     * جلب المقالات المميزة
     */
    public function featured(): JsonResponse
    {
        $posts = BlogPost::with(['author'])
            ->published()
            ->featured()
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();

        return $this->successResponse(
            BlogPostResource::collection($posts),
            'تم جلب المقالات المميزة بنجاح'
        );
    }

    /**
     * جلب أحدث المقالات
     */
    public function latest(): JsonResponse
    {
        $posts = BlogPost::with(['author'])
            ->published()
            ->orderBy('published_at', 'desc')
            ->limit(5)
            ->get();

        return $this->successResponse(
            BlogPostResource::collection($posts),
            'تم جلب أحدث المقالات بنجاح'
        );
    }

    /**
     * جلب المقالات ذات الصلة
     */
    public function related(string $slug): JsonResponse
    {
        $post = BlogPost::where('slug', $slug)->firstOrFail();

        $relatedPosts = BlogPost::with(['author'])
            ->published()
            ->where('id', '!=', $post->id)
            ->where(function($q) use ($post) {
                $q->where('category_ar', $post->category_ar)
                  ->orWhere('category_en', $post->category_en);
            })
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();

        return $this->successResponse(
            BlogPostResource::collection($relatedPosts),
            'تم جلب المقالات ذات الصلة بنجاح'
        );
    }

    /**
     * جلب الفئات المتاحة
     */
    public function categories(): JsonResponse
    {
        $categories = BlogPost::published()
            ->selectRaw('category_ar, category_en, COUNT(*) as count')
            ->groupBy('category_ar', 'category_en')
            ->orderByDesc('count')
            ->get();

        return $this->successResponse($categories, 'تم جلب الفئات بنجاح');
    }

    /**
     * جلب الوسوم المتاحة
     */
    public function tags(): JsonResponse
    {
        $posts = BlogPost::published()->get(['tags_ar', 'tags_en']);
        
        $tagsAr = collect();
        $tagsEn = collect();
        
        foreach ($posts as $post) {
            if ($post->tags_ar) $tagsAr = $tagsAr->merge($post->tags_ar);
            if ($post->tags_en) $tagsEn = $tagsEn->merge($post->tags_en);
        }

        return $this->successResponse([
            'ar' => $tagsAr->countBy()->sortDesc()->take(20),
            'en' => $tagsEn->countBy()->sortDesc()->take(20),
        ], 'تم جلب الوسوم بنجاح');
    }
}
