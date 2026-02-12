'use client';

import { motion } from 'framer-motion';
import { Home, Book, Settings, LogOut, Sparkles, X, Menu, Zap, Atom, Divide } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useStudyStore } from '@/store/useStudyStore';
import Link from 'next/link';

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { studyPlan, currentUser } = useStudyStore();

    const menuItems = [
        { icon: Home, label: 'الرئيسية', path: '/', color: 'text-cine-accent' },
    ];

    const linkClass = (path: string) => `
        flex items-center p-4 mb-2 rounded-2xl transition-all duration-300 relative group
        ${pathname === path
            ? 'bg-white/10 text-white shadow-[0_0_20px_rgba(56,189,248,0.15)] border-r-4 border-cine-accent'
            : 'text-gray-400 hover:bg-white/5 hover:text-white'}
    `;

    return (
        <motion.aside
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            className="hidden lg:flex w-72 h-screen bg-cine-dark border-l border-white/5 flex-col sticky top-0 z-[100] selection:bg-cine-accent selection:text-cine-dark"
        >
            <div className="p-8">
                <h1 className="text-3xl font-black font-arabic bg-gradient-to-l from-cine-accent via-cine-blue to-accent-purple bg-clip-text text-transparent italic tracking-tighter">
                    خطة العباقرة ✨
                </h1>
            </div>

            <nav className="flex-1 px-4 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => (
                    <Link key={item.path} href={item.path} className={linkClass(item.path)}>
                        <item.icon size={22} className={`ml-4 shrink-0 ${item.color}`} />
                        <span className="font-bold font-arabic text-md">{item.label}</span>
                        {pathname === item.path && (
                            <motion.div layoutId="navIndicator" className="absolute left-4 w-2 h-2 bg-cine-accent rounded-full animate-pulse" />
                        )}
                    </Link>
                ))}

                <div className="my-6 border-t border-white/5 mx-4" />

                <p className="px-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 font-arabic">
                    المواد الدراسية
                </p>

                {studyPlan.map((sub) => (
                    <Link
                        key={sub.id}
                        href={`/subject/${sub.id}`}
                        className={linkClass(`/subject/${sub.id}`)}
                    >
                        <span className="ml-4 text-xl group-hover:scale-125 transition-transform duration-300">{sub.icon}</span>
                        <span className="font-bold font-arabic text-sm">{sub.name}</span>
                        {pathname === `/subject/${sub.id}` && (
                            <motion.div layoutId="navIndicator" className="absolute left-4 w-2 h-2 bg-cine-accent rounded-full animate-pulse" />
                        )}
                    </Link>
                ))}
            </nav>

            <div className="p-6 bg-cine-card/50 backdrop-blur-xl border-t border-white/5">
                <div className="flex items-center gap-4 p-3 rounded-2xl group cursor-pointer hover:bg-white/5 transition-all">
                    <div className="w-10 h-10 bg-gradient-to-br from-cine-accent to-cine-blue rounded-xl flex items-center justify-center font-black text-cine-dark text-lg shadow-lg shadow-cine-accent/20">
                        {currentUser?.[0] || 'E'}
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold font-arabic text-xs text-white">{currentUser || 'إنجي'}</h4>
                        <p className="text-[10px] text-cine-accent font-arabic font-bold flex items-center gap-1">
                            <Zap size={8} className="animate-pulse" /> هندسة مود
                        </p>
                    </div>
                    <LogOut className="w-4 h-4 text-gray-600 group-hover:text-cine-pink transition-colors" />
                </div>
            </div>
        </motion.aside>
    );
}
