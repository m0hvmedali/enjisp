'use client';

import { motion } from 'framer-motion';
import { Brain, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

const lessons = [
    { day: 'السبت', subject: 'إنجليزي' },
    { day: 'الأحد', subject: 'كيمياء' },
    { day: 'الاثنين', subject: 'رياضة' },
    { day: 'الثلاثاء', subject: 'عربي' },
    { day: 'الأربعاء', subject: 'فيزياء' },
    { day: 'الخميس', subject: 'رياضة' },
    { day: 'الجمعة', subject: 'فيزياء' },
];

const moodEmojis = ['😊', '😐', '🤯'];

export default function RightPanel() {
    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden lg:flex w-80 h-screen bg-organic-dark/50 border-r border-white/5 p-6 flex-col gap-6 backdrop-blur-md sticky top-0 overflow-y-auto z-30"
        >
            {/* Philosophy Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-[2rem] bg-organic-gray border border-white/5 relative overflow-hidden group"
            >
                <div className="absolute -right-10 -top-10 w-24 h-24 bg-organic-green/5 rounded-full blur-2xl group-hover:bg-organic-green/10 transition-colors" />

                <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="p-2 bg-organic-green/10 rounded-xl text-organic-green">
                        <Brain className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white font-arabic">فلسفة الخطة</h3>
                </div>
                <p className="text-sm text-gray-400 font-arabic leading-relaxed relative z-10">
                    "مش ضغط، كل مهمة قصيرة. نفسيتك أولوية."
                </p>

                {/* Mood Tracker */}
                <div className="mt-6 relative z-10">
                    <p className="text-[10px] text-gray-500 mb-3 font-arabic uppercase tracking-wider font-bold">حالتك دلوقتي؟</p>
                    <div className="flex gap-2">
                        {moodEmojis.map((emoji, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 p-2 rounded-xl bg-white/5 hover:bg-organic-green/20 hover:border-organic-green/30 border border-white/5 transition-all text-xl grayscale hover:grayscale-0"
                            >
                                {emoji}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Upcoming Lessons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-[2rem] bg-organic-gray border border-white/5"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-organic-pink/10 rounded-xl text-organic-pink">
                        <Calendar className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white font-arabic">مواعيد الدروس</h3>
                </div>

                <div className="space-y-3">
                    {lessons.map((lesson, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/5 cursor-default group"
                        >
                            <span className="text-organic-green font-bold font-arabic text-sm group-hover:text-white transition-colors">
                                {lesson.day}
                            </span>
                            <span className="text-gray-400 font-arabic text-xs group-hover:text-organic-beige transition-colors">
                                {lesson.subject}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Success Quote */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-[2rem] bg-gradient-to-br from-organic-dark to-organic-gray border border-white/5 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-organic-green/5 opacity-50" />
                <p className="text-sm text-organic-beige font-arabic text-center italic leading-relaxed relative z-10 opacity-80">
                    "اليوم الناجح = 60-70% من الخطة"
                </p>
            </motion.div>
        </motion.aside>
    );
}
