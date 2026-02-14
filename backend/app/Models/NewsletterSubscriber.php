<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * ================================
 * نموذج المشترك في النشرة البريدية
 * ================================
 */
class NewsletterSubscriber extends Model
{
    protected $fillable = [
        'email',
        'name',
        'is_active',
        'preferred_language',
        'interests',
        'source',
        'subscribed_at',
        'unsubscribed_at',
        'unsubscribe_token',
    ];

    protected function casts(): array
    {
        return [
            'interests' => 'array',
            'is_active' => 'boolean',
            'subscribed_at' => 'datetime',
            'unsubscribed_at' => 'datetime',
        ];
    }

    // ================================
    // Scopes
    // ================================

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByLanguage($query, string $language)
    {
        return $query->where('preferred_language', $language);
    }
}
