<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * ================================
 * Migration لجداول الأسئلة الشائعة والشهادات
 * ================================
 */
return new class extends Migration
{
    public function up(): void
    {
        // جدول الأسئلة الشائعة
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            
            $table->string('question_ar');
            $table->string('question_en');
            $table->text('answer_ar');
            $table->text('answer_en');
            
            // التصنيف
            $table->string('category_ar');
            $table->string('category_en');
            
            // الترتيب والحالة
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            
            // الإحصائيات
            $table->integer('helpful_yes')->default(0);
            $table->integer('helpful_no')->default(0);
            
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('category_ar');
            $table->index('is_active');
            $table->index('sort_order');
        });

        // جدول الشهادات والاعتمادات
        Schema::create('certifications', function (Blueprint $table) {
            $table->id();
            
            $table->string('name_ar');
            $table->string('name_en');
            $table->text('description_ar')->nullable();
            $table->text('description_en')->nullable();
            
            $table->string('issuing_authority_ar');
            $table->string('issuing_authority_en');
            $table->string('certificate_number')->nullable();
            
            $table->date('issue_date')->nullable();
            $table->date('expiry_date')->nullable();
            
            $table->string('image_url')->nullable();
            $table->string('document_url')->nullable();
            
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            
            $table->timestamps();
            $table->softDeletes();
        });

        // جدول شهادات العملاء (Testimonials)
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            
            // معلومات العميل
            $table->string('client_name_ar');
            $table->string('client_name_en');
            $table->string('client_position_ar')->nullable();
            $table->string('client_position_en')->nullable();
            $table->string('company_name_ar');
            $table->string('company_name_en');
            $table->string('client_image_url')->nullable();
            $table->string('company_logo_url')->nullable();
            
            // الشهادة
            $table->text('testimonial_ar');
            $table->text('testimonial_en');
            $table->integer('rating')->default(5); // 1-5
            
            // العلاقة بالمشروع
            $table->foreignId('project_id')->nullable()->constrained()->nullOnDelete();
            
            // الحالة
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('is_active');
            $table->index('is_featured');
            $table->index('rating');
        });

        // جدول إعدادات الموقع
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('string'); // string, boolean, integer, json, html
            $table->string('group')->default('general');
            $table->text('description')->nullable();
            $table->boolean('is_public')->default(false);
            $table->timestamps();
            
            $table->index('group');
            $table->index('is_public');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('certifications');
        Schema::dropIfExists('faqs');
    }
};
