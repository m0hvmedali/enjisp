'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, Sparkles } from 'lucide-react';

interface SubjectCardProps {
    icon: string;
    name: string;
    progress: number;
    lessonInfo: string;
    hasLessonToday?: boolean;
    gradient: string;
    onClick: () => void;
    completedCount: number;
    totalCount: number;
}

export default function SubjectCard({
    icon,
    name,
    progress,
    lessonInfo,
    hasLessonToday,
    gradient,
    onClick,
    completedCount,
    totalCount
}: SubjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`
        relative cursor-pointer rounded-[2rem] p-6 lg:p-8 backdrop-blur-3xl
        bg-gradient-to-br ${gradient} bg-opacity-30
        border border-white/10 transition-all duration-500
        hover:shadow-3xl hover:shadow-white/5
        ${hasLessonToday ? 'ring-4 ring-accent-blue/50 shadow-2xl shadow-accent-blue/20' : ''}
        overflow-hidden group
      `}
        >
            {/* Dynamic Background Shapes */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/10 transition-colors" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

            {/* Lesson Badge */}
            {hasLessonToday && (
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="absolute top-4 left-4 bg-accent-blue/90 text-white px-4 py-1.5 rounded-full text-xs font-black z-10 font-arabic shadow-xl shadow-accent-blue/20 backdrop-blur-md"
                >
                    درس اليوم 🏫
                </motion.div>
            )}

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <motion.div
                        animate={{
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="text-6xl drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                    >
                        {icon}
                    </motion.div>
                    <div className="flex flex-col items-end">
                        <span className="text-3xl font-black font-english tracking-tighter">
                            {Math.round(progress)}%
                        </span>
                        <span className="text-[10px] text-gray-400 font-arabic font-bold uppercase tracking-wider">التقدم الكلي</span>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-2xl lg:text-3xl font-black mb-2 font-arabic group-hover:text-white transition-colors">
                        {name}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold font-arabic">
                        <Clock size={14} className="text-accent-blue" />
                        <span>{lessonInfo}</span>
                    </div>
                </div>

                {/* Progress Bar Container */}
                <div className="mt-auto">
                    <div className="flex justify-between items-center mb-3 text-[10px] font-black font-arabic text-gray-500 tracking-widest">
                        <span>{completedCount} من {totalCount} مهام</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="relative h-2 w-full bg-black/20 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`absolute top-0 left-0 h-full bg-gradient-to-r from-white/40 to-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]`}
                        />
                    </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 left-6 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 text-white">
                    <ArrowLeft size={24} />
                </div>
            </div>
        </motion.div>
    );
}
