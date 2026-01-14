<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

/**
 * ================================
 * طلب تحديث الملف الشخصي
 * ================================
 */
class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'min:2', 'max:255'],
            'email' => [
                'sometimes',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->user()->id),
            ],
            'phone' => ['nullable', 'string', 'max:20'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'preferred_language' => ['nullable', 'string', 'in:ar,en'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.min' => 'الاسم يجب أن يكون على الأقل حرفين',
            'name.max' => 'الاسم يجب ألا يتجاوز 255 حرف',
            'email.email' => 'يرجى إدخال بريد إلكتروني صحيح',
            'email.unique' => 'البريد الإلكتروني مسجل مسبقاً',
            'preferred_language.in' => 'اللغة يجب أن تكون العربية أو الإنجليزية',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'فشل التحقق من البيانات',
            'errors' => $validator->errors(),
            'meta' => [
                'timestamp' => now()->toIso8601String(),
            ],
        ], 422));
    }
}
