'use client';

import { motion } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';
import { Clock, ExternalLink } from 'lucide-react';

export default function ScheduleTab() {
    const { studyPlan } = useStudyStore();

    const days = [
        { eng: 'Saturday', arb: 'السبت', icon: '🌙', subjectId: 'english' },
        { eng: 'Sunday', arb: 'الأحد', icon: '☀️', subjectId: 'chemistry' },
        { eng: 'Monday', arb: 'الاثنين', icon: '🌀', subjectId: 'math' },
        { eng: 'Tuesday', arb: 'الثلاثاء', icon: '🔋', subjectId: 'arabic' },
        { eng: 'Wednesday', arb: 'الأربعاء', icon: '⚡', subjectId: 'physics' },
        { eng: 'Thursday', arb: 'الخميس', icon: '💎', subjectId: 'math' },
        { eng: 'Friday', arb: 'الجمعة', icon: '🙌', subjectId: 'physics' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 max-w-5xl mx-auto selection:bg-organic-green selection:text-organic-dark"
        >
            <h1 className="text-4xl font-black font-arabic mb-12 text-center text-white italic tracking-tighter flex items-center justify-center gap-4">
                <span className="w-3 h-3 bg-organic-green rounded-full animate-pulse" />
                جدول المعارك الدراسية
                <span className="w-3 h-3 bg-organic-green rounded-full animate-pulse" />
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {days.map((day, idx) => {
                    const subject = studyPlan.find(s => s.id === day.subjectId);

                    return (
                        <motion.div
                            key={day.eng}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`p-6 rounded-3xl border relative overflow-hidden flex flex-col justify-between group h-40
                                ${subject
                                    ? 'bg-organic-gray border-white/5 shadow-lg hover:border-organic-green/30'
                                    : 'bg-organic-dark/50 border-white/5 opacity-60 border-dashed'
                                }
                            `}
                        >
                            {/* Decorative Glow */}
                            {subject && (
                                <div className="absolute -right-10 -top-10 w-24 h-24 bg-organic-green/5 rounded-full blur-2xl group-hover:bg-organic-green/10 transition-colors" />
                            )}

                            <div className="flex justify-between items-start z-10">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-300">{day.icon}</span>
                                    <div>
                                        <h3 className="text-xl font-black font-arabic text-white group-hover:text-organic-green transition-colors">{day.arb}</h3>
                                        <p className="text-xs font-english text-gray-500 uppercase tracking-widest">{day.eng}</p>
                                    </div>
                                </div>
                                {subject && (
                                    <a href={`/subject/${subject.id}`} className="p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-organic-green hover:scale-110 transition-all">
                                        <ExternalLink size={14} />
                                    </a>
                                )}
                            </div>

                            <div className="z-10 mt-4">
                                {subject ? (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-organic-green animate-pulse" />
                                            <span className="text-sm font-bold font-arabic text-white">
                                                {subject.name}
                                            </span>
                                        </div>
                                        <span className="text-[10px] text-gray-500 font-bold border border-white/10 px-2 py-1 rounded-lg">
                                            {subject.theme.scientist}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Clock size={14} />
                                        <span className="text-xs font-arabic">راحة / مراجعة</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
