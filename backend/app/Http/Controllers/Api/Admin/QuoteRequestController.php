<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\QuoteRequest;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * ================================
 * مُتحكم إدارة طلبات عروض الأسعار
 * ================================
 */
class QuoteRequestController extends Controller
{
    use ApiResponseTrait;

    /**
     * جلب جميع طلبات عروض الأسعار
     */
    public function index(Request $request): JsonResponse
    {
        $query = QuoteRequest::with(['service', 'handledBy'])->latest();

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        if ($serviceId = $request->input('service_id')) {
            $query->where('service_id', $serviceId);
        }

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('company_name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('project_location', 'like', "%{$search}%");
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
        return $this->paginatedResponse($query->paginate($perPage), 'تم جلب طلبات عروض الأسعار');
    }

    /**
     * جلب طلب محدد
     */
    public function show(int $id): JsonResponse
    {
        $quote = QuoteRequest::with(['service', 'user', 'handledBy'])->findOrFail($id);
        return $this->successResponse($quote, 'تم جلب طلب عرض السعر');
    }

    /**
     * تحديث حالة طلب عرض السعر
     */
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:new,reviewing,quoted,accepted,rejected,cancelled',
            'quoted_amount' => 'nullable|numeric|min:0',
            'quote_notes' => 'nullable|string',
        ]);

        $quote = QuoteRequest::findOrFail($id);

        $updateData = ['status' => $validated['status']];

        if (isset($validated['quoted_amount'])) {
            $updateData['quoted_amount'] = $validated['quoted_amount'];
        }

        if (isset($validated['quote_notes'])) {
            $updateData['quote_notes'] = $validated['quote_notes'];
        }

        // تسجيل من يتعامل مع الطلب
        if (in_array($validated['status'], ['reviewing', 'quoted'])) {
            $updateData['handled_by'] = auth()->id();
        }

        $quote->update($updateData);

        return $this->successResponse(
            $quote->fresh()->load(['service', 'handledBy']),
            'تم تحديث حالة الطلب'
        );
    }

    /**
     * إضافة عرض سعر
     */
    public function addQuote(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'quoted_amount' => 'required|numeric|min:0',
            'quote_notes' => 'nullable|string',
        ]);

        $quote = QuoteRequest::findOrFail($id);
        $quote->update([
            'status' => 'quoted',
            'quoted_amount' => $validated['quoted_amount'],
            'quote_notes' => $validated['quote_notes'] ?? null,
            'handled_by' => auth()->id(),
        ]);

        return $this->successResponse(
            $quote->fresh()->load(['service', 'handledBy']),
            'تم إضافة عرض السعر بنجاح'
        );
    }

    /**
     * حذف طلب (Soft Delete)
     */
    public function destroy(int $id): JsonResponse
    {
        $quote = QuoteRequest::findOrFail($id);
        $quote->delete();
        return $this->deletedResponse('تم حذف طلب عرض السعر بنجاح');
    }

    /**
     * استعادة طلب محذوف
     */
    public function restore(int $id): JsonResponse
    {
        $quote = QuoteRequest::onlyTrashed()->findOrFail($id);
        $quote->restore();
        return $this->successResponse(
            $quote->load(['service', 'handledBy']),
            'تم استعادة الطلب بنجاح'
        );
    }

    /**
     * تحديث حالة عدة طلبات دفعة واحدة
     */
    public function bulkUpdateStatus(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'integer|exists:quote_requests,id',
            'status' => 'required|in:new,reviewing,quoted,accepted,rejected,cancelled',
        ]);

        QuoteRequest::whereIn('id', $validated['ids'])
            ->update([
                'status' => $validated['status'],
                'handled_by' => auth()->id(),
            ]);

        return $this->successResponse(
            ['updated_count' => count($validated['ids'])],
            'تم تحديث حالة الطلبات'
        );
    }
}
