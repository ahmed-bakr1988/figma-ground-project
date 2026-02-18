<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * ================================
 * نموذج طلب عرض السعر
 * ================================
 */
class QuoteRequest extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'email', 'phone', 'company_name', 'company_type',
        'service_id', 'service_type_other',
        'project_location', 'project_description',
        'project_area_sqm', 'buildings_count',
        'preferred_start_date', 'estimated_budget', 'budget_unit',
        'attachments',
        'status', 'quoted_amount', 'quote_notes',
        'handled_by', 'quoted_at', 'responded_at',
        'user_id', 'source', 'ip_address', 'preferred_language',
    ];

    protected function casts(): array
    {
        return [
            'attachments' => 'array',
            'preferred_start_date' => 'date',
            'estimated_budget' => 'decimal:2',
            'quoted_amount' => 'decimal:2',
            'quoted_at' => 'datetime',
            'responded_at' => 'datetime',
        ];
    }

    // ================================
    // العلاقات
    // ================================

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function handledBy()
    {
        return $this->belongsTo(User::class, 'handled_by');
    }

    // ================================
    // Accessors
    // ================================

    public function getFormattedBudgetAttribute(): string
    {
        if (!$this->estimated_budget) return 'غير محدد';
        return number_format((float) $this->estimated_budget, 0) . ' ' . $this->budget_unit;
    }

    public function getFormattedQuoteAttribute(): string
    {
        if (!$this->quoted_amount) return '';
        return number_format((float) $this->quoted_amount, 0) . ' ' . $this->budget_unit;
    }

    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'new' => 'جديد',
            'reviewing' => 'قيد المراجعة',
            'quoted' => 'تم التسعير',
            'accepted' => 'مقبول',
            'rejected' => 'مرفوض',
            'cancelled' => 'ملغي',
            default => $this->status,
        };
    }

    // ================================
    // Scopes
    // ================================

    public function scopeNew($query)
    {
        return $query->where('status', 'new');
    }

    public function scopePending($query)
    {
        return $query->whereIn('status', ['new', 'reviewing']);
    }

    public function scopeByStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByService($query, int $serviceId)
    {
        return $query->where('service_id', $serviceId);
    }

    // ================================
    // Methods
    // ================================

    public function submitQuote(float $amount, string $notes, int $handlerId): void
    {
        $this->update([
            'status' => 'quoted',
            'quoted_amount' => $amount,
            'quote_notes' => $notes,
            'handled_by' => $handlerId,
            'quoted_at' => now(),
        ]);
    }

    public function accept(): void
    {
        $this->update([
            'status' => 'accepted',
            'responded_at' => now(),
        ]);
    }

    public function reject(): void
    {
        $this->update([
            'status' => 'rejected',
            'responded_at' => now(),
        ]);
    }
}
