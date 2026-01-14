<?php

namespace App\Mail;

use App\Models\NewsletterSubscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;

/**
 * ================================
 * بريد إشعار اشتراك جديد في النشرة البريدية
 * ================================
 */
class NewNewsletterSubscription extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * بيانات المشترك
     */
    public NewsletterSubscriber $subscriber;

    /**
     * إنشاء كائن البريد
     */
    public function __construct(NewsletterSubscriber $subscriber)
    {
        $this->subscriber = $subscriber;
    }

    /**
     * تحديد مظروف البريد
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(
                config('mail.from.address', 'noreply@ground-eg.com'),
                config('mail.from.name', 'Ground Protection')
            ),
            subject: "📧 اشتراك جديد في النشرة البريدية",
        );
    }

    /**
     * تحديد محتوى البريد
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.contact.new-subscription',
            with: [
                'subscriber' => $this->subscriber,
                'appName' => config('app.name'),
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
}
