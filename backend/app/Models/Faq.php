<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * ================================
 * نموذج الأسئلة الشائعة
 * ================================
 */
class Faq extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'question_ar', 'question_en',
        'answer_ar', 'answer_en',
        'category_ar', 'category_en',
        'sort_order', 'is_active', 'is_featured',
        'helpful_yes', 'helpful_no',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ];
    }

    // ================================
    // Accessors
    // ================================

    public function getQuestionAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->question_ar : $this->question_en;
    }

    public function getAnswerAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->answer_ar : $this->answer_en;
    }

    public function getCategoryAttribute(): string
    {
        return app()->getLocale() === 'ar' ? $this->category_ar : $this->category_en;
    }

    public function getHelpfulPercentageAttribute(): int
    {
        $total = $this->helpful_yes + $this->helpful_no;
        if ($total === 0) return 100;
        return (int) round(($this->helpful_yes / $total) * 100);
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

    public function scopeByCategory($query, string $category)
    {
        return $query->where(function($q) use ($category) {
            $q->where('category_ar', $category)
              ->orWhere('category_en', $category);
        });
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('created_at', 'desc');
    }

    // ================================
    // Methods
    // ================================

    public function markHelpful(bool $helpful): void
    {
        if ($helpful) {
            $this->increment('helpful_yes');
        } else {
            $this->increment('helpful_no');
        }
    }
}
