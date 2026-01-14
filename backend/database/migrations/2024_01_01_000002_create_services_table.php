<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * ================================
 * Migration لجدول الخدمات
 * ================================
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            
            // البيانات الأساسية بالعربية والإنجليزية
            $table->string('title_ar');
            $table->string('title_en');
            $table->text('description_ar');
            $table->text('description_en');
            $table->text('short_description_ar')->nullable();
            $table->text('short_description_en')->nullable();
            
            // الصور والأيقونات
            $table->string('icon')->nullable();
            $table->string('image_url')->nullable();
            $table->string('cover_image_url')->nullable();
            
            // معلومات إضافية
            $table->json('features_ar')->nullable(); // مميزات الخدمة
            $table->json('features_en')->nullable();
            $table->decimal('starting_price', 12, 2)->nullable();
            $table->string('price_unit')->default('SAR');
            
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
            $table->index('sort_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
