'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Logo() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 select-none group"
        >
            <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-tr from-accent-blue via-accent-purple to-accent-pink rounded-2xl flex items-center justify-center shadow-lg shadow-accent-blue/20 rotate-3 group-hover:rotate-12 transition-transform duration-500">
                    <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-pulse" />
            </div>
            <div>
                <h1 className="text-2xl font-black font-english tracking-tighter leading-none">
                    <span className="text-white">ENJI</span>
                    <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">STUDY</span>
                </h1>
                <p className="text-[10px] text-gray-500 font-english tracking-[0.2em] font-bold">PREMIUM PLANNER</p>
            </div>
        </motion.div>
    );
}
