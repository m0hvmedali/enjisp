# Enji Study Planner - Premium Edition

## 🚀 النظام الاحترافي لإدارة المذاكرة

تطبيق Next.js 14 احترافي مبني بأحدث التقنيات لمساعدتك في تنظيم خطة المذاكرة مع مراعاة الحالة النفسية.

## ✨ المميزات

- **Next.js 14** - أحدث إصدار مع App Router
- **TypeScript** - Type safety كاملة
- **Tailwind CSS** - تصميم احترافي responsive
- **Framer Motion** - أنيميشن سلسة واحترافية
- **Zustand** - State management بسيط وفعال
- **Supabase Ready** - جاهز للربط بقاعدة البيانات
- **Dark Mode** - تصميم مظلم مريح للعين
- **RTL Support** - دعم كامل للغة العربية

## 🛠️ التنصيب والتشغيل

```bash
# تنصيب المكتبات
npm install

# تشغيل السيرفر المحلي
npm run dev

# فتح المتصفح على
# http://localhost:3000
```

## 📁 الهيكل البرمجي

```
enji/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard
│   └── subject/[id]/      # Subject pages
├── components/            # React Components
│   ├── Sidebar.tsx
│   ├── RightPanel.tsx
│   ├── SubjectCard.tsx
│   ├── MissionCard.tsx
│   └── MissionModal.tsx
├── data/                  # Study data
│   └── studyData.ts
├── store/                 # Zustand store
│   └── useStudyStore.ts
├── types/                 # TypeScript types
│   └── index.ts
└── styles/               # Global styles
    └── globals.css
```

## 🎨 التصميم

- **Glassmorphism** - تأثيرات زجاجية عصرية
- **Smooth Animations** - حركات سلسة طبيعية
- **Micro-interactions** - تفاعلات دقيقة
- **Premium UI/UX** - تجربة مستخدم فاخرة

## 🔥 البناء للإنتاج

```bash
npm run build
npm start
```

---

Built with ❤️ by Antigravity AI
