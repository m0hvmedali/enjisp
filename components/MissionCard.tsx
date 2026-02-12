'use client';

import { motion } from 'framer-motion';
import { Check, ExternalLink } from 'lucide-react';
import type { Mission } from '@/types';

interface MissionCardProps {
    mission: Mission;
    accentColor: string;
    onToggle: () => void;
    onViewDetails: () => void;
}

export default function MissionCard({
    mission,
    accentColor,
    onToggle,
    onViewDetails,
}: MissionCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -10, scale: 1.01 }}
            className={`
        relative flex items-center gap-6 p-6 rounded-2xl
        bg-dark-card/80 backdrop-blur-xl border border-white/10
        hover:bg-dark-card hover:shadow-xl transition-all duration-300
        group
      `}
            style={{ borderRightWidth: '4px', borderRightColor: accentColor }}
        >
            {/* Checkbox */}
            <button
                onClick={onToggle}
                className={`
          w-8 h-8 rounded-full border-2 flex items-center justify-center
          transition-all duration-300 hover:scale-110
          ${mission.completed
                        ? 'bg-accent-blue border-accent-blue'
                        : 'border-gray-500 hover:border-accent-blue'
                    }
        `}
            >
                {mission.completed && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    >
                        <Check className="w-5 h-5 text-white" strokeWidth={3} />
                    </motion.div>
                )}
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0" onClick={onViewDetails}>
                <h4 className="text-lg font-bold text-white mb-1 font-arabic cursor-pointer hover:text-accent-blue transition-colors">
                    {mission.title}
                </h4>
                <p className="text-sm text-gray-400 font-arabic">
                    {mission.content}
                </p>
            </div>

            {/* Duration */}
            <div className="text-accent-blue font-bold font-english text-lg whitespace-nowrap">
                {mission.duration}
            </div>

            {/* Action Button */}
            <button
                onClick={onViewDetails}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group-hover:scale-110 duration-300"
            >
                <ExternalLink className="w-5 h-5 text-gray-400" />
            </button>

            {/* Completion Overlay */}
            {mission.completed && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        backgroundColor: ['rgba(16, 185, 129, 0.05)', 'rgba(59, 130, 246, 0.05)', 'rgba(16, 185, 129, 0.05)']
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                />
            )}
        </motion.div>
    );
}
