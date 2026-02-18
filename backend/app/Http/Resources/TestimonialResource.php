<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * ================================
 * Resource للشهادات
 * ================================
 *
 * @mixin \App\Models\Testimonial
 */
class TestimonialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();
        $isArabic = $locale === 'ar';

        return [
            'id' => $this->id,
            'client' => [
                'name' => $isArabic ? $this->client_name_ar : $this->client_name_en,
                'position' => $isArabic ? $this->client_position_ar : $this->client_position_en,
                'image_url' => $this->client_image_url,
            ],
            'company' => [
                'name' => $isArabic ? $this->company_name_ar : $this->company_name_en,
                'logo_url' => $this->company_logo_url,
            ],
            'testimonial' => $isArabic ? $this->testimonial_ar : $this->testimonial_en,
            'rating' => $this->rating,
            'project' => new ProjectResource($this->whenLoaded('project')),
            'is_featured' => $this->is_featured,
        ];
    }
}
