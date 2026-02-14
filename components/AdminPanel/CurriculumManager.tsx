'use client';

import { useState } from 'react';
import { useStudyStore } from '@/store/useStudyStore';
import { Plus, Trash, BookOpen, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CurriculumManager() {
    const { subjects, createSubject, createUnit, createMission, deleteItem } = useStudyStore();
    const [newItem, setNewItem] = useState({ type: 'subject', parentId: '', title: '' });
    const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

    const handleCreate = async () => {
        if (!newItem.title) return;

        if (newItem.type === 'subject') {
            await createSubject(newItem.title, 'Flexible', '📚');
        } else if (newItem.type === 'unit') {
            await createUnit(newItem.parentId, newItem.title, 99);
        } else if (newItem.type === 'mission') {
            await createMission({
                subject_id: newItem.parentId.split('|')[0],
                unit_id: newItem.parentId.split('|')[1],
                title: newItem.title,
                status: 'pending',
                type: 'study'
            });
        }
        setNewItem({ ...newItem, title: '' });
    };

    return (
        <div className="p-6 bg-organic-dark rounded-3xl border border-white/5 shadow-2xl">
            <h2 className="text-2xl font-bold font-arabic mb-6 text-white flex items-center gap-2">
                <BookOpen className="text-organic-green" />
                إدارة المنهج (Admin)
            </h2>

            {/* Creation Form */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 bg-black/20 p-4 rounded-xl border border-white/5">
                <select
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                    className="bg-organic-gray text-white p-2 rounded-lg border border-white/10 outline-none"
                >
                    <option value="subject">New Subject</option>
                    <option value="unit">New Unit</option>
                    <option value="mission">New Mission</option>
                </select>

                {newItem.type !== 'subject' && (
                    <select
                        value={newItem.parentId}
                        onChange={(e) => setNewItem({ ...newItem, parentId: e.target.value })}
                        className="bg-organic-gray text-white p-2 rounded-lg border border-white/10 outline-none"
                    >
                        <option value="">Select Parent...</option>
                        {subjects.map(sub => (
                            <>
                                {newItem.type === 'unit' && <option key={sub.id} value={sub.id}>{sub.name}</option>}
                                {newItem.type === 'mission' && sub.units.map(u => (
                                    <option key={u.id} value={`${sub.id}|${u.id}`}>{sub.name} &gt; {u.title}</option>
                                ))}
                            </>
                        ))}
                    </select>
                )}

                <input
                    type="text"
                    placeholder="Title..."
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="flex-1 bg-organic-gray text-white p-2 rounded-lg border border-white/10 outline-none placeholder:text-gray-600"
                />

                <button
                    onClick={handleCreate}
                    className="bg-organic-green text-black px-6 py-2 rounded-lg font-bold hover:bg-green-400 transition-colors"
                >
                    <Plus size={20} />
                </button>
            </div>

            {/* Tree View */}
            <div className="space-y-4">
                {subjects.map(subject => (
                    <div key={subject.id} className="border border-white/5 rounded-xl overflow-hidden">
                        <div
                            className="flex items-center justify-between p-4 bg-white/5 cursor-pointer hover:bg-white/10"
                            onClick={() => setExpandedSubject(expandedSubject === subject.id ? null : subject.id)}
                        >
                            <span className="font-bold text-lg text-organic-beige">{subject.name}</span>
                            <div className="flex items-center gap-3">
                                <button onClick={(e) => { e.stopPropagation(); deleteItem('subjects', subject.id); }} className="text-red-500 hover:text-red-400"><Trash size={16} /></button>
                                {expandedSubject === subject.id ? <ChevronDown /> : <ChevronRight />}
                            </div>
                        </div>

                        <AnimatePresence>
                            {expandedSubject === subject.id && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    className="bg-black/20"
                                >
                                    {subject.units?.map(unit => (
                                        <div key={unit.id} className="p-4 pl-8 border-t border-white/5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-organic-green font-bold text-sm">{unit.title}</span>
                                                <button onClick={() => deleteItem('units', unit.id)} className="text-red-500 hover:text-red-400"><Trash size={14} /></button>
                                            </div>

                                            <div className="pl-4 space-y-2 border-l border-white/10">
                                                {subject.missions.filter(m => m.unit_id === unit.id).map(mission => (
                                                    <div key={mission.id} className="flex items-center justify-between text-sm text-gray-400 hover:text-white group">
                                                        <span>{mission.title}</span>
                                                        <button onClick={() => deleteItem('missions', mission.id)} className="opacity-0 group-hover:opacity-100 text-red-500 transition-opacity"><Trash size={12} /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
