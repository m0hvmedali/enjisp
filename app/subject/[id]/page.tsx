'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import { useState, useMemo, useEffect, ChangeEvent } from 'react';
import { useStudyStore } from '@/store/useStudyStore';
import Sidebar from '@/components/Sidebar';
import RightPanel from '@/components/RightPanel';
import MobileNav from '@/components/MobileNav';
import MissionCard from '@/components/MissionCard';
import MissionModal from '@/components/MissionModal';
import { ArrowLeft, Search, Filter, Sparkles, BookOpen, Maximize2, X, Menu, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Mission } from '@/types';

export default function SubjectPage() {
    const params = useParams();
    const router = useRouter();
    const subjectId = params?.id as string;
    const { studyPlan, completedMissions, toggleMission, toggleSidebar } = useStudyStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const subject = useMemo(() => studyPlan.find(s => s.id === subjectId), [studyPlan, subjectId]);

    const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
    const [sort, setSort] = useState<'default' | 'duration' | 'title'>('default');
    const [isImageOpen, setIsImageOpen] = useState(false);

    if (!mounted) return <div className="min-h-screen bg-organic-dark" />;

    if (!subject) {
        return (
            <div className="flex items-center justify-center h-screen bg-organic-dark">
                <div className="text-center p-12 bg-organic-gray rounded-3xl border border-white/5">
                    <div className="text-6xl mb-6">🔍</div>
                    <h2 className="text-2xl font-black font-arabic mb-4 text-white">المادة غير موجودة</h2>
                    <button onClick={() => router.push('/')} className="px-6 py-3 bg-organic-green text-organic-dark rounded-xl font-bold shadow-lg shadow-organic-green/20">العودة للرئيسية</button>
                </div>
            </div>
        );
    }

    const processMissions = (missions: Mission[]) => {
        let result = [...missions];

        // Filter
        if (filter === 'completed') result = result.filter(m => completedMissions[m.id]);
        else if (filter === 'incomplete') result = result.filter(m => !completedMissions[m.id]);

        // Search
        if (searchQuery) {
            result = result.filter(m =>
                m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.content?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort
        if (sort === 'title') {
            result.sort((a, b) => a.title.localeCompare(b.title, 'ar'));
        } else if (sort === 'duration') {
            const getVal = (s: string) => {
                const num = parseInt(s);
                return isNaN(num) ? 9999 : num;
            };
            result.sort((a, b) => getVal(a.duration || '0') - getVal(b.duration || '0'));
        }

        return result;
    };

    const handleToggleMission = (missionId: string, missionTitle: string) => {
        toggleMission(missionId);
        if (!completedMissions[missionId]) {
            toast.success(`عاش يا بطل: ${missionTitle}`, {
                icon: '🔥',
                style: {
                    borderRadius: '12px',
                    background: '#121212',
                    color: '#fff',
                    border: '1px solid #00C853'
                }
            });
        }
    };

    const openMissionModal = (mission: Mission) => {
        setSelectedMission(mission);
        setIsModalOpen(true);
    };

    return (
        <div className="flex min-h-screen bg-organic-dark relative overflow-hidden selection:bg-organic-green selection:text-organic-dark font-arabic">

            <Sidebar />

            <header className="fixed top-0 left-0 right-0 h-20 px-6 flex items-center justify-between z-40 bg-organic-dark/90 backdrop-blur-xl border-b border-white/5 lg:hidden">
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 group"
                    >
                        <Menu size={24} className="text-organic-green group-hover:scale-105 transition-transform" />
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5"
                    >
                        <ArrowLeft size={20} className="text-white" />
                    </button>
                </div>
            </header>

            <main className="flex-1 pb-24 lg:pb-8 overflow-y-auto overflow-x-hidden relative z-10 pt-20 lg:pt-0">
                <MobileNav />

                {/* Hero Section */}
                <div
                    className="relative h-72 md:h-96 w-full overflow-hidden cursor-pointer group"
                    onClick={() => setIsImageOpen(true)}
                >
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.8 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={subject.scheduleImage || 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80'}
                            alt={subject.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            style={{ filter: 'grayscale(100%)' }}
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-organic-dark via-organic-dark/60 to-transparent" />

                    {/* Zoom Hint */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/50 backdrop-blur-md p-3 rounded-full border border-white/10">
                            <Maximize2 className="text-white" size={20} />
                        </div>
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-16 max-w-6xl mx-auto w-full">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col md:flex-row md:items-end gap-6 mb-4"
                        >
                            <div className="text-7xl lg:text-9xl drop-shadow-2xl">
                                {subject.icon}
                            </div>
                            <div>
                                <h1 className="text-5xl lg:text-8xl font-black font-arabic text-white mb-2 tracking-tight drop-shadow-lg">
                                    {subject.name}
                                </h1>
                                <p className="text-xl lg:text-2xl text-organic-green font-arabic font-bold flex items-center gap-2">
                                    <Sparkles size={20} /> {subject.theme.scientist}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Control Bar */}
                <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-organic-gray border border-white/5 p-4 md:p-6 rounded-3xl shadow-xl flex flex-col md:flex-row gap-6 justify-between items-center"
                    >
                        {/* Search */}
                        <div className="relative w-full md:w-80">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pr-12 pl-6 outline-none focus:border-organic-green transition-all text-sm font-arabic text-white placeholder-gray-600 focus:bg-black/40"
                                placeholder="ابحثي في المهام..."
                                value={searchQuery}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Controls Group */}
                        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                            {/* Filter Toggles */}
                            <div className="flex bg-black/20 p-1 rounded-xl">
                                {[
                                    { id: 'all', label: 'الكل' },
                                    { id: 'completed', label: 'مكتمل' },
                                    { id: 'incomplete', label: 'مؤجل' }
                                ].map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setFilter(opt.id as any)}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === opt.id ? 'bg-organic-green text-organic-dark shadow-lg' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>

                            <div className="w-px h-8 bg-white/5 mx-2" />

                            {/* Sort */}
                            <button
                                onClick={() => setSort(s => s === 'default' ? 'title' : 'default')}
                                className={`p-3 rounded-xl border border-white/5 transition-all ${sort !== 'default' ? 'bg-organic-green/10 text-organic-green border-organic-green/20' : 'bg-black/20 text-gray-400 hover:text-white'}`}
                            >
                                <ArrowUpDown size={18} />
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="max-w-6xl mx-auto px-4 pb-20 space-y-12">
                    {/* Render Missions */}
                    {[
                        { label: 'المهام الأساسية', missions: subject.missions },
                        ...(subject.units?.map((u: any) => ({ label: u.name, missions: u.missions })) || []),
                        ...(subject.sections?.map((s: any) => ({ label: s.name, missions: s.missions })) || [])
                    ].map((section, idx) => {
                        const missions = section.missions ? processMissions(section.missions) : [];
                        if (missions.length === 0) return null;

                        return (
                            <section key={idx} className="animate-fade-in pl-4">
                                <h2 className="text-2xl font-black font-arabic mb-6 text-white flex items-center gap-4">
                                    <span className="w-2 h-8 bg-organic-green rounded-full" />
                                    {section.label}
                                    <span className="text-xs font-bold text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                        {missions.length}
                                    </span>
                                </h2>

                                <div className="flex overflow-x-auto gap-5 pb-8 no-scrollbar snap-x snap-mandatory -ml-4 pl-4 pr-4 md:pr-0">
                                    {missions.map((m, i) => (
                                        <div key={m.id} className="min-w-[320px] max-w-[320px] snap-center">
                                            <MissionItem
                                                mission={m}
                                                index={i}
                                                completed={!!completedMissions[m.id]}
                                                onToggle={() => handleToggleMission(m.id, m.title)}
                                                onViewDetails={() => openMissionModal(m)}
                                                accentColor={subject.theme.primary}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        );
                    })}

                    {/* Empty State */}
                    {processMissions(subject.missions || []).length === 0 && searchQuery && (
                        <div className="text-center py-20 bg-organic-gray rounded-[2rem] border border-dashed border-white/5">
                            <div className="text-5xl mb-6 opacity-50">🌪️</div>
                            <p className="text-gray-400 font-arabic text-xl">لا يوجد نتائج لهذا البحث</p>
                        </div>
                    )}
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

            {/* Image FullScreen Modal */}
            <AnimatePresence>
                {isImageOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
                        onClick={() => setIsImageOpen(false)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white hover:text-organic-pink transition-colors p-3 z-[210] bg-white/10 rounded-full"
                            onClick={(e) => { e.stopPropagation(); setIsImageOpen(false); }}
                        >
                            <X size={24} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.95, y: 10 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 10 }}
                            src={subject.scheduleImage || 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80'}
                            alt="Full View"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function MissionItem({ mission, index, completed, onToggle, onViewDetails }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="h-full"
        >
            <MissionCard
                mission={{ ...mission, completed }}
                onToggle={onToggle}
                onViewDetails={onViewDetails}
                accentColor="#00C853" // Defaulting to organic green for consistency
            />
        </motion.div>
    );
}
