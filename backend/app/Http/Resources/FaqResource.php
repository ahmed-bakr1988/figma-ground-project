<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * ================================
 * Resource للأسئلة الشائعة
 * ================================
 */
class FaqResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();
        $isArabic = $locale === 'ar';

        return [
            'id' => $this->id,
            'question' => $isArabic ? $this->question_ar : $this->question_en,
            'question_ar' => $this->question_ar,
            'question_en' => $this->question_en,
            'answer' => $isArabic ? $this->answer_ar : $this->answer_en,
            'answer_ar' => $this->answer_ar,
            'answer_en' => $this->answer_en,
            'category' => $isArabic ? $this->category_ar : $this->category_en,
            'category_ar' => $this->category_ar,
            'category_en' => $this->category_en,
            'is_featured' => $this->is_featured,
            'helpful_stats' => [
                'yes' => $this->helpful_yes,
                'no' => $this->helpful_no,
                'percentage' => $this->helpful_percentage,
            ],
        ];
    }
}
