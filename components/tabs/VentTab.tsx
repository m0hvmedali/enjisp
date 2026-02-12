'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';
import { MessageSquare, Send, Sparkles, Brain, Cloud } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VentTab() {
    const { addVent, ventLogs } = useStudyStore();
    const [text, setText] = useState('');
    const [mood, setMood] = useState('خنقة 🤯');

    const moods = [
        { emoji: '🤯', label: 'خنقة' },
        { emoji: '😭', label: 'تعب' },
        { emoji: '😑', label: 'ملل' },
        { emoji: '🫠', label: 'تلاشي' },
    ];

    const handleSubmit = () => {
        if (!text.trim()) return;
        addVent(text, mood);
        setText('');
        toast.success('طلعي اللي في قلبك.. ارتاحي دلوقتي 🤍', {
            style: { background: '#1e293b', color: '#fff', borderRadius: '20px' }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 max-w-2xl mx-auto"
        >
            <div className="bg-gradient-to-br from-dark-card to-black p-8 rounded-[3rem] border border-white/10 mb-10 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/10 rounded-full blur-[50px] animate-pulse" />

                <h1 className="text-3xl font-black font-arabic mb-4 text-white relative z-10 flex items-center gap-3">
                    <MessageSquare className="text-accent-blue" /> فرغي قلبك.. 🤍
                </h1>
                <p className="text-gray-400 font-arabic mb-8 text-lg relative z-10">
                    "المكان ده سرنا، لو زهقتي أو اتخنقتي.. اكتبي كل اللي جواكي هنا ومحدش هيشوفه غيرك."
                </p>

                <div className="space-y-6 relative z-10">
                    <div className="flex gap-2">
                        {moods.map((m) => (
                            <button
                                key={m.label}
                                onClick={() => setMood(`${m.label} ${m.emoji}`)}
                                className={`flex-1 p-3 rounded-2xl flex flex-col items-center gap-1 transition-all border ${mood.includes(m.label) ? 'bg-accent-blue/20 border-accent-blue text-white shadow-lg' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}
                            >
                                <span className="text-2xl">{m.emoji}</span>
                                <span className="text-[10px] font-arabic">{m.label}</span>
                            </button>
                        ))}
                    </div>

                    <textarea
                        className="w-full h-40 bg-dark-bg border border-white/10 rounded-[2rem] p-6 font-arabic outline-none focus:border-accent-blue transition-all resize-none shadow-inner"
                        placeholder="اتكلمي.. قولي أي حاجة.."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <button
                        onClick={handleSubmit}
                        className="w-full py-4 bg-accent-blue rounded-[2rem] font-bold font-arabic flex items-center justify-center gap-3 shadow-xl shadow-accent-blue/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        <Send size={18} />
                        تفريغ المشاعر 📤
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold font-arabic text-gray-600 px-4">أخر الفضفضات 📝</h3>
                <AnimatePresence>
                    {ventLogs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-dark-card border border-white/5 p-6 rounded-[2rem] shadow-sm"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-accent-blue font-bold font-arabic">
                                    {log.mood}
                                </span>
                                <span className="text-[10px] text-gray-600 font-english">
                                    {new Date(log.createdAt).toLocaleTimeString('ar-EG')}
                                </span>
                            </div>
                            <p className="text-gray-300 font-arabic leading-relaxed">{log.text}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {ventLogs.length === 0 && (
                    <div className="bg-white/5 p-10 rounded-[2.5rem] text-center border-2 border-dashed border-white/5">
                        <Brain className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                        <p className="font-arabic text-gray-700 italic">مفيش وجع قلب لغاية دلوقتي.. يا رب دايماً!</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
