'use client';

import { motion } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';
import { Clock, ExternalLink } from 'lucide-react';

export default function ScheduleTab() {
    const { studyPlan } = useStudyStore();

    const days = [
        { eng: 'Saturday', arb: 'السبت', icon: '🌙' },
        { eng: 'Sunday', arb: 'الأحد', icon: '☀️' },
        { eng: 'Monday', arb: 'الاثنين', icon: '🌀' },
        { eng: 'Tuesday', arb: 'الثلاثاء', icon: '🔋' },
        { eng: 'Wednesday', arb: 'الأربعاء', icon: '⚡' },
        { eng: 'Thursday', arb: 'الخميس', icon: '💎' },
        { eng: 'Friday', arb: 'الجمعة', icon: '🙌' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 max-w-4xl mx-auto"
        >
            <h1 className="text-3xl font-black font-arabic mb-8 text-center bg-gradient-to-r from-google-blue to-accent-purple bg-clip-text text-transparent italic">
                جدول المعارك الدراسية ⚔️
            </h1>

            <div className="space-y-4">
                {days.map((day, idx) => {
                    const subject = studyPlan.find(s => s.lessonDay?.includes(day.arb));

                    return (
                        <motion.div
                            key={day.eng}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`p-6 rounded-3xl border ${subject ? 'bg-dark-card border-google-blue/30' : 'bg-dark-card/50 border-white/5 opacity-60'} flex justify-between items-center group hover:scale-[1.02] transition-all`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="text-2xl">{day.icon}</div>
                                <div>
                                    <h3 className="text-lg font-black font-arabic text-white">{day.arb}</h3>
                                    <p className="text-sm font-english text-gray-500">{day.eng}</p>
                                </div>
                            </div>

                            <div className="text-right">
                                {subject ? (
                                    <div className="flex flex-col items-end gap-1">
                                        <span className={`px-4 py-1 rounded-full text-xs font-bold font-arabic`} style={{ backgroundColor: `${subject.theme.primary}20`, color: subject.theme.primary }}>
                                            {subject.name}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-arabic flex items-center gap-1 group-hover:text-white transition-colors">
                                            <Clock size={10} /> {subject.theme.scientist} @ الدرس
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-gray-600 font-arabic text-sm">يوم راحة أو مراجعة ☕</span>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
