<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * ================================
 * اختبارات المصادقة
 * ================================
 */
class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * اختبار تسجيل مستخدم جديد بنجاح
     */
    public function test_user_can_register_with_valid_data(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'أحمد محمد',
            'email' => 'ahmed@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'phone' => '+966500000000',
        ]);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'تم التسجيل بنجاح. يرجى التحقق من بريدك الإلكتروني.',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'user' => ['id', 'name', 'email'],
                    'token',
                    'token_type',
                ],
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'ahmed@example.com',
        ]);
    }

    /**
     * اختبار فشل التسجيل ببريد مكرر
     */
    public function test_user_cannot_register_with_existing_email(): void
    {
        User::factory()->create(['email' => 'ahmed@example.com']);

        $response = $this->postJson('/api/auth/register', [
            'name' => 'أحمد',
            'email' => 'ahmed@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertStatus(422)
            ->assertJson([
                'success' => false,
            ])
            ->assertJsonPath('errors.email.0', 'البريد الإلكتروني مسجل مسبقاً');
    }

    /**
     * اختبار تسجيل الدخول بنجاح
     */
    public function test_user_can_login_with_valid_credentials(): void
    {
        $user = User::factory()->create([
            'email' => 'ahmed@example.com',
            'password' => bcrypt('Password123!'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'ahmed@example.com',
            'password' => 'Password123!',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'تم تسجيل الدخول بنجاح',
            ])
            ->assertJsonStructure([
                'data' => [
                    'user' => ['id', 'name', 'email'],
                    'token',
                    'token_type',
                ],
            ]);
    }

    /**
     * اختبار فشل تسجيل الدخول ببيانات خاطئة
     */
    public function test_user_cannot_login_with_invalid_credentials(): void
    {
        User::factory()->create([
            'email' => 'ahmed@example.com',
            'password' => bcrypt('Password123!'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'ahmed@example.com',
            'password' => 'WrongPassword!',
        ]);

        $response->assertStatus(401)
            ->assertJson([
                'success' => false,
                'message' => 'بيانات الدخول غير صحيحة',
            ]);
    }

    /**
     * اختبار تسجيل الخروج بنجاح
     */
    public function test_user_can_logout(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('auth_token')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->postJson('/api/auth/logout');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'تم تسجيل الخروج بنجاح',
            ]);
    }

    /**
     * اختبار جلب بيانات المستخدم الحالي
     */
    public function test_authenticated_user_can_get_profile(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('auth_token')->plainTextToken;

        $response = $this->withHeader('Authorization', "Bearer $token")
            ->getJson('/api/user');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'data' => [
                    'id' => $user->id,
                    'email' => $user->email,
                ],
            ]);
    }

    /**
     * اختبار الوصول بدون مصادقة
     */
    public function test_unauthenticated_user_cannot_access_protected_routes(): void
    {
        $response = $this->getJson('/api/user');

        $response->assertStatus(401)
            ->assertJson([
                'success' => false,
            ]);
    }

    /**
     * اختبار حساب معطل
     */
    public function test_inactive_user_cannot_login(): void
    {
        User::factory()->inactive()->create([
            'email' => 'inactive@example.com',
            'password' => bcrypt('Password123!'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'inactive@example.com',
            'password' => 'Password123!',
        ]);

        $response->assertStatus(403)
            ->assertJson([
                'success' => false,
                'message' => 'الحساب معطل. يرجى التواصل مع الدعم.',
            ]);
    }
}
