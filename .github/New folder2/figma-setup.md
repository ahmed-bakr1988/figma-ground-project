# دليل شامل: تحويل مشاريع Figma إلى كود باستخدام VS Code و GitHub Copilot مع Figma MCP Server

## 🎯 نظرة عامة على الحل

هذا الحل يستخدم **Figma MCP Server** (Model Context Protocol) لربط تصاميم Figma مباشرة مع بيئة التطوير، مما يسمح بتحويل التصاميم إلى كود تلقائياً.

---

## 📋 المتطلبات الأساسية

### 1. الأدوات المطلوبة:
- **VS Code** (أحدث إصدار)
- **GitHub Copilot** (اشتراك نشط)
- **Node.js** (v18 أو أحدث)
- **Figma Desktop App** أو حساب Figma
- **Git** للتحكم في الإصدارات

### 2. الإضافات المطلوبة لـ VS Code:
```
- GitHub Copilot
- GitHub Copilot Chat
- Figma for VS Code (اختياري)
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Prettier
```

---

## 🚀 خطوات التثبيت والإعداد

### **المرحلة 1: إعداد Figma MCP Server**

#### 1.1 تثبيت MCP Server:

```bash
# استنساخ المستودع
git clone https://github.com/anthropics/mcp-servers.git
cd mcp-servers/src/figma

# تثبيت المتطلبات
npm install

# بناء المشروع
npm run build
```

#### 1.2 الحصول على Figma Access Token:

1. افتح Figma وانتقل إلى **Settings → Account**
2. اذهب إلى **Personal Access Tokens**
3. انقر على **Generate new token**
4. أعط التوكن اسماً وصلاحيات القراءة
5. انسخ التوكن (سيظهر مرة واحدة فقط!)

#### 1.3 تكوين MCP Server:

أنشئ ملف `config.json` في مجلد المشروع:

```json
{
  "mcpServers": {
    "figma": {
      "command": "node",
      "args": ["/path/to/mcp-servers/src/figma/dist/index.js"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your_figma_token_here"
      }
    }
  }
}
```

---

### **المرحلة 2: إعداد Claude Desktop مع MCP**

#### 2.1 تثبيت Claude Desktop:

```bash
# لنظام macOS
brew install --cask claude

# لنظام Windows
# قم بتحميل المثبت من موقع Anthropic
```

#### 2.2 تكوين Claude مع Figma MCP:

أنشئ أو عدّل ملف التكوين:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "figma": {
      "command": "node",
      "args": [
        "/Users/your-username/path/to/mcp-servers/src/figma/dist/index.js"
      ],
      "env": {
        "FIGMA_ACCESS_TOKEN": "figd_your_actual_token_here"
      }
    }
  }
}
```

#### 2.3 إعادة تشغيل Claude Desktop:

```bash
# أغلق Claude تماماً وأعد فتحه
# تحقق من أن MCP Server متصل من خلال أيقونة 🔌 في الواجهة
```

---

### **المرحلة 3: إعداد VS Code مع GitHub Copilot**

#### 3.1 تثبيت وتفعيل GitHub Copilot:

1. افتح VS Code
2. اذهب إلى Extensions (Ctrl+Shift+X)
3. ابحث عن "GitHub Copilot" وثبّته
4. سجّل الدخول بحساب GitHub الخاص بك
5. تأكد من تفعيل Copilot Chat أيضاً

#### 3.2 إنشاء مشروع جديد:

```bash
# إنشاء مجلد المشروع
mkdir figma-to-code-project
cd figma-to-code-project

# تهيئة Git
git init

# إنشاء package.json
npm init -y

# تثبيت المكتبات الأساسية
npm install react react-dom
npm install -D vite @vitejs/plugin-react tailwindcss postcss autoprefixer

