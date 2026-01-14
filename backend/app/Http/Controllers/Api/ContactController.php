<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Http\Requests\QuoteRequest as QuoteRequestForm;
use App\Http\Requests\NewsletterRequest;
use App\Models\ContactMessage;
use App\Models\QuoteRequest;
use App\Models\NewsletterSubscriber;
use App\Traits\ApiResponseTrait;
use App\Mail\NewContactMessage;
use App\Mail\NewQuoteRequest;
use App\Mail\NewNewsletterSubscription;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

/**
 * ================================
 * مُتحكم التواصل
 * ================================
 * 
 * يتعامل مع جميع طلبات التواصل من الموقع:
 * - رسائل التواصل العامة
 * - طلبات عروض الأسعار
 * - الاشتراك في النشرة البريدية
 * 
 * جميع الرسائل تُحفظ في قاعدة البيانات وتُرسل نسخة إلى البريد الإلكتروني المحدد
 */
class ContactController extends Controller
{
    use ApiResponseTrait;

    /**
     * عنوان البريد الإلكتروني الذي يستقبل الإشعارات
     */
    private const ADMIN_EMAIL = 'info@ground-eg.com';

    /**
     * إرسال رسالة تواصل
     * 
     * يحفظ الرسالة في قاعدة البيانات ويرسل إشعار بريد إلكتروني
     */
    public function sendMessage(ContactRequest $request): JsonResponse
    {
        try {
            // حفظ الرسالة في قاعدة البيانات
            $message = ContactMessage::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'company_name' => $request->company_name,
                'subject' => $request->subject,
                'message' => $request->message,
                'message_type' => $request->message_type ?? 'general',
                'user_id' => auth()->id(),
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'source_page' => $request->source_page,
                'preferred_language' => $request->preferred_language ?? app()->getLocale(),
            ]);

            // إرسال إشعار بريد إلكتروني إلى الإدارة
            $this->sendEmailNotification(
                new NewContactMessage($message),
                'رسالة تواصل جديدة',
                $message->id
            );

