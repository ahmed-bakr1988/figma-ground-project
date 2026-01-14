<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * ================================
 * اختبارات التواصل API
 * ================================
 */
class ContactApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * اختبار إرسال رسالة تواصل بنجاح
     */
    public function test_can_send_contact_message(): void
    {
        $response = $this->postJson('/api/contact/message', [
            'name' => 'أحمد محمد',
            'email' => 'ahmed@example.com',
            'phone' => '+966500000000',
            'subject' => 'استفسار عن الخدمات',
            'message' => 'أريد الاستفسار عن خدمات الحماية من الصواعق للمباني السكنية.',
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseHas('contact_messages', [
            'email' => 'ahmed@example.com',
            'subject' => 'استفسار عن الخدمات',
        ]);
    }

    /**
     * اختبار التحقق من البيانات المطلوبة
     */
    public function test_contact_message_validation(): void
    {
        $response = $this->postJson('/api/contact/message', [
            'name' => 'أ', // قصير جداً
            'email' => 'invalid-email',
            'message' => 'قصير', // أقل من 10 أحرف
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'subject', 'message']);
    }

    /**
     * اختبار إرسال طلب عرض سعر
     */
    public function test_can_send_quote_request(): void
    {
        $response = $this->postJson('/api/contact/quote', [
            'name' => 'محمد علي',
            'email' => 'mohamed@example.com',
            'phone' => '+966500000000',
            'project_location' => 'الرياض، حي العليا',
            'project_description' => 'أحتاج نظام حماية متكامل لمبنى تجاري مكون من 10 طوابق مع موقف سيارات تحت الأرض.',
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonStructure([
                'data' => ['id', 'reference'],
            ]);
    }

    /**
     * اختبار الاشتراك في النشرة البريدية
     */
    public function test_can_subscribe_to_newsletter(): void
    {
        $response = $this->postJson('/api/contact/newsletter/subscribe', [
            'email' => 'subscriber@example.com',
            'name' => 'مشترك جديد',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseHas('newsletter_subscribers', [
            'email' => 'subscriber@example.com',
            'is_active' => true,
        ]);
    }

    /**
     * اختبار Rate Limiting
     */
    public function test_contact_endpoint_is_rate_limited(): void
    {
        // إرسال 6 طلبات (الحد 5 في الدقيقة)
        for ($i = 0; $i < 5; $i++) {
            $this->postJson('/api/contact/message', [
                'name' => 'اختبار',
                'email' => "test{$i}@example.com",
                'subject' => 'اختبار',
                'message' => 'رسالة اختبار طويلة بما فيه الكفاية للتحقق',
            ]);
        }

        // الطلب السادس يجب أن يُرفض
        $response = $this->postJson('/api/contact/message', [
            'name' => 'اختبار',
            'email' => 'test6@example.com',
            'subject' => 'اختبار',
            'message' => 'رسالة اختبار طويلة بما فيه الكفاية للتحقق',
        ]);

        $response->assertStatus(429);
    }
}
