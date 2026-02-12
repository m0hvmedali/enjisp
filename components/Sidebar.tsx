'use client';

import { motion } from 'framer-motion';
import { Home, Compass, BookOpen, Settings, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: 'لوحة التحكم', path: '/', color: 'blue' },
        { icon: BookOpen, label: 'موادي الدراسية', path: '/subjects', color: 'purple' },
        { icon: Settings, label: 'الإعدادات', path: '/settings', color: 'gold' },
    ];

    return (
        <motion.aside
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            className="hidden lg:flex w-80 h-screen bg-dark-card border-l border-white/10 p-8 flex-col sticky top-0 z-[100]"
        >
            {/* Branding */}
            <div className="mb-12">
                <Logo />
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-3">
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => router.push(item.path)}
                            className={`w-full group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${isActive
                                    ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-6 h-6 z-10" />
                            <span className="font-bold font-arabic z-10">{item.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeGlow"
                                    className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-transparent"
                                />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Profile Section */}
            <div className="mt-auto pt-8 border-t border-white/10">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 group cursor-pointer hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-accent-purple rounded-xl flex items-center justify-center font-black text-xl">
                        M
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold font-arabic text-sm">محمد علي</h4>
                        <p className="text-xs text-emerald-500 font-arabic">متصل الآن 🟢</p>
                    </div>
                    <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
                </div>
            </div>
        </motion.aside>
    );
}
