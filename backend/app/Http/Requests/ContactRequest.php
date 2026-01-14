<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * ================================
 * طلب إرسال رسالة تواصل
 * ================================
 */
class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'subject' => ['required', 'string', 'max:500'],
            'message' => ['required', 'string', 'min:10', 'max:5000'],
            'message_type' => ['nullable', 'string', 'in:general,support,complaint,suggestion'],
            'source_page' => ['nullable', 'string', 'max:255'],
            'preferred_language' => ['nullable', 'string', 'in:ar,en'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'الاسم مطلوب',
            'name.min' => 'الاسم قصير جداً',
            'email.required' => 'البريد الإلكتروني مطلوب',
            'email.email' => 'يرجى إدخال بريد إلكتروني صحيح',
            'subject.required' => 'الموضوع مطلوب',
            'message.required' => 'الرسالة مطلوبة',
            'message.min' => 'الرسالة قصيرة جداً',
            'message.max' => 'الرسالة طويلة جداً',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'فشل التحقق من البيانات',
            'errors' => $validator->errors(),
            'meta' => ['timestamp' => now()->toIso8601String()],
        ], 422));
    }
}
