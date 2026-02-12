'use client';

import { motion } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';
import SubjectCard from '@/components/SubjectCard';
import { Sparkles, Bell } from 'lucide-react';
import { Subject } from '@/types';
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

            <div className="flex overflow-x-auto gap-6 px-2 pb-10 no-scrollbar snap-x snap-mandatory">
                {studyPlan.map((subject: Subject) => {
                    const totalMissionsSub = subject.missions?.length || 0;
                    const completedCountSub = subject.missions?.filter(m => completedMissions[m.id]).length || 0;
                    const progressSub = totalMissionsSub > 0 ? (completedCountSub / totalMissionsSub) * 100 : 0;

                    return (
                        <motion.div
                            key={subject.id}
                            whileHover={{ y: -10, scale: 1.02 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push(`/subject/${subject.id}`)}
                            className="relative min-w-[280px] h-[450px] rounded-[2.5rem] overflow-hidden snap-center cursor-pointer group shrink-0 shadow-2xl shadow-black/40 border border-white/5"
                        >
                            {/* Background Image */}
                            <img
                                src={subject.scheduleImage || 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80'}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                alt={subject.name}
                            />

                            {/* Cinematic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-cine-dark via-cine-dark/20 to-transparent group-hover:opacity-40 transition-opacity" />
                            <div className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity bg-gradient-to-br ${subject.theme.gradient}`} />

                            {/* Story Progress Lines */}
                            <div className="absolute top-6 left-6 right-6 flex gap-1.5 z-20">
                                <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressSub}%` }}
                                        className="h-full bg-cine-accent shadow-[0_0_10px_#00f2ff]"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="flex flex-col items-start"
                                >
                                    <div className="text-5xl mb-4 drop-shadow-2xl filter brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform">
                                        {subject.icon}
                                    </div>
                                    <h3 className="text-3xl font-black font-arabic text-white mb-2 drop-shadow-lg">
                                        {subject.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cine-accent animate-pulse" />
                                        <span className="text-xs font-bold font-arabic text-cine-accent tracking-widest uppercase opacity-80">
                                            {subject.theme.scientist}
                                        </span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Stats Badge */}
                            <div className="absolute bottom-8 right-8 bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <span className="text-white font-black text-sm">{completedCountSub}</span>
                                <span className="text-gray-500 text-[10px] font-arabic">مهمة تمّت</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
