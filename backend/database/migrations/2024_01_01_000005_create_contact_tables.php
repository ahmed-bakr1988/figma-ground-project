<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * ================================
 * Migration لجداول التواصل
 * ================================
 */
return new class extends Migration
{
    public function up(): void
    {
        // جدول رسائل التواصل
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            
            // معلومات المرسل
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('company_name')->nullable();
            
            // الرسالة
            $table->string('subject');
            $table->text('message');
            $table->string('message_type')->default('general'); // general, support, complaint, suggestion
            
            // الحالة
            $table->enum('status', ['new', 'read', 'replied', 'closed'])->default('new');
            $table->text('admin_notes')->nullable();
            $table->foreignId('replied_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('replied_at')->nullable();
            
            // المستخدم المسجل (اختياري)
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            
            // معلومات إضافية
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent')->nullable();
            $table->string('source_page')->nullable();
            $table->string('preferred_language', 5)->default('ar');
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('status');
            $table->index('message_type');
            $table->index('created_at');
        });

        // جدول طلبات عروض الأسعار
        Schema::create('quote_requests', function (Blueprint $table) {
            $table->id();
            
            // معلومات العميل
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('company_name')->nullable();
            $table->string('company_type')->nullable(); // commercial, residential, industrial, government
            
            // تفاصيل المشروع
            $table->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
            $table->string('service_type_other')->nullable();
            $table->string('project_location');
            $table->text('project_description');
            $table->integer('project_area_sqm')->nullable();
            $table->integer('buildings_count')->nullable();
            $table->date('preferred_start_date')->nullable();
            $table->decimal('estimated_budget', 15, 2)->nullable();
            $table->string('budget_unit')->default('SAR');
            
            // الملفات المرفقة
            $table->json('attachments')->nullable();
            
            // الحالة
            $table->enum('status', ['new', 'reviewing', 'quoted', 'accepted', 'rejected', 'cancelled'])->default('new');
            $table->decimal('quoted_amount', 15, 2)->nullable();
            $table->text('quote_notes')->nullable();
            $table->foreignId('handled_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('quoted_at')->nullable();
            $table->timestamp('responded_at')->nullable();
            
            // المستخدم المسجل (اختياري)
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            
            // معلومات إضافية
            $table->string('source')->nullable(); // website, referral, social, etc.
            $table->string('ip_address', 45)->nullable();
            $table->string('preferred_language', 5)->default('ar');
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('status');
            $table->index('service_id');
            $table->index('created_at');
        });

        // جدول المشتركين في النشرة البريدية
        Schema::create('newsletter_subscribers', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->string('name')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('preferred_language', 5)->default('ar');
            $table->json('interests')->nullable();
            $table->string('source')->nullable();
            $table->timestamp('subscribed_at');
            $table->timestamp('unsubscribed_at')->nullable();
            $table->string('unsubscribe_token')->nullable();
            $table->timestamps();
            
            $table->index('is_active');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('newsletter_subscribers');
        Schema::dropIfExists('quote_requests');
        Schema::dropIfExists('contact_messages');
    }
};
