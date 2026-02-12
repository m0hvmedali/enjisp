'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, BookOpen, Video, HelpCircle, Brain } from 'lucide-react';
import type { Mission } from '@/types';

interface MissionModalProps {
    mission: Mission | null;
    isOpen: boolean;
    onClose: () => void;
    subjectIcon: string;
    subjectName: string;
}

export default function MissionModal({
    mission,
    isOpen,
    onClose,
    subjectIcon,
    subjectName,
}: MissionModalProps) {
    if (!mission) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-dark-card rounded-3xl border border-white/10 shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 left-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors z-10"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>

                            {/* Header */}
                            <div className="text-center p-8 border-b border-white/10">
                                <div className="text-6xl mb-4">{subjectIcon}</div>
                                <h2 className="text-3xl font-bold text-white mb-2 font-arabic">
                                    {mission.title}
                                </h2>
                                <p className="text-gray-400 font-arabic">{subjectName}</p>
                            </div>

                            {/* Body */}
                            <div className="p-8 space-y-6">
                                {/* What to Study */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="p-6 rounded-2xl bg-white/5 border border-white/10"
                                >
                                    <h3 className="text-xl font-bold text-accent-blue mb-3 font-arabic flex items-center gap-2">
                                        <BookOpen className="w-5 h-5" />
                                        ماذا سندرس؟
                                    </h3>
                                    <p className="text-gray-300 font-arabic leading-relaxed">
                                        {mission.content}
                                    </p>
                                </motion.div>

                                {/* Expected Outcome */}
                                {mission.outcome && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="p-6 rounded-2xl bg-white/5 border border-white/10"
                                    >
                                        <h3 className="text-xl font-bold text-accent-green mb-3 font-arabic flex items-center gap-2">
                                            <Brain className="w-5 h-5" />
                                            الحالة النفسية المتوقعة
                                        </h3>
                                        <p className="text-gray-300 font-arabic leading-relaxed">
                                            {mission.outcome}
                                        </p>
                                    </motion.div>
                                )}

                                {/* Details Grid */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-accent-blue" />
                                        <div>
                                            <p className="text-xs text-gray-400 font-arabic">الوقت</p>
                                            <p className="text-white font-bold font-english">{mission.duration}</p>
                                        </div>
                                    </div>
                                    {mission.method && (
                                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                                            <BookOpen className="w-5 h-5 text-accent-purple" />
                                            <div>
                                                <p className="text-xs text-gray-400 font-arabic">الطريقة</p>
                                                <p className="text-white font-semibold font-arabic text-sm">
                                                    {mission.method}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>

                                {/* Resource Links */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-3"
                                >
                                    <a
                                        href={mission.links?.notebook || '#'}
                                        className="flex items-center justify-center gap-3 p-4 rounded-xl bg-purple-600 hover:bg-purple-700 transition-colors text-white font-bold font-arabic"
                                    >
                                        <Video className="w-5 h-5" />
                                        Note (NotebookLM)
                                    </a>
                                    <a
                                        href={mission.links?.questions || '#'}
                                        className="flex items-center justify-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white font-bold font-arabic"
                                    >
                                        <HelpCircle className="w-5 h-5" />
                                        أسئلة السنين السابقة
                                    </a>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
