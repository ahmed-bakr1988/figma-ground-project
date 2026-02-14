<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Project;
use App\Models\BlogPost;
use App\Models\Faq;
use App\Models\ContactMessage;
use App\Models\QuoteRequest;
use App\Models\User;
use App\Models\NewsletterSubscriber;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;

/**
 * ================================
 * مُتحكم لوحة التحكم - الإحصائيات والنظرة العامة
 * ================================
 */
class DashboardController extends Controller
{
    use ApiResponseTrait;

    /**
     * جلب إحصائيات لوحة التحكم
     */
    public function stats(): JsonResponse
    {
        $stats = [
            // إحصائيات المحتوى
            'services' => [
                'total' => Service::count(),
                'active' => Service::where('is_active', true)->count(),
                'featured' => Service::where('is_featured', true)->count(),
            ],
            'projects' => [
                'total' => Project::count(),
                'active' => Project::where('is_active', true)->count(),
                'featured' => Project::where('is_featured', true)->count(),
                'total_value' => Project::where('is_active', true)->sum('project_value'),
            ],
            'blog_posts' => [
                'total' => BlogPost::count(),
                'published' => BlogPost::where('is_published', true)->count(),
                'draft' => BlogPost::where('is_published', false)->count(),
                'total_views' => BlogPost::sum('views_count'),
            ],
            'faqs' => [
                'total' => Faq::count(),
                'active' => Faq::where('is_active', true)->count(),
            ],

            // إحصائيات التواصل
            'contact_messages' => [
                'total' => ContactMessage::count(),
                'new' => ContactMessage::where('status', 'new')->count(),
                'read' => ContactMessage::where('status', 'read')->count(),
                'replied' => ContactMessage::where('status', 'replied')->count(),
                'this_month' => ContactMessage::whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year)->count(),
            ],
            'quote_requests' => [
                'total' => QuoteRequest::count(),
                'new' => QuoteRequest::where('status', 'new')->count(),
                'reviewing' => QuoteRequest::where('status', 'reviewing')->count(),
                'quoted' => QuoteRequest::where('status', 'quoted')->count(),
                'accepted' => QuoteRequest::where('status', 'accepted')->count(),
                'this_month' => QuoteRequest::whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year)->count(),
            ],

            // إحصائيات المستخدمين
            'users' => [
                'total' => User::count(),
                'active' => User::where('is_active', true)->count(),
                'admins' => User::where('role', 'admin')->count(),
                'staff' => User::where('role', 'staff')->count(),
            ],

            // المشتركون في النشرة البريدية
            'newsletter' => [
                'total' => NewsletterSubscriber::count(),
                'active' => NewsletterSubscriber::where('is_active', true)->count(),
            ],
        ];

        return $this->successResponse($stats, 'تم جلب إحصائيات لوحة التحكم');
    }

    /**
     * جلب آخر النشاطات
     */
    public function recentActivity(): JsonResponse
    {
        $activity = [
            'recent_messages' => ContactMessage::latest()
                ->limit(5)
                ->get(['id', 'name', 'email', 'subject', 'status', 'created_at']),

            'recent_quotes' => QuoteRequest::with('service:id,title_ar,title_en')
                ->latest()
                ->limit(5)
                ->get(['id', 'name', 'email', 'service_id', 'status', 'created_at']),

            'recent_posts' => BlogPost::latest('published_at')
                ->limit(5)
                ->get(['id', 'title_ar', 'title_en', 'slug', 'is_published', 'published_at', 'views_count']),
        ];

        return $this->successResponse($activity, 'تم جلب آخر النشاطات');
    }
}
