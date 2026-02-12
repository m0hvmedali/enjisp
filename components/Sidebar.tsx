'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Home, Book, Settings, LogOut, Sparkles, X, Menu, Zap, Atom, Divide } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useStudyStore } from '@/store/useStudyStore';
import Link from 'next/link';
import { Subject } from '@/types';
import UserSwitchModal from './UserSwitchModal';
import { useState } from 'react';

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { studyPlan, userName, isSidebarOpen, toggleSidebar } = useStudyStore();

    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    const menuItems = [
        { icon: Home, label: 'الرئيسية', path: '/', color: 'text-organic-green' },
    ];

    const linkClass = (path: string) => `
        flex items-center p-4 mb-2 rounded-xl transition-all duration-300 relative group
        ${pathname === path
            ? 'bg-organic-green/10 text-organic-white border-r-4 border-organic-green'
            : 'text-gray-400 hover:bg-white/5 hover:text-white'}
    `;

    return (
        <>
            <UserSwitchModal
                isOpen={isUserModalOpen}
                onClose={() => setIsUserModalOpen(false)}
            />

            {/* Backdrop */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleSidebar}
                        className="fixed inset-0 bg-organic-dark/90 backdrop-blur-sm z-[150]"
                    />
                )}
            </AnimatePresence>

            <motion.aside
                initial={{ x: 300 }}
                animate={{ x: isSidebarOpen ? 0 : 300 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 w-80 h-screen bg-organic-dark border-l border-white/5 flex flex-col z-[200] shadow-2xl"
            >
                <div className="p-8 flex items-center justify-between border-b border-white/5">
                    <h1 className="text-2xl font-black font-arabic text-white italic tracking-tighter flex items-center gap-2">
                        <span className="w-3 h-3 bg-organic-green rounded-full animate-pulse"></span>
                        Enji App
                    </h1>
                    <button
                        onClick={toggleSidebar}
                        className="p-2 hover:bg-white/5 rounded-xl text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={linkClass(item.path)}
                            onClick={() => toggleSidebar()}
                        >
                            <item.icon size={22} className={`ml-4 shrink-0 ${item.color}`} />
                            <span className="font-bold font-arabic text-md">{item.label}</span>
                        </Link>
                    ))}

                    <div className="my-6 border-t border-white/5 mx-4" />

                    <p className="px-6 text-[10px] font-black text-organic-green uppercase tracking-[0.2em] mb-4 font-arabic opacity-70">
                        المواد الدراسية
                    </p>

                    {studyPlan.map((sub: Subject) => (
                        <Link
                            key={sub.id}
                            href={`/subject/${sub.id}`}
                            className={linkClass(`/subject/${sub.id}`)}
                            onClick={() => toggleSidebar()}
                        >
                            <span className="ml-4 text-xl group-hover:scale-110 transition-transform duration-300">{sub.icon}</span>
                            <span className="font-bold font-arabic text-sm">{sub.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-6 bg-organic-gray border-t border-white/5">
                    <button
                        onClick={() => setIsUserModalOpen(true)}
                        className="w-full flex items-center gap-4 p-3 rounded-2xl group cursor-pointer hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
                    >
                        <div className="w-10 h-10 bg-organic-green rounded-full flex items-center justify-center font-black text-organic-dark text-lg shadow-lg relative overflow-hidden">
                            {userName?.[0] || 'E'}
                        </div>
                        <div className="flex-1 text-right">
                            <h4 className="font-bold font-arabic text-xs text-white mb-1">{userName || 'إنجي'}</h4>
                            <p className="text-[10px] text-organic-green font-arabic font-bold flex items-center gap-1 justify-end">
                                <Zap size={10} /> تبديل الحساب
                            </p>
                        </div>
                        <LogOut className="w-4 h-4 text-gray-600 group-hover:text-organic-pink transition-colors" />
                    </button>
                </div>
            </motion.aside>
        </>
    );
}
