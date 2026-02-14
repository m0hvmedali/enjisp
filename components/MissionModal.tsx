'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Mission } from '@/types';
import { X, CheckCircle, Circle, Link as LinkIcon, Youtube, FileText, Clock, AlertCircle } from 'lucide-react';
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
        if (!mission.is_completed) onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal Content */}
                <motion.div
                    layoutId={`mission-${mission.id}`}
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="relative w-full max-w-lg bg-organic-dark rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="relative h-32 bg-gradient-to-br from-organic-green/20 to-organic-dark">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-black/20 rounded-full hover:bg-black/40 transition-colors z-10"
                        >
                            <X size={20} className="text-white" />
                        </button>

                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${mission.priority === 'high' ? 'border-red-500 text-red-400 bg-red-500/10' :
                                        mission.priority === 'medium' ? 'border-yellow-500 text-yellow-400 bg-yellow-500/10' :
                                            'border-blue-500 text-blue-400 bg-blue-500/10'
                                    }`}>
                                    {mission.priority} Priority
                                </span>
                                {mission.deadline && (
                                    <span className="text-[10px] text-organic-border flex items-center gap-1">
                                        <Clock size={10} /> Due: {new Date(mission.deadline).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                            <h2 className="text-2xl font-bold text-white leading-tight">{mission.title}</h2>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-6">
                        {/* Status Action */}
                        <button
                            onClick={handleToggle}
                            className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-all ${mission.is_completed
                                    ? 'bg-organic-green/10 text-organic-green border border-organic-green/20'
                                    : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                                }`}
                        >
                            {mission.is_completed ? (
                                <>
                                    <CheckCircle size={24} />
                                    <span>مكتمل! عظيم يا بطل 🌟</span>
                                </>
                            ) : (
                                <>
                                    <Circle size={24} />
                                    <span>تحديد كمكتمل</span>
                                </>
                            )}
                        </button>

                        {/* Description */}
                        {mission.description && (
                            <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                <p className="text-organic-beige/80 text-sm leading-relaxed whitespace-pre-wrap">
                                    {mission.description}
                                </p>
                            </div>
                        )}

                        {/* Resources & Links */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-organic-border uppercase tracking-widest">Resources</h3>

                            {mission.notebook_link && (
                                <a
                                    href={mission.notebook_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 hover:bg-blue-500/20 transition-colors"
                                >
                                    <div className="bg-blue-500/20 p-2 rounded-full"><LinkIcon size={16} /></div>
                                    <div className="flex-1">
                                        <span className="block font-bold text-sm">NotebookLM Brief</span>
                                        <span className="text-xs opacity-70">AI Summary & Audio</span>
                                    </div>
                                    <ChevronRight size={16} />
                                </a>
                            )}

                            {/* Assuming YouTube link might be in description or a future field, mocking generic external link for now if exists */}
                            {/* Previous Years / Archive */}
                            {mission.archive_link && (
                                <a
                                    href={mission.archive_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500/20 transition-colors"
                                >
                                    <div className="bg-purple-500/20 p-2 rounded-full"><FileText size={16} /></div>
                                    <div className="flex-1">
                                        <span className="block font-bold text-sm">Previous Year Questions</span>
                                        <span className="text-xs opacity-70">Archive & Past Exams</span>
                                    </div>
                                    <ChevronRight size={16} />
                                </a>
                            )}

                            {/* Fallback if no links */}
                            {!mission.notebook_link && !mission.archive_link && (
                                <div className="text-center py-4 bg-white/5 rounded-xl border border-white/5 border-dashed">
                                    <p className="text-gray-500 text-sm">No attached resources.</p>
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
                            <span>Type: <span className="text-gray-300 uppercase">{mission.type}</span></span>
                            <span>Est: {mission.estimated_time || '--'} min</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

function ChevronRight({ size }: { size: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    )
}
