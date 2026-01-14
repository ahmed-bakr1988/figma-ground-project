<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * ================================
 * نموذج الخدمة
 * ================================
 */
class Service extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title_ar', 'title_en',
        'description_ar', 'description_en',
        'short_description_ar', 'short_description_en',
        'icon', 'image_url', 'cover_image_url',
        'features_ar', 'features_en',
        'starting_price', 'price_unit',
        'sort_order', 'is_active', 'is_featured',
        'slug',
        'meta_title_ar', 'meta_title_en',
        'meta_description_ar', 'meta_description_en',
    ];

    protected function casts(): array
    {
        return [
            'features_ar' => 'array',
            'features_en' => 'array',
            'starting_price' => 'decimal:2',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ];
    }

    // ================================
    // العلاقات
    // ================================

    public function projects()
    {
        return $this->hasMany(Project::class);
    }

    public function quoteRequests()
    {
        return $this->hasMany(QuoteRequest::class);
    }

    // ================================
    // Accessors للغة الحالية
    // ================================

    public function getTitleAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->title_ar : $this->title_en;
    }

    public function getDescriptionAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->description_ar : $this->description_en;
    }

    public function getShortDescriptionAttribute(): ?string
    {
        return app()->getLocale() === 'ar' ? $this->short_description_ar : $this->short_description_en;
    }

    public function getFeaturesAttribute(): ?array
    {
        return app()->getLocale() === 'ar' ? $this->features_ar : $this->features_en;
    }

    // ================================
    // Scopes
    // ================================

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('created_at', 'desc');
    }
}
