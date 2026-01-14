<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * ================================
 * Migration لجدول المقالات (Blog)
 * ================================
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            
            // البيانات الأساسية
            $table->string('title_ar');
            $table->string('title_en');
            $table->text('excerpt_ar');
            $table->text('excerpt_en');
            $table->longText('content_ar');
            $table->longText('content_en');
            
            // الصور
            $table->string('thumbnail_url')->nullable();
            $table->string('cover_image_url')->nullable();
            
            // التصنيف
            $table->string('category_ar');
            $table->string('category_en');
            $table->json('tags_ar')->nullable();
            $table->json('tags_en')->nullable();
            
            // الكاتب
            $table->foreignId('author_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('author_name')->nullable();
            
            // الإحصائيات
            $table->integer('views_count')->default(0);
            $table->integer('reading_time_minutes')->default(5);
            
            // النشر
            $table->boolean('is_published')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->timestamp('published_at')->nullable();
            
            // SEO
            $table->string('slug')->unique();
            $table->string('meta_title_ar')->nullable();
            $table->string('meta_title_en')->nullable();
            $table->text('meta_description_ar')->nullable();
            $table->text('meta_description_en')->nullable();
            $table->json('meta_keywords_ar')->nullable();
            $table->json('meta_keywords_en')->nullable();
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('is_published');
            $table->index('is_featured');
            $table->index('published_at');
            $table->index('category_ar');
            $table->index('category_en');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};
