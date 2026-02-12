'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';
import Sidebar from '@/components/Sidebar';
import RightPanel from '@/components/RightPanel';
import MobileNav from '@/components/MobileNav';
import { Save, Plus, Trash2, Edit3, Link as LinkIcon, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
    const { studyPlan, updateMission, updateSubject } = useStudyStore();
    const [selectedSubjectId, setSelectedSubjectId] = useState(studyPlan[0]?.id);
    const selectedSubject = studyPlan.find(s => s.id === selectedSubjectId);

    const handleUpdateMission = (missionId: string, field: string, value: string) => {
        if (!selectedSubjectId) return;
        updateMission(selectedSubjectId, missionId, { [field]: value });
        toast.success('تم الحفظ مؤقتاً 💾', { id: missionId });
    };

    return (
        <div className="flex min-h-screen bg-dark-bg">
            <Sidebar />

            <main className="flex-1 pb-24 lg:pb-8 overflow-y-auto">
                <MobileNav />

                <div className="max-w-6xl mx-auto p-4 lg:p-8">
                    <header className="mb-12">
                        <h1 className="text-4xl font-black font-arabic mb-2">لوحة التحكم السحرية ✨</h1>
                        <p className="text-gray-400 font-arabic italic text-lg">"عدل على خطتك كما تشاء، لأنك أنت القائد."</p>
                    </header>

                    {/* Subject Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
                        {studyPlan.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setSelectedSubjectId(s.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 border ${selectedSubjectId === s.id
                                        ? 'bg-accent-blue border-accent-blue text-white shadow-xl scale-105'
                                        : 'bg-dark-card border-white/5 text-gray-400 hover:border-white/20'
                                    }`}
                            >
                                <span className="text-xl">{s.icon}</span>
                                <span className="font-arabic font-bold">{s.name}</span>
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {selectedSubject && (
                            <motion.div
                                key={selectedSubject.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                {/* Subject Settings */}
                                <div className="bg-dark-card/50 p-6 rounded-3xl border border-white/10">
                                    <h2 className="text-xl font-bold mb-4 font-arabic text-accent-blue">إعدادات المادة العامة</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            className="bg-dark-bg border border-white/10 rounded-xl p-3 font-arabic"
                                            value={selectedSubject.theme.scientist}
                                            onChange={(e) => updateSubject(selectedSubject.id, { theme: { ...selectedSubject.theme, scientist: e.target.value } })}
                                            placeholder="اسم العالم الملهم..."
                                        />
                                        <input
                                            className="bg-dark-bg border border-white/10 rounded-xl p-3 font-arabic"
                                            value={selectedSubject.lessonDay || ''}
                                            onChange={(e) => updateSubject(selectedSubject.id, { lessonDay: e.target.value })}
                                            placeholder="يوم الدرس..."
                                        />
                                    </div>
                                </div>

                                {/* Missions List */}
                                <div className="space-y-4">
                                    <h2 className="text-xl font-bold mb-4 font-arabic">إدارة المهام</h2>

                                    {/* Subject Missions */}
                                    {selectedSubject.missions?.map((m) => (
                                        <MissionEditRow
                                            key={m.id}
                                            mission={m}
                                            onUpdate={(f, v) => handleUpdateMission(m.id, f, v)}
                                        />
                                    ))}

                                    {/* Units Missions */}
                                    {selectedSubject.units?.map((unit) => (
                                        <div key={unit.name} className="space-y-4 pt-6">
                                            <h3 className="text-lg font-bold font-arabic text-gray-500 border-r-4 border-accent-purple pr-4">{unit.name}</h3>
                                            {unit.missions.map((m) => (
                                                <MissionEditRow
                                                    key={m.id}
                                                    mission={m}
                                                    onUpdate={(f, v) => handleUpdateMission(m.id, f, v)}
                                                />
                                            ))}
                                        </div>
                                    ))}

                                    {/* Sections Missions */}
                                    {selectedSubject.sections?.map((section) => (
                                        <div key={section.name} className="space-y-4 pt-6">
                                            <h3 className="text-lg font-bold font-arabic text-gray-500 border-r-4 border-accent-gold pr-4">{section.name}</h3>
                                            {section.missions.map((m) => (
                                                <MissionEditRow
                                                    key={m.id}
                                                    mission={m}
                                                    onUpdate={(f, v) => handleUpdateMission(m.id, f, v)}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <RightPanel />
        </div>
    );
}

function MissionEditRow({ mission, onUpdate }: { mission: any, onUpdate: (f: string, v: string) => void }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-dark-card border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20">
            <div className="flex items-center gap-4 p-4">
                <div className="flex-1">
                    <input
                        className="w-full bg-transparent border-none text-lg font-bold font-arabic outline-none focus:text-accent-blue transition-colors"
                        value={mission.title}
                        onChange={(e) => onUpdate('title', e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-2 hover:bg-white/10 rounded-lg text-gray-500"
                    >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <button className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg">
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="border-t border-white/5 bg-black/20 p-4 space-y-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs text-gray-500 font-arabic">محتوى المهمة</label>
                                <textarea
                                    className="w-full bg-dark-bg border border-white/10 rounded-xl p-3 font-arabic text-sm h-24"
                                    value={mission.content}
                                    onChange={(e) => onUpdate('content', e.target.value)}
                                />
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 font-arabic">رابط NotebookLM</label>
                                    <div className="flex gap-2">
                                        <div className="p-3 bg-dark-bg border border-white/10 rounded-xl text-gray-500"><LinkIcon size={16} /></div>
                                        <input
                                            className="flex-1 bg-dark-bg border border-white/10 rounded-xl p-3 text-sm"
                                            value={mission.links?.notebook || ''}
                                            onChange={(e) => onUpdate('links', JSON.stringify({ ...mission.links, notebook: e.target.value }))}
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-gray-500 font-arabic">رابط الأسئلة</label>
                                    <div className="flex gap-2">
                                        <div className="p-3 bg-dark-bg border border-white/10 rounded-xl text-gray-500"><LinkIcon size={16} /></div>
                                        <input
                                            className="flex-1 bg-dark-bg border border-white/10 rounded-xl p-3 text-sm"
                                            value={mission.links?.questions || ''}
                                            onChange={(e) => onUpdate('links', JSON.stringify({ ...mission.links, questions: e.target.value }))}
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] text-gray-500 font-arabic">المدة</label>
                                <input
                                    className="w-full bg-dark-bg border border-white/10 rounded-lg p-2 text-xs"
                                    value={mission.duration}
                                    onChange={(e) => onUpdate('duration', e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] text-gray-500 font-arabic">الطريقة</label>
                                <input
                                    className="w-full bg-dark-bg border border-white/10 rounded-lg p-2 text-xs font-arabic"
                                    value={mission.method}
                                    onChange={(e) => onUpdate('method', e.target.value)}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
