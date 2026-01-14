<?php

namespace App\Mail;

use App\Models\ContactMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;

/**
 * ================================
 * بريد إشعار رسالة تواصل جديدة
 * ================================
 * 
 * يتم إرسال هذا البريد عند استلام رسالة تواصل جديدة من الموقع
 * يصل إلى البريد الإلكتروني المحدد في الإعدادات
 */
class NewContactMessage extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * بيانات الرسالة
     */
    public ContactMessage $contactMessage;

    /**
     * إنشاء كائن البريد
     */
    public function __construct(ContactMessage $contactMessage)
    {
        $this->contactMessage = $contactMessage;
    }

    /**
     * تحديد مظروف البريد (المُرسل، المستلم، الموضوع)
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(
                config('mail.from.address', 'noreply@ground-eg.com'),
                config('mail.from.name', 'Ground Protection')
            ),
            replyTo: [
                new Address($this->contactMessage->email, $this->contactMessage->name),
            ],
            subject: $this->getSubject(),
        );
    }

    /**
     * تحديد محتوى البريد
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.contact.new-message',
            with: [
                'message' => $this->contactMessage,
                'appName' => config('app.name'),
                'appUrl' => config('app.url'),
            ],
        );
    }

    /**
     * المرفقات
     */
    public function attachments(): array
    {
        return [];
    }

    /**
     * تحديد عنوان البريد
     */
    private function getSubject(): string
    {
        $type = $this->getMessageTypeLabel();
        return "📩 رسالة جديدة من موقع Ground Protection - {$type}";
    }

    /**
     * الحصول على تسمية نوع الرسالة
     */
    private function getMessageTypeLabel(): string
    {
        return match($this->contactMessage->message_type) {
            'general' => 'استفسار عام',
            'support' => 'دعم فني',
            'complaint' => 'شكوى',
            'suggestion' => 'اقتراح',
            default => 'رسالة',
        };
    }
}
