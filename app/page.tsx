'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useStudyStore } from '@/store/useStudyStore';
import { philosophy } from '@/data/studyData';
import SubjectCard from '@/components/SubjectCard';
import Sidebar from '@/components/Sidebar';
import RightPanel from '@/components/RightPanel';
import MobileNav from '@/components/MobileNav';
import { Bell, Search, Sparkles } from 'lucide-react';

export default function HomePage() {
    const router = useRouter();
    const { studyPlan, completedMissions } = useStudyStore();

    const getTodayName = () => {
        const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        return days[new Date().getDay()];
    };

    const todayName = getTodayName();

    const getAllMissionIds = (subject: any) => {
        const ids: string[] = [];
        if (subject.missions) ids.push(...subject.missions.map((m: any) => m.id));
        if (subject.units) {
            subject.units.forEach((unit: any) => ids.push(...unit.missions.map((m: any) => m.id)));
        }
        if (subject.sections) {
            subject.sections.forEach((section: any) => ids.push(...section.missions.map((m: any) => m.id)));
        }
        return ids;
    };

    return (
        <div className="flex min-h-screen bg-dark-bg">
            <Sidebar />

            <main className="flex-1 pb-24 lg:pb-8 overflow-y-auto">
                <MobileNav />

                <div className="max-w-7xl mx-auto p-4 lg:p-8">
                    {/* Header */}
                    <header className="hidden lg:flex justify-between items-center mb-12">
                        <div>
                            <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-white via-accent-blue to-accent-purple bg-clip-text text-transparent">
                                لوحة التحكم
                            </h1>
                            <p className="text-gray-400 font-arabic text-lg italic uppercase tracking-widest">
                                أهلاً بك في مستقبلك الباهر يا بطل! 🚀
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <div className="relative group">
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-accent-blue transition-colors" />
                                <input
                                    className="bg-dark-card border border-white/10 rounded-2xl py-3 pr-12 pl-6 outline-none focus:ring-2 ring-accent-blue/50 w-64 transition-all"
                                    placeholder="ابحث عن مادة..."
                                />
                            </div>
                            <button className="p-4 bg-dark-card border border-white/10 rounded-2xl relative hover:bg-white/5 transition-colors">
                                <Bell className="w-6 h-6 text-gray-400" />
                                <span className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-dark-card" />
                            </button>
                        </div>
                    </header>

                    {/* Featured Philosophy (Glassmorphism card) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative mb-12 p-8 lg:p-12 rounded-[2.5rem] bg-gradient-to-br from-accent-blue/20 via-transparent to-accent-purple/10 border border-white/10 overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
                            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-accent-blue/30 rounded-full blur-[120px]" />
                            <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-accent-purple/20 rounded-full blur-[100px]" />
                        </div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-blue/20 text-accent-blue text-sm font-bold mb-6">
                                    <Sparkles size={16} /> فلسفة المذاكرة الذكية
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-black font-arabic mb-6 leading-tight">
                                    المذاكرة مش <span className="text-red-400">ضغط</span>، المذاكرة <span className="text-emerald-400">ذكاء</span>! 🧠
                                </h2>
                                <p className="text-gray-400 text-lg font-arabic mb-8 max-w-lg">
                                    إليك القواعد الذهبية التي تجعل عقلك يستوعب المعلومة بكل حب وشغف.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {philosophy.principles.slice(0, 4).map((p, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                                            <span className="text-xl">✨</span>
                                            <span className="text-sm font-arabic font-bold text-gray-300">{p.split(':')[0]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="hidden lg:block relative text-center">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                    className="text-[12rem] filter drop-shadow-2xl"
                                >
                                    🎓
                                </motion.div>
                                <div className="mt-8 p-6 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 inline-block">
                                    <p className="text-sm text-gray-500 uppercase tracking-widest font-black mb-1 italic">Daily Wisdom</p>
                                    <p className="text-xl font-arabic font-bold">"البداية نصف الإنجاز."</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Subjects Grid */}
                    <div className="mb-8 flex items-end justify-between px-2">
                        <div>
                            <h3 className="text-2xl font-black font-arabic mb-1">المواد الدراسية</h3>
                            <p className="text-gray-500 font-arabic">اكتشف وتابع تقدمك في كل قسم</p>
                        </div>
                        <button className="text-accent-blue font-bold font-arabic hover:underline">عرض الكل</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {studyPlan.map((subject, index) => {
                            const allMissionIds = getAllMissionIds(subject);
                            const completedCount = allMissionIds.filter(id => completedMissions[id]).length;
                            const progress = allMissionIds.length > 0
                                ? (completedCount / allMissionIds.length) * 100
                                : 0;

                            const hasLessonToday =
                                subject.lessonDay === todayName ||
                                subject.lessonDays?.includes(todayName) ||
                                false;

                            return (
                                <motion.div
                                    key={subject.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <SubjectCard
                                        icon={subject.icon}
                                        name={subject.name}
                                        lessonInfo={subject.lessonDay || subject.lessonDays?.join(' & ') || 'غير محدد'}
                                        progress={progress}
                                        hasLessonToday={hasLessonToday}
                                        gradient={subject.theme.gradient}
                                        onClick={() => router.push(`/subject/${subject.id}`)}
                                        completedCount={completedCount}
                                        totalCount={allMissionIds.length}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </main>

            <RightPanel />
        </div>
    );
}
