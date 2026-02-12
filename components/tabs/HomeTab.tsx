'use client';

import { motion } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';
import SubjectCard from '@/components/SubjectCard';
import { Sparkles, Bell, ArrowLeft } from 'lucide-react';
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
            className="p-6 max-w-5xl mx-auto"
        >
            <header className="flex justify-between items-center mb-12 mt-6">
                <div>
                    <h1 className="text-4xl font-black font-arabic text-white mb-2 leading-tight">
                        صباح الخير، <span className="text-organic-green">{userName === 'Mohamed' ? 'محمد' : 'إنجي'}</span>
                    </h1>
                    <p className="text-gray-400 font-arabic text-lg tracking-wide">
                        جاهز للسيطرة على موادك النهاردة؟ 🚀
                    </p>
                </div>
                <div className="flex gap-4">
                    <button className="w-12 h-12 bg-white/5 border border-white/5 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-organic-green/50 transition-all relative">
                        <Bell size={20} />
                        <span className="absolute top-3 right-3 w-2 h-2 bg-organic-pink rounded-full border-2 border-organic-dark" />
                    </button>
                </div>
            </header>

            {/* Score Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-organic-gray border border-white/5 rounded-[2rem] p-8 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-organic-green/10 rounded-full blur-[50px] pointer-events-none" />

                    <h3 className="text-gray-500 font-arabic font-bold text-sm mb-6 uppercase tracking-widest">معدل الإنجاز</h3>
                    <div className="flex items-end gap-2 mb-4">
                        <span className="text-6xl font-black font-english text-white">{progressPercent}</span>
                        <span className="text-xl font-black font-english text-organic-green mb-2">%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-organic-green shadow-[0_0_10px_rgba(0,200,83,0.5)]"
                        />
                    </div>
                </motion.div>

                {/* Today's Focus */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    onClick={() => router.push(`/subject/${studyPlan[0].id}`)}
                    className="lg:col-span-2 bg-organic-gray border border-white/5 rounded-[2rem] p-1 relative overflow-hidden cursor-pointer group"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-organic-dark via-organic-dark/50 to-transparent z-10" />
                    <img
                        src="/images/subjects/chemistry-schedule.png"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                        alt="focus"
                        style={{ filter: 'grayscale(100%)' }} // Start grayscale
                    />
                    <div className="relative z-20 p-8 flex flex-col justify-end h-full min-h-[200px]">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-organic-green text-organic-dark font-black text-[10px] rounded-full uppercase tracking-wider">
                                Focus
                            </span>
                        </div>
                        <h2 className="text-3xl font-black font-arabic text-white mb-2">ابحثي في أسرار الكيمياء 🧪</h2>
                        <p className="text-gray-300 font-arabic text-sm max-w-md opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-500">
                            "النجاح مش صدفة، النجاح تخطيط واستمرار."
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="flex items-center justify-between mb-8 px-2">
                <h3 className="text-xl font-black font-arabic text-white flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-organic-green rounded-full" />
                    المواد الدراسية
                </h3>
                <button className="text-gray-500 hover:text-organic-green transition-colors font-arabic font-bold text-xs">عرض الجدول المكتمل</button>
            </div>

            <div className="flex overflow-x-auto gap-5 pb-10 no-scrollbar snap-x snap-mandatory px-2">
                {studyPlan.map((subject: Subject) => {
                    const totalMissionsSub = subject.missions?.length || 0;
                    const completedCountSub = subject.missions?.filter(m => completedMissions[m.id]).length || 0;
                    const progressSub = totalMissionsSub > 0 ? (completedCountSub / totalMissionsSub) * 100 : 0;

                    return (
                        <motion.div
                            key={subject.id}
                            whileHover={{ y: -10 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.push(`/subject/${subject.id}`)}
                            className="relative min-w-[260px] h-[400px] rounded-[2rem] overflow-hidden snap-center cursor-pointer group shrink-0 border border-white/5 bg-organic-gray"
                        >
                            {/* Background Image */}
                            <img
                                src={subject.scheduleImage || 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80'}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                                alt={subject.name}
                            />

                            {/* Organic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-organic-dark via-organic-dark/40 to-transparent" />

                            {/* Accent Tint on Hover */}
                            <div className="absolute inset-0 bg-organic-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />

                            {/* Story Progress Lines */}
                            <div className="absolute top-6 left-6 right-6 flex gap-1 z-20">
                                <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progressSub}%` }}
                                        className="h-full bg-organic-green"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                                <motion.div
                                    initial={{ y: 0 }}
                                    className="flex flex-col items-start"
                                >
                                    <div className="text-4xl mb-3 text-white drop-shadow-lg group-hover:-translate-y-2 transition-transform duration-300">
                                        {subject.icon}
                                    </div>
                                    <h3 className="text-2xl font-black font-arabic text-white mb-1 drop-shadow-md group-hover:text-organic-green transition-colors">
                                        {subject.name}
                                    </h3>
                                    <p className="text-[10px] font-bold font-arabic text-gray-400 uppercase tracking-widest">
                                        {subject.theme.scientist}
                                    </p>
                                </motion.div>
                            </div>

                            {/* Stats Badge */}
                            <div className="absolute top-6 left-6 z-20">
                                {completedCountSub === totalMissionsSub && totalMissionsSub > 0 && (
                                    <span className="bg-organic-green text-organic-dark text-[10px] font-bold px-2 py-1 rounded-md">
                                        مكتمل
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
