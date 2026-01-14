<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>رسالة تواصل جديدة</title>
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
        .content {
            padding: 30px;
        }
        .alert-badge {
            background-color: #FDB022;
            color: #1B3C5C;
            padding: 8px 16px;
            border-radius: 20px;
            display: inline-block;
            font-weight: bold;
            font-size: 12px;
            margin-bottom: 20px;
        }
        .message-type {
            background-color: #e8f4fd;
            border-right: 4px solid #1B3C5C;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .message-type span {
            color: #1B3C5C;
            font-weight: bold;
        }
        .info-row {
            display: flex;
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
        }
        .info-label {
            font-weight: bold;
            color: #666;
            width: 120px;
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
        .info-value a:hover {
            text-decoration: underline;
        }
        .message-box {
            background-color: #f8f9fa;
            border-radius: 12px;
            padding: 20px;
            margin-top: 20px;
        }
        .message-box h3 {
            color: #1B3C5C;
            margin: 0 0 12px;
            font-size: 16px;
        }
        .message-box p {
            color: #333;
            line-height: 1.8;
            margin: 0;
            white-space: pre-wrap;
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
            padding: 12px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 20px;
        }
        .meta-info {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px dashed #ddd;
            font-size: 12px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{{ $appName }}</h1>
            <p>نظام إدارة رسائل التواصل</p>
        </div>
        
        <div class="content">
            <span class="alert-badge">📩 رسالة تواصل جديدة</span>
            
            <div class="message-type">
                <span>نوع الرسالة:</span> 
                @switch($message->message_type)
                    @case('general')
                        استفسار عام
                        @break
                    @case('support')
                        دعم فني
                        @break
                    @case('complaint')
                        شكوى
                        @break
                    @case('suggestion')
                        اقتراح
                        @break
                    @default
                        رسالة عامة
                @endswitch
            </div>
            
            <div class="info-row">
                <span class="info-label">الاسم:</span>
                <span class="info-value">{{ $message->name }}</span>
            </div>
            
            <div class="info-row">
                <span class="info-label">البريد الإلكتروني:</span>
                <span class="info-value">
                    <a href="mailto:{{ $message->email }}">{{ $message->email }}</a>
                </span>
            </div>
            
            @if($message->phone)
            <div class="info-row">
                <span class="info-label">رقم الهاتف:</span>
                <span class="info-value">
                    <a href="tel:{{ $message->phone }}">{{ $message->phone }}</a>
                </span>
            </div>
            @endif
            
            @if($message->company_name)
            <div class="info-row">
                <span class="info-label">اسم الشركة:</span>
                <span class="info-value">{{ $message->company_name }}</span>
            </div>
            @endif
            
            <div class="info-row">
                <span class="info-label">الموضوع:</span>
                <span class="info-value">{{ $message->subject }}</span>
            </div>
            
            <div class="message-box">
                <h3>📝 نص الرسالة:</h3>
                <p>{{ $message->message }}</p>
            </div>
            
            <div class="meta-info">
                <p>📅 التاريخ: {{ $message->created_at->format('Y-m-d H:i:s') }}</p>
                <p>🌐 الصفحة المصدر: {{ $message->source_page ?? 'غير محدد' }}</p>
                <p>🌍 اللغة المفضلة: {{ $message->preferred_language == 'ar' ? 'العربية' : 'English' }}</p>
                <p>💻 عنوان IP: {{ $message->ip_address }}</p>
            </div>
            
            <div style="text-align: center;">
                <a href="{{ $appUrl }}/admin/contact-messages/{{ $message->id }}" class="action-button">
                    عرض في لوحة التحكم
                </a>
            </div>
        </div>
        
        <div class="footer">
            <p>تم إرسال هذا البريد تلقائياً من نظام {{ $appName }}</p>
            <p>© {{ date('Y') }} {{ $appName }}. جميع الحقوق محفوظة.</p>
        </div>
    </div>
</body>
</html>
