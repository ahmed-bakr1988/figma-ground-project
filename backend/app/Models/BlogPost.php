<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * ================================
 * نموذج المقال (Blog Post)
 * ================================
 */
class BlogPost extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title_ar', 'title_en',
        'excerpt_ar', 'excerpt_en',
        'content_ar', 'content_en',
        'thumbnail_url', 'cover_image_url',
        'category_ar', 'category_en',
        'tags_ar', 'tags_en',
        'author_id', 'author_name',
        'views_count', 'reading_time_minutes',
        'is_published', 'is_featured', 'published_at',
        'slug',
        'meta_title_ar', 'meta_title_en',
        'meta_description_ar', 'meta_description_en',
        'meta_keywords_ar', 'meta_keywords_en',
    ];

    protected function casts(): array
    {
        return [
            'tags_ar' => 'array',
            'tags_en' => 'array',
            'meta_keywords_ar' => 'array',
            'meta_keywords_en' => 'array',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    // ================================
    // العلاقات
    // ================================

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    // ================================
    // Accessors
    // ================================

    public function getTitleAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->title_ar : $this->title_en;
    }

    public function getExcerptAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->excerpt_ar : $this->excerpt_en;
    }

    public function getContentAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->content_ar : $this->content_en;
    }

    public function getCategoryAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->category_ar : $this->category_en;
    }

    public function getTagsAttribute(): ?array
    {
        return app()->getLocale() === 'ar' ? $this->tags_ar : $this->tags_en;
    }

    public function getAuthorDisplayNameAttribute(): string
    {
        return $this->author?->name ?? $this->author_name ?? 'فريق Ground Protection';
    }

    // ================================
    // Scopes
    // ================================

    public function scopePublished($query)
    {
        return $query->where('is_published', true)
                     ->where('published_at', '<=', now());
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeByCategory($query, string $category)
    {
        return $query->where(function($q) use ($category) {
            $q->where('category_ar', $category)
              ->orWhere('category_en', $category);
        });
    }

    public function scopeSearch($query, ?string $search)
    {
        if (!$search) return $query;

        return $query->where(function($q) use ($search) {
            $q->where('title_ar', 'like', "%{$search}%")
              ->orWhere('title_en', 'like', "%{$search}%")
              ->orWhere('excerpt_ar', 'like', "%{$search}%")
              ->orWhere('excerpt_en', 'like', "%{$search}%")
              ->orWhere('content_ar', 'like', "%{$search}%")
              ->orWhere('content_en', 'like', "%{$search}%");
        });
    }

    // ================================
    // Methods
    // ================================

    public function incrementViews(): void
    {
        $this->increment('views_count');
    }
}
