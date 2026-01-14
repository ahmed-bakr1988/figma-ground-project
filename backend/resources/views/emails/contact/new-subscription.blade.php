<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>اشتراك جديد في النشرة البريدية</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
            direction: rtl;
        }
        .container {
            max-width: 500px;
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
        .content {
            padding: 30px;
            text-align: center;
        }
        .icon {
            font-size: 48px;
            margin-bottom: 15px;
        }
        .info-box {
            background-color: #f8f9fa;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
        }
        .info-box p {
            margin: 8px 0;
            color: #333;
        }
        .info-box strong {
            color: #1B3C5C;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 15px 30px;
            text-align: center;
            border-top: 1px solid #eee;
        }
        .footer p {
            color: #888;
            font-size: 12px;
            margin: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{{ $appName }}</h1>
        </div>
        
        <div class="content">
            <div class="icon">📧</div>
            <h2 style="color: #1B3C5C; margin: 0 0 10px;">اشتراك جديد!</h2>
            <p style="color: #666;">تم استلام اشتراك جديد في النشرة البريدية</p>
            
            <div class="info-box">
                @if($subscriber->name)
                <p><strong>الاسم:</strong> {{ $subscriber->name }}</p>
                @endif
                <p><strong>البريد الإلكتروني:</strong> {{ $subscriber->email }}</p>
                <p><strong>اللغة المفضلة:</strong> {{ $subscriber->preferred_language == 'ar' ? 'العربية' : 'English' }}</p>
                <p><strong>تاريخ الاشتراك:</strong> {{ $subscriber->subscribed_at->format('Y-m-d H:i') }}</p>
                <p><strong>المصدر:</strong> {{ $subscriber->source ?? 'الموقع الإلكتروني' }}</p>
            </div>
        </div>
        
        <div class="footer">
            <p>© {{ date('Y') }} {{ $appName }}. جميع الحقوق محفوظة.</p>
        </div>
    </div>
</body>
</html>
