'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Quote, RefreshCw } from 'lucide-react';
import { getDailyWisdom } from '@/app/actions/ai';

interface WisdomData {
    content: string;
    source: string;
    category: string;
}

export default function WisdomBanner() {
    const [wisdom, setWisdom] = useState<WisdomData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWisdom = async () => {
            try {
                const data = await getDailyWisdom();
                setWisdom(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchWisdom();
    }, []);

    return (
        <div className="relative w-full h-48 md:h-64 rounded-3xl overflow-hidden mb-8 group">
            {/* Cinematic Background */}
            <div className="absolute inset-0 bg-obsidian-card">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-overlay grayscale group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-12 max-w-4xl">
                <AnimatePresence mode='wait'>
                    {loading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3 text-sage-dim"
                        >
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            <span className="text-sm font-english tracking-widest uppercase">Connecting to Neural Core...</span>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-2 text-sage-DEFAULT mb-2">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-xs font-bold tracking-[0.2em] uppercase text-sage-dim">Daily Wisdom</span>
                            </div>

                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-english font-light text-white leading-relaxed">
                                <span className="text-sage-DEFAULT opacity-50 text-4xl -ml-4 absolute -translate-y-4">"</span>
                                {wisdom?.content}
                                <span className="text-sage-DEFAULT opacity-50 text-4xl ml-1 absolute translate-y-4">"</span>
                            </h2>

                            <div className="flex items-center gap-4 pt-2">
                                <div className="h-[1px] w-12 bg-sage-dim/30" />
                                <p className="text-sage-dim font-english text-sm tracking-widest uppercase">
                                    {wisdom?.source}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-sage-glow blur-[100px] rounded-full pointer-events-none opacity-50" />
        </div>
    );
}
