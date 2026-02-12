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
            className="hidden lg:flex w-80 h-screen bg-dark-card border-r border-white/10 p-6 flex-col gap-6 backdrop-blur-xl sticky top-0 overflow-y-auto"
        >
            {/* Philosophy Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-dark-lighter to-transparent border border-white/10"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-5 h-5 text-accent-blue" />
                    <h3 className="text-lg font-bold text-white font-arabic">فلسفة الخطة 🧠</h3>
                </div>
                <p className="text-sm text-gray-400 font-arabic leading-relaxed">
                    "مش ضغط، كل مهمة قصيرة. نفسيتك أولوية."
                </p>

                {/* Mood Tracker */}
                <div className="mt-6">
                    <p className="text-sm text-gray-400 mb-3 font-arabic">حالتك دلوقتي؟</p>
                    <div className="flex gap-3">
                        {moodEmojis.map((emoji, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 p-3 rounded-xl bg-white/5 hover:bg-accent-blue/20 border border-white/10 transition-all text-2xl"
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
                className="p-6 rounded-2xl bg-gradient-to-br from-dark-lighter to-transparent border border-white/10"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-accent-purple" />
                    <h3 className="text-lg font-bold text-white font-arabic">مواعيد الدروس 📅</h3>
                </div>

                <div className="space-y-2">
                    {lessons.map((lesson, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.05 }}
                            className="flex justify-between items-center p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <span className="text-accent-blue font-bold font-arabic text-sm">
                                {lesson.day}
                            </span>
                            <span className="text-gray-300 font-arabic text-sm">
                                {lesson.subject}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Success Quote */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/20"
            >
                <p className="text-sm text-purple-300 font-arabic text-center italic leading-relaxed">
                    "اليوم الناجح = 60-70% من الخطة"
                </p>
            </motion.div>
        </motion.aside>
    );
}
