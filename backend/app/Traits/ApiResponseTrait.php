<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * ================================
 * Trait للاستجابات الموحدة للـ API
 * ================================
 * 
 * يوفر هيكل استجابة موحد لجميع الـ API endpoints
 * يضمن تناسق الاستجابات عبر جميع الـ Controllers
 */
trait ApiResponseTrait
{
    /**
     * استجابة نجاح عامة
     *
     * @param mixed $data البيانات المرتجعة
     * @param string $message رسالة النجاح
     * @param int $statusCode كود HTTP
     * @return JsonResponse
     */
    protected function successResponse(
        mixed $data = null,
        string $message = 'تمت العملية بنجاح',
        int $statusCode = 200
    ): JsonResponse {
        $response = [
            'success' => true,
            'message' => $message,
            'data' => $data,
            'meta' => [
                'timestamp' => now()->toIso8601String(),
                'version' => config('app.api.version', 'v1'),
            ],
        ];

        return response()->json($response, $statusCode);
    }

    /**
     * استجابة خطأ عامة
     *
     * @param string $message رسالة الخطأ
     * @param int $statusCode كود HTTP
     * @param array $errors تفاصيل الأخطاء
     * @return JsonResponse
     */
    protected function errorResponse(
        string $message = 'حدث خطأ ما',
        int $statusCode = 400,
        array $errors = []
    ): JsonResponse {
        $response = [
            'success' => false,
            'message' => $message,
            'errors' => $errors,
            'meta' => [
                'timestamp' => now()->toIso8601String(),
                'version' => config('app.api.version', 'v1'),
            ],
        ];

        return response()->json($response, $statusCode);
    }

    /**
     * استجابة إنشاء ناجح
     *
     * @param mixed $data البيانات المنشأة
     * @param string $message رسالة النجاح
     * @return JsonResponse
     */
    protected function createdResponse(
        mixed $data = null,
        string $message = 'تم الإنشاء بنجاح'
    ): JsonResponse {
        return $this->successResponse($data, $message, 201);
    }

    /**
     * استجابة حذف ناجح
     *
     * @param string $message رسالة النجاح
     * @return JsonResponse
     */
    protected function deletedResponse(
        string $message = 'تم الحذف بنجاح'
    ): JsonResponse {
        return $this->successResponse(null, $message, 200);
    }

    /**
     * استجابة بدون محتوى
     *
     * @return JsonResponse
     */
    protected function noContentResponse(): JsonResponse
    {
        return response()->json(null, 204);
    }

    /**
     * استجابة غير مصرح
     *
     * @param string $message رسالة الخطأ
     * @return JsonResponse
     */
    protected function unauthorizedResponse(
        string $message = 'غير مصرح لك بالوصول'
    ): JsonResponse {
        return $this->errorResponse($message, 401);
    }

    /**
     * استجابة ممنوع الوصول
     *
     * @param string $message رسالة الخطأ
     * @return JsonResponse
     */
    protected function forbiddenResponse(
        string $message = 'ليس لديك صلاحية لهذا الإجراء'
    ): JsonResponse {
        return $this->errorResponse($message, 403);
    }

    /**
     * استجابة غير موجود
     *
     * @param string $message رسالة الخطأ
     * @return JsonResponse
     */
    protected function notFoundResponse(
        string $message = 'المورد المطلوب غير موجود'
    ): JsonResponse {
        return $this->errorResponse($message, 404);
    }

    /**
     * استجابة خطأ في التحقق
     *
     * @param array $errors أخطاء التحقق
     * @param string $message رسالة الخطأ
     * @return JsonResponse
     */
    protected function validationErrorResponse(
        array $errors,
        string $message = 'فشل التحقق من البيانات'
    ): JsonResponse {
        return $this->errorResponse($message, 422, $errors);
    }

    /**
     * استجابة خطأ في الخادم
     *
     * @param string $message رسالة الخطأ
     * @return JsonResponse
     */
    protected function serverErrorResponse(
        string $message = 'حدث خطأ في الخادم'
    ): JsonResponse {
        return $this->errorResponse($message, 500);
    }

    /**
     * استجابة مع Pagination
     *
     * @param LengthAwarePaginator $paginator
     * @param string $message رسالة النجاح
     * @return JsonResponse
     */
    protected function paginatedResponse(
        LengthAwarePaginator $paginator,
        string $message = 'تم جلب البيانات بنجاح'
    ): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $paginator->items(),
            'meta' => [
                'timestamp' => now()->toIso8601String(),
                'version' => config('app.api.version', 'v1'),
                'pagination' => [
                    'current_page' => $paginator->currentPage(),
                    'last_page' => $paginator->lastPage(),
                    'per_page' => $paginator->perPage(),
                    'total' => $paginator->total(),
                    'from' => $paginator->firstItem(),
                    'to' => $paginator->lastItem(),
                    'has_more_pages' => $paginator->hasMorePages(),
                ],
            ],
            'links' => [
                'first' => $paginator->url(1),
                'last' => $paginator->url($paginator->lastPage()),
                'prev' => $paginator->previousPageUrl(),
                'next' => $paginator->nextPageUrl(),
            ],
        ], 200);
    }

    /**
     * استجابة Resource واحد
     *
     * @param JsonResource $resource
     * @param string $message رسالة النجاح
     * @param int $statusCode كود HTTP
     * @return JsonResponse
     */
    protected function resourceResponse(
        JsonResource $resource,
        string $message = 'تم جلب البيانات بنجاح',
        int $statusCode = 200
    ): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $resource,
            'meta' => [
                'timestamp' => now()->toIso8601String(),
                'version' => config('app.api.version', 'v1'),
            ],
        ], $statusCode);
    }

    /**
     * استجابة Collection من Resources
     *
     * @param ResourceCollection $collection
     * @param string $message رسالة النجاح
     * @return JsonResponse
     */
    protected function collectionResponse(
        ResourceCollection $collection,
        string $message = 'تم جلب البيانات بنجاح'
    ): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $collection,
            'meta' => [
                'timestamp' => now()->toIso8601String(),
                'version' => config('app.api.version', 'v1'),
            ],
        ], 200);
    }
}