# تهيئة Tailwind CSS
npx tailwindcss init -p
```

#### 3.3 إعداد Tailwind CSS:

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🎨 سير العمل: من Figma إلى الكود

### **الطريقة 1: استخدام Claude Desktop مع MCP**

#### الخطوة 1: الحصول على Node ID من Figma

```
1. افتح تصميمك في Figma
2. اختر العنصر/الصفحة المطلوبة
3. انسخ الرابط (يحتوي على node-id)
   مثال: https://figma.com/design/ABC123/MyDesign?node-id=1-2
```

#### الخطوة 2: استخدام Claude لتحليل التصميم

افتح Claude Desktop واستخدم هذا البرومبت:

```
أحتاج منك تحليل تصميم Figma وتحويله إلى كود React + Tailwind CSS.

معلومات التصميم:
- Figma URL: [الصق الرابط هنا]
- Node ID: 1:2

المطلوب:
1. استخدم Figma:get_design_context لجلب معلومات التصميم
2. استخدم Figma:get_screenshot للحصول على صورة التصميم
3. استخدم Figma:get_metadata لفهم البنية
4. حلل الألوان، الخطوط، المسافات، والتخطيط
5. أنشئ مكون React مع Tailwind CSS يطابق التصميم تماماً

ملاحظات:
- استخدم Tailwind CSS فقط (لا CSS مخصص)
- اجعل التصميم responsive
- احتفظ بجميع التفاصيل البصرية
```

#### الخطوة 3: معالجة النتائج

Claude سيستخدم Figma MCP للحصول على:

```javascript
// 1. Design Context (التخطيط والأنماط)
{
  "layers": [...],
  "styles": {
    "colors": {...},
    "typography": {...},
    "spacing": {...}
  }
}

// 2. Screenshot (صورة التصميم)
// يستخدمها Claude كمرجع بصري

