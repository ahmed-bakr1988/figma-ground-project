<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\FaqResource;
use App\Models\Faq;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * ================================
 * مُتحكم إدارة الأسئلة الشائعة
 * ================================
 */
class FaqController extends Controller
{
    use ApiResponseTrait;

    /**
     * جلب جميع الأسئلة الشائعة
     */
    public function index(Request $request): JsonResponse
    {
        $query = Faq::query()->ordered();

        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
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
                $q->where('question_ar', 'like', "%{$search}%")
                  ->orWhere('question_en', 'like', "%{$search}%")
                  ->orWhere('answer_ar', 'like', "%{$search}%")
                  ->orWhere('answer_en', 'like', "%{$search}%");
            });
        }

        if ($request->boolean('all')) {
            return $this->successResponse(
                FaqResource::collection($query->get()),
                'تم جلب الأسئلة الشائعة'
            );
        }

        $perPage = $request->input('per_page', 15);
        return $this->paginatedResponse($query->paginate($perPage), 'تم جلب الأسئلة الشائعة');
    }

    /**
     * جلب سؤال محدد
     */
    public function show(int $id): JsonResponse
    {
        $faq = Faq::withTrashed()->findOrFail($id);
        return $this->successResponse(new FaqResource($faq), 'تم جلب السؤال');
    }

    /**
     * إنشاء سؤال جديد
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'question_ar' => 'required|string|max:500',
            'question_en' => 'required|string|max:500',
            'answer_ar' => 'required|string',
            'answer_en' => 'required|string',
            'category_ar' => 'required|string|max:255',
            'category_en' => 'required|string|max:255',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $faq = Faq::create($validated);

        return $this->createdResponse(
            new FaqResource($faq),
            'تم إنشاء السؤال بنجاح'
        );
    }

    /**
     * تحديث سؤال
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $faq = Faq::findOrFail($id);

        $validated = $request->validate([
            'question_ar' => 'sometimes|required|string|max:500',
            'question_en' => 'sometimes|required|string|max:500',
            'answer_ar' => 'sometimes|required|string',
            'answer_en' => 'sometimes|required|string',
            'category_ar' => 'sometimes|required|string|max:255',
            'category_en' => 'sometimes|required|string|max:255',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ]);

        $faq->update($validated);

        return $this->successResponse(
            new FaqResource($faq->fresh()),
            'تم تحديث السؤال بنجاح'
        );
    }

    /**
     * حذف سؤال (Soft Delete)
     */
    public function destroy(int $id): JsonResponse
    {
        $faq = Faq::findOrFail($id);
        $faq->delete();
        return $this->deletedResponse('تم حذف السؤال بنجاح');
    }

    /**
     * استعادة سؤال محذوف
     */
    public function restore(int $id): JsonResponse
    {
        $faq = Faq::onlyTrashed()->findOrFail($id);
        $faq->restore();
        return $this->successResponse(
            new FaqResource($faq),
            'تم استعادة السؤال بنجاح'
        );
    }

    /**
     * تبديل حالة التفعيل
     */
    public function toggleActive(int $id): JsonResponse
    {
        $faq = Faq::findOrFail($id);
        $faq->update(['is_active' => !$faq->is_active]);
        return $this->successResponse(
            ['is_active' => $faq->is_active],
            $faq->is_active ? 'تم تفعيل السؤال' : 'تم إيقاف السؤال'
        );
    }

    /**
     * إعادة ترتيب الأسئلة
     */
    public function reorder(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:faqs,id',
            'items.*.sort_order' => 'required|integer|min:0',
        ]);

        foreach ($validated['items'] as $item) {
            Faq::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return $this->successResponse(null, 'تم إعادة ترتيب الأسئلة بنجاح');
    }
}
