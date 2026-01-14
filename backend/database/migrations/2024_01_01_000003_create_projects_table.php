<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * ================================
 * Migration لجدول المشاريع
 * ================================
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            
            // البيانات الأساسية
            $table->string('title_ar');
            $table->string('title_en');
            $table->text('description_ar');
            $table->text('description_en');
            $table->text('challenge_ar')->nullable();
            $table->text('challenge_en')->nullable();
            $table->text('solution_ar')->nullable();
            $table->text('solution_en')->nullable();
            
            // معلومات العميل
            $table->string('client_name');
            $table->string('client_logo_url')->nullable();
            $table->text('client_testimonial_ar')->nullable();
            $table->text('client_testimonial_en')->nullable();
            
            // الموقع والتاريخ
            $table->string('location_ar');
            $table->string('location_en');
            $table->date('start_date')->nullable();
            $table->date('completion_date')->nullable();
            $table->integer('duration_days')->nullable();
            
            // التفاصيل الفنية
            $table->string('project_type_ar');
            $table->string('project_type_en');
            $table->decimal('project_value', 15, 2)->nullable();
            $table->string('value_unit')->default('SAR');
            $table->integer('area_sqm')->nullable();
            $table->json('specifications')->nullable(); // المواصفات الفنية
            
            // النتائج
            $table->json('results_ar')->nullable();
            $table->json('results_en')->nullable();
            $table->integer('roi_percentage')->nullable();
            
            // الصور
            $table->string('thumbnail_url')->nullable();
            $table->string('cover_image_url')->nullable();
            $table->json('gallery_images')->nullable();
            
            // العلاقات
            $table->foreignId('service_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            
            // الترتيب والحالة
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            
            // SEO
            $table->string('slug')->unique();
            $table->string('meta_title_ar')->nullable();
            $table->string('meta_title_en')->nullable();
            $table->text('meta_description_ar')->nullable();
            $table->text('meta_description_en')->nullable();
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('is_active');
            $table->index('is_featured');
            $table->index('service_id');
            $table->index('completion_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
