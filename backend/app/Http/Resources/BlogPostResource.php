<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * ================================
 * Resource للمقال
 * ================================
 */
class BlogPostResource extends JsonResource
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
            'excerpt' => $isArabic ? $this->excerpt_ar : $this->excerpt_en,
            'content' => $isArabic ? $this->content_ar : $this->content_en,
            
            'images' => [
                'thumbnail' => $this->thumbnail_url,
                'cover' => $this->cover_image_url,
            ],
            
            'category' => $isArabic ? $this->category_ar : $this->category_en,
            'tags' => $isArabic ? $this->tags_ar : $this->tags_en,
            
            'author' => [
                'id' => $this->author_id,
                'name' => $this->author?->name ?? $this->author_name,
                'avatar' => $this->author?->avatar,
            ],
            
            'stats' => [
                'views' => $this->views_count,
                'reading_time' => $this->reading_time_minutes,
            ],
            
            'dates' => [
                'published_at' => $this->published_at?->toIso8601String(),
                'published_date' => $this->published_at?->format('Y-m-d'),
                'created_at' => $this->created_at->toIso8601String(),
            ],
            
            'slug' => $this->slug,
            'is_featured' => $this->is_featured,
            
            'meta' => [
                'title' => $isArabic ? $this->meta_title_ar : $this->meta_title_en,
                'description' => $isArabic ? $this->meta_description_ar : $this->meta_description_en,
                'keywords' => $isArabic ? $this->meta_keywords_ar : $this->meta_keywords_en,
            ],
        ];
    }
}
