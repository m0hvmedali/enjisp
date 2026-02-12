'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';
import { Heart, Plus, Trash2, CheckCircle2, Trophy } from 'lucide-react';

export default function WishesTab() {
    const { wishes, addWish, toggleWish } = useStudyStore();
    const [newWish, setNewWish] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newWish.trim()) return;
        addWish(newWish);
        setNewWish('');
    };

    const completedCount = wishes.filter(w => w.completed).length;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 max-w-2xl mx-auto"
        >
            <div className="text-center mb-12">
                <div className="w-20 h-20 bg-accent-pink/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent-pink/30 animate-float">
                    <Heart className="text-accent-pink w-10 h-10 fill-accent-pink/20" />
                </div>
                <h1 className="text-3xl font-black font-arabic mb-2">أماني الإسبوع ✨</h1>
                <p className="text-gray-400 font-arabic italic">"كل هدف بتكتبه هنا، هو خطوة لروحك قبل عقلك."</p>
            </div>

            {/* Progress Bar */}
            <div className="bg-dark-card/50 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl mb-8 relative overflow-hidden">
                <motion.div
                    animate={{
                        opacity: [0.05, 0.1, 0.05],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute inset-0 bg-accent-pink rounded-full blur-[60px] pointer-events-none translate-y-1/2"
                />
                <div className="flex justify-between items-center mb-4 relative z-10">
                    <span className="font-arabic font-bold text-sm text-gray-400">الإنجاز الإسبوعي</span>
                    <span className="font-english font-bold text-accent-pink">{completedCount}/{wishes.length}</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden relative z-10">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{
                            width: `${(completedCount / (wishes.length || 1)) * 100}%`,
                            backgroundColor: ['#ec4899', '#9333ea', '#ec4899']
                        }}
                        transition={{
                            width: { duration: 1 },
                            backgroundColor: { duration: 5, repeat: Infinity }
                        }}
                        className="h-full shadow-[0_0_20px_rgba(236,72,153,0.6)]"
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="relative mb-8 group">
                <input
                    className="w-full bg-dark-card border border-white/5 rounded-[2rem] py-5 px-8 outline-none focus:border-accent-pink transition-all font-arabic text-lg pr-16 shadow-xl"
                    placeholder="نفسك تحقق إيه الإسبوع ده؟"
                    value={newWish}
                    onChange={(e) => setNewWish(e.target.value)}
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-accent-pink rounded-2xl flex items-center justify-center text-white shadow-lg shadow-accent-pink/20 hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus />
                </button>
            </form>

            <div className="space-y-4">
                <AnimatePresence>
                    {wishes.map((wish) => (
                        <motion.div
                            key={wish.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className={`p-6 rounded-[2rem] border transition-all ${wish.completed ? 'bg-accent-pink/10 border-accent-pink/30 opacity-60' : 'bg-dark-card border-white/5'}`}
                        >
                            <div className="flex justify-between items-center">
                                <span className={`font-arabic text-lg ${wish.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                                    {wish.text}
                                </span>
                                <button
                                    onClick={() => toggleWish(wish.id)}
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${wish.completed ? 'bg-accent-pink text-white rotate-[360deg]' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
                                >
                                    <CheckCircle2 size={24} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {wishes.length === 0 && (
                    <div className="text-center py-12 text-gray-600 font-arabic italic border-2 border-dashed border-white/5 rounded-[2.5rem]">
                        لسه مفيش أماني.. اكتب أول حلم ليك فوق ☝️
                    </div>
                )}
            </div>
        </motion.div>
    );
}
