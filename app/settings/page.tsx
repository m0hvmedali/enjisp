'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';
import Sidebar from '@/components/Sidebar';
import RightPanel from '@/components/RightPanel';
import MobileNav from '@/components/MobileNav';
import { Save, Plus, Trash2, Edit3, Link as LinkIcon, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import CloudSyncControls from '@/components/CloudSyncControls';

export default function SettingsPage() {
    const { studyPlan, updateMission, updateSubject } = useStudyStore();
    const [selectedSubjectId, setSelectedSubjectId] = useState(studyPlan[0]?.id);
    const selectedSubject = studyPlan.find(s => s.id === selectedSubjectId);

    const handleUpdateMission = (missionId: string, field: string, value: any) => {
        if (!selectedSubjectId) return;
        updateMission(selectedSubjectId, missionId, { [field]: value });
        toast.success('تم الحفظ 💾', { id: missionId, style: { background: '#121212', color: '#fff', border: '1px solid #00C853' } });
    };

    return (
        <div className="flex min-h-screen bg-organic-dark selection:bg-organic-green selection:text-organic-dark">
            <Sidebar />

            <main className="flex-1 pb-24 lg:pb-8 overflow-y-auto">
                <MobileNav />

                <div className="max-w-6xl mx-auto p-4 lg:p-8">
                    <header className="mb-12 flex flex-col md:flex-row justify-between items-start gap-6">
                        <div>
                            <h1 className="text-4xl font-black font-arabic mb-2 text-white flex items-center gap-3">
                                <span className="text-organic-green">✨</span> لوحة التحكم
                            </h1>
                            <p className="text-gray-400 font-arabic text-lg">تحكم في خطتك، ومزامنة بياناتك.</p>
                        </div>
                        <div className="w-full md:w-auto">
                            <CloudSyncControls />
                        </div>
                    </header>

                    {/* Subject Tabs */}
                    <div className="flex gap-3 overflow-x-auto pb-6 mb-8 no-scrollbar snap-x">
                        {studyPlan.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setSelectedSubjectId(s.id)}
                                className={`flex items-center gap-3 px-6 py-4 rounded-[2rem] whitespace-nowrap transition-all duration-300 border snap-center
                                    ${selectedSubjectId === s.id
                                        ? 'bg-organic-green text-organic-dark font-black shadow-lg shadow-organic-green/20 scale-105'
                                        : 'bg-organic-gray border-white/5 text-gray-500 hover:bg-white/5 hover:border-white/10'
                                    }`}
                            >
                                <span className="text-2xl filter drop-shadow-md">{s.icon}</span>
                                <span className="font-arabic text-sm">{s.name}</span>
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
                                className="space-y-8"
                            >
                                {/* Subject Settings */}
                                <div className="bg-organic-gray p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-organic-green/5 rounded-full blur-[50px]" />
                                    <h2 className="text-xl font-black mb-6 font-arabic text-white flex items-center gap-2">
                                        <Edit3 size={20} className="text-organic-green" />
                                        إعدادات المادة
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 font-arabic pr-2">اسم العالم / اللقب</label>
                                            <input
                                                className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 font-arabic text-white focus:border-organic-green/50 outline-none transition-all placeholder-gray-700"
                                                value={selectedSubject.theme.scientist}
                                                onChange={(e) => updateSubject(selectedSubject.id, { theme: { ...selectedSubject.theme, scientist: e.target.value } })}
                                                placeholder="مثال: نيوتن، زويل..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-500 font-arabic pr-2">يوم الدرس</label>
                                            <input
                                                className="w-full bg-black/20 border border-white/5 rounded-2xl p-4 font-arabic text-white focus:border-organic-green/50 outline-none transition-all placeholder-gray-700"
                                                value={selectedSubject.lessonDay || ''}
                                                onChange={(e) => updateSubject(selectedSubject.id, { lessonDay: e.target.value })}
                                                placeholder="مثال: السبت"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Missions List */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between px-2">
                                        <h2 className="text-xl font-black font-arabic text-white">إدارة المهام</h2>
                                        <div className="px-3 py-1 bg-white/5 rounded-full text-xs font-bold text-gray-500">
                                            {selectedSubject.missions?.length || 0} مهمة
                                        </div>
                                    </div>

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
                                        <div key={unit.name} className="space-y-4 pt-4">
                                            <div className="flex items-center gap-4">
                                                <h3 className="text-lg font-black font-arabic text-organic-beige">{unit.name}</h3>
                                                <div className="h-px bg-white/5 flex-1" />
                                            </div>
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
                                        <div key={section.name} className="space-y-4 pt-4">
                                            <div className="flex items-center gap-4">
                                                <h3 className="text-lg font-black font-arabic text-organic-beige">{section.name}</h3>
                                                <div className="h-px bg-white/5 flex-1" />
                                            </div>
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
        <div className="bg-organic-gray border border-white/5 rounded-[1.5rem] overflow-hidden transition-all duration-300 hover:border-organic-green/30 group">
            <div className="flex items-center gap-4 p-5">
                <div className="flex-1">
                    <input
                        className="w-full bg-transparent border-none text-base font-bold font-arabic outline-none text-gray-200 focus:text-organic-green transition-colors placeholder-gray-700"
                        value={mission.title}
                        onChange={(e) => onUpdate('title', e.target.value)}
                        placeholder="عنوان المهمة..."
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`p-2 rounded-xl transition-all ${isExpanded ? 'bg-organic-green text-organic-dark' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                    >
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {/* Add delete button functionality if needed */}
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/5 bg-black/20 p-6 space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 font-bold font-arabic uppercase tracking-wider">محتوى المهمة</label>
                                <textarea
                                    className="w-full bg-organic-dark border border-white/5 rounded-2xl p-4 font-arabic text-sm h-32 focus:border-organic-green/50 outline-none transition-all text-gray-300 resize-none"
                                    value={mission.content}
                                    onChange={(e) => onUpdate('content', e.target.value)}
                                    placeholder="وصف تفصيلي للمهمة..."
                                />
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 font-bold font-arabic uppercase tracking-wider">رابط الشرح (NotebookLM)</label>
                                    <div className="flex gap-2">
                                        <div className="p-3 bg-organic-dark border border-white/5 rounded-2xl text-gray-500"><LinkIcon size={16} /></div>
                                        <input
                                            className="flex-1 bg-organic-dark border border-white/5 rounded-2xl p-3 text-sm focus:border-organic-green/50 outline-none transition-all text-gray-300 font-english"
                                            value={mission.links?.notebook || ''}
                                            onChange={(e) => onUpdate('links', { ...mission.links, notebook: e.target.value })}
                                            placeholder="https://notebooklm.google..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-gray-500 font-bold font-arabic uppercase tracking-wider">رابط الأسئلة</label>
                                    <div className="flex gap-2">
                                        <div className="p-3 bg-organic-dark border border-white/5 rounded-2xl text-gray-500"><LinkIcon size={16} /></div>
                                        <input
                                            className="flex-1 bg-organic-dark border border-white/5 rounded-2xl p-3 text-sm focus:border-organic-green/50 outline-none transition-all text-gray-300 font-english"
                                            value={mission.links?.questions || ''}
                                            onChange={(e) => onUpdate('links', { ...mission.links, questions: e.target.value })}
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-white/5">
                            <div className="space-y-1">
                                <label className="text-[10px] text-gray-500 font-bold font-arabic">المدة (دقيقة)</label>
                                <input
                                    className="w-full bg-organic-dark border border-white/5 rounded-xl p-3 text-sm font-english focus:border-organic-green/50 outline-none transition-all text-white text-center"
                                    value={mission.duration}
                                    onChange={(e) => onUpdate('duration', e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] text-gray-500 font-bold font-arabic">النوع</label>
                                <input
                                    className="w-full bg-organic-dark border border-white/5 rounded-xl p-3 text-sm font-arabic focus:border-organic-green/50 outline-none transition-all text-white text-center"
                                    value={mission.method}
                                    onChange={(e) => onUpdate('method', e.target.value)}
                                    placeholder="مذاكرة / فيديو"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
