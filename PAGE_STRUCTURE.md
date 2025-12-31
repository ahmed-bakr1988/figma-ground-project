# هيكل صفحة About Us / About Us Page Structure

## 📐 تخطيط الصفحة / Page Layout

```
┌─────────────────────────────────────────────┐
│           Navigation Bar (Fixed)            │
│   Logo  |  Our Story  |  Values  |  Team   │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│              🚀 HERO SECTION                │
│  - Badge: "About LightningGuard"            │
│  - Title: "Protecting Lives..."             │
│  - Description                              │
│  - 4 Achievement Cards:                     │
│    * 2,500+ Clients                         │
│    * 50+ Awards                             │
│    * 10+ Years                              │
│    * 99% Satisfaction                       │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│          📖 OUR STORY SECTION               │
│  ┌──────────────┐  ┌──────────────┐        │
│  │   Content    │  │    Image     │        │
│  │  - Badge     │  │  + Years     │        │
│  │  - Title     │  │    Badge     │        │
│  │  - 2 Paras   │  │              │        │
│  └──────────────┘  └──────────────┘        │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│       🎯 MISSION & VISION SECTION           │
│  ┌──────────────┐  ┌──────────────┐        │
│  │   Mission    │  │    Vision    │        │
│  │  Icon: 🎯   │  │   Icon: 👁️  │        │
│  │  Description │  │  Description │        │
│  └──────────────┘  └──────────────┘        │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│         💎 CORE VALUES SECTION              │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐          │
│  │ 🛡️  │ │ 🏆  │ │ ❤️  │ │ 💡  │          │
│  │Safe-│ │Excel│ │Inte-│ │Inno-│          │
│  │ ty  │ │lence│ │grity│ │vate │          │
│  └─────┘ └─────┘ └─────┘ └─────┘          │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│         📅 TIMELINE SECTION                 │
│                                             │
│  2008 ●────────────────                     │
│       └─ Company Founded                    │
│                                             │
│  2012 ────────●────────                     │
│               └─ Regional Expansion         │
│                                             │
│  2018 ────────────────●                     │
│                       └─ Certifications     │
│                                             │
│  2024 ────────────────────────●             │
│                               └─ Leader     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│            👥 TEAM SECTION                  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │
│  │ 👤   │ │ 👤   │ │ 👤   │ │ 👤   │      │
│  │Name  │ │Name  │ │Name  │ │Name  │      │
│  │Role  │ │Role  │ │Role  │ │Role  │      │
│  └──────┘ └──────┘ └──────┘ └──────┘      │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│           📞 CTA SECTION                    │
│     "Ready to Protect Your Property?"       │
│          [Get Free Consultation]            │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│               FOOTER                        │
│  Services | Company | Support | Social      │
└─────────────────────────────────────────────┘
```

---

## 🎨 نظام الألوان / Color Scheme

### الألوان الأساسية / Primary Colors
```css
Primary Orange: #f97316 (orange-500)
Dark Background: #0f172a (slate-900)
Light Background: #f8fafc (slate-50)
White: #ffffff
```

### الألوان الثانوية / Secondary Colors
```css
Text Dark: #1e293b (slate-800)
Text Medium: #64748b (slate-600)
Text Light: #94a3b8 (slate-400)
Border: #e2e8f0 (slate-200)
```

---

## 📏 الأبعاد والمسافات / Spacing & Dimensions

### Container Widths
```css
max-w-7xl: 80rem (1280px)
max-w-6xl: 72rem (1152px)
max-w-4xl: 56rem (896px)
```

### Section Padding
```css
py-20: 5rem (80px) - Vertical
px-6: 1.5rem (24px) - Horizontal mobile
lg:px-16: 4rem (64px) - Horizontal desktop
```

### Border Radius
```css
rounded-lg: 0.5rem (8px)
rounded-xl: 0.75rem (12px)
rounded-2xl: 1rem (16px)
rounded-full: 9999px
```

---

## 🔤 Typography / الخطوط

