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
        { emoji: '😤', label: 'غضب' },
        { emoji: '😔', label: 'حزن' },
    ];

    const handleSubmit = () => {
        if (!text.trim()) return;
        addVent(text, mood);
        setText('');
        toast.success('طلعي اللي في قلبك.. ارتاحي دلوقتي 🤍', {
            style: { background: '#121212', color: '#fff', border: '1px solid #00C853' }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 max-w-3xl mx-auto"
        >
            <div className="bg-organic-gray p-8 rounded-[3rem] border border-white/5 mb-10 overflow-hidden relative group shadow-2xl">
                {/* Organic Background Blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-organic-green/5 rounded-full blur-[80px] animate-pulse-slow" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-organic-pink/5 rounded-full blur-[80px] animate-pulse-slow delay-1000" />

                <div className="relative z-10 flex flex-col items-center text-center mb-8">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                        <Sparkles className="text-organic-green w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-black font-arabic text-white mb-2">
                        مساحة للهدوء 🍃
                    </h1>
                    <p className="text-organic-beige font-arabic text-lg max-w-lg opacity-80 leading-relaxed">
                        "المكان ده سرنا، لو زهقتي أو اتخنقتي.. اكتبي كل اللي جواكي هنا ومحدش هيشوفه غيرك."
                    </p>
                </div>

                <div className="space-y-6 relative z-10">
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                        {moods.map((m) => (
                            <button
                                key={m.label}
                                onClick={() => setMood(`${m.label} ${m.emoji}`)}
                                className={`p-3 rounded-2xl flex flex-col items-center gap-2 transition-all border duration-300
                                    ${mood.includes(m.label)
                                        ? 'bg-organic-green/20 border-organic-green per text-white scale-105 shadow-lg shadow-organic-green/10'
                                        : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10 hover:border-white/10 hover:scale-105'
                                    }`}
                            >
                                <span className="text-2xl filter drop-shadow-lg">{m.emoji}</span>
                                <span className="text-[10px] font-bold font-arabic">{m.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="relative">
                        <textarea
                            className="w-full h-48 bg-black/20 border border-white/10 rounded-[2rem] p-6 font-arabic outline-none focus:border-organic-green/50 transition-all resize-none shadow-inner text-white placeholder-gray-600 focus:bg-black/40"
                            placeholder="اتكلمي.. قولي أي حاجة.."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <div className="absolute bottom-4 left-4 text-xs text-gray-600 font-english">
                            {text.length} chars
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!text.trim()}
                        className="w-full py-4 bg-organic-green text-organic-dark rounded-[2rem] font-black font-arabic flex items-center justify-center gap-3 shadow-xl shadow-organic-green/20 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={20} />
                        <span>تفريغ المشاعر</span>
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2 px-4 mb-6">
                    <Brain className="text-organic-pink w-5 h-5" />
                    <h3 className="text-lg font-bold font-arabic text-gray-400">أخر الفضفضات</h3>
                </div>

                <AnimatePresence mode="popLayout">
                    {ventLogs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            layout
                            className="bg-organic-gray border border-white/5 p-6 rounded-[2rem] shadow-sm hover:border-white/10 transition-colors group"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-organic-beige font-bold font-arabic border border-white/5">
                                    {log.mood}
                                </span>
                                <span className="text-[10px] text-gray-600 font-english bg-black/20 px-2 py-1 rounded-full">
                                    {new Date(log.createdAt).toLocaleDateString('en-US', { weekday: 'short', hour: 'numeric', minute: 'numeric' })}
                                </span>
                            </div>
                            <p className="text-gray-300 font-arabic leading-relaxed whitespace-pre-wrap">{log.text}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {ventLogs.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Cloud className="w-10 h-10 text-gray-600" />
                        </div>
                        <p className="font-arabic text-gray-500 text-lg">مفيش وجع قلب لغاية دلوقتي.. يا رب دايماً! 🤲</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
