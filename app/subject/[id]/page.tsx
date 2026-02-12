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
import { ArrowLeft, Search, Filter, Sparkles, BookOpen, Maximize2, X, Menu } from 'lucide-react';
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

    if (!mounted) return <div className="min-h-screen bg-cine-dark" />;

    if (!subject) {
        return (
            <div className="flex items-center justify-center h-screen bg-cine-dark">
                <div className="text-center p-12 bg-cine-card rounded-3xl border border-white/10">
                    <div className="text-6xl mb-6">🔍</div>
                    <h2 className="text-2xl font-black font-arabic mb-4 text-white">المادة غير موجودة</h2>
                    <button onClick={() => router.push('/')} className="px-6 py-3 bg-cine-accent text-cine-dark rounded-xl font-bold shadow-lg shadow-cine-accent/20">العودة للرئيسية</button>
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
            toast.success(`أحسنتِ يا هندسة: ${missionTitle}`, {
                icon: '🔥',
                style: {
                    borderRadius: '20px',
                    background: '#111',
                    color: '#fff',
                    border: '1px solid #38bdf8'
                }
            });
        }
    };

    const openMissionModal = (mission: Mission) => {
        setSelectedMission(mission);
        setIsModalOpen(true);
    };

    const FilterButton = ({ value, label, icon: Icon }: any) => (
        <button
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all ${filter === value
                ? 'bg-cine-accent text-cine-dark font-black shadow-lg shadow-cine-accent/20'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
        >
            <Icon size={14} />
            <span className="font-arabic">{label}</span>
        </button>
    );

    const SortButton = ({ value, label, icon: Icon }: any) => (
        <button
            onClick={() => setSort(value)}
            className={`px-4 py-2 rounded-xl text-sm flex items-center gap-2 transition-all ${sort === value
                ? 'bg-cine-accent text-cine-dark font-black shadow-lg shadow-cine-accent/20'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
        >
            <Icon size={14} />
            <span className="font-arabic">{label}</span>
        </button>
    );

    return (
        <div className="flex min-h-screen bg-cine-dark relative overflow-hidden selection:bg-cine-accent selection:text-cine-dark">
            <div className="fixed inset-0 bg-cosmic-mesh animate-mesh opacity-40 pointer-events-none" />

            <Sidebar />

            <header className="fixed top-0 left-0 right-0 h-20 px-6 flex items-center justify-between z-40 bg-zinc-950/50 backdrop-blur-xl border-b border-white/5 lg:hidden">
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 group"
                    >
                        <Menu size={24} className="text-cine-accent group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={() => router.push('/')}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10"
                    >
                        <ArrowLeft size={20} className="text-white" />
                    </button>
                </div>
            </header>

            <main className="flex-1 pb-24 lg:pb-8 overflow-y-auto overflow-x-hidden relative z-10 pt-20 lg:pt-0">
                <MobileNav />

                {/* Cinematic Hero */}
                <div
                    className="relative h-72 md:h-96 w-full overflow-hidden shadow-2xl cursor-pointer group"
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
                        />
                    </motion.div>
                    <div className={`absolute inset-0 bg-gradient-to-t from-cine-dark via-cine-dark/10 to-transparent`} />

                    {/* Zoom Hint */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-cine-dark/60 backdrop-blur-xl p-5 rounded-full border border-white/20 scale-90 group-hover:scale-100 transition-transform">
                            <Maximize2 className="text-cine-accent" size={32} />
                        </div>
                    </div>

                    <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-16 max-w-6xl mx-auto w-full">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-6 mb-4"
                        >
                            <div className="text-7xl lg:text-9xl drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] animate-float">
                                {subject.icon}
                            </div>
                            <div>
                                <h1 className="text-5xl lg:text-8xl font-black font-arabic text-white mb-2 tracking-tight drop-shadow-xl">
                                    {subject.name}
                                </h1>
                                <p className="text-xl lg:text-2xl text-cine-accent font-arabic font-bold flex items-center gap-2">
                                    <Sparkles size={20} className="animate-pulse" /> {subject.theme.scientist}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Control Bar */}
                <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-20 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-cine-card/90 backdrop-blur-2xl border border-white/10 p-4 md:p-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-6 justify-between items-center"
                    >
                        {/* Search */}
                        <div className="relative w-full md:w-64">
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input
                                className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pr-12 pl-6 outline-none focus:border-cine-accent transition-all text-sm font-arabic"
                                placeholder="ابحثِ عن مهمة..."
                                value={searchQuery}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="hidden md:block w-px h-12 bg-white/10" />

                        {/* Filters */}
                        <div className="flex gap-2 bg-black/30 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto">
                            <FilterButton value="all" label="الكل" icon={Sparkles} />
                            <FilterButton value="completed" label="تم" icon={Sparkles} />
                            <FilterButton value="incomplete" label="باقي" icon={Sparkles} />
                        </div>

                        <div className="hidden md:block w-px h-12 bg-white/10" />

                        {/* Sort */}
                        <div className="flex gap-2 bg-black/30 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto">
                            <SortButton value="default" label="افتراضي" icon={Sparkles} />
                            <SortButton value="title" label="الأبجدي" icon={Sparkles} />
                        </div>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="max-w-5xl mx-auto px-4 pb-20 space-y-16">
                    {/* Render Missions */}
                    {[
                        { label: 'مهام المواد', missions: subject.missions },
                        ...(subject.units?.map((u: any, idx: number) => ({ label: u.name, missions: u.missions })) || []),
                        ...(subject.sections?.map((s: any, idx: number) => ({ label: s.name, missions: s.missions })) || [])
                    ].map((section, idx) => {
                        const missions = section.missions ? processMissions(section.missions) : [];
                        if (missions.length === 0) return null;

                        return (
                            <section key={idx} className="animate-fade-in px-2">
                                <h2 className="text-2xl font-black font-arabic mb-8 text-white flex items-center gap-4">
                                    <span className="w-3 h-10 bg-gradient-to-t from-cine-accent to-cine-blue rounded-full" />
                                    {section.label}
                                    <span className="text-xs font-bold text-gray-500 bg-white/5 px-4 py-1.5 rounded-full">
                                        {missions.length} مهمة
                                    </span>
                                </h2>
                                <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory">
                                    {missions.map((m, i) => (
                                        <div key={m.id} className="min-w-[300px] snap-center">
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
                        <div className="text-center py-20 bg-cine-card rounded-[3rem] border border-dashed border-white/10">
                            <div className="text-6xl mb-6">🏜️</div>
                            <p className="text-gray-400 font-arabic text-xl">مالقيتش حاجة بالاسم ده يا هندسة!</p>
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
                        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12"
                        onClick={() => setIsImageOpen(false)}
                    >
                        <button
                            className="absolute top-8 right-8 text-white hover:text-cine-pink transition-colors p-4 z-[210] bg-white/5 rounded-full"
                            onClick={(e) => { e.stopPropagation(); setIsImageOpen(false); }}
                        >
                            <X size={32} />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            src={subject.scheduleImage || 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80'}
                            alt="Full View"
                            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
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
