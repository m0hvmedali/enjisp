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
import { User, Sparkles, LogIn, Heart, Menu } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import toast from 'react-hot-toast';

export default function MainApp() {
    const { userName, setUserName, userId, setUserId, pullFromCloud, toggleSidebar } = useStudyStore();
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
            <div className="min-h-screen bg-organic-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md text-center relative z-10"
                >
                    <div className="w-20 h-20 bg-organic-green rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-2xl shadow-organic-green/20">
                        <Sparkles className="text-white w-10 h-10" />
                    </div>

                    <h1 className="text-4xl font-black font-arabic text-white mb-4 tracking-tight">مرحباً بكِ في خطة العباقرة</h1>
                    <p className="text-organic-beige font-arabic mb-12 text-lg opacity-80">نحن لا نخطط للدراسة.. نحن نخطط للمجد 👑</p>

                    <div className="grid grid-cols-2 gap-6">
                        <button
                            onClick={() => setUserName('Mohamed')}
                            className="bg-white/5 border border-white/5 hover:border-organic-green/50 p-8 rounded-3xl transition-all group hover:bg-white/10"
                        >
                            <div className="w-14 h-14 bg-organic-gray rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-organic-green transition-colors">
                                <User className="text-white w-6 h-6" />
                            </div>
                            <span className="font-arabic font-bold text-white text-lg">محمد</span>
                        </button>
                        <button
                            onClick={() => setUserName('Enji')}
                            className="bg-white/5 border border-white/5 hover:border-organic-pink/50 p-8 rounded-3xl transition-all group hover:bg-white/10"
                        >
                            <div className="w-14 h-14 bg-organic-gray rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-organic-pink transition-colors">
                                <Heart className="text-white w-6 h-6" />
                            </div>
                            <span className="font-arabic font-bold text-white text-lg">إنجي</span>
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // --- Main Logged In App ---
    return (
        <div className="min-h-screen bg-organic-dark text-white selection:bg-organic-green/30 selection:text-white relative overflow-hidden font-arabic">

            <Sidebar />

            <header className="fixed top-0 left-0 right-0 h-20 px-6 flex items-center justify-between z-40 bg-organic-dark/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleSidebar}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 group"
                    >
                        <Menu size={24} className="text-organic-green group-hover:scale-105 transition-transform" />
                    </button>
                    <h2 className="text-xl font-black font-arabic text-white tracking-wide">إنجي هانم <span className="text-organic-green">.</span></h2>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-organic-green/10 rounded-full border border-organic-green/20 flex items-center gap-2">
                        <Sparkles size={16} className="text-organic-green" />
                        <span className="text-xs font-bold text-organic-green">نسخة العباقرة</span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 pb-32 pt-24">
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
