<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * ================================
 * طلب عرض سعر
 * ================================
 */
class QuoteRequest extends FormRequest
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
            'phone' => ['required', 'string', 'max:20'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'company_type' => ['nullable', 'string', 'in:commercial,residential,industrial,government'],
            'service_id' => ['nullable', 'exists:services,id'],
            'service_type_other' => ['nullable', 'string', 'max:255'],
            'project_location' => ['required', 'string', 'max:500'],
            'project_description' => ['required', 'string', 'min:20', 'max:5000'],
            'project_area_sqm' => ['nullable', 'integer', 'min:1'],
            'buildings_count' => ['nullable', 'integer', 'min:1'],
            'preferred_start_date' => ['nullable', 'date', 'after:today'],
            'estimated_budget' => ['nullable', 'numeric', 'min:0'],
            'budget_unit' => ['nullable', 'string', 'in:SAR,USD,EUR'],
            'source' => ['nullable', 'string', 'max:100'],
            'preferred_language' => ['nullable', 'string', 'in:ar,en'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'الاسم مطلوب',
            'email.required' => 'البريد الإلكتروني مطلوب',
            'email.email' => 'يرجى إدخال بريد إلكتروني صحيح',
            'phone.required' => 'رقم الهاتف مطلوب',
            'service_id.exists' => 'الخدمة المحددة غير موجودة',
            'project_location.required' => 'موقع المشروع مطلوب',
            'project_description.required' => 'وصف المشروع مطلوب',
            'project_description.min' => 'يرجى تقديم وصف أكثر تفصيلاً للمشروع',
            'preferred_start_date.after' => 'تاريخ البدء يجب أن يكون في المستقبل',
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
