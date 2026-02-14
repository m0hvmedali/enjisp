'use client';

import { motion } from 'framer-motion';
import AnalysisEngine from '@/components/AnalysisEngine';

export default function VentingPage() {
    return (
        <div className="min-h-screen bg-obsidian-bg p-6 pb-24 font-english overflow-hidden relative">

            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-sage-glow to-transparent opacity-20 pointer-events-none" />

            <header className="mb-12 relative z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
                >
                    Neural <span className="text-sage-DEFAULT">Venting</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sage-dim max-w-lg mx-auto leading-relaxed"
                >
                    Release your academic pressure. Rafeeq's neural core will analyze your sentiment and offer Socratic guidance.
                </motion.p>
            </header>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
            >
                <AnalysisEngine />
            </motion.div>
        </div>
    );
}
