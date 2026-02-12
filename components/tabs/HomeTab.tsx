'use client';

import { motion } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';
import SubjectCard from '@/components/SubjectCard';
import { Sparkles, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomeTab() {
    const { studyPlan, completedMissions, userName } = useStudyStore();
    const router = useRouter();

    // Helper to calculate score
    const totalMissions = studyPlan.reduce((acc, sub) => acc + (sub.missions?.length || 0), 0);
    const completedCountGlobal = Object.keys(completedMissions).filter(id => completedMissions[id]).length;
    const progressPercent = totalMissions > 0 ? Math.round((completedCountGlobal / totalMissions) * 100) : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 max-w-5xl mx-auto selection:bg-cine-accent selection:text-cine-dark"
        >
            <header className="flex justify-between items-center mb-12 mt-6">
                <div>
                    <h1 className="text-4xl font-black font-arabic text-white mb-2 leading-tight">
                        أهلاً يا <span className="bg-gradient-to-r from-cine-accent to-cine-blue bg-clip-text text-transparent">{userName === 'Mohamed' ? 'محمد' : 'إنجي'}</span> 👋
                    </h1>
                    <p className="text-gray-500 font-arabic text-lg tracking-wide">
                        مستعدة للرحلة العلمية النهاردة؟ 🚀
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="w-14 h-14 bg-cine-card border border-white/5 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white hover:border-cine-accent/50 transition-all relative">
                        <Bell size={24} />
                        <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-cine-pink rounded-full border-2 border-cine-dark" />
                    </button>
                </div>
            </header>

            {/* Cinematic Score Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-cine-card/80 border border-white/10 rounded-[3rem] p-10 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                >
                    <motion.div
                        animate={{
                            opacity: [0.1, 0.2, 0.1],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute -top-20 -right-20 w-64 h-64 bg-cine-accent rounded-full blur-[100px] pointer-events-none"
                    />

                    <h3 className="text-gray-500 font-arabic font-bold text-sm mb-6 uppercase tracking-widest">معدل الإنجاز</h3>
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-7xl font-black font-english text-white">{progressPercent}</span>
                        <span className="text-2xl font-black font-english text-cine-accent mb-3">%</span>
                    </div>
                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-cine-accent to-cine-blue shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                        />
                    </div>
                </motion.div>

                {/* Today's Focus */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => router.push(`/subject/${studyPlan[0].id}`)}
                    className="lg:col-span-2 bg-cine-card border border-white/10 rounded-[3rem] p-1 relative overflow-hidden cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cine-accent/10 to-transparent" />
                    <img
                        src="https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80"
                        className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale hover:grayscale-0 transition-all duration-700"
                        alt="focus"
                    />
                    <div className="relative p-10 flex flex-col justify-end h-full min-h-[250px]">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-4 py-1.5 bg-cine-accent text-cine-dark font-black text-[10px] rounded-full uppercase tracking-tighter shadow-lg shadow-cine-accent/20">
                                مهمة اليوم
                            </span>
                        </div>
                        <h2 className="text-4xl font-black font-arabic text-white mb-3">ابحثي في أسرار الكيمياء 🧪</h2>
                        <p className="text-gray-400 font-arabic text-lg max-w-md">"60% إنجاز هو نجاح باهر يا هندسة، كملي بذكاء مش بمجهود!"</p>
                    </div>
                </motion.div>
            </div>

            <div className="flex items-center justify-between mb-8 px-4">
                <h3 className="text-2xl font-black font-arabic text-white flex items-center gap-4">
                    <span className="w-2 h-8 bg-cine-accent rounded-full" />
                    مواد العباقرة
                </h3>
                <button className="text-gray-500 hover:text-cine-accent transition-colors font-arabic font-bold text-sm">عرض الكل</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 px-2">
                {studyPlan.map((subject, idx) => {
                    const totalMissionsSub = subject.missions?.length || 0;
                    const completedCountSub = subject.missions?.filter(m => completedMissions[m.id]).length || 0;
                    const progressSub = totalMissionsSub > 0 ? (completedCountSub / totalMissionsSub) * 100 : 0;

                    return (
                        <SubjectCard
                            key={subject.id}
                            icon={subject.icon}
                            name={subject.name}
                            progress={progressSub}
                            lessonInfo={subject.lessonDay || 'لا يوجد موعد محدد'}
                            gradient={subject.theme.gradient}
                            completedCount={completedCountSub}
                            totalCount={totalMissionsSub}
                            onClick={() => router.push(`/subject/${subject.id}`)}
                        />
                    );
                })}
            </div>
        </motion.div>
    );
}
