'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { useStudyStore } from '@/store/useStudyStore';
import Sidebar from '@/components/Sidebar';
import RightPanel from '@/components/RightPanel';
import MobileNav from '@/components/MobileNav';
import MissionCard from '@/components/MissionCard';
import MissionModal from '@/components/MissionModal';
import { ArrowLeft, Search, Filter, Sparkles, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Mission } from '@/types';

export default function SubjectPage() {
    const params = useParams();
    const router = useRouter();
    const subjectId = params?.id as string;
    const { studyPlan, completedMissions, toggleMission } = useStudyStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const subject = useMemo(() => studyPlan.find(s => s.id === subjectId), [studyPlan, subjectId]);

    const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    if (!mounted) return <div className="min-h-screen bg-dark-bg" />;

    if (!subject) {
        return (
            <div className="flex items-center justify-center h-screen bg-dark-bg">
                <div className="text-center p-12 bg-dark-card rounded-3xl border border-white/10">
                    <div className="text-6xl mb-6">🔍</div>
                    <h2 className="text-2xl font-black font-arabic mb-4">المادة غير موجودة</h2>
                    <button onClick={() => router.push('/')} className="px-6 py-3 bg-accent-blue rounded-xl font-bold">العودة للرئيسية</button>
                </div>
            </div>
        );
    }

    const handleToggleMission = (missionId: string, missionTitle: string) => {
        toggleMission(missionId);
        if (!completedMissions[missionId]) {
            toast.success(`خدي بوسه: ${missionTitle}`, {
                icon: '💎',
                style: {
                    borderRadius: '16px',
                    background: '#0f172a',
                    color: '#fff',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                }
            });
        }
    };

    const openMissionModal = (mission: Mission) => {
        setSelectedMission(mission);
        setIsModalOpen(true);
    };

    return (
        <div className="flex min-h-screen bg-dark-bg relative overflow-hidden">
            <div className="fixed inset-0 bg-cosmic-mesh animate-mesh opacity-20 pointer-events-none" />
            <div className="fixed inset-0 bg-cosmic-gradient pointer-events-none" />

            <Sidebar />

            <main className="flex-1 pb-24 lg:pb-8 overflow-y-auto overflow-x-hidden">
                <MobileNav />

                <div className="max-w-6xl mx-auto p-4 lg:p-12">
                    {/* Action Bar */}
                    <div className="flex justify-between items-center mb-12">
                        <motion.button
                            whileHover={{ x: -5 }}
                            onClick={() => router.push('/')}
                            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-all font-arabic font-bold"
                        >
                            <ArrowLeft size={18} />
                            Back
                        </motion.button>

                        <div className="flex gap-2">
                            <div className="relative group hidden md:block">
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-accent-blue transition-colors" size={18} />
                                <input
                                    className="bg-dark-card border border-white/10 rounded-2xl py-3 pr-12 pl-6 outline-none focus:ring-2 ring-accent-blue/50 w-64 transition-all text-sm"
                                    placeholder="ابحث عن مهمة..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Subject Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative mb-16 p-8 lg:p-12 rounded-[3rem] overflow-hidden bg-gradient-to-br from-dark-card to-transparent border border-white/10"
                    >
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/20 rounded-full blur-[100px] pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-right">
                            <div className="text-8xl lg:text-9xl drop-shadow-2xl animate-float">
                                {subject.icon}
                            </div>
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-blue/20 text-accent-blue font-black text-xs uppercase tracking-widest mb-4">
                                    <Sparkles size={12} /> {subject.theme.scientist}
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-black font-arabic mb-4 tracking-tighter">
                                    {subject.name}
                                </h1>
                                <p className="text-gray-500 font-arabic text-lg max-w-xl">
                                    هذا الطريق سيوصلك بلا شك للتفوق في {subject.name} مع خالص التقدير لروح العلم التي تتبعها.
                                </p>
                            </div>

                            <div className="hidden lg:grid grid-cols-2 gap-4">
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center">
                                    <span className="block text-3xl font-black font-english text-accent-blue">{subject.units?.length || subject.sections?.length || 0}</span>
                                    <span className="text-[10px] text-gray-500 font-arabic font-bold uppercase tracking-widest">أقسام</span>
                                </div>
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center">
                                    <span className="block text-3xl font-black font-english text-emerald-500">
                                        {Math.round(subject.missions?.length || 0)}
                                    </span>
                                    <span className="text-[10px] text-gray-500 font-arabic font-bold uppercase tracking-widest">مهام</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Schedule Image Section */}
                    {subject.scheduleImage && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-16"
                        >
                            <h2 className="text-2xl font-black font-arabic mb-6 flex items-center gap-3">
                                <span className="p-2 bg-accent-gold/20 rounded-xl text-accent-gold">🗺️</span>
                                <span>المخطط الذهبي للمادة</span>
                            </h2>
                            <div className="relative group rounded-[2.5rem] overflow-hidden border border-white/10 bg-dark-card shadow-2xl">
                                <img
                                    src={subject.scheduleImage}
                                    alt="مخطط المادة"
                                    className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 cursor-zoom-in"
                                    onClick={() => window.open(subject.scheduleImage, '_blank')}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 pointer-events-none">
                                    <p className="text-white font-arabic font-bold">إضغط لمشاهدة المخطط بالحجم الكامل 🔍</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Content Structure */}
                    <div className="space-y-12">
                        {subject.missions && subject.missions.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-black font-arabic mb-6 px-4 border-r-4 border-accent-blue flex items-center gap-3">
                                    <BookOpen className="text-accent-blue" /> مهام المادة
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {subject.missions.map((m, i) => (
                                        <MissionItem
                                            key={m.id}
                                            mission={m}
                                            index={i}
                                            completed={!!completedMissions[m.id]}
                                            onToggle={() => handleToggleMission(m.id, m.title)}
                                            onViewDetails={() => openMissionModal(m)}
                                            accentColor={subject.theme.primary}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {subject.units?.map((unit, uIdx) => (
                            <section key={unit.name}>
                                <h2 className="text-2xl font-black font-arabic mb-6 px-4 border-r-4 border-accent-purple flex items-center gap-3">
                                    <div className="p-2 bg-accent-purple/20 rounded-xl text-accent-purple text-sm">{uIdx + 1}</div>
                                    {unit.name}
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {unit.missions.map((m, i) => (
                                        <MissionItem
                                            key={m.id}
                                            mission={m}
                                            index={i}
                                            completed={!!completedMissions[m.id]}
                                            onToggle={() => handleToggleMission(m.id, m.title)}
                                            onViewDetails={() => openMissionModal(m)}
                                            accentColor={subject.theme.primary}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}

                        {subject.sections?.map((section, sIdx) => (
                            <section key={section.name}>
                                <h2 className="text-2xl font-black font-arabic mb-6 px-4 border-r-4 border-accent-gold flex items-center gap-3">
                                    <div className="p-2 bg-accent-gold/20 rounded-xl text-accent-gold text-sm">{sIdx + 1}</div>
                                    {section.name}
                                </h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {section.missions.map((m, i) => (
                                        <MissionItem
                                            key={m.id}
                                            mission={m}
                                            index={i}
                                            completed={!!completedMissions[m.id]}
                                            onToggle={() => handleToggleMission(m.id, m.title)}
                                            onViewDetails={() => openMissionModal(m)}
                                            accentColor={subject.theme.primary}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </main>

            <RightPanel />

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

function MissionItem({ mission, index, completed, onToggle, onViewDetails, accentColor }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
        >
            <MissionCard
                mission={{ ...mission, completed }}
                accentColor={accentColor}
                onToggle={onToggle}
                onViewDetails={onViewDetails}
            />
        </motion.div>
    );
}
