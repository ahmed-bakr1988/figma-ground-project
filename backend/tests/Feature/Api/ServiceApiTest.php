<?php

namespace Tests\Feature\Api;

use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * ================================
 * اختبارات الخدمات API
 * ================================
 */
class ServiceApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * اختبار جلب جميع الخدمات
     */
    public function test_can_get_all_services(): void
    {
        Service::factory()->count(5)->create();

        $response = $this->getJson('/api/services');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data',
                'meta' => ['pagination'],
            ]);
    }

    /**
     * اختبار جلب الخدمات المميزة
     */
    public function test_can_get_featured_services(): void
    {
        Service::factory()->count(3)->featured()->create();
        Service::factory()->count(2)->create(['is_featured' => false]);

        $response = $this->getJson('/api/services/featured');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);
    }

    /**
     * اختبار جلب خدمة واحدة
     */
    public function test_can_get_single_service(): void
    {
        $service = Service::factory()->create(['slug' => 'test-service']);

        $response = $this->getJson('/api/services/test-service');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'slug' => 'test-service',
                ],
            ]);
    }

    /**
     * اختبار 404 لخدمة غير موجودة
     */
    public function test_returns_404_for_nonexistent_service(): void
    {
        $response = $this->getJson('/api/services/nonexistent-service');

        $response->assertStatus(404);
    }

    /**
     * اختبار البحث في الخدمات
     */
    public function test_can_search_services(): void
    {
        Service::factory()->create(['title_ar' => 'حماية الصواعق']);
        Service::factory()->create(['title_ar' => 'التأريض']);

        $response = $this->getJson('/api/services?search=صواعق');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }

    /**
     * اختبار الخدمات غير النشطة لا تظهر
     */
    public function test_inactive_services_are_not_returned(): void
    {
        Service::factory()->create(['is_active' => true]);
        Service::factory()->inactive()->create();

        $response = $this->getJson('/api/services?all=true');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }
}
