'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface SubjectCardProps {
    icon: string;
    name: string;
    lessonInfo: string;
    progress: number;
    hasLessonToday: boolean;
    gradient: string;
    onClick: () => void;
    completedCount: number;
    totalCount: number;
}

export default function SubjectCard({
    icon,
    name,
    lessonInfo,
    progress,
    hasLessonToday,
    gradient,
    onClick,
    completedCount,
    totalCount,
}: SubjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03, y: -8 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`
        relative cursor-pointer rounded-3xl p-6 backdrop-blur-xl
        bg-gradient-to-br ${gradient} bg-opacity-50
        border border-white/10 transition-all duration-500
        hover:shadow-2xl hover:shadow-accent-blue/20
        ${hasLessonToday ? 'ring-2 ring-accent-blue shadow-lg shadow-accent-blue/30' : ''}
        overflow-hidden group
      `}
        >
            {/* Lesson Badge */}
            {hasLessonToday && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 left-4 bg-accent-blue px-3 py-1 rounded-full text-xs font-bold text-white z-10"
                >
                    درس اليوم 🏫
                </motion.div>
            )}

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="relative z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>

                <h3 className="text-2xl font-bold mb-2 text-white font-arabic">
                    {name}
                </h3>

                <p className="text-sm text-gray-400 mb-4 font-arabic">
                    {lessonInfo}
                </p>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-3">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-accent-blue to-accent-purple"
                    />
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-english">
                        إنجاز: {Math.round(progress)}%
                    </span>
                    <span className="text-accent-blue font-bold font-english">
                        {completedCount}/{totalCount}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
