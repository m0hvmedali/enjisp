'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';
import MobileNav from '@/components/MobileNav';
import RightPanel from '@/components/RightPanel';
import HomePage from '@/components/tabs/HomeTab';
import ScheduleTab from '@/components/tabs/ScheduleTab';
import WishesTab from '@/components/tabs/WishesTab';
import VentTab from '@/components/tabs/VentTab';
import ProfileTab from '@/components/tabs/ProfileTab';
import SettingsPage from '@/app/settings/page';
import { User, Sparkles, LogIn, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MainApp() {
    const { userName, setUserName, userId, setUserId, pullFromCloud } = useStudyStore();
    const [activeTab, setActiveTab] = useState('home');
    const [mounted, setMounted] = useState(false);
    const [tempUserId, setTempUserId] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="min-h-screen bg-dark-bg" />;

    // --- Entry Screen (Login/Select User) ---
    if (!userName) {
        return (
            <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-6 bg-cosmic-gradient">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-sm text-center"
                >
                    <div className="w-24 h-24 bg-google-blue rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-google-blue/20 rotate-12">
                        <Sparkles className="text-white w-12 h-12" />
                    </div>

                    <h1 className="text-4xl font-black font-arabic text-white mb-2">مين القمر؟ ✨</h1>
                    <p className="text-gray-400 font-arabic mb-12">اختر ملفك الشخصي للدخول</p>

                    <div className="grid grid-cols-2 gap-4 mb-12">
                        <button
                            onClick={() => setUserName('Mohamed')}
                            className="bg-dark-card border border-white/5 p-6 rounded-[2rem] hover:border-google-blue transition-all group"
                        >
                            <div className="w-16 h-16 bg-google-blue/20 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <User className="text-google-blue" />
                            </div>
                            <span className="font-arabic font-bold text-white">محمد</span>
                        </button>
                        <button
                            onClick={() => setUserName('Enji')}
                            className="bg-dark-card border border-white/5 p-6 rounded-[2rem] hover:border-accent-pink transition-all group"
                        >
                            <div className="w-16 h-16 bg-accent-pink/20 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Heart className="text-accent-pink" />
                            </div>
                            <span className="font-arabic font-bold text-white">إنجي</span>
                        </button>
                    </div>

                </motion.div>
            </div>
        );
    }

    // --- Main Logged In App ---
    return (
        <div className="min-h-screen bg-dark-bg text-white selection:bg-google-blue/30 selection:text-white">
            <div className="fixed inset-0 bg-cosmic-gradient pointer-events-none" />

            <main className="relative z-10 pb-32">
                <AnimatePresence mode="wait">
                    {activeTab === 'home' && <HomePage key="home" />}
                    {activeTab === 'schedule' && <ScheduleTab key="schedule" />}
                    {activeTab === 'wishes' && <WishesTab key="wishes" />}
                    {activeTab === 'vent' && <VentTab key="vent" />}
                    {activeTab === 'profile' && <ProfileTab key="profile" />}
                    {activeTab === 'settings' && <SettingsPage key="settings" />}
                </AnimatePresence>
            </main>

            <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Desktop Only Panel */}
            <div className="hidden xl:block fixed right-8 top-8 w-80 h-[calc(100vh-64px)] overflow-y-auto">
                <RightPanel />
            </div>
        </div>
    );
}
