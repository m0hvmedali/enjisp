'use client';

import { useEffect, useMemo } from 'react';
import { useStudyStore } from '@/store/useStudyStore';
import SubjectCard from '@/components/SubjectCard';
import WisdomBanner from '@/components/WisdomBanner';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

export default function HomePage() {
    const { subjects, fetchPlan, user } = useStudyStore();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            fetchPlan();
        }
    }, [user, fetchPlan]);

    // Smart Scheduling Logic
    const { todaySubjects, otherSubjects, todaysMissions } = useMemo(() => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const todayName = days[new Date().getDay()];

        const todaySub = subjects.filter(s => s.day_of_week === todayName);
        const otherSub = subjects.filter(s => s.day_of_week !== todayName);

        // Collect pending missions for today's subjects
        const missions = todaySub.flatMap(s => s.missions).filter(m => !m.is_completed);

        return { todaySubjects: todaySub, otherSubjects: otherSub, todaysMissions: missions };
    }, [subjects]);

    const getProgress = (sub: any) => {
        if (!sub.missions || sub.missions.length === 0) return 0;
        const completed = sub.missions.filter((m: any) => m.is_completed).length;
        return (completed / sub.missions.length) * 100; // Return percentage 0-100
    };

    return (
        <div className="min-h-screen bg-obsidian-bg p-6 pb-24 font-arabic">
            {/* Wisdom Engine Banner */}
            <WisdomBanner />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-black text-white mb-2 font-english tracking-tight">
                        Hello, <span className="text-sage-DEFAULT">{user?.full_name || 'Scholar'}</span>
                    </h1>
                    <p className="text-white/50">
                        {todaysMissions.length > 0 ? `You have ${todaysMissions.length} missions today! 🎯` : 'Quiet day... Take a rest or review 🧠'}
                    </p>
                </motion.div>
                <div className="text-right">
                    <span className="text-4xl font-black text-white/10 block">{new Date().getDate()}</span>
                    <span className="text-sm text-sage-dim uppercase tracking-widest">{new Date().toLocaleString('en-us', { month: 'short' })}</span>
                </div>
            </div>

            {/* Today's Focus Area */}
            {todaySubjects.length > 0 && (
                <section className="mb-10">
                    <div className="flex items-center gap-2 mb-4 text-white/50">
                        <Calendar size={18} />
                        <h2 className="font-bold uppercase tracking-wider text-sm">Today's Focus</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {todaySubjects.map(subject => (
                            <SubjectCard
                                key={subject.id}
                                icon={subject.icon || '✨'} // Use stored icon or default
                                name={subject.name}
                                progress={getProgress(subject) / 100} // Expects 0-1
                                lessonInfo="Scheduled for Today"
                                hasLessonToday={true}
                                gradient={getGradient(subject.name)}
                                completedCount={subject.missions.filter((m: any) => m.is_completed).length}
                                totalCount={subject.missions.length}
                                onClick={() => router.push(`/subject/${subject.id}`)}
                            />
                        ))}
                    </div>

                    {/* Quick Tasks List */}
                    <div className="mt-6 bg-obsidian-card rounded-2xl p-4 border border-white/10">
                        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                            <Clock size={16} className="text-sage-DEFAULT" />
                            Next Missions
                        </h3>
                        <div className="space-y-2">
                            {todaysMissions.slice(0, 3).map(mission => (
                                <div key={mission.id} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                                    <span className="text-gray-300 text-sm">{mission.title}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${mission.priority === 'high' ? 'border-alert-red text-alert-red' : 'border-blue-500 text-blue-400'
                                        }`}>
                                        {mission.priority || 'Normal'}
                                    </span>
                                </div>
                            ))}
                            {todaysMissions.length === 0 && <p className="text-gray-500 text-sm">No specific tasks pending for today's subjects.</p>}
                        </div>
                    </div>
                </section>
            )}

            {/* Other Subjects */}
            <section>
                <h2 className="text-sm font-bold text-white/30 uppercase tracking-wider mb-4">All Subjects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80 hover:opacity-100 transition-opacity">
                    {otherSubjects.map((subject) => (
                        <SubjectCard
                            key={subject.id}
                            icon={subject.icon || getIconForSubject(subject.name)}
                            name={subject.name}
                            progress={getProgress(subject) / 100}
                            lessonInfo={subject.day_of_week || 'Flexible'}
                            hasLessonToday={false}
                            gradient={getGradient(subject.name)}
                            completedCount={subject.missions.filter((m: any) => m.is_completed).length}
                            totalCount={subject.missions.length}
                            onClick={() => router.push(`/subject/${subject.id}`)}
                        />
                    ))}
                </div>
            </section>
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
    if (name.includes('فيزياء')) return 'from-purple-900/50 to-indigo-900/50';
    if (name.includes('كيمياء')) return 'from-sage-dim/20 to-emerald-900/50';
    if (name.includes('رياضيات')) return 'from-blue-900/50 to-cyan-900/50';
    if (name.includes('عربي')) return 'from-yellow-900/50 to-orange-900/50';
    return 'from-obsidian-surface to-zinc-900/50';
}
