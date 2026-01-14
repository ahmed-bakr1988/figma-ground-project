<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * ================================
 * نموذج المشروع
 * ================================
 */
class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title_ar', 'title_en',
        'description_ar', 'description_en',
        'challenge_ar', 'challenge_en',
        'solution_ar', 'solution_en',
        'client_name', 'client_logo_url',
        'client_testimonial_ar', 'client_testimonial_en',
        'location_ar', 'location_en',
        'start_date', 'completion_date', 'duration_days',
        'project_type_ar', 'project_type_en',
        'project_value', 'value_unit', 'area_sqm',
        'specifications',
        'results_ar', 'results_en',
        'roi_percentage',
        'thumbnail_url', 'cover_image_url', 'gallery_images',
        'service_id', 'created_by',
        'sort_order', 'is_active', 'is_featured',
        'slug',
        'meta_title_ar', 'meta_title_en',
        'meta_description_ar', 'meta_description_en',
    ];

    protected function casts(): array
    {
        return [
            'start_date' => 'date',
            'completion_date' => 'date',
            'project_value' => 'decimal:2',
            'specifications' => 'array',
            'results_ar' => 'array',
            'results_en' => 'array',
            'gallery_images' => 'array',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ];
    }

    // ================================
    // العلاقات
    // ================================

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function testimonials()
    {
        return $this->hasMany(Testimonial::class);
    }

    // ================================
    // Accessors
    // ================================

    public function getTitleAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->title_ar : $this->title_en;
    }

    public function getDescriptionAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->description_ar : $this->description_en;
    }

    public function getLocationAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->location_ar : $this->location_en;
    }

    public function getProjectTypeAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->project_type_ar : $this->project_type_en;
    }

    public function getResultsAttribute(): ?array
    {
        return app()->getLocale() === 'ar' ? $this->results_ar : $this->results_en;
    }

    public function getFormattedValueAttribute(): string
    {
        if (!$this->project_value) return '';
        return number_format($this->project_value, 0) . ' ' . $this->value_unit;
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
        return $query->orderBy('sort_order')->orderBy('completion_date', 'desc');
    }

    public function scopeByService($query, $serviceId)
    {
        return $query->where('service_id', $serviceId);
    }
}
