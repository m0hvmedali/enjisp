'use client';

import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { studyData } from '@/data/studyData';
import Sidebar from '@/components/Sidebar';
import RightPanel from '@/components/RightPanel';
import MissionCard from '@/components/MissionCard';
import MissionModal from '@/components/MissionModal';
import { useStudyStore } from '@/store/useStudyStore';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Mission } from '@/types';

export default function SubjectPage() {
    const params = useParams();
    const router = useRouter();
    const subjectId = params?.id as string;
    const subject = studyData.find(s => s.id === subjectId);

    const { completedMissions, toggleMission } = useStudyStore();
    const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!subject) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-400">المادة غير موجودة</p>
            </div>
        );
    }

    const handleToggleMission = (missionId: string, missionTitle: string) => {
        toggleMission(missionId);
        const isNowCompleted = !completedMissions[missionId];

        if (isNowCompleted) {
            toast.success(`✅ أحسنت! أنهيت "${missionTitle}"`, {
                duration: 3000,
                icon: '🎉',
            });
        }
    };

    const openMissionModal = (mission: Mission) => {
        setSelectedMission(mission);
        setIsModalOpen(true);
    };

    const renderMissions = (missions: Mission[]) => {
        return missions.map((mission, index) => {
            const missionWithState = {
                ...mission,
                completed: !!completedMissions[mission.id]
            };

            return (
                <motion.div
                    key={mission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <MissionCard
                        mission={missionWithState}
                        accentColor={subject.theme.primary}
                        onToggle={() => handleToggleMission(mission.id, mission.title)}
                        onViewDetails={() => openMissionModal(missionWithState)}
                    />
                </motion.div>
            );
        });
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-8">
                    {/* Back Button */}
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 mb-8 text-gray-400 hover:text-white transition-colors font-arabic"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        العودة للرئيسية
                    </motion.button>

                    {/* Subject Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-6 mb-12"
                    >
                        <div className="text-7xl">{subject.icon}</div>
                        <div>
                            <h1 className="text-5xl font-black mb-2 font-arabic">
                                {subject.name}
                            </h1>
                            <p className="text-gray-400 font-arabic">
                                بإشراف الروح العلمية لـ {subject.theme.scientist}
                            </p>
                        </div>
                    </motion.div>

                    {/* Missions */}
                    <div className="space-y-4">
                        {subject.missions && renderMissions(subject.missions)}

                        {subject.units?.map((unit, unitIndex) => (
                            <div key={unitIndex}>
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: unitIndex * 0.1 }}
                                    className="text-3xl font-bold mb-6 mt-12 pb-3 border-b border-white/10 font-arabic"
                                    style={{ color: subject.theme.primary }}
                                >
                                    {unit.name}
                                </motion.h2>
                                <div className="space-y-4">
                                    {renderMissions(unit.missions)}
                                </div>
                            </div>
                        ))}

                        {subject.sections?.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: sectionIndex * 0.1 }}
                                    className="text-3xl font-bold mb-6 mt-12 pb-3 border-b border-white/10 font-arabic"
                                    style={{ color: subject.theme.primary }}
                                >
                                    {section.name}
                                </motion.h2>
                                <div className="space-y-4">
                                    {renderMissions(section.missions)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <RightPanel />

            {/* Mission Modal */}
            <MissionModal
                mission={selectedMission}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                subjectIcon={subject.icon}
                subjectName={subject.name}
            />
        </div>
    );
}
