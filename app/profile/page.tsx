'use client';

import { useStudyStore } from '@/store/useStudyStore';
import { motion } from 'framer-motion';
import { User, Activity, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const { user, wishes, ventLogs } = useStudyStore();
    // In a real app, we'd fetch activity logs from a dedicated table or union query
    // For now, we'll just mock the timeline structure or use what we have

    // We can assume we might add a `timeline` to the store later or fetch it here.

    return (
        <div className="min-h-screen bg-organic-dark p-6 pb-24 font-arabic">
            <header className="mb-8 pt-12 flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-full bg-organic-green/20 flex items-center justify-center text-4xl border-2 border-organic-green mb-4">
                    {user?.full_name?.[0] || <User />}
                </div>
                <h1 className="text-3xl font-bold text-organic-beige">{user?.full_name}</h1>
                <span className="px-3 py-1 bg-organic-gray rounded-full text-xs text-organic-border font-english uppercase tracking-widest border border-organic-border/50">
                    {user?.role === 'admin' ? 'Architect' : 'Scholar'}
                </span>
            </header>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-organic-gray/30 p-4 rounded-2xl border border-organic-border/30 flex flex-col items-center">
                    <Trophy className="text-organic-green mb-2" />
                    <span className="text-2xl font-bold text-white">{wishes.filter(w => w.completed).length}</span>
                    <span className="text-xs text-organic-border text-center">أمنيات تحققت</span>
                </div>
                <div className="bg-organic-gray/30 p-4 rounded-2xl border border-organic-border/30 flex flex-col items-center">
                    <Activity className="text-organic-pink mb-2" />
                    <span className="text-2xl font-bold text-white mb-1">--</span>
                    <span className="text-xs text-organic-border text-center">جلسات تركيز</span>
                </div>
            </div>

            <section>
                <h2 className="text-xl font-bold text-organic-beige mb-4 flex items-center gap-2">
                    <Activity size={18} />
                    السجل الزمني
                </h2>
                <div className="space-y-4 border-r-2 border-organic-gray pr-4">
                    {/* Placeholder Timeline Items */}
                    <div className="relative">
                        <div className="absolute -right-[21px] top-1 w-3 h-3 rounded-full bg-organic-green shadow-[0_0_10px_rgba(0,200,83,0.5)]" />
                        <div className="text-sm text-organic-border mb-1">اليوم، 10:30 ص</div>
                        <div className="bg-organic-gray/20 p-3 rounded-xl border border-organic-border/20">
                            بدأت رحلة جديدة في الفيزياء ⚛️
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -right-[21px] top-1 w-3 h-3 rounded-full bg-organic-pink" />
                        <div className="text-sm text-organic-border mb-1">الأمس، 08:15 م</div>
                        <div className="bg-organic-gray/20 p-3 rounded-xl border border-organic-border/20">
                            فرغت عما بداخلي.. 🍃
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
