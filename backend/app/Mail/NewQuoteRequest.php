<?php

namespace App\Mail;

use App\Models\QuoteRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Queue\SerializesModels;

/**
 * ================================
 * بريد إشعار طلب عرض سعر جديد
 * ================================
 * 
 * يتم إرسال هذا البريد عند استلام طلب عرض سعر جديد من الموقع
 */
class NewQuoteRequest extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * بيانات الطلب
     */
    public QuoteRequest $quoteRequest;

    /**
     * إنشاء كائن البريد
     */
    public function __construct(QuoteRequest $quoteRequest)
    {
        $this->quoteRequest = $quoteRequest;
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
            replyTo: [
                new Address($this->quoteRequest->email, $this->quoteRequest->name),
            ],
            subject: "📋 طلب عرض سعر جديد - QR-" . str_pad($this->quoteRequest->id, 6, '0', STR_PAD_LEFT),
        );
    }

    /**
     * تحديد محتوى البريد
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.contact.new-quote',
            with: [
                'quote' => $this->quoteRequest,
                'appName' => config('app.name'),
                'appUrl' => config('app.url'),
                'reference' => 'QR-' . str_pad($this->quoteRequest->id, 6, '0', STR_PAD_LEFT),
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
