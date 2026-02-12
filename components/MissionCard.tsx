import { motion } from 'framer-motion';
import { Check, Clock, ChevronRight, FileText } from 'lucide-react';

interface MissionCardProps {
    mission: any;
    onToggle: () => void;
    onViewDetails: () => void;
    accentColor?: string;
}

export default function MissionCard({ mission, onToggle, onViewDetails, accentColor = '#00C853' }: MissionCardProps) {
    return (
        <motion.div
            layout
            whileHover={{ y: -5 }}
            className={`
                group relative p-5 rounded-3xl border transition-all duration-300 h-full flex flex-col justify-between
                ${mission.completed
                    ? 'bg-organic-green/5 border-organic-green/20'
                    : 'bg-organic-gray border-white/5 hover:border-organic-green/30 hover:bg-white/5'}
            `}
        >
            <div className="flex justify-between items-start mb-4">
                <div
                    onClick={onToggle}
                    className={`
                        w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 border
                        ${mission.completed
                            ? 'bg-organic-green border-organic-green text-organic-dark shadow-lg shadow-organic-green/20 scale-110'
                            : 'bg-white/5 border-white/10 hover:border-organic-green/50 text-transparent'}
                    `}
                >
                    <Check size={16} strokeWidth={4} />
                </div>

                {mission.duration && (
                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 flex items-center gap-1.5">
                        <Clock size={12} className={mission.completed ? 'text-organic-green' : 'text-gray-400'} />
                        <span className={`text-[10px] font-bold font-english ${mission.completed ? 'text-organic-green' : 'text-gray-400'}`}>
                            {mission.duration}m
                        </span>
                    </div>
                )}
            </div>

            <div onClick={onViewDetails} className="cursor-pointer flex-1">
                <h3 className={`font-bold font-arabic text-lg mb-2 leading-relaxed transition-colors ${mission.completed ? 'text-gray-400 line-through decoration-organic-green/50' : 'text-white group-hover:text-organic-green'}`}>
                    {mission.title}
                </h3>

                {/* Micro-preview of content */}
                {mission.content && (
                    <p className="text-gray-500 text-xs font-arabic line-clamp-2 mb-4 leading-relaxed">
                        {mission.content}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${mission.type === 'video' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
                        {mission.type === 'video' ? 'فيديو' : 'مذاكرة'}
                    </span>
                </div>

                <button
                    onClick={onViewDetails}
                    className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-organic-green group-hover:text-organic-dark transition-all opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </motion.div>
    );
}
