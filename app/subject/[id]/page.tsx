'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';
import MissionModal from '@/components/MissionModal';
import { ArrowLeft, CheckCircle, Circle, ArrowUpRight } from 'lucide-react';
import { Mission } from '@/types';

export default function SubjectPage() {
    const params = useParams();
    const router = useRouter();
    const subjectId = params?.id as string;
    const { subjects, toggleMission } = useStudyStore();

    // Find subject from store
    const subject = useMemo(() => subjects.find(s => s.id === subjectId), [subjects, subjectId]);

    const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

    if (!subject) {
        return <div className="min-h-screen bg-organic-dark flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-organic-dark pb-24 font-arabic text-white">
            {/* Header / Hero */}
            <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={subject.image_url || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'}
                        alt={subject.name}
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-organic-dark" />
                </div>

                <button
                    onClick={() => router.back()}
                    className="absolute top-6 left-6 p-3 bg-black/30 backdrop-blur-md rounded-full hover:bg-black/50 transition-colors z-10"
                >
                    <ArrowLeft size={24} />
                </button>

                <div className="absolute bottom-6 right-6 z-10">
                    <h1 className="text-4xl font-bold font-arabic mb-2 drop-shadow-lg">{subject.name}</h1>
                    <p className="text-organic-green font-bold flex items-center gap-2">
                        {subject.missions.filter(m => m.is_completed).length} / {subject.missions.length} مهام مكتملة
                    </p>
                </div>
            </div>

            {/* Missions List */}
            <div className="p-6 space-y-4 max-w-3xl mx-auto">
                {subject.missions.map((mission, idx) => (
                    <motion.div
                        key={mission.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setSelectedMission(mission)}
                        className={`group p-4 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] ${mission.is_completed
                                ? 'bg-organic-green/5 border-organic-green/20'
                                : 'bg-organic-gray border-organic-border/10 hover:border-organic-border/30'
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleMission(mission.id, mission.is_completed, mission.progress);
                                    }}
                                    className={`transition-colors ${mission.is_completed ? 'text-organic-green' : 'text-organic-border hover:text-white'}`}
                                >
                                    {mission.is_completed ? <CheckCircle size={24} /> : <Circle size={24} />}
                                </button>

                                <div>
                                    <h3 className={`font-bold text-lg ${mission.is_completed ? 'text-organic-border line-through' : 'text-organic-beige'}`}>
                                        {mission.title}
                                    </h3>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${mission.type === 'study' ? 'bg-blue-500/10 text-blue-400' :
                                            mission.type === 'solve' ? 'bg-pink-500/10 text-pink-400' :
                                                'bg-yellow-500/10 text-yellow-400'
                                        }`}>
                                        {mission.type}
                                    </span>
                                </div>
                            </div>

                            <ArrowUpRight size={18} className="text-organic-border opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        {/* Progress Line */}
                        <div className="mt-4 h-1 w-full bg-black/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-organic-green transition-all duration-500"
                                style={{ width: `${mission.progress}%` }}
                            />
                        </div>
                    </motion.div>
                ))}

                {subject.missions.length === 0 && (
                    <div className="text-center py-12 text-organic-border opacity-50">
                        لا توجد مهام في هذه المادة بعد.
                    </div>
                )}
            </div>

            <MissionModal
                mission={selectedMission}
                onClose={() => setSelectedMission(null)}
            />
        </div>
    );
}
