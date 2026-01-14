<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>طلب عرض سعر جديد</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
            direction: rtl;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #1B3C5C 0%, #2d5a87 100%);
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            color: #FDB022;
            margin: 0;
            font-size: 24px;
        }
        .header p {
            color: rgba(255, 255, 255, 0.8);
            margin: 10px 0 0;
            font-size: 14px;
        }
        .reference-badge {
            background-color: #FDB022;
            color: #1B3C5C;
            padding: 10px 20px;
            border-radius: 8px;
            display: inline-block;
            font-weight: bold;
            font-size: 16px;
            margin-top: 15px;
        }
        .content {
            padding: 30px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            color: #1B3C5C;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #FDB022;
        }
        .info-grid {
            display: grid;
            gap: 12px;
        }
        .info-row {
            display: flex;
            padding: 12px;
            background-color: #f8f9fa;
            border-radius: 8px;
        }
        .info-label {
            font-weight: bold;
            color: #666;
            width: 140px;
            flex-shrink: 0;
        }
        .info-value {
            color: #333;
            flex: 1;
        }
        .info-value a {
            color: #1B3C5C;
            text-decoration: none;
        }
        .highlight-box {
            background: linear-gradient(135deg, #e8f4fd 0%, #f0f9ff 100%);
            border-right: 4px solid #1B3C5C;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .highlight-box h3 {
            color: #1B3C5C;
            margin: 0 0 8px;
        }
        .highlight-box p {
            color: #333;
            margin: 0;
            line-height: 1.6;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #eee;
        }
        .footer p {
            color: #888;
            font-size: 12px;
            margin: 0;
        }
        .action-button {
            display: inline-block;
            background-color: #FDB022;
            color: #1B3C5C;
            padding: 14px 35px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 20px;
        }
        .priority-badge {
            background-color: #dc3545;
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{{ $appName }}</h1>
            <p>نظام إدارة طلبات عروض الأسعار</p>
            <div class="reference-badge">
                رقم الطلب: {{ $reference }}
            </div>
        </div>
        
        <div class="content">
            <!-- معلومات العميل -->
            <div class="section">
                <h2 class="section-title">👤 معلومات العميل</h2>
                <div class="info-grid">
                    <div class="info-row">
                        <span class="info-label">الاسم:</span>
                        <span class="info-value">{{ $quote->name }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">البريد الإلكتروني:</span>
                        <span class="info-value">
                            <a href="mailto:{{ $quote->email }}">{{ $quote->email }}</a>
                        </span>
                    </div>
                    @if($quote->phone)
                    <div class="info-row">
                        <span class="info-label">رقم الهاتف:</span>
                        <span class="info-value">
                            <a href="tel:{{ $quote->phone }}">{{ $quote->phone }}</a>
                        </span>
                    </div>
                    @endif
                    @if($quote->company_name)
                    <div class="info-row">
                        <span class="info-label">اسم الشركة:</span>
                        <span class="info-value">{{ $quote->company_name }}</span>
                    </div>
                    @endif
                    @if($quote->company_type)
                    <div class="info-row">
                        <span class="info-label">نوع الشركة:</span>
                        <span class="info-value">{{ $quote->company_type }}</span>
                    </div>
                    @endif
                </div>
            </div>
            
            <!-- تفاصيل المشروع -->
            <div class="section">
                <h2 class="section-title">🏗️ تفاصيل المشروع</h2>
                <div class="info-grid">
                    @if($quote->project_location)
                    <div class="info-row">
                        <span class="info-label">موقع المشروع:</span>
                        <span class="info-value">{{ $quote->project_location }}</span>
                    </div>
                    @endif
                    @if($quote->project_area_sqm)
                    <div class="info-row">
                        <span class="info-label">مساحة المشروع:</span>
                        <span class="info-value">{{ number_format($quote->project_area_sqm) }} متر مربع</span>
                    </div>
                    @endif
                    @if($quote->buildings_count)
                    <div class="info-row">
                        <span class="info-label">عدد المباني:</span>
                        <span class="info-value">{{ $quote->buildings_count }}</span>
                    </div>
                    @endif
                    @if($quote->preferred_start_date)
                    <div class="info-row">
                        <span class="info-label">تاريخ البدء المفضل:</span>
                        <span class="info-value">{{ \Carbon\Carbon::parse($quote->preferred_start_date)->format('Y-m-d') }}</span>
                    </div>
                    @endif
                    @if($quote->estimated_budget)
                    <div class="info-row">
                        <span class="info-label">الميزانية المتوقعة:</span>
                        <span class="info-value">{{ number_format($quote->estimated_budget) }} {{ $quote->budget_unit ?? 'SAR' }}</span>
                    </div>
                    @endif
                </div>
            </div>
            
            <!-- وصف المشروع -->
            @if($quote->project_description)
            <div class="highlight-box">
                <h3>📝 وصف المشروع:</h3>
                <p>{{ $quote->project_description }}</p>
            </div>
            @endif
            
            <div style="text-align: center;">
                <a href="{{ $appUrl }}/admin/quote-requests/{{ $quote->id }}" class="action-button">
                    عرض التفاصيل الكاملة
                </a>
            </div>
        </div>
        
        <div class="footer">
            <p>تم إرسال هذا البريد تلقائياً من نظام {{ $appName }}</p>
            <p>📅 {{ now()->format('Y-m-d H:i:s') }}</p>
            <p>© {{ date('Y') }} {{ $appName }}. جميع الحقوق محفوظة.</p>
        </div>
    </div>
</body>
</html>
