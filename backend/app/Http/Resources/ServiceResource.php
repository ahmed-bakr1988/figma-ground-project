<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * ================================
 * Resource للخدمة
 * ================================
 *
 * @mixin \App\Models\Service
 */
class ServiceResource extends JsonResource
{
    /**
     * @param \App\Models\Service $resource
     */
    public function __construct($resource)
    {
        parent::__construct($resource);
    }

    public function toArray(Request $request): array
    {
        $locale = app()->getLocale();
        $isArabic = $locale === 'ar';

        return [
            'id' => $this->id,
            'title' => $isArabic ? $this->title_ar : $this->title_en,
            'title_ar' => $this->title_ar,
            'title_en' => $this->title_en,
            'description' => $isArabic ? $this->description_ar : $this->description_en,
            'short_description' => $isArabic ? $this->short_description_ar : $this->short_description_en,
            'icon' => $this->icon,
            'image_url' => $this->image_url,
            'cover_image_url' => $this->cover_image_url,
            'features' => $isArabic ? $this->features_ar : $this->features_en,
            'starting_price' => $this->starting_price,
            'price_unit' => $this->price_unit,
            'formatted_price' => $this->starting_price 
                ? number_format((float) $this->starting_price, 0) . ' ' . $this->price_unit 
                : null,
            'slug' => $this->slug,
            'is_featured' => $this->is_featured,
            'projects_count' => $this->whenLoaded('projects', fn() => $this->projects->count()),
            'meta' => [
                'title' => $isArabic ? $this->meta_title_ar : $this->meta_title_en,
                'description' => $isArabic ? $this->meta_description_ar : $this->meta_description_en,
            ],
        ];
    }
}
