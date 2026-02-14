<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

/**
 * ================================
 * مُتحكم إدارة المقالات
 * ================================
 */
class BlogPostController extends Controller
{
    use ApiResponseTrait;

    /**
     * جلب جميع المقالات (بما في ذلك المسودات)
     */
    public function index(Request $request): JsonResponse
    {
        $query = BlogPost::with(['author'])->latest('created_at');

        if ($request->has('is_published')) {
            $query->where('is_published', $request->boolean('is_published'));
        }

        if ($request->boolean('featured')) {
            $query->where('is_featured', true);
        }

        if ($category = $request->input('category')) {
            $query->where(function ($q) use ($category) {
                $q->where('category_ar', $category)
                  ->orWhere('category_en', $category);
            });
        }

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title_ar', 'like', "%{$search}%")
                  ->orWhere('title_en', 'like', "%{$search}%")
                  ->orWhere('content_ar', 'like', "%{$search}%")
                  ->orWhere('content_en', 'like', "%{$search}%");
            });
        }

        $perPage = $request->input('per_page', 15);
        return $this->paginatedResponse($query->paginate($perPage), 'تم جلب المقالات');
    }

    /**
     * جلب مقال محدد
     */
    public function show(int $id): JsonResponse
    {
        $post = BlogPost::with(['author'])->withTrashed()->findOrFail($id);
        return $this->successResponse(new BlogPostResource($post), 'تم جلب المقال');
    }

    /**
     * إنشاء مقال جديد
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title_ar' => 'required|string|max:255',
            'title_en' => 'required|string|max:255',
            'excerpt_ar' => 'required|string',
            'excerpt_en' => 'required|string',
            'content_ar' => 'required|string',
            'content_en' => 'required|string',
            'thumbnail_url' => 'nullable|string|max:500',
            'cover_image_url' => 'nullable|string|max:500',
            'category_ar' => 'required|string|max:255',
            'category_en' => 'required|string|max:255',
            'tags_ar' => 'nullable|array',
            'tags_en' => 'nullable|array',
            'author_name' => 'nullable|string|max:255',
            'reading_time_minutes' => 'nullable|integer|min:1',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
            'published_at' => 'nullable|date',
            'slug' => 'nullable|string|max:255|unique:blog_posts,slug',
            'meta_title_ar' => 'nullable|string|max:255',
            'meta_title_en' => 'nullable|string|max:255',
            'meta_description_ar' => 'nullable|string',
            'meta_description_en' => 'nullable|string',
            'meta_keywords_ar' => 'nullable|array',
            'meta_keywords_en' => 'nullable|array',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title_en']);
            $count = BlogPost::where('slug', 'like', $validated['slug'] . '%')->count();
            if ($count > 0) {
                $validated['slug'] .= '-' . ($count + 1);
            }
        }

        $validated['author_id'] = auth()->id();

        // نشر تلقائي إذا تم التفعيل بدون تحديد تاريخ
        if (($validated['is_published'] ?? false) && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $post = BlogPost::create($validated);

        return $this->createdResponse(
            new BlogPostResource($post->load('author')),
            'تم إنشاء المقال بنجاح'
        );
    }

    /**
     * تحديث مقال
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $post = BlogPost::findOrFail($id);

        $validated = $request->validate([
            'title_ar' => 'sometimes|required|string|max:255',
            'title_en' => 'sometimes|required|string|max:255',
            'excerpt_ar' => 'sometimes|required|string',
            'excerpt_en' => 'sometimes|required|string',
            'content_ar' => 'sometimes|required|string',
            'content_en' => 'sometimes|required|string',
            'thumbnail_url' => 'nullable|string|max:500',
            'cover_image_url' => 'nullable|string|max:500',
            'category_ar' => 'sometimes|required|string|max:255',
            'category_en' => 'sometimes|required|string|max:255',
            'tags_ar' => 'nullable|array',
            'tags_en' => 'nullable|array',
            'author_name' => 'nullable|string|max:255',
            'reading_time_minutes' => 'nullable|integer|min:1',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
            'published_at' => 'nullable|date',
            'slug' => 'nullable|string|max:255|unique:blog_posts,slug,' . $id,
            'meta_title_ar' => 'nullable|string|max:255',
            'meta_title_en' => 'nullable|string|max:255',
            'meta_description_ar' => 'nullable|string',
            'meta_description_en' => 'nullable|string',
            'meta_keywords_ar' => 'nullable|array',
            'meta_keywords_en' => 'nullable|array',
        ]);

        // نشر تلقائي عند التفعيل لأول مرة
        if (isset($validated['is_published']) && $validated['is_published'] && !$post->is_published) {
            $validated['published_at'] = $validated['published_at'] ?? now();
        }

        $post->update($validated);

        return $this->successResponse(
            new BlogPostResource($post->fresh()->load('author')),
            'تم تحديث المقال بنجاح'
        );
    }

    /**
     * حذف مقال (Soft Delete)
     */
    public function destroy(int $id): JsonResponse
    {
        $post = BlogPost::findOrFail($id);
        $post->delete();
        return $this->deletedResponse('تم حذف المقال بنجاح');
    }

    /**
     * استعادة مقال محذوف
     */
    public function restore(int $id): JsonResponse
    {
        $post = BlogPost::onlyTrashed()->findOrFail($id);
        $post->restore();
        return $this->successResponse(
            new BlogPostResource($post->load('author')),
            'تم استعادة المقال بنجاح'
        );
    }

    /**
     * تبديل حالة النشر
     */
    public function togglePublished(int $id): JsonResponse
    {
        $post = BlogPost::findOrFail($id);
        $data = ['is_published' => !$post->is_published];

        if ($data['is_published'] && !$post->published_at) {
            $data['published_at'] = now();
        }

        $post->update($data);

        return $this->successResponse(
            ['is_published' => $post->is_published],
            $post->is_published ? 'تم نشر المقال' : 'تم إلغاء نشر المقال'
        );
    }

    /**
     * تبديل حالة التمييز
     */
    public function toggleFeatured(int $id): JsonResponse
    {
        $post = BlogPost::findOrFail($id);
        $post->update(['is_featured' => !$post->is_featured]);

        return $this->successResponse(
            ['is_featured' => $post->is_featured],
            $post->is_featured ? 'تم تمييز المقال' : 'تم إلغاء تمييز المقال'
        );
    }
}
