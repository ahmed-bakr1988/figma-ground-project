<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * ================================
 * Resource للمستخدم
 * ================================
 *
 * يحدد البيانات التي يتم إرجاعها للمستخدم
 *
 * @mixin \App\Models\User
 */
class UserResource extends JsonResource
{
    /**
     * تحويل المورد إلى مصفوفة
     *
     * @param Request $request
     * @return array
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'company_name' => $this->company_name,
            'role' => $this->role,
            'preferred_language' => $this->preferred_language,
            'avatar_url' => $this->avatar_url,
            'email_verified' => $this->hasVerifiedEmail(),
            'email_verified_at' => $this->email_verified_at?->toIso8601String(),
            'is_active' => $this->is_active,
            'last_login_at' => $this->last_login_at?->toIso8601String(),
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
