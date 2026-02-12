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
                        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-organic-gray rounded-[2.5rem] border border-white/10 shadow-2xl"
                        >
                            {/* Organic Background Blobs */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-organic-green/5 rounded-full blur-[80px]" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-organic-pink/5 rounded-full blur-[80px]" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 left-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-[100] border border-white/5 cursor-pointer"
                            >
                                <X className="w-6 h-6 text-gray-400" />
                            </button>

                            {/* Header */}
                            <div className="text-center p-8 border-b border-white/5 relative z-10">
                                <div className="text-6xl mb-4 filter drop-shadow-lg">{subjectIcon}</div>
                                <h2 className="text-3xl font-black text-white mb-2 font-arabic">
                                    {mission.title}
                                </h2>
                                <p className="text-organic-green font-arabic font-bold">{subjectName}</p>
                            </div>

                            {/* Body */}
                            <div className="p-8 space-y-6 relative z-10">
                                {/* What to Study */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="p-6 rounded-[2rem] bg-black/20 border border-white/5"
                                >
                                    <h3 className="text-lg font-black text-organic-beige mb-3 font-arabic flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-organic-green" />
                                        المحتوى
                                    </h3>
                                    <p className="text-gray-300 font-arabic leading-relaxed text-lg">
                                        {mission.content}
                                    </p>
                                </motion.div>

                                {/* Expected Outcome */}
                                {mission.outcome && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="p-6 rounded-[2rem] bg-organic-green/5 border border-organic-green/10"
                                    >
                                        <h3 className="text-lg font-black text-organic-green mb-3 font-arabic flex items-center gap-2">
                                            <Brain className="w-5 h-5" />
                                            النتيجة المتوقعة
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
                                    <div className="p-5 rounded-[1.5rem] bg-white/5 border border-white/5 flex items-center gap-4">
                                        <div className="p-3 bg-organic-dark rounded-full">
                                            <Clock className="w-5 h-5 text-organic-beige" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-500 font-bold font-arabic uppercase tracking-wider">الوقت</p>
                                            <p className="text-white font-black font-english text-lg">{mission.duration}</p>
                                        </div>
                                    </div>
                                    {mission.method && (
                                        <div className="p-5 rounded-[1.5rem] bg-white/5 border border-white/5 flex items-center gap-4">
                                            <div className="p-3 bg-organic-dark rounded-full">
                                                <BookOpen className="w-5 h-5 text-organic-pink" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-500 font-bold font-arabic uppercase tracking-wider">الطريقة</p>
                                                <p className="text-white font-bold font-arabic text-sm">
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
                                    className="space-y-3 pt-4"
                                >
                                    <a
                                        href={mission.links?.notebook || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-organic-green hover:bg-organic-green/90 text-organic-dark font-black font-arabic transition-all hover:scale-[1.02] shadow-lg shadow-organic-green/20"
                                    >
                                        <Video className="w-5 h-5" />
                                        الشرح (NotebookLM)
                                    </a>
                                    <a
                                        href={mission.links?.questions || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-white font-bold font-arabic transition-all hover:scale-[1.02]"
                                    >
                                        <HelpCircle className="w-5 h-5 text-gray-400" />
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
