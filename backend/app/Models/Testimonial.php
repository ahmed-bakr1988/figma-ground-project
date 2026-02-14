<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * ================================
 * نموذج شهادات العملاء
 * ================================
 */
class Testimonial extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'client_name_ar', 'client_name_en',
        'client_position_ar', 'client_position_en',
        'company_name_ar', 'company_name_en',
        'client_image_url', 'company_logo_url',
        'testimonial_ar', 'testimonial_en',
        'rating',
        'project_id',
        'sort_order', 'is_active', 'is_featured',
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'integer',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ];
    }

    // ================================
    // العلاقات
    // ================================

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    // ================================
    // Accessors
    // ================================

    public function getClientNameAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->client_name_ar : $this->client_name_en;
    }

    public function getClientPositionAttribute(): ?string
    {
        return app()->getLocale() === 'ar' ? $this->client_position_ar : $this->client_position_en;
    }

    public function getCompanyNameAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->company_name_ar : $this->company_name_en;
    }

    public function getTestimonialAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->testimonial_ar : $this->testimonial_en;
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
