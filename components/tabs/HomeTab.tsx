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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 max-w-4xl mx-auto"
        >
            <header className="flex justify-between items-center mb-10 mt-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-google-blue rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-google-blue/20">
                        {userName === 'Mohamed' ? '👨‍💻' : '👩‍🎓'}
                    </div>
                    <div>
                        <h2 className="text-sm text-gray-400 font-arabic">صباح الفل يا </h2>
                        <h1 className="text-xl font-black font-arabic text-white">{userName === 'Mohamed' ? 'محمد' : 'إنجي'} ✨</h1>
                    </div>
                </div>
                <button className="p-3 bg-white/5 rounded-2xl relative">
                    <Bell size={20} className="text-gray-400" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-google-red rounded-full" />
                </button>
            </header>

            {/* Score Card */}
            <div className="bg-dark-card/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 mb-10 relative overflow-hidden group">
                {/* Dynamic Background Glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                        rotate: [0, 90, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 w-64 h-64 bg-google-blue rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"
                />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-right">
                        <motion.span
                            animate={{ backgroundColor: ['rgba(66, 133, 244, 0.1)', 'rgba(168, 85, 247, 0.1)', 'rgba(66, 133, 244, 0.1)'] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-google-blue font-bold text-xs mb-4"
                        >
                            <Sparkles size={12} className="animate-pulse" /> تحديث اليوم
                        </motion.span>
                        <h3 className="text-3xl font-black font-arabic text-white mb-2">مستوى التركيز: {progressPercent}%</h3>
                        <p className="text-gray-400 font-arabic italic">"انت ماشي في الطريق الصح، كمل يا بطل!"</p>
                    </div>

                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                            <motion.circle
                                cx="64" cy="64" r="58"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray={364}
                                strokeDashoffset={364 - (364 * progressPercent) / 100}
                                animate={{ stroke: ['#4285F4', '#9333ea', '#10b981', '#4285F4'] }}
                                transition={{ duration: 8, repeat: Infinity }}
                                strokeLinecap="round"
                            />
                        </svg>
                        <motion.span
                            animate={{ color: ['#fff', '#cfcfcf', '#fff'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute text-2xl font-black font-english"
                        >
                            {progressPercent}%
                        </motion.span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
