#!/bin/bash
# 📋 Final Checklist - قائمة التحقق النهائية

echo "🎯 قائمة التحقق النهائية - Form Submission Fix"
echo "================================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
check_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

echo "1️⃣ التحقق من الملفات المعدلة..."
echo "---------------------------------"

# Check .env
if grep -q "http://localhost:3000" backend/.env && grep -q "http://localhost:5173" backend/.env; then
    echo -e "${GREEN}✅ backend/.env: FRONTEND_URL صحيح${NC}"
else
    echo -e "${RED}❌ backend/.env: FRONTEND_URL غير صحيح${NC}"
fi

# Check hooks.js
if grep -q "Cross-Origin Request Blocked" src/services/hooks.js || grep -q "Network Error" src/services/hooks.js; then
    echo -e "${GREEN}✅ src/services/hooks.js: معالجة أخطاء محسّنة${NC}"
else
    echo -e "${YELLOW}⚠️  src/services/hooks.js: قد تحتاج تحقق${NC}"
fi

# Check translations ar
if grep -q "contact.form.sending" src/i18n/locales/ar.json; then
    echo -e "${GREEN}✅ src/i18n/locales/ar.json: ترجمات مكتملة${NC}"
else
    echo -e "${RED}❌ src/i18n/locales/ar.json: ترجمات ناقصة${NC}"
fi

# Check translations en
if grep -q "contact.form.sending" src/i18n/locales/en.json; then
    echo -e "${GREEN}✅ src/i18n/locales/en.json: translations complete${NC}"
else
    echo -e "${RED}❌ src/i18n/locales/en.json: translations missing${NC}"
fi

echo ""
echo "2️⃣ الملفات الجديدة (الأدلة)..."
echo "------------------------------"

FILES=(
    "URGENT_CORS_FIX.md"
    "CORS_FIX_GUIDE.md"
    "CORS_DIAGNOSTIC_GUIDE.md"
    "CORS_VISUAL_GUIDE.md"
    "CORS_SOLUTION_SUMMARY.md"
    "CORS_COMPLETE_FIX.md"
    "SIMPLE_QUICK_START.md"
    "FORM_SUBMISSION_FIX_GUIDE.md"
    "FORM_SUBMISSION_TESTING_GUIDE.md"
    "COMPLETE_SUMMARY.md"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file (مفقود)${NC}"
    fi
done

echo ""
echo "3️⃣ الخدمات المتاحة..."
echo "-------------------"

# Check if backend is running
if curl -s http://localhost:8000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend API: http://localhost:8000${NC}"
else
    echo -e "${YELLOW}⚠️  Backend API: لم يتم الكشف (قد يحتاج تشغيل)${NC}"
fi

# Check if frontend is running
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend: http://localhost:5173${NC}"
elif curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend: http://localhost:3000${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend: لم يتم الكشف (قد يحتاج تشغيل)${NC}"
fi

echo ""
echo "4️⃣ الخطوات التالية..."
echo "---------------------"
echo ""
echo "إذا رأيت ✅ في كل المربعات أعلاه:"
echo "  👉 كل شيء جاهز! أذهب وجرّب النموذج"
echo ""
echo "إذا رأيت ⚠️ أو ❌:"
echo "  👉 اتبع URGENT_CORS_FIX.md أو SIMPLE_QUICK_START.md"
echo ""
echo "================================================="
echo "🎉 الآن جاهز للاختبار!"
echo "================================================="
