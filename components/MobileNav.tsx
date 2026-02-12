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
            <div className="bg-organic-gray/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-2 shadow-2xl flex items-center justify-between shadow-black/50">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="relative flex-1 flex flex-col items-center py-2 transition-all duration-300 bg-transparent border-none"
                        >
                            <motion.div
                                animate={{
                                    scale: isActive ? 1.1 : 1,
                                    color: isActive ? '#00C853' : '#6b7280',
                                    y: isActive ? -5 : 0
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className="z-10 relative"
                            >
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                {isActive && (
                                    <motion.div
                                        layoutId="glow"
                                        className="absolute inset-0 bg-organic-green blur-lg opacity-40"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 0.4 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}
                            </motion.div>

                            <motion.span
                                animate={{
                                    opacity: isActive ? 1 : 0,
                                    height: isActive ? 'auto' : 0,
                                    marginTop: isActive ? 4 : 0
                                }}
                                className="text-[10px] font-arabic font-bold text-organic-beige overflow-hidden"
                            >
                                {tab.label}
                            </motion.span>

                            {isActive && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute -bottom-1 w-1 h-1 bg-organic-green rounded-full"
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