### Font Sizes
```css
text-sm: 0.875rem (14px)
text-base: 1rem (16px)
text-lg: 1.125rem (18px)
text-xl: 1.25rem (20px)
text-2xl: 1.5rem (24px)
text-3xl: 1.875rem (30px)
text-4xl: 2.25rem (36px)
text-5xl: 3rem (48px)
text-6xl: 3.75rem (60px)
```

### Font Weights
```css
font-medium: 500
font-semibold: 600
font-bold: 700
```

---

## 🎭 Animations / الرسوم المتحركة

### Framer Motion Variants
```javascript
// Fade In + Slide
initial: { opacity: 0, y: 30 }
animate: { opacity: 1, y: 0 }
duration: 0.6-0.8s

// Horizontal Slide
initial: { opacity: 0, x: ±50 }
whileInView: { opacity: 1, x: 0 }
viewport: { once: true }

// Stagger Children
delay: index * 0.1
```

---

## 📱 Responsive Breakpoints

```css
sm: 640px   - Small devices
md: 768px   - Medium devices
lg: 1024px  - Large devices
xl: 1280px  - Extra large devices
2xl: 1536px - 2X large devices
```

### Grid Layouts
```css
Mobile: 1 column (default)
Tablet: 2 columns (md:grid-cols-2)
Desktop: 4 columns (lg:grid-cols-4)
```

---

## 🌍 RTL Support / دعم اللغة العربية

### Direction Switching
```javascript
dir={isRTL ? 'rtl' : 'ltr'}
```

### Conditional Classes
```javascript
${isRTL ? 'me-auto' : 'ms-auto'}
${isRTL ? 'rotate-180' : ''}
${isRTL ? 'text-right' : 'text-left'}
```

---

## 🖼️ Images / الصور

### Sources
- **Hero Images**: Unsplash (Lightning/Electrical themes)
- **Team Photos**: Unsplash (Professional portraits)
- **Dimensions**: Various (responsive)

### Image URLs Pattern
```
https://images.unsplash.com/photo-{id}?q=80&w={width}
```

### Recommended Sizes
- Hero: 800-1200px width
- Team: 300px square
- Background: Full HD (1920px)

---

## 🔗 Navigation Links

### Internal Links
```
/ - Home Page
/about - About Us Page
/#services - Services Section
/#projects - Projects Section
/#contact - Contact Section
```

---

## 📊 Content Blocks

### Hero Stats (4 items)
```
2,500+ Happy Clients
50+ Industry Awards
10+ Years Experience
99% Satisfaction Rate
```

### Values (4 items)
```
Safety First
Excellence
Integrity
Innovation
```

### Timeline (4 milestones)
```
2008 - Founded
2012 - Expansion
2018 - Certifications
2024 - Industry Leader
```

### Team (4 members)
```
CEO
CTO
Lead Engineer
Operations Manager
```

---

## 🔧 Component Structure

```javascript
AboutUsPage
├── Navigation (Sticky)
├── Hero Section
│   └── Achievement Cards (4)
├── Story Section
│   └── Image + Content
├── Mission & Vision
│   └── 2 Cards
├── Core Values
│   └── Value Cards (4)
├── Timeline
│   └── Milestone Items (4)
├── Team
│   └── Member Cards (4)
├── CTA Section
└── Footer (Shared)
```

---

## 💡 Best Practices Applied

✅ **Performance**
- Lazy loading for images
- Efficient animations
- Optimized bundle size

✅ **Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation

✅ **SEO**
- Proper heading hierarchy
- Descriptive alt texts
- Meta tags ready

✅ **Maintainability**
- Clean code structure
- Reusable components
- Centralized translations

✅ **User Experience**
- Smooth scrolling
- Responsive design
- Clear CTAs
- Intuitive navigation

---

## 📚 Dependencies Used

```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.21.0",
  "framer-motion": "^10.16.16",
  "lucide-react": "^0.294.0",
  "react-i18next": "^14.0.0",
  "tailwindcss": "^3.4.0"
}
```

---

✨ **صفحة احترافية جاهزة للاستخدام!**
✨ **Professional Page Ready to Use!**
