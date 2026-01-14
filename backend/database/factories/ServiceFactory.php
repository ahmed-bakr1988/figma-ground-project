<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * ================================
 * Factory للخدمة
 * ================================
 */
class ServiceFactory extends Factory
{
    protected $model = Service::class;

    public function definition(): array
    {
        $titleAr = fake('ar_SA')->sentence(3);
        $titleEn = fake()->sentence(3);

        return [
            'title_ar' => $titleAr,
            'title_en' => $titleEn,
            'description_ar' => fake('ar_SA')->paragraphs(3, true),
            'description_en' => fake()->paragraphs(3, true),
            'short_description_ar' => fake('ar_SA')->sentence(10),
            'short_description_en' => fake()->sentence(10),
            'icon' => fake()->randomElement(['shield', 'zap', 'activity', 'check-circle']),
            'image_url' => fake()->imageUrl(800, 600, 'business'),
            'cover_image_url' => fake()->imageUrl(1200, 400, 'business'),
            'features_ar' => [
                'حماية متكاملة',
                'جودة عالية',
                'ضمان شامل',
                'دعم فني متواصل',
            ],
            'features_en' => [
                'Complete protection',
                'High quality',
                'Comprehensive warranty',
                'Continuous technical support',
            ],
            'starting_price' => fake()->randomFloat(2, 5000, 100000),
            'price_unit' => 'SAR',
            'sort_order' => fake()->numberBetween(0, 10),
            'is_active' => true,
            'is_featured' => fake()->boolean(30),
            'slug' => Str::slug($titleEn),
            'meta_title_ar' => $titleAr,
            'meta_title_en' => $titleEn,
            'meta_description_ar' => fake('ar_SA')->sentence(15),
            'meta_description_en' => fake()->sentence(15),
        ];
    }

    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => false,
        ]);
    }
}
