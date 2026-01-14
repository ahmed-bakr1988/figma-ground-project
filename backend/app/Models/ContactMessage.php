<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * ================================
 * نموذج رسالة التواصل
 * ================================
 */
class ContactMessage extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'email', 'phone', 'company_name',
        'subject', 'message', 'message_type',
        'status', 'admin_notes', 'replied_by', 'replied_at',
        'user_id', 'ip_address', 'user_agent', 'source_page',
        'preferred_language',
    ];

    protected function casts(): array
    {
        return [
            'replied_at' => 'datetime',
        ];
    }

    // ================================
    // العلاقات
    // ================================

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function repliedByUser()
    {
        return $this->belongsTo(User::class, 'replied_by');
    }

    // ================================
    // Scopes
    // ================================

    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    public function scopeUnread($query)
    {
        return $query->whereIn('status', ['new']);
    }

    public function scopeByType($query, string $type)
    {
        return $query->where('message_type', $type);
    }

    // ================================
    // Methods
    // ================================

    public function markAsRead(): void
    {
        if ($this->status === 'new') {
            $this->update(['status' => 'read']);
        }
    }

    public function markAsReplied(int $userId): void
    {
        $this->update([
            'status' => 'replied',
            'replied_by' => $userId,
            'replied_at' => now(),
        ]);
    }
}
