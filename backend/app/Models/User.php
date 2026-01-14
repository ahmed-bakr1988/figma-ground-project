<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;

/**
 * ================================
 * نموذج المستخدم
 * ================================
 * 
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string|null $phone
 * @property string|null $company_name
 * @property string $role
 * @property string $preferred_language
 * @property string|null $avatar_url
 * @property bool $is_active
 * @property \Carbon\Carbon|null $email_verified_at
 * @property \Carbon\Carbon|null $last_login_at
 * @property string|null $last_login_ip
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 */
class User extends Authenticatable implements MustVerifyEmail, FilamentUser
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * الحقول القابلة للتعبئة الجماعية
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'company_name',
        'role',
        'preferred_language',
        'avatar_url',
        'is_active',
        'email_verified_at',
        'last_login_at',
        'last_login_ip',
    ];

    /**
     * الحقول المخفية من الـ serialization
     */
    protected $hidden = [
        'password',
        'remember_token',
        'last_login_ip',
    ];

    /**
     * تحويل أنواع البيانات
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'last_login_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    /**
     * القيم الافتراضية
     */
    protected $attributes = [
        'role' => 'user',
        'preferred_language' => 'ar',
        'is_active' => true,
    ];

    // ================================
    // العلاقات (Relationships)
    // ================================

    /**
     * طلبات عروض الأسعار للمستخدم
     */
    public function quoteRequests()
    {
        return $this->hasMany(QuoteRequest::class);
    }

    /**
     * رسائل التواصل للمستخدم
     */
    public function contactMessages()
    {
        return $this->hasMany(ContactMessage::class);
    }

    /**
     * المشاريع التي أُنشئت بواسطة المستخدم (للمدراء)
     */
    public function projects()
    {
        return $this->hasMany(Project::class, 'created_by');
    }

    // ================================
    // الدوال المساعدة (Helper Methods)
    // ================================

    /**
     * هل المستخدم مدير؟
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * هل المستخدم موظف؟
     */
    public function isStaff(): bool
    {
        return in_array($this->role, ['admin', 'staff']);
    }

    /**
     * الحصول على اسم العرض
     */
    public function getDisplayNameAttribute(): string
    {
        return $this->company_name ?? $this->name;
    }

    /**
     * الحصول على رابط الصورة الشخصية
     */
    public function getAvatarAttribute(): string
    {
        return $this->avatar_url ?? 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&background=0E3A5D&color=fff';
    }

    // ================================
    // Scopes
    // ================================

    /**
     * المستخدمين النشطين فقط
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * المستخدمين حسب الدور
     */
    public function scopeWithRole($query, string $role)
    {
        return $query->where('role', $role);
    }

    /**
     * البحث بالاسم أو البريد
     */
    public function scopeSearch($query, ?string $search)
    {
        if (!$search) return $query;
        
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%")
              ->orWhere('company_name', 'like', "%{$search}%");
        });
    }

    // ================================
    // Filament Methods
    // ================================

    /**
     * التحقق من إمكانية دخول Filament Admin Panel
     * فقط المستخدمين من نوع admin أو staff يمكنهم الدخول
     */
    public function canAccessPanel(Panel $panel): bool
    {
        // السماح فقط للـ admin و staff بالدخول للوحة التحكم
        return in_array($this->role, ['admin', 'staff']) && $this->is_active;
    }

    /**
     * الحصول على اسم المستخدم لـ Filament
     */
    public function getFilamentName(): string
    {
        return $this->name;
    }
}
