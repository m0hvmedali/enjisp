'use client';

import { useEffect, useState } from 'react';
import { useStudyStore } from '@/store/useStudyStore';
import { motion } from 'framer-motion';
import CurriculumManager from '@/components/AdminPanel/CurriculumManager';
import { ChevronDown, ChevronRight, CheckCircle, Circle } from 'lucide-react';

export default function CurriculumPage() {
    const { subjects, user, fetchPlan } = useStudyStore();
    const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({});

    useEffect(() => {
        fetchPlan();
    }, []);

    const toggleUnit = (unitId: string) => {
        setExpandedUnits(prev => ({ ...prev, [unitId]: !prev[unitId] }));
    };

    return (
        <div className="min-h-screen bg-organic-dark p-6 pb-24 font-arabic">
            <header className="pt-12 mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Roadmap 🗺️</h1>
                <p className="text-organic-border">خريطة المنهج الكاملة</p>
            </header>

            {/* Admin Panel Access */}
            {user?.role === 'admin' && (
                <div className="mb-12">
                    <CurriculumManager />
                </div>
            )}

            {/* User View */}
            <div className="space-y-8">
                {subjects.map((subject, idx) => (
                    <motion.div
                        key={subject.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative pl-8 border-l-2 border-white/10"
                    >
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-organic-green box-content border-4 border-organic-dark" />
                        <h2 className="text-2xl font-bold text-white mb-4">{subject.name}</h2>

                        <div className="space-y-4">
                            {subject.units?.map(unit => {
                                const unitMissions = subject.missions.filter(m => m.unit_id === unit.id);
                                const completedCount = unitMissions.filter(m => m.status === 'completed').length;
                                const progress = unitMissions.length ? (completedCount / unitMissions.length) * 100 : 0;
                                const isExpanded = expandedUnits[unit.id];

                                return (
                                    <div key={unit.id} className="bg-organic-gray/30 rounded-xl border border-white/5 overflow-hidden">
                                        <div
                                            className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
                                            onClick={() => toggleUnit(unit.id)}
                                        >
                                            <div className="flex flex-col gap-1">
                                                <span className="font-bold text-organic-beige">{unit.title}</span>
                                                <div className="flex items-center gap-2 text-xs text-organic-border">
                                                    <div className="w-24 h-1.5 bg-black/50 rounded-full overflow-hidden">
                                                        <div className="h-full bg-organic-green" style={{ width: `${progress}%` }} />
                                                    </div>
                                                    <span>{Math.round(progress)}%</span>
                                                </div>
                                            </div>
                                            {isExpanded ? <ChevronDown className="text-organic-green" /> : <ChevronRight className="text-gray-500" />}
                                        </div>

                                        {isExpanded && (
                                            <div className="bg-black/20 p-4 space-y-3 border-t border-white/5">
                                                {unitMissions.map(mission => (
                                                    <div key={mission.id} className="flex items-center gap-3 group">
                                                        <div className={`transition-colors ${mission.status === 'completed' ? 'text-organic-green' : 'text-gray-600'}`}>
                                                            {mission.status === 'completed' ? <CheckCircle size={18} /> : <Circle size={18} />}
                                                        </div>
                                                        <span className={`text-sm ${mission.status === 'completed' ? 'text-gray-500 line-through' : 'text-white'}`}>
                                                            {mission.title}
                                                        </span>
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${mission.priority === 'high' ? 'border-red-500/30 text-red-400' :
                                                                mission.priority === 'medium' ? 'border-yellow-500/30 text-yellow-400' :
                                                                    'border-blue-500/30 text-blue-400'
                                                            }`}>
                                                            {mission.priority}
                                                        </span>
                                                    </div>
                                                ))}
                                                {unitMissions.length === 0 && <span className="text-xs text-gray-600 block text-center">No missions yet.</span>}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
