<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

/**
 * ================================
 * مُتحكم إدارة المستخدمين
 * ================================
 */
class UserController extends Controller
{
    use ApiResponseTrait;

    /**
     * جلب جميع المستخدمين
     */
    public function index(Request $request): JsonResponse
    {
        $query = User::query()->latest();

        if ($role = $request->input('role')) {
            $query->where('role', $role);
        }

        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        if ($search = $request->input('search')) {
            $query->search($search);
        }

        $perPage = $request->input('per_page', 15);
        return $this->paginatedResponse(
            $query->paginate($perPage),
            'تم جلب المستخدمين'
        );
    }

    /**
     * جلب مستخدم محدد
     */
    public function show(int $id): JsonResponse
    {
        $user = User::withTrashed()
            ->withCount(['quoteRequests', 'contactMessages', 'projects'])
            ->findOrFail($id);

        return $this->successResponse(new UserResource($user), 'تم جلب المستخدم');
    }

    /**
     * إنشاء مستخدم جديد (موظف/مدير)
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
            'company_name' => 'nullable|string|max:255',
            'role' => 'required|in:user,staff,admin',
            'preferred_language' => 'nullable|in:ar,en',
            'is_active' => 'boolean',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['email_verified_at'] = now(); // تفعيل البريد تلقائياً للمستخدمين المُنشأين من لوحة التحكم

        $user = User::create($validated);

        return $this->createdResponse(
            new UserResource($user),
            'تم إنشاء المستخدم بنجاح'
        );
    }

    /**
     * تحديث مستخدم
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        // منع المدير من تغيير دوره الخاص
        if ($user->id === auth()->id() && $request->has('role') && $request->role !== $user->role) {
            return $this->forbiddenResponse('لا يمكنك تغيير دورك الخاص');
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
            'company_name' => 'nullable|string|max:255',
            'role' => 'sometimes|required|in:user,staff,admin',
            'preferred_language' => 'nullable|in:ar,en',
            'is_active' => 'boolean',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return $this->successResponse(
            new UserResource($user->fresh()),
            'تم تحديث المستخدم بنجاح'
        );
    }

    /**
     * تبديل حالة التفعيل
     */
    public function toggleActive(int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        // منع المدير من إيقاف حسابه الخاص
        if ($user->id === auth()->id()) {
            return $this->forbiddenResponse('لا يمكنك إيقاف حسابك الخاص');
        }

        $user->update(['is_active' => !$user->is_active]);

        // إلغاء جميع التوكنات عند إيقاف الحساب
        if (!$user->is_active) {
            $user->tokens()->delete();
        }

        return $this->successResponse(
            ['is_active' => $user->is_active],
            $user->is_active ? 'تم تفعيل المستخدم' : 'تم إيقاف المستخدم'
        );
    }

    /**
     * حذف مستخدم (Soft Delete)
     */
    public function destroy(int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        // منع المدير من حذف حسابه الخاص
        if ($user->id === auth()->id()) {
            return $this->forbiddenResponse('لا يمكنك حذف حسابك الخاص');
        }

        // إلغاء جميع التوكنات قبل الحذف
        $user->tokens()->delete();
        $user->delete();

        return $this->deletedResponse('تم حذف المستخدم بنجاح');
    }

    /**
     * استعادة مستخدم محذوف
     */
    public function restore(int $id): JsonResponse
    {
        $user = User::onlyTrashed()->findOrFail($id);
        $user->restore();
        return $this->successResponse(
            new UserResource($user),
            'تم استعادة المستخدم بنجاح'
        );
    }
}
