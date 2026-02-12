'use client';

import { motion } from 'framer-motion';
import { Home, Settings, BookOpen, User, Menu } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Logo from './Logo';

export default function MobileNav() {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { icon: Home, path: '/', label: 'الرئيسية' },
        { icon: Settings, path: '/settings', label: 'الإعدادات' },
        { icon: User, path: '/profile', label: 'بروفايل' },
    ];

    return (
        <>
            {/* Mobile Top Header */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-dark-card/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
                <Logo />
                <button className="p-2 bg-white/5 rounded-xl">
                    <Menu className="w-6 h-6 text-gray-400" />
                </button>
            </div>

            {/* Mobile Bottom Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-dark-card/80 backdrop-blur-2xl border-t border-white/10 flex items-center justify-around px-4 z-50">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => router.push(item.path)}
                            className="flex flex-col items-center justify-center gap-1 group"
                        >
                            <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/30 scale-110' : 'text-gray-500 hover:bg-white/5'}`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <span className={`text-[10px] font-arabic ${isActive ? 'text-white' : 'text-gray-500'}`}>{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </>
    );
}
