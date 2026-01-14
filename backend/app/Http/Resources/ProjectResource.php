<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * ================================
 * Resource للمشروع
 * ================================
 */
class ProjectResource extends JsonResource
{
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
            'challenge' => $isArabic ? $this->challenge_ar : $this->challenge_en,
            'solution' => $isArabic ? $this->solution_ar : $this->solution_en,
            
            'client' => [
                'name' => $this->client_name,
                'logo_url' => $this->client_logo_url,
                'testimonial' => $isArabic ? $this->client_testimonial_ar : $this->client_testimonial_en,
            ],
            
            'location' => $isArabic ? $this->location_ar : $this->location_en,
            'project_type' => $isArabic ? $this->project_type_ar : $this->project_type_en,
            
            'dates' => [
                'start_date' => $this->start_date?->format('Y-m-d'),
                'completion_date' => $this->completion_date?->format('Y-m-d'),
                'duration_days' => $this->duration_days,
            ],
            
            'details' => [
                'value' => $this->project_value,
                'value_unit' => $this->value_unit,
                'formatted_value' => $this->formatted_value,
                'area_sqm' => $this->area_sqm,
                'specifications' => $this->specifications,
            ],
            
            'results' => $isArabic ? $this->results_ar : $this->results_en,
            'roi_percentage' => $this->roi_percentage,
            
            'images' => [
                'thumbnail' => $this->thumbnail_url,
                'cover' => $this->cover_image_url,
                'gallery' => $this->gallery_images,
            ],
            
            'service' => new ServiceResource($this->whenLoaded('service')),
            'testimonials' => TestimonialResource::collection($this->whenLoaded('testimonials')),
            
            'slug' => $this->slug,
            'is_featured' => $this->is_featured,
            
            'meta' => [
                'title' => $isArabic ? $this->meta_title_ar : $this->meta_title_en,
                'description' => $isArabic ? $this->meta_description_ar : $this->meta_description_en,
            ],
        ];
    }
}
