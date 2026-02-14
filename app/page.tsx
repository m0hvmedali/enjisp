'use client';

import { useEffect } from 'react';
import { useStudyStore } from '@/store/useStudyStore';
import SubjectCard from '@/components/SubjectCard';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function HomePage() {
    const { subjects, fetchPlan, user } = useStudyStore();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            fetchPlan();
        }
    }, [user, fetchPlan]);

    // Calculate generic progress
    const getProgress = (sub: any) => {
        if (!sub.missions || sub.missions.length === 0) return 0;
        const total = sub.missions.reduce((acc: number, m: any) => acc + (m.progress || 0), 0);
        return total / sub.missions.length;
    };

    const getCompletedCount = (sub: any) => {
        return sub.missions?.filter((m: any) => m.is_completed).length || 0;
    };

    return (
        <div className="min-h-screen bg-organic-dark p-6 pb-24 font-arabic">
            <header className="pt-12 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-black text-white mb-2 font-english tracking-tight">
                        Hello, <span className="text-organic-green">{user?.full_name || 'Scholar'}</span>
                    </h1>
                    <p className="text-organic-border opacity-70">جاهز تصنع عظمة النهارده؟ 🚀</p>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject, index) => (
                    <SubjectCard
                        key={subject.id}
                        icon={getIconForSubject(subject.name)}
                        name={subject.name}
                        progress={getProgress(subject)}
                        lessonInfo={subject.day_of_week || 'جدول مرن'}
                        hasLessonToday={isToday(subject.day_of_week)}
                        gradient={getGradient(subject.name)}
                        completedCount={getCompletedCount(subject)}
                        totalCount={subject.missions?.length || 0}
                        onClick={() => router.push(`/subject/${subject.id}`)}
                    />
                ))}
            </div>

            {subjects.length === 0 && (
                <div className="text-center py-20 opacity-50">
                    <p>جاري تحميل المواد...</p>
                </div>
            )}
        </div>
    );
}

// Helpers
function getIconForSubject(name: string) {
    if (name.includes('فيزياء') || name.includes('Physics')) return '⚛️';
    if (name.includes('كيمياء') || name.includes('Chemistry')) return '🧪';
    if (name.includes('رياضيات') || name.includes('Math')) return '📐';
    if (name.includes('عربي') || name.includes('Arabic')) return '📜';
    if (name.includes('إنجليزي') || name.includes('English')) return '🇬🇧';
    return '📚';
}

function getGradient(name: string) {
    // Return tailwind gradient classes
    if (name.includes('فيزياء')) return 'from-purple-900/50 to-indigo-900/50';
    if (name.includes('كيمياء')) return 'from-organic-green/20 to-emerald-900/50';
    if (name.includes('رياضيات')) return 'from-blue-900/50 to-cyan-900/50';
    if (name.includes('عربي')) return 'from-yellow-900/50 to-orange-900/50';
    return 'from-organic-gray to-zinc-900/50';
}

function isToday(day: string | null) {
    if (!day) return false;
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    // Note: JS getDay() returns 0 for Sunday. 
    // If the DB stores 'Sunday', 'Monday', etc. this works.
    return day === today;
}
