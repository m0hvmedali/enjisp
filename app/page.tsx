'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { studyData } from '@/data/studyData';
import { philosophy } from '@/data/studyData';
import SubjectCard from '@/components/SubjectCard';
import Sidebar from '@/components/Sidebar';
import RightPanel from '@/components/RightPanel';
import { useStudyStore } from '@/store/useStudyStore';
import { Settings, Bell } from 'lucide-react';

export default function HomePage() {
    const router = useRouter();
    const { completedMissions, getProgress } = useStudyStore();

    const getTodayName = () => {
        const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        return days[new Date().getDay()];
    };

    const getDateString = () => {
        return new Date().toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getAllMissionIds = (subject: typeof studyData[0]) => {
        const ids: string[] = [];
        if (subject.missions) {
            ids.push(...subject.missions.map(m => m.id));
        }
        if (subject.units) {
            subject.units.forEach(unit => {
                ids.push(...unit.missions.map(m => m.id));
            });
        }
        if (subject.sections) {
            subject.sections.forEach(section => {
                ids.push(...section.missions.map(m => m.id));
            });
        }
        return ids;
    };

    const todayName = getTodayName();

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-8">
                    {/* Header */}
                    <motion.header
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-between items-center mb-12"
                    >
                        <div>
                            <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-white via-accent-blue to-accent-purple bg-clip-text text-transparent">
                                {todayName}
                            </h1>
                            <p className="text-gray-400 font-english">{getDateString()}</p>
                        </div>

                        <div className="flex gap-3">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 rounded-xl bg-dark-card border border-white/10 hover:bg-white/5 transition-colors"
                            >
                                <Settings className="w-5 h-5 text-gray-400" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 rounded-xl bg-dark-card border border-white/10 hover:bg-white/5 transition-colors"
                            >
                                <Bell className="w-5 h-5 text-gray-400" />
                            </motion.button>
                        </div>
                    </motion.header>

                    {/* Welcome Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <h2 className="text-3xl font-bold mb-2 font-arabic">
                            أهلاً بك يا بطل! 👋
                        </h2>
                        <p className="text-gray-400 font-arabic">
                            جاهز تبدأ مذاكرة النهاردة؟ إليك نظرة على تقدمك.
                        </p>
                    </motion.div>

                    {/* Philosophy Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative mb-12 p-8 rounded-3xl bg-gradient-to-br from-dark-lighter to-dark-card border border-white/10 overflow-hidden"
                    >
                        <div className="absolute top-[-40px] right-[-40px] text-[10rem] opacity-5">
                            🧠
                        </div>
                        <h3 className="text-2xl font-bold text-accent-blue mb-6 font-arabic relative z-10">
                            {philosophy.title} 🌟
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                            {philosophy.principles.map((principle, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                    className="flex items-start gap-3"
                                >
                                    <span className="text-emerald-500 text-xl">✅</span>
                                    <p className="text-gray-300 font-arabic">
                                        <span className="font-bold">{principle.split(':')[0]}:</span>
                                        {principle.split(':')[1]}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Subjects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {studyData.map((subject, index) => {
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
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                >
                                    <SubjectCard
                                        icon={subject.icon}
                                        name={subject.name}
                                        lessonInfo={subject.lessonDay || subject.lessonDays?.join(' & ') || ''}
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
