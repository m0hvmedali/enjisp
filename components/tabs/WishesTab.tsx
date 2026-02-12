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
                <div className="w-20 h-20 bg-organic-pink/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-organic-pink/20 animate-float">
                    <Heart className="text-organic-pink w-10 h-10 fill-organic-pink/20" />
                </div>
                <h1 className="text-3xl font-black font-arabic mb-2 text-white">أماني الإسبوع ✨</h1>
                <p className="text-organic-beige font-arabic italic opacity-80">"كل هدف بتكتبه هنا، هو خطوة لروحك قبل عقلك."</p>
            </div>

            {/* Progress Bar */}
            <div className="bg-organic-gray backdrop-blur-2xl border border-white/5 p-6 rounded-[2.5rem] mb-8 relative overflow-hidden shadow-xl">
                <motion.div
                    animate={{
                        opacity: [0.05, 0.1, 0.05],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute inset-0 bg-organic-pink rounded-full blur-[60px] pointer-events-none translate-y-1/2"
                />
                <div className="flex justify-between items-center mb-4 relative z-10">
                    <span className="font-arabic font-bold text-sm text-gray-400">الإنجاز الإسبوعي</span>
                    <span className="font-english font-bold text-organic-pink">{completedCount}/{wishes.length}</span>
                </div>
                <div className="h-4 bg-black/40 rounded-full overflow-hidden relative z-10 border border-white/5">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{
                            width: `${(completedCount / (wishes.length || 1)) * 100}%`,
                        }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-organic-pink to-organic-beige shadow-[0_0_20px_rgba(255,46,99,0.4)]"
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="relative mb-8 group">
                <input
                    className="w-full bg-black/20 border border-white/10 rounded-[2rem] py-5 px-8 outline-none focus:border-organic-pink/50 transition-all font-arabic text-lg pr-16 shadow-xl text-white placeholder-gray-600 focus:bg-black/40"
                    placeholder="نفسك تحقق إيه الإسبوع ده؟"
                    value={newWish}
                    onChange={(e) => setNewWish(e.target.value)}
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-organic-pink rounded-2xl flex items-center justify-center text-organic-dark shadow-lg shadow-organic-pink/20 hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus />
                </button>
            </form>

            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {wishes.map((wish) => (
                        <motion.div
                            key={wish.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            layout
                            className={`p-6 rounded-[2rem] border transition-all duration-300 group ${wish.completed ? 'bg-organic-pink/5 border-organic-pink/10 opacity-60' : 'bg-organic-gray border-white/5 hover:border-white/10'}`}
                        >
                            <div className="flex justify-between items-center">
                                <span className={`font-arabic text-lg transition-colors ${wish.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                                    {wish.text}
                                </span>
                                <button
                                    onClick={() => toggleWish(wish.id)}
                                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${wish.completed ? 'bg-organic-pink text-organic-dark rotate-[360deg]' : 'bg-white/5 text-gray-500 hover:bg-white/10 group-hover:bg-white/10'}`}
                                >
                                    {wish.completed ? <CheckCircle2 size={24} /> : <div className="w-6 h-6 rounded-full border-2 border-gray-600 group-hover:border-organic-pink/50 transition-colors" />}
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
