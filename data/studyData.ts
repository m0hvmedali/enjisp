import type { Subject } from '@/types';

export const studyData: Subject[] = [
    {
        id: 'english',
        name: 'إنجليزي',
        icon: '📚',
        theme: {
            primary: '#10b981',
            gradient: 'from-emerald-900 via-slate-900 to-slate-950',
            scientist: 'Shakespeare'
        },
        lessonDay: 'السبت',
        missions: [
            {
                id: 'en-m1',
                title: 'كلمات أول درسين',
                content: 'حفظ الكلمات + النطق',
                duration: '30 دقيقة',
                method: 'ربط الكلمة بصورة/موقف',
                outcome: 'البداية سهلة ومش مخيفة',
                completed: false,
                links: { notebook: '#', questions: '#' }
            },
            {
                id: 'en-m2',
                title: 'حل على الكلمات',
                content: 'MCQ + جمل',
                duration: '20 دقيقة',
                method: 'تثبيت مش حفظ',
                outcome: 'تأكد من الفهم',
                completed: false,
                links: { notebook: '#', questions: '#' }
            },
            {
                id: 'en-m3',
                title: 'جرامر الوحدة',
                content: 'الفكرة العامة + أمثلة',
                duration: '35 دقيقة',
                method: 'خريطة ذهنية',
                outcome: 'وضوح القاعدة',
                completed: false,
                links: { notebook: '#', questions: '#' }
            },
            {
                id: 'en-m4',
                title: 'حل على الجرامر',
                content: 'تمارين مكثفة',
                duration: '25 دقيقة',
                method: 'كشف الغلطات',
                outcome: 'إتقان التطبيق',
                completed: false,
                links: { notebook: '#', questions: '#' }
            },
            {
                id: 'en-m5',
                title: 'قصة الإنجليزي',
                content: 'الفصل المقرر',
                duration: '30 دقيقة',
                method: 'قراءة قصصية مش دراسية',
                outcome: 'استمتاع بالأحداث',
                completed: false,
                links: { notebook: '#', questions: '#' }
            }
        ]
    },
    {
        id: 'arabic',
        name: 'عربي (نحو)',
        icon: '✒️',
        theme: {
            primary: '#f59e0b',
            gradient: 'from-amber-900 via-slate-900 to-slate-950',
            scientist: 'نجيب محفوظ'
        },
        lessonDay: 'الثلاثاء',
        units: [
            {
                name: 'الوحدة الثانية',
                missions: [
                    { id: 'ar-u2-m1', title: 'اسم الفاعل – اسم المفعول – صيغة المبالغة', content: 'المشتقات', duration: '30 دقيقة', outcome: 'إتقان المشتقات', completed: false },
                    { id: 'ar-u2-m2', title: 'أسلوب التفضيل – اسم الآلة – الزمان والمكان', content: 'الصياغة', duration: '30 دقيقة', outcome: 'فهم الصياغة', completed: false },
                    { id: 'ar-u2-m3', title: 'المصادر', content: 'تحويل فعل → مصدر', duration: '25 دقيقة', outcome: 'إتقان المصادر', completed: false },
                    { id: 'ar-u2-m4', title: 'الهيئة – المرة – المقصور – الممدود – المنقوص – المجهول', content: 'مراجعة شاملة', duration: '35 دقيقة', outcome: 'شغلك بقى تمام', completed: false }
                ]
            },
            {
                name: 'الوحدة الرابعة',
                missions: [
                    { id: 'ar-u4-m1', title: 'المفعول به – المفعول فيه', content: 'المفاعيل', duration: '30 دقيقة', outcome: 'فهم المفاعيل', completed: false },
                    { id: 'ar-u4-m2', title: 'المطلق – لأجله – معه', content: 'أنواع المفعول', duration: '30 دقيقة', outcome: 'التمييز بينهم', completed: false },
                    { id: 'ar-u4-m3', title: 'الحال – التمييز', content: 'الفرق بينهما', duration: '25 دقيقة', outcome: 'إتقان الحال والتمييز', completed: false },
                    { id: 'ar-u4-m4', title: 'الاستثناء – الأسماء الخمسة', content: 'أساليب متقدمة', duration: '30 دقيقة', outcome: 'فهم الأساليب', completed: false }
                ]
            },
            {
                name: 'الوحدة السادسة',
                missions: [
                    { id: 'ar-u6-m1', title: 'كم وأنواعها – حروف الجر', content: 'الأدوات', duration: '30 دقيقة', outcome: 'فهم الأدوات', completed: false },
                    { id: 'ar-u6-m2', title: 'أسلوب النداء', content: 'النداء وأنواعه', duration: '20 دقيقة', outcome: 'إتقان النداء', completed: false },
                    { id: 'ar-u6-m3', title: 'أنواع ما – من – لا', content: 'التمييز بين الحروف', duration: '25 دقيقة', outcome: 'فهم الفروق', completed: false }
                ]
            },
            {
                name: 'الوحدة السابعة',
                missions: [
                    { id: 'ar-u7-m1', title: 'الممنوع من الصرف + مكملات', content: 'قواعد متقدمة', duration: '30 دقيقة', outcome: 'فهم الممنوع', completed: false },
                    { id: 'ar-u7-m2', title: 'المدح – الذم – الاختصاص – التعجب', content: 'الأساليب', duration: '30 دقيقة', outcome: 'إتقان الأساليب', completed: false },
                    { id: 'ar-u7-m3', title: 'النعت – العطف – التوكيد – البدل', content: 'التوابع', duration: '35 دقيقة', outcome: 'فهم التوابع', completed: false },
                    { id: 'ar-u7-m4', title: 'الملحقات – الكشف – أسماء الأفعال', content: 'المكملات', duration: '25 دقيقة', outcome: 'إتمام المنهج', completed: false }
                ]
            }
        ]
    },
    {
        id: 'chemistry',
        name: 'كيمياء',
        icon: '🧪',
        theme: {
            primary: '#3b82f6',
            gradient: 'from-blue-900 via-slate-900 to-slate-950',
            scientist: 'Marie Curie'
        },
        lessonDay: 'الأحد',
        missions: [
            { id: 'ch-m1', title: 'مراجعة الدرس الأول', content: 'الفصل الرابع - درس 1', duration: '25 دقيقة', outcome: 'فهم المفاهيم', completed: false },
            { id: 'ch-m2', title: 'حل الدرس الأول', content: 'تطبيقات عملية', duration: '20 دقيقة', outcome: 'تثبيت المعلومات', completed: false },
            { id: 'ch-m3', title: 'مراجعة الدرس الثاني', content: 'الفصل الرابع - درس 2', duration: '25 دقيقة', outcome: 'فهم المفاهيم', completed: false },
            { id: 'ch-m4', title: 'حل الدرس الثاني', content: 'تطبيقات عملية', duration: '20 دقيقة', outcome: 'تثبيت المعلومات', completed: false },
            { id: 'ch-m5', title: 'مراجعة الدرس الثالث', content: 'الفصل الرابع - درس 3', duration: '25 دقيقة', outcome: 'فهم المفاهيم', completed: false },
            { id: 'ch-m6', title: 'حل الدرس الثالث', content: 'تطبيقات عملية', duration: '20 دقيقة', outcome: 'تثبيت المعلومات', completed: false },
            { id: 'ch-m7', title: 'مراجعة الدرس الرابع', content: 'الفصل الرابع - درس 4', duration: '25 دقيقة', outcome: 'فهم المفاهيم', completed: false },
            { id: 'ch-m8', title: 'حل الدرس الرابع', content: 'تطبيقات عملية', duration: '20 دقيقة', outcome: 'تثبيت المعلومات', completed: false }
        ]
    },
    {
        id: 'physics',
        name: 'فيزياء',
        icon: '⚡',
        theme: {
            primary: '#ec4899',
            gradient: 'from-pink-900 via-slate-900 to-slate-950',
            scientist: 'Einstein'
        },
        lessonDays: ['الأربعاء', 'الجمعة'],
        sections: [
            {
                name: 'الفصل الثالث',
                missions: [
                    { id: 'ph-s3-m1', title: 'قانون فاراداي', content: 'الحث الكهرومغناطيسي', duration: '30 دقيقة', outcome: 'فهم القانون', completed: false },
                    { id: 'ph-s3-m2', title: 'حل على فاراداي', content: 'تطبيقات عملية', duration: '25 دقيقة', outcome: 'إتقان التطبيق', completed: false },
                    { id: 'ph-s3-m3', title: 'الحث الذاتي والمتبادل', content: 'أنواع الحث', duration: '30 دقيقة', outcome: 'فهم الفرق', completed: false },
                    { id: 'ph-s3-m4', title: 'حل على الحث', content: 'مسائل متنوعة', duration: '25 دقيقة', outcome: 'إتقان الحل', completed: false },
                    { id: 'ph-s3-m5', title: 'ق د ك سلك مستقيم', content: 'القوة الدافعة الكهربية', duration: '20 دقيقة', outcome: 'فهم المفهوم', completed: false },
                    { id: 'ph-s3-m6', title: 'حل على السلك', content: 'تطبيقات', duration: '20 دقيقة', outcome: 'التمكن من الحل', completed: false },
                    { id: 'ph-s3-m7', title: 'الدينامو – المحرك – المحول', content: 'الأجهزة الكهربية', duration: '30 دقيقة', outcome: 'فهم الأجهزة', completed: false },
                    { id: 'ph-s3-m8', title: 'حل على الأجهزة', content: 'مسائل شاملة', duration: '25 دقيقة', outcome: 'إتقان كامل', completed: false }
                ]
            },
            {
                name: 'الفصل الرابع',
                missions: [
                    { id: 'ph-s4-m1', title: 'مراجعة الفصل الرابع', content: 'الأسبوع القادم', duration: 'قريباً', outcome: 'استعد للمراجعة', completed: false }
                ]
            }
        ]
    },
    {
        id: 'math',
        name: 'رياضيات (تفاضل)',
        icon: '📐',
        theme: {
            primary: '#a855f7',
            gradient: 'from-purple-900 via-slate-900 to-slate-950',
            scientist: 'الخوارزمي'
        },
        lessonDays: ['الاثنين', 'الخميس'],
        missions: [
            { id: 'math-m1', title: 'الدوال والمتباينات', content: 'مراجعة الأساسيات', duration: '30 دقيقة', outcome: 'فهم الدوال', completed: false },
            { id: 'math-m2', title: 'قراءة المنحنيات', content: 'تحليل بصري', duration: '25 دقيقة', outcome: 'القراءة الصحيحة', completed: false },
            { id: 'math-m3', title: 'شروط النقط الحرجة والانقلاب', content: 'نظريات', duration: '30 دقيقة', outcome: 'فهم الشروط', completed: false },
            { id: 'math-m4', title: 'قراءة منحنيات (تطبيقي)', content: 'تطبيق عملي', duration: '25 دقيقة', outcome: 'إتقان التطبيق', completed: false },
            { id: 'math-m5', title: 'حل سنين سابقة الباب الثاني', content: 'امتحانات سابقة', duration: '40 دقيقة', outcome: 'جاهزية كاملة', completed: false }
        ]
    }
];

export const philosophy = {
    title: 'فلسفة الخطة',
    principles: [
        'مش ضغط: كل مهمة قصيرة وواضحة',
        'نفسيتك أولوية: أي تعب = إيقاف محترم',
        'إنجاز محسوس: كل مهمة خطوة حقيقية',
        'الجديد أولاً: حسب مواعيد دروسك',
        'اليوم الناجح = 60-70% من الخطة'
    ]
};
