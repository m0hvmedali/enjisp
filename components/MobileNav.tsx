'use client';

import { motion } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';
import { Home, Calendar, User, Heart, MessageSquare, Settings } from 'lucide-react';

export default function MobileNav({ activeTab = '', setActiveTab = () => { } }: { activeTab?: string, setActiveTab?: (t: string) => void }) {
    const { userName } = useStudyStore();

    const tabs = [
        { id: 'home', icon: Home, label: 'الرئيسية' },
        { id: 'schedule', icon: Calendar, label: 'الجدول' },
        { id: 'wishes', icon: Heart, label: 'الأهداف' },
        { id: 'vent', icon: MessageSquare, label: 'تفريغ' },
        { id: 'profile', icon: User, label: 'بروفايل' },
    ];

    // Only show settings if Mohamed is logged in
    if (userName === 'Mohamed') {
        tabs.push({ id: 'settings', icon: Settings, label: 'إعدادات' });
    }

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-50">
            <div className="bg-dark-card/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-2 shadow-2xl flex items-center justify-between">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="relative flex-1 flex flex-col items-center py-2 transition-all duration-300"
                        >
                            <motion.div
                                animate={{
                                    scale: isActive ? 1.2 : 1,
                                    color: isActive ? '#3b82f6' : '#64748b'
                                }}
                                className="z-10"
                            >
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                            </motion.div>

                            <motion.span
                                animate={{
                                    opacity: isActive ? 1 : 0,
                                    y: isActive ? 0 : 5
                                }}
                                className="text-[10px] font-arabic font-bold mt-1 text-accent-blue"
                            >
                                {tab.label}
                            </motion.span>

                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-accent-blue/10 rounded-2xl mx-1"
                                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
