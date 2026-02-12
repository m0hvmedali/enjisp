'use client';

import { motion } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';
import { User, Shield, Share2, Award, Zap, History } from 'lucide-react';

export default function ProfileTab() {
    const { userName, timeline, studyPlan, completedMissions } = useStudyStore();

    // Stats
    const totalMissions = studyPlan.reduce((acc, sub) => acc + (sub.missions?.length || 0), 0);
    const completedCount = Object.keys(completedMissions).filter(id => completedMissions[id]).length;

    // Level Logic (simple)
    const level = Math.floor(completedCount / 5) + 1;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 max-w-2xl mx-auto"
        >
            {/* Profile Header */}
            <div className="text-center mb-12 relative group">
                <div className="w-32 h-32 mx-auto relative mb-6">
                    <div className="absolute inset-0 bg-organic-green rounded-[3rem] rotate-12 blur-xl opacity-20 animate-pulse-slow" />
                    <div className="w-full h-full bg-organic-gray border-2 border-white/5 rounded-[3rem] flex items-center justify-center text-5xl relative z-10 overflow-hidden shadow-2xl shadow-black/50">
                        {userName === 'Mohamed' ? '👨‍💻' : '👩‍🎓'}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-organic-green" />
                    </div>
                </div>

                <h1 className="text-3xl font-black font-arabic mb-2 text-white">{userName === 'Mohamed' ? 'محمد' : 'إنجي'}</h1>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-organic-green/10 border border-organic-green/20 rounded-full text-organic-green text-xs font-bold font-english uppercase tracking-widest">
                    <Zap size={14} /> Level {level}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-12">
                <div className="bg-organic-gray border border-white/5 p-6 rounded-[2rem] text-center hover:border-organic-green/20 transition-all hover:translate-y-[-2px]">
                    <div className="w-12 h-12 bg-organic-green/10 rounded-full flex items-center justify-center mx-auto mb-4 text-organic-green">
                        <Award className="w-6 h-6" />
                    </div>
                    <p className="text-3xl font-black font-english text-white mb-1">{completedCount}</p>
                    <p className="text-[10px] text-gray-500 font-arabic font-bold uppercase tracking-widest">مهمة مكتملة</p>
                </div>
                <div className="bg-organic-gray border border-white/5 p-6 rounded-[2rem] text-center hover:border-organic-pink/20 transition-all hover:translate-y-[-2px]">
                    <div className="w-12 h-12 bg-organic-pink/10 rounded-full flex items-center justify-center mx-auto mb-4 text-organic-pink">
                        <Shield className="w-6 h-6" />
                    </div>
                    <p className="text-3xl font-black font-english text-white mb-1">{totalMissions - completedCount}</p>
                    <p className="text-[10px] text-gray-500 font-arabic font-bold uppercase tracking-widest">مهمة متبقية</p>
                </div>
            </div>

            {/* Timeline */}
            <div className="space-y-6">
                <h3 className="text-xl font-black font-arabic mb-6 flex items-center gap-3 text-organic-beige">
                    <History className="text-organic-green" /> خطك الزمني (Timeline)
                </h3>

                <div className="space-y-4 relative">
                    <div className="absolute top-2 bottom-2 left-6 w-[2px] bg-white/5" />

                    {timeline.length > 0 ? timeline.map((event) => (
                        <div key={event.id} className="relative flex items-center gap-6 pl-2 group">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center relative z-10 shrink-0 transition-transform group-hover:scale-110 ${event.type === 'mission' ? 'bg-organic-green shadow-lg shadow-organic-green/20' :
                                event.type === 'vent' ? 'bg-organic-pink shadow-lg shadow-organic-pink/20' : 'bg-organic-beige border-none text-organic-dark shadow-lg'
                                }`}>
                                <div className="w-4 h-4 text-white">
                                    {event.type === 'mission' ? '✔️' : event.type === 'vent' ? '🍃' : '✨'}
                                </div>
                            </div>

                            <div className="flex-1 bg-organic-gray border border-white/5 p-5 rounded-2xl group-hover:border-white/15 transition-all">
                                <p className="text-sm font-arabic font-bold text-gray-200 mb-1">{event.title}</p>
                                <p className="text-[10px] text-gray-600 font-english">
                                    {new Date(event.createdAt).toLocaleDateString('ar-EG')} - {new Date(event.createdAt).toLocaleTimeString('ar-EG')}
                                </p>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-12 text-gray-600 font-arabic italic border-2 border-dashed border-white/5 rounded-[2.5rem]">
                            لسه مفيش أحداث.. عيش واصنع تاريخك! 🚀
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