            return $this->createdResponse(
                ['id' => $message->id],
                'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.'
            );

        } catch (\Exception $e) {
            Log::error('فشل في إرسال رسالة التواصل: ' . $e->getMessage(), [
                'request' => $request->except(['password']),
                'trace' => $e->getTraceAsString()
            ]);
            return $this->serverErrorResponse('فشل في إرسال الرسالة');
        }
    }

    /**
     * إرسال طلب عرض سعر
     * 
     * يحفظ الطلب في قاعدة البيانات ويرسل إشعار بريد إلكتروني
     */
    public function requestQuote(QuoteRequestForm $request): JsonResponse
    {
        try {
            // حفظ طلب عرض السعر في قاعدة البيانات
            $quoteRequest = QuoteRequest::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'company_name' => $request->company_name,
                'company_type' => $request->company_type,
                'service_id' => $request->service_id,
                'service_type_other' => $request->service_type_other,
                'project_location' => $request->project_location,
                'project_description' => $request->project_description,
                'project_area_sqm' => $request->project_area_sqm,
                'buildings_count' => $request->buildings_count,
                'preferred_start_date' => $request->preferred_start_date,
                'estimated_budget' => $request->estimated_budget,
                'budget_unit' => $request->budget_unit ?? 'SAR',
                'user_id' => auth()->id(),
                'source' => $request->source ?? 'website',
                'ip_address' => $request->ip(),
                'preferred_language' => $request->preferred_language ?? app()->getLocale(),
            ]);

            // إرسال إشعار بريد إلكتروني إلى الإدارة
            $this->sendEmailNotification(
                new NewQuoteRequest($quoteRequest),
                'طلب عرض سعر جديد',
                $quoteRequest->id
            );

            return $this->createdResponse(
                ['id' => $quoteRequest->id, 'reference' => 'QR-' . str_pad($quoteRequest->id, 6, '0', STR_PAD_LEFT)],
                'تم استلام طلب عرض السعر بنجاح. سيتواصل معك فريقنا خلال 24 ساعة.'
            );

        } catch (\Exception $e) {
            Log::error('فشل في إرسال طلب عرض السعر: ' . $e->getMessage(), [
                'request' => $request->except(['password']),
                'trace' => $e->getTraceAsString()
            ]);
            return $this->serverErrorResponse('فشل في إرسال طلب عرض السعر');
        }
    }

    /**
     * الاشتراك في النشرة البريدية
     * 
     * يحفظ المشترك في قاعدة البيانات ويرسل إشعار بريد إلكتروني
     */
    public function subscribe(NewsletterRequest $request): JsonResponse
    {
        try {
            // حفظ أو تحديث المشترك في قاعدة البيانات
            $subscriber = NewsletterSubscriber::updateOrCreate(
                ['email' => $request->email],
                [
                    'name' => $request->name,
                    'is_active' => true,
                    'preferred_language' => $request->preferred_language ?? app()->getLocale(),
                    'interests' => $request->interests,
                    'source' => $request->source ?? 'website',
                    'subscribed_at' => now(),
                    'unsubscribed_at' => null,
                    'unsubscribe_token' => Str::random(32),
                ]
            );

            // إرسال إشعار بريد إلكتروني إلى الإدارة
            $this->sendEmailNotification(
                new NewNewsletterSubscription($subscriber),
                'اشتراك جديد في النشرة البريدية',
                $subscriber->id
            );

            return $this->successResponse(
                null,
                'تم الاشتراك في النشرة البريدية بنجاح'
            );

        } catch (\Exception $e) {
            Log::error('فشل في الاشتراك بالنشرة البريدية: ' . $e->getMessage(), [
                'request' => $request->except(['password']),
                'trace' => $e->getTraceAsString()
            ]);
            return $this->serverErrorResponse('فشل في الاشتراك');
        }
    }

    /**
     * إلغاء الاشتراك من النشرة البريدية
     */
    public function unsubscribe(string $token): JsonResponse
    {
        $subscriber = NewsletterSubscriber::where('unsubscribe_token', $token)->first();

        if (!$subscriber) {
            return $this->notFoundResponse('رابط إلغاء الاشتراك غير صالح');
        }

        $subscriber->update([
            'is_active' => false,
            'unsubscribed_at' => now(),
        ]);

        return $this->successResponse(null, 'تم إلغاء الاشتراك بنجاح');
    }

    /**
     * جلب طلبات عروض الأسعار للمستخدم المسجل
     */
    public function myQuotes(Request $request): JsonResponse
    {
        $quotes = QuoteRequest::with(['service'])
            ->where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate($request->input('per_page', 10));

        return $this->paginatedResponse($quotes, 'تم جلب طلباتك بنجاح');
    }

    /**
     * جلب تفاصيل طلب عرض سعر
     */
    public function showQuote(int $id, Request $request): JsonResponse
    {
        $quote = QuoteRequest::with(['service'])
            ->where('user_id', $request->user()->id)
            ->findOrFail($id);

        return $this->successResponse($quote, 'تم جلب تفاصيل الطلب بنجاح');
    }

    /**
     * إرسال إشعار بريد إلكتروني إلى الإدارة
     * 
     * يقوم بإرسال البريد إلى عنوان البريد المحدد (info@ground-eg.com)
     * في حالة فشل الإرسال، يتم تسجيل الخطأ فقط دون إيقاف العملية
     * 
     * @param \Illuminate\Mail\Mailable $mailable كائن البريد
     * @param string $type نوع الإشعار (للتسجيل)
     * @param int $recordId معرف السجل المرتبط
     */
    private function sendEmailNotification($mailable, string $type, int $recordId): void
    {
        try {
            Mail::to(self::ADMIN_EMAIL)->send($mailable);
            
            Log::info("تم إرسال إشعار البريد الإلكتروني بنجاح", [
                'type' => $type,
                'record_id' => $recordId,
                'to' => self::ADMIN_EMAIL
            ]);
        } catch (\Exception $e) {
            // في حالة فشل إرسال البريد، نسجل الخطأ فقط
            // لا نريد إيقاف العملية الرئيسية بسبب فشل البريد
            Log::error("فشل إرسال إشعار البريد الإلكتروني", [
                'type' => $type,
                'record_id' => $recordId,
                'to' => self::ADMIN_EMAIL,
                'error' => $e->getMessage()
            ]);
        }
    }
}
