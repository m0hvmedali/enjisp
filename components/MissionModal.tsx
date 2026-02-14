'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Circle, ExternalLink, Book, Archive } from 'lucide-react';
import { Mission } from '@/types';
import { useStudyStore } from '@/store/useStudyStore';

interface MissionModalProps {
    mission: Mission | null;
    onClose: () => void;
}

export default function MissionModal({ mission, onClose }: MissionModalProps) {
    const { toggleMission } = useStudyStore();

    if (!mission) return null;

    const handleToggle = () => {
        toggleMission(mission.id, mission.is_completed, mission.progress);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg bg-organic-dark border border-organic-border/20 rounded-3xl p-6 shadow-2xl overflow-hidden font-arabic"
                >
                    {/* Cinematic Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-organic-green/10 rounded-full blur-3xl -mr-16 -mt-16" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 left-4 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X size={20} className="text-organic-border" />
                    </button>

                    <div className="mt-2 mb-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${mission.type === 'study' ? 'bg-blue-500/20 text-blue-400' :
                                mission.type === 'solve' ? 'bg-organic-pink/20 text-organic-pink' :
                                    'bg-yellow-500/20 text-yellow-400'
                            }`}>
                            {mission.type === 'study' ? 'مذاكرة' : mission.type === 'solve' ? 'حل' : 'مراجعة'}
                        </span>
                        <h2 className="text-2xl font-bold text-white leading-tight">{mission.title}</h2>
                        {mission.description && (
                            <p className="text-organic-border mt-2 text-sm leading-relaxed">{mission.description}</p>
                        )}
                    </div>

                    <div className="space-y-4 mb-8">
                        {/* Links */}
                        <div className="grid grid-cols-2 gap-3">
                            {mission.notebook_link && (
                                <a
                                    href={mission.notebook_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 rounded-xl bg-organic-gray/50 hover:bg-organic-gray border border-organic-border/20 transition-all group"
                                >
                                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                        <Book size={18} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-organic-border font-bold">NotebookLM</span>
                                        <span className="text-[10px] text-organic-border/50">ملخص & محادثة</span>
                                    </div>
                                </a>
                            )}

                            {mission.archive_link && (
                                <a
                                    href={mission.archive_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 rounded-xl bg-organic-gray/50 hover:bg-organic-gray border border-organic-border/20 transition-all group"
                                >
                                    <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                                        <Archive size={18} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-organic-border font-bold">Questions Archive</span>
                                        <span className="text-[10px] text-organic-border/50">أسئلة سنوات سابقة</span>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Progress Action */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleToggle}
                            className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all ${mission.is_completed
                                    ? 'bg-organic-green text-black shadow-[0_0_20px_rgba(0,200,83,0.3)]'
                                    : 'bg-organic-gray border border-organic-border/30 hover:border-organic-green hover:text-organic-green'
                                }`}
                        >
                            {mission.is_completed ? (
                                <>
                                    <CheckCircle size={24} />
                                    <span>تم الإنجاز!</span>
                                </>
                            ) : (
                                <>
                                    <Circle size={24} />
                                    <span>تحديد كمكتمل</span>
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
