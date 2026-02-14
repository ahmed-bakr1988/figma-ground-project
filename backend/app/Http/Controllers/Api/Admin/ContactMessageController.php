<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * ================================
 * مُتحكم إدارة رسائل التواصل
 * ================================
 */
class ContactMessageController extends Controller
{
    use ApiResponseTrait;

    /**
     * جلب جميع الرسائل
     */
    public function index(Request $request): JsonResponse
    {
        $query = ContactMessage::with(['user', 'repliedByUser'])->latest();

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($type = $request->input('message_type')) {
            $query->where('message_type', $type);
        }

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        // فلترة حسب التاريخ
        if ($from = $request->input('from_date')) {
            $query->whereDate('created_at', '>=', $from);
        }
        if ($to = $request->input('to_date')) {
            $query->whereDate('created_at', '<=', $to);
        }

        $perPage = $request->input('per_page', 15);
        return $this->paginatedResponse($query->paginate($perPage), 'تم جلب الرسائل');
    }

    /**
     * جلب رسالة محددة
     */
    public function show(int $id): JsonResponse
    {
        $message = ContactMessage::with(['user', 'repliedByUser'])->findOrFail($id);

        // تحديث الحالة إلى "مقروءة" تلقائياً
        if ($message->status === 'new') {
            $message->update(['status' => 'read']);
        }

        return $this->successResponse($message, 'تم جلب الرسالة');
    }

    /**
     * تحديث حالة الرسالة
     */
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:new,read,replied,closed',
            'admin_notes' => 'nullable|string',
        ]);

        $message = ContactMessage::findOrFail($id);

        $updateData = ['status' => $validated['status']];

        if (isset($validated['admin_notes'])) {
            $updateData['admin_notes'] = $validated['admin_notes'];
        }

        // تسجيل من قام بالرد
        if ($validated['status'] === 'replied') {
            $updateData['replied_by'] = auth()->id();
            $updateData['replied_at'] = now();
        }

        $message->update($updateData);

        return $this->successResponse(
            $message->fresh()->load(['user', 'repliedByUser']),
            'تم تحديث حالة الرسالة'
        );
    }

    /**
     * إضافة ملاحظات إدارية
     */
    public function addNotes(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'admin_notes' => 'required|string',
        ]);

        $message = ContactMessage::findOrFail($id);
        $message->update(['admin_notes' => $validated['admin_notes']]);

        return $this->successResponse(
            $message->fresh(),
            'تم إضافة الملاحظات'
        );
    }

    /**
     * حذف رسالة (Soft Delete)
     */
    public function destroy(int $id): JsonResponse
    {
        $message = ContactMessage::findOrFail($id);
        $message->delete();
        return $this->deletedResponse('تم حذف الرسالة بنجاح');
    }

    /**
     * استعادة رسالة محذوفة
     */
    public function restore(int $id): JsonResponse
    {
        $message = ContactMessage::onlyTrashed()->findOrFail($id);
        $message->restore();
        return $this->successResponse($message, 'تم استعادة الرسالة بنجاح');
    }

    /**
     * تحديث حالة عدة رسائل دفعة واحدة
     */
    public function bulkUpdateStatus(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|exists:contact_messages,id',
            'status' => 'required|in:new,read,replied,closed',
        ]);

        ContactMessage::whereIn('id', $validated['ids'])
            ->update(['status' => $validated['status']]);

        return $this->successResponse(
            ['updated_count' => count($validated['ids'])],
            'تم تحديث حالة الرسائل'
        );
    }
}
