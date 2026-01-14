#!/bin/bash

# 🧪 اختبار سريع لـ CORS Fix

echo "🔍 اختبار CORS Fix..."
echo ""

# 1. التحقق من .env
echo "1️⃣ التحقق من FRONTEND_URL في .env:"
if grep -q "http://localhost:3000" backend/.env && grep -q "http://localhost:5173" backend/.env; then
    echo "   ✅ FRONTEND_URL صحيح"
else
    echo "   ❌ FRONTEND_URL غير صحيح"
    echo "   يجب أن يكون:"
    echo "   FRONTEND_URL=http://localhost:5173,http://localhost:3000"
fi
echo ""

# 2. فحص الاتصال
echo "2️⃣ اختبار الاتصال بـ Backend API:"
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/api/health)
if [ "$RESPONSE" == "200" ]; then
    echo "   ✅ Backend يعمل (Status: $RESPONSE)"
else
    echo "   ❌ Backend لا يرد (Status: $RESPONSE)"
    echo "   اشغّل: cd backend && php artisan serve"
fi
echo ""

# 3. فحص CORS Headers
echo "3️⃣ اختبار CORS Headers:"
CORS_HEADER=$(curl -s -I -H "Origin: http://localhost:5173" http://localhost:8000/api/contact/message | grep -i "Access-Control-Allow-Origin" || echo "NOT_FOUND")
if [ "$CORS_HEADER" != "NOT_FOUND" ]; then
    echo "   ✅ CORS Header موجود:"
    echo "   $CORS_HEADER"
else
    echo "   ❌ CORS Header غير موجود"
    echo "   جرّب: php artisan config:clear && php artisan serve"
fi
echo ""

echo "✨ الاختبار انتهى!"
echo ""
echo "النتيجة:"
echo "  إذا رأيت ✅ في كل النقاط = كل شيء تمام"
echo "  إذا رأيت ❌ = اتبع التعليمات المكتوبة"
