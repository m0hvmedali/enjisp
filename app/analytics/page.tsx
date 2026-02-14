'use client';

import { useStudyStore } from '@/store/useStudyStore';
import { motion } from 'framer-motion';
import { BarChart, Activity, Zap } from 'lucide-react';

export default function AnalyticsPage() {
    const { subjects, wishes } = useStudyStore();

    // Mock Data Calculation
    const totalMissions = subjects.reduce((acc, sub) => acc + sub.missions.length, 0);
    const completedMissions = subjects.reduce((acc, sub) => acc + sub.missions.filter(m => m.status === 'completed').length, 0);
    const completionRate = totalMissions ? Math.round((completedMissions / totalMissions) * 100) : 0;

    // Streaks (Mock logic for now, would need date tracking in real DB)
    const currentStreak = 5;

    return (
        <div className="min-h-screen bg-organic-dark p-6 pb-24 font-arabic">
            <header className="pt-12 mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Analytics 📊</h1>
                <p className="text-organic-border">حلل أداءك لتتطور</p>
            </header>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-organic-gray/30 p-6 rounded-3xl border border-white/5 flex flex-col items-center">
                    <Activity className="text-organic-green mb-4 w-8 h-8" />
                    <span className="text-4xl font-black text-white">{completionRate}%</span>
                    <span className="text-xs text-organic-border mt-2">إتمام المنهج</span>
                </div>
                <div className="bg-organic-gray/30 p-6 rounded-3xl border border-white/5 flex flex-col items-center">
                    <Zap className="text-yellow-400 mb-4 w-8 h-8" />
                    <span className="text-4xl font-black text-white">{currentStreak}</span>
                    <span className="text-xs text-organic-border mt-2">أيام متتالية 🔥</span>
                </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-6">Subject Performance</h2>
            <div className="space-y-6">
                {subjects.map(subject => {
                    const subTotal = subject.missions.length;
                    const subCompleted = subject.missions.filter(m => m.status === 'completed').length;
                    const subRate = subTotal ? (subCompleted / subTotal) * 100 : 0;

                    return (
                        <div key={subject.id}>
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-organic-beige">{subject.name}</span>
                                <span className="text-xs text-gray-500">{subCompleted}/{subTotal}</span>
                            </div>
                            <div className="h-4 bg-black/30 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${subRate}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-organic-green/50 to-organic-green"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
