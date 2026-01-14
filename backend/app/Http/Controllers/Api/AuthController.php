<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Http\Requests\Auth\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;

/**
 * ================================
 * مُتحكم المصادقة
 * ================================
 * 
 * يتولى جميع عمليات المصادقة:
 * - تسجيل المستخدمين الجدد
 * - تسجيل الدخول والخروج
 * - إعادة تعيين كلمة المرور
 * - التحقق من البريد الإلكتروني
 * - إدارة الملف الشخصي
 */
class AuthController extends Controller
{
    use ApiResponseTrait;

    /**
     * تسجيل مستخدم جديد
     *
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            // إنشاء المستخدم
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'company_name' => $request->company_name,
                'preferred_language' => $request->preferred_language ?? 'ar',
            ]);

            // إطلاق حدث التسجيل
            event(new Registered($user));

            // إنشاء Token
            $token = $user->createToken('auth_token')->plainTextToken;

            return $this->createdResponse([
                'user' => new UserResource($user),
                'token' => $token,
                'token_type' => 'Bearer',
            ], 'تم التسجيل بنجاح. يرجى التحقق من بريدك الإلكتروني.');

        } catch (\Exception $e) {
            return $this->serverErrorResponse('فشل في تسجيل المستخدم: ' . $e->getMessage());
        }
    }

    /**
     * تسجيل الدخول
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            // محاولة المصادقة
            if (!Auth::attempt($request->only('email', 'password'))) {
                // تسجيل محاولة الدخول الفاشلة للمراقبة الأمنية
                \Log::warning('Failed login attempt', [
                    'email' => $request->email,
                    'ip' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                    'timestamp' => now()->toIso8601String(),
                ]);
                
                return $this->unauthorizedResponse('بيانات الدخول غير صحيحة');
            }

            $user = User::where('email', $request->email)->firstOrFail();

            // التحقق من أن الحساب نشط
            if (!$user->is_active) {
                return $this->forbiddenResponse('الحساب معطل. يرجى التواصل مع الدعم.');
            }

            // تحديث آخر تسجيل دخول
            $user->update([
                'last_login_at' => now(),
                'last_login_ip' => $request->ip(),
            ]);

            // إنشاء Token مع expiration (24 ساعة)
            $expiresAt = now()->addHours(24);
            $token = $user->createToken(
                'auth_token',
                ['*'],
                $expiresAt
            )->plainTextToken;

            return $this->successResponse([
                'user' => new UserResource($user),
                'token' => $token,
                'token_type' => 'Bearer',
            ], 'تم تسجيل الدخول بنجاح');

        } catch (\Exception $e) {
            return $this->serverErrorResponse('فشل في تسجيل الدخول');
        }
    }

    /**
     * تسجيل الخروج
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            // حذف Token الحالي
            $request->user()->currentAccessToken()->delete();

            return $this->successResponse(null, 'تم تسجيل الخروج بنجاح');

        } catch (\Exception $e) {
            return $this->serverErrorResponse('فشل في تسجيل الخروج');
        }
    }

    /**
     * تسجيل الخروج من جميع الأجهزة
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function logoutAll(Request $request): JsonResponse
    {
        try {
            // حذف جميع الـ Tokens
            $request->user()->tokens()->delete();

            return $this->successResponse(null, 'تم تسجيل الخروج من جميع الأجهزة بنجاح');

        } catch (\Exception $e) {
            return $this->serverErrorResponse('فشل في تسجيل الخروج');
        }
    }

    /**
     * جلب بيانات المستخدم الحالي
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function user(Request $request): JsonResponse
    {
        return $this->successResponse(
            new UserResource($request->user()),
            'تم جلب بيانات المستخدم بنجاح'
        );
    }

    /**
     * تحديث الملف الشخصي
     *
     * @param UpdateProfileRequest $request
     * @return JsonResponse
     */
    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        try {
            $user = $request->user();
            
            $updateData = [
                'name' => $request->name ?? $user->name,
                'phone' => $request->phone ?? $user->phone,
                'company_name' => $request->company_name ?? $user->company_name,
                'preferred_language' => $request->preferred_language ?? $user->preferred_language,
            ];

            // تحديث البريد الإلكتروني إذا تم تغييره
            if ($request->email && $request->email !== $user->email) {
                $updateData['email'] = $request->email;
                $updateData['email_verified_at'] = null;
                // يمكن إرسال بريد تحقق جديد هنا
            }

            $user->update($updateData);

            return $this->successResponse(
                new UserResource($user->fresh()),
                'تم تحديث الملف الشخصي بنجاح'
            );

        } catch (\Exception $e) {
            return $this->serverErrorResponse('فشل في تحديث الملف الشخصي');
        }
    }

    /**
     * تغيير كلمة المرور
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function changePassword(Request $request): JsonResponse
    {
        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        try {
            $user = $request->user();

            // التحقق من كلمة المرور الحالية
            if (!Hash::check($request->current_password, $user->password)) {
                return $this->validationErrorResponse(
                    ['current_password' => ['كلمة المرور الحالية غير صحيحة']],
                    'كلمة المرور الحالية غير صحيحة'
                );
            }

            // تحديث كلمة المرور
            $user->update([
                'password' => Hash::make($request->password),
            ]);

            // إلغاء جميع الـ Tokens الأخرى
            $user->tokens()->where('id', '!=', $request->user()->currentAccessToken()->id)->delete();

            return $this->successResponse(null, 'تم تغيير كلمة المرور بنجاح');

        } catch (\Exception $e) {
            return $this->serverErrorResponse('فشل في تغيير كلمة المرور');
        }
    }

    /**
     * طلب إعادة تعيين كلمة المرور
     *
     * @param ForgotPasswordRequest $request
     * @return JsonResponse
     */
    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        try {
            $status = Password::sendResetLink($request->only('email'));

            if ($status === Password::RESET_LINK_SENT) {
                return $this->successResponse(null, 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
            }

            return $this->errorResponse('فشل في إرسال رابط إعادة التعيين', 400);

        } catch (\Exception $e) {
            return $this->serverErrorResponse('حدث خطأ أثناء إرسال رابط إعادة التعيين');
        }
    }

    /**
     * إعادة تعيين كلمة المرور
     *
     * @param ResetPasswordRequest $request
     * @return JsonResponse
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        try {
            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function (User $user, string $password) {
                    $user->forceFill([
                        'password' => Hash::make($password),
                        'remember_token' => Str::random(60),
                    ])->save();

                    // حذف جميع الـ Tokens
                    $user->tokens()->delete();

                    event(new PasswordReset($user));
                }
            );

            if ($status === Password::PASSWORD_RESET) {
                return $this->successResponse(null, 'تم إعادة تعيين كلمة المرور بنجاح. يمكنك تسجيل الدخول الآن.');
            }

            return $this->errorResponse('فشل في إعادة تعيين كلمة المرور', 400);

        } catch (\Exception $e) {
            return $this->serverErrorResponse('حدث خطأ أثناء إعادة تعيين كلمة المرور');
        }
    }

    /**
     * إرسال بريد التحقق
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function sendVerificationEmail(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return $this->successResponse(null, 'البريد الإلكتروني مُحقق بالفعل');
        }

        $user->sendEmailVerificationNotification();

        return $this->successResponse(null, 'تم إرسال بريد التحقق');
    }

    /**
     * التحقق من البريد الإلكتروني
     *
     * @param Request $request
     * @param int $id
     * @param string $hash
     * @return JsonResponse
     */
    public function verifyEmail(Request $request, int $id, string $hash): JsonResponse
    {
        $user = User::findOrFail($id);

        if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return $this->forbiddenResponse('رابط التحقق غير صالح');
        }

        if ($user->hasVerifiedEmail()) {
            return $this->successResponse(null, 'البريد الإلكتروني مُحقق بالفعل');
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return $this->successResponse(null, 'تم التحقق من البريد الإلكتروني بنجاح');
    }

    /**
     * جلب قائمة الـ Tokens النشطة
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function tokens(Request $request): JsonResponse
    {
        $tokens = $request->user()->tokens()->get()->map(function ($token) use ($request) {
            return [
                'id' => $token->id,
                'name' => $token->name,
                'last_used_at' => $token->last_used_at?->toIso8601String(),
                'created_at' => $token->created_at->toIso8601String(),
                'is_current' => $token->id === $request->user()->currentAccessToken()->id,
            ];
        });

        return $this->successResponse($tokens, 'تم جلب قائمة الـ Tokens بنجاح');
    }

    /**
     * إلغاء Token محدد
     *
     * @param Request $request
     * @param int $tokenId
     * @return JsonResponse
     */
    public function revokeToken(Request $request, int $tokenId): JsonResponse
    {
        try {
            $token = $request->user()->tokens()->findOrFail($tokenId);
            $token->delete();

            return $this->successResponse(null, 'تم إلغاء الـ Token بنجاح');

        } catch (\Exception $e) {
            return $this->notFoundResponse('الـ Token غير موجود');
        }
    }
}
