'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';
import { Plus, Check, Circle } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function WishesPage() {
    const { wishes, fetchWishes, addWish, toggleWish } = useStudyStore();
    const [newWish, setNewWish] = useState('');

    useEffect(() => {
        fetchWishes();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newWish.trim()) return;

        // Use current week start date (approx) or just today
        const today = new Date().toISOString();
        await addWish(newWish, today);
        setNewWish('');
    };

    return (
        <div className="min-h-screen bg-organic-dark p-6 pb-24 font-arabic">
            <header className="mb-8 pt-12">
                <h1 className="text-4xl font-bold text-organic-green mb-2">أمنيات الأسبوع</h1>
                <p className="text-organic-border">ما الذي تريد تحقيقه هذا الأسبوع؟</p>
            </header>

            <div className="space-y-6 max-w-2xl mx-auto">
                {/* Input */}
                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        value={newWish}
                        onChange={(e) => setNewWish(e.target.value)}
                        placeholder="أضف هدفاً جديداً..."
                        className="w-full bg-organic-gray/50 border border-organic-border rounded-xl px-4 py-4 pl-12 text-organic-beige focus:border-organic-green focus:outline-none transition-all"
                    />
                    <button
                        type="submit"
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-organic-green/20 rounded-lg text-organic-green hover:bg-organic-green hover:text-black transition-all"
                    >
                        <Plus size={20} />
                    </button>
                </form>

                {/* List */}
                <div className="space-y-3">
                    {wishes.map((wish) => (
                        <motion.div
                            key={wish.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`group flex items-center gap-4 p-4 rounded-xl border transition-all ${wish.completed
                                    ? 'bg-organic-green/5 border-organic-green/20'
                                    : 'bg-organic-gray/20 border-organic-border/50'
                                }`}
                        >
                            <button
                                onClick={() => toggleWish(wish.id, wish.completed)}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${wish.completed
                                        ? 'bg-organic-green border-organic-green text-black'
                                        : 'border-organic-border group-hover:border-organic-green'
                                    }`}
                            >
                                {wish.completed && <Check size={14} />}
                            </button>
                            <span className={`text-lg transition-all ${wish.completed ? 'text-organic-green line-through opacity-50' : 'text-organic-beige'
                                }`}>
                                {wish.title}
                            </span>
                        </motion.div>
                    ))}

                    {wishes.length === 0 && (
                        <div className="text-center text-organic-border/50 py-12">
                            لا توجد أمنيات بعد.. ابدأ بإضافة واحدة!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