// 3. Metadata (البنية الهرمية)
// يفهم من خلالها تنظيم العناصر
```

#### الخطوة 4: توليد الكود

Claude سينشئ كوداً مثل:

```jsx
import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/lightning-storm.jpg" 
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="max-w-4xl text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Shielding Your Property With Reliable Lightning Protection Services
          </h1>
          
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Professional lightning protection systems installed by certified engineers
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-all">
              Get Free Consultation
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold transition-all">
              Our Services
            </button>
          </div>
        </div>
      </div>
      
      {/* Contact Form */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <div className="bg-white rounded-xl p-8 w-80 shadow-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Get a Quote
          </h3>
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
            />
            <input 
              type="email" 
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
            />
            <input 
              type="tel" 
              placeholder="Phone"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
            />
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent">
              <option>Service Type</option>
              <option>New Installation</option>
              <option>Maintenance</option>
              <option>Consultation</option>
            </select>
            <textarea 
              rows="3" 
              placeholder="Project Details"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
            />
            <button 
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
```

---

### **الطريقة 2: استخدام GitHub Copilot في VS Code**

#### الخطوة 1: إنشاء ملف المكون

```bash
# أنشئ ملف المكون
touch src/components/HeroSection.jsx
```

#### الخطوة 2: استخدام Copilot Chat

اضغط `Ctrl+I` (أو `Cmd+I` على Mac) لفتح Inline Chat، ثم اكتب:

```
حوّل هذا التصميم إلى React component مع Tailwind CSS:
[الصق رابط Figma هنا]

المتطلبات:
- استخدم Tailwind CSS فقط
- تطابق التخطيط تماماً مع التصميم
- تضمين جميع الألوان، المسافات، والطباعة
- اجعلها متجاوبة (موبايل، تابلت، ديسكتوب)
- أضف تأثيرات عند التحويم على العناصر التفاعلية

مواصفات التصميم:
- قسم البطل مع صورة خلفية ملء الشاشة
- طبقة فوقية مع شفافية 0.5
- عنوان كبير: "درع لممتلكاتك مع خدمات حماية من البرق موثوقة"
- زرين CTA (أساسي برتقالي، ثانوي بإطار أبيض)
- نموذج الاتصال على الجانب الأيمن (للكمبيوتر المكتبي فقط)
- حقول النموذج: الاسم، البريد الإلكتروني، الهاتف، نوع الخدمة، التفاصيل
```

#### الخطوة 3: التحسين التدريجي

استخدم Copilot للتحسينات:

```javascript
// اكتب تعليق وسيكمل Copilot الكود
// Add animation when component mounts
// Add form validation
// Add loading state for form submission
// Add accessibility attributes
```

---

### **الطريقة 3: سير عمل متكامل (MCP + Copilot)**

#### سير العمل الموصى به:

```
1. Claude Desktop (مع MCP):
   ↓
   - تحليل تصميم Figma
   - استخراج الألوان والخطوط
   - فهم البنية والتخطيط
   - توليد الكود الأساسي
   
2. نسخ الكود إلى VS Code:
   ↓
   - إنشاء ملفات المكونات
   - تنظيم البنية
   
3. GitHub Copilot في VS Code:
   ↓
   - تحسين الكود
   - إضافة التفاعلية
   - إصلاح الأخطاء
   - إضافة الاختبارات
```

---

## 🛠️ أدوات وتقنيات متقدمة

### 1. **استخراج متغيرات التصميم**

استخدم Claude مع MCP:

```
استخدم Figma:get_variable_defs لاستخراج جميع المتغيرات من التصميم وأنشئ ملف Tailwind config يحتوي على:
- الألوان المخصصة
- أحجام الخطوط
- المسافات
- نقاط التوقف
```

سينتج عنه:

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E85D3C',
          dark: '#D14D2C',
          light: '#FF6E4A',
        },
        dark: {
          DEFAULT: '#0A1628',
          lighter: '#1E3A5F',
        }
      },
      fontSize: {
        'hero': ['60px', { lineHeight: '1.2', fontWeight: '700' }],
        'title': ['42px', { lineHeight: '1.3', fontWeight: '700' }],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      }
    }
  }
}
```

### 2. **ربط المكونات بـ Code Connect**

```
استخدم Figma:get_code_connect_map لربط مكونات Figma بالكود الفعلي في المشروع
```

سيساعد هذا في:
- تتبع التغييرات في التصميم
- مزامنة التحديثات تلقائياً
- توثيق المكونات

### 3. **إنشاء نظام تصميم كامل**

```
استخدم Figma:create_design_system_rules لإنشاء قواعد نظام التصميم الكامل
```

---

## 📝 مثال عملي كامل

### **المشروع: تحويل موقع Lightning Protection**

#### 1. الإعداد الأولي:

```bash
# إنشاء مشروع React
npm create vite@latest lightning-protection -- --template react
cd lightning-protection

# تثبيت المكتبات
npm install
npm install -D tailwindcss postcss autoprefixer
npm install lucide-react # للأيقونات
npm install react-scroll # للتنقل السلس

# تهيئة Tailwind
npx tailwindcss init -p
```

#### 2. استخدام Claude مع MCP:

```
أحتاج تحويل صفحة Figma الكاملة إلى React:

Figma URL: https://figma.com/design/xyz/lightning-protection?node-id=0:1

خطوات العمل:
1. استخدم Figma:get_metadata للحصول على بنية الصفحة الكاملة
2. لكل قسم رئيسي، استخدم Figma:get_design_context
3. أنشئ مكون React منفصل لكل قسم:
   - HeroSection.jsx
   - ServicesSection.jsx
   - WhyChooseUs.jsx
   - Statistics.jsx
   - Testimonials.jsx
   - Awards.jsx
   - ContactForm.jsx
   - Footer.jsx

4. أنشئ ملف App.jsx يجمع كل المكونات
5. استخرج المتغيرات إلى tailwind.config.js
```

#### 3. المكونات الناتجة:

```
src/
├── components/
│   ├── HeroSection.jsx
│   ├── ServicesSection.jsx
│   ├── WhyChooseUs.jsx
│   ├── Statistics.jsx
│   ├── Testimonials.jsx
│   ├── Awards.jsx
│   ├── ContactForm.jsx
│   └── Footer.jsx
├── App.jsx
├── index.css
└── main.jsx
```

#### 4. استخدام Copilot للتحسين:

في VS Code، افتح Copilot Chat واكتب:

```
Review all components and:
1. Add PropTypes for type checking
2. Add error boundaries
3. Implement lazy loading for images
4. Add loading skeletons
5. Optimize performance with React.memo
6. Add unit tests using Vitest
7. Ensure accessibility (ARIA labels, keyboard navigation)
8. Add animation with Framer Motion
```

---

## 🎯 نصائح وأفضل الممارسات

### 1. **تنظيم الكود:**

```
src/
├── components/
│   ├── common/          # أزرار، نماذج، بطاقات
│   ├── layout/          # Header, Footer, Navigation
│   └── sections/        # أقسام الصفحة
├── hooks/               # Custom React hooks
├── utils/               # دوال مساعدة
├── styles/              # ملفات CSS
├── assets/              # صور وأيقونات
└── constants/           # ثوابت التطبيق
```

### 2. **استخدام متغيرات CSS:**

```css
/* src/styles/variables.css */
:root {
  --color-primary: #E85D3C;
  --color-primary-dark: #D14D2C;
  --color-dark: #0A1628;
  --color-dark-light: #1E3A5F;
  
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 6rem;
  
  --font-size-hero: clamp(2.5rem, 5vw, 3.75rem);
  --font-size-title: clamp(2rem, 4vw, 2.625rem);
}
```

### 3. **تحسين الأداء:**

```javascript
// استخدام lazy loading
import { lazy, Suspense } from 'react';

const HeroSection = lazy(() => import('./components/HeroSection'));
const ServicesSection = lazy(() => import('./components/ServicesSection'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeroSection />
      <ServicesSection />
      {/* ... */}
    </Suspense>
  );
}
```

### 4. **إضافة الرسوم المتحركة:**

```bash
npm install framer-motion
```

```javascript
import { motion } from 'framer-motion';

export default function ServiceCard({ title, description, image }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="service-card"
    >
      {/* محتوى البطاقة */}
    </motion.div>
  );
}
```

---

## 🔍 استكشاف الأخطاء

### مشكلة: MCP Server لا يتصل

**الحل:**
```bash
# تحقق من صحة التوكن
echo $FIGMA_ACCESS_TOKEN

# تحقق من مسار MCP Server
which node

# أعد بناء MCP Server
cd mcp-servers/src/figma
npm run build

# أعد تشغيل Claude Desktop
```

### مشكلة: Copilot لا يقترح كوداً

**الحل:**
```
1. تحقق من اتصال الإنترنت
2. تأكد من تسجيل الدخول إلى GitHub
3. تحقق من صلاحية اشتراك Copilot
4. أعد تشغيل VS Code
5. امسح ذاكرة التخزين المؤقت: Ctrl+Shift+P > "Developer: Reload Window"
```

### مشكلة: الأنماط لا تطابق التصميم

**الحل:**
```javascript
// استخدم أداة مقارنة:
// 1. التقط screenshot من Figma
// 2. التقط screenshot من الموقع المباشر
// 3. استخدم أداة مثل Percy أو Chromatic للمقارنة

// أو استخدم Claude للمقارنة:
"قارن بين صورة التصميم الأصلية والتنفيذ الحالي وحدد الفروقات"
```

---

## 📚 موارد إضافية

### الوثائق الرسمية:
- [Figma MCP Server Documentation](https://github.com/anthropics/mcp-servers)
- [GitHub Copilot Documentation](https://docs.github.com/copilot)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

### أدوات مفيدة:
- **Figma Tokens**: لاستخراج Design Tokens
- **Storybook**: لتوثيق المكونات
- **Chromatic**: لاختبار البصري
- **Percy**: للمقارنة البصرية

---

هذا الدليل يوفر لك إطار عمل كامل لتحويل تصاميم Figma إلى كود عالي الجودة باستخدام أحدث التقنيات! 🚀