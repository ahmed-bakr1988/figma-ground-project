<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FaqResource;
use App\Models\Faq;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * ================================
 * مُتحكم الأسئلة الشائعة
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
        $query = Faq::active()->ordered();

        // فلترة حسب الفئة
        if ($category = $request->input('category')) {
            $query->byCategory($category);
        }

        // فلترة المميزة فقط
        if ($request->boolean('featured')) {
            $query->featured();
        }

        // البحث
        if ($search = $request->input('search')) {
            $query->where(function($q) use ($search) {
                $q->where('question_ar', 'like', "%{$search}%")
                  ->orWhere('question_en', 'like', "%{$search}%")
                  ->orWhere('answer_ar', 'like', "%{$search}%")
                  ->orWhere('answer_en', 'like', "%{$search}%");
            });
        }

        $faqs = $query->get();

        return $this->successResponse(
            FaqResource::collection($faqs),
            'تم جلب الأسئلة الشائعة بنجاح'
        );
    }

    /**
     * جلب سؤال محدد
     */
    public function show(int $id): JsonResponse
    {
        $faq = Faq::active()->findOrFail($id);

        return $this->successResponse(
            new FaqResource($faq),
            'تم جلب السؤال بنجاح'
        );
    }

    /**
     * جلب الفئات المتاحة
     */
    public function categories(): JsonResponse
    {
        $categories = Faq::active()
            ->selectRaw('category_ar, category_en, COUNT(*) as count')
            ->groupBy('category_ar', 'category_en')
            ->orderByDesc('count')
            ->get();

        return $this->successResponse($categories, 'تم جلب الفئات بنجاح');
    }

    /**
     * تسجيل تقييم (هل كانت الإجابة مفيدة؟)
     */
    public function feedback(int $id, Request $request): JsonResponse
    {
        $request->validate([
            'helpful' => 'required|boolean',
        ]);

        $faq = Faq::active()->findOrFail($id);
        $faq->markHelpful($request->boolean('helpful'));

        return $this->successResponse(
            ['helpful_percentage' => $faq->helpful_percentage],
            'شكراً لملاحظاتك'
        );
    }
}
