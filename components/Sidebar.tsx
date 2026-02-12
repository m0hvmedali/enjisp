'use client';

import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Languages,
    PenTool,
    Beaker,
    Zap,
    Calculator,
    LucideIcon
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface NavItem {
    id: string;
    label: string;
    icon: LucideIcon;
    path: string;
}

const navItems: NavItem[] = [
    { id: 'dashboard', label: 'الرئيسية', icon: LayoutDashboard, path: '/' },
    { id: 'english', label: 'الإنجليزي', icon: Languages, path: '/subject/english' },
    { id: 'arabic', label: 'العربي', icon: PenTool, path: '/subject/arabic' },
    { id: 'chemistry', label: 'الكيمياء', icon: Beaker, path: '/subject/chemistry' },
    { id: 'physics', label: 'الفيزياء', icon: Zap, path: '/subject/physics' },
    { id: 'math', label: 'الرياضيات', icon: Calculator, path: '/subject/math' },
];

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <motion.aside
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            className="w-72 h-screen bg-dark-card border-l border-white/10 p-6 flex flex-col backdrop-blur-xl sticky top-0"
        >
            {/* Logo */}
            <div className="mb-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3"
                >
                    <span className="text-4xl">✨</span>
                    <h1 className="text-2xl font-black bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent font-english">
                        Enji Study
                    </h1>
                </motion.div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                <p className="text-xs uppercase text-gray-500 mb-4 tracking-wider font-english">
                    المواد الدراسية
                </p>

                {navItems.map((item, index) => {
                    const isActive = pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => router.push(item.path)}
                            className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-300 font-arabic font-semibold
                ${isActive
                                    ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/30 translate-x-[-8px]'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white hover:translate-x-[-4px]'
                                }
              `}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </motion.button>
                    );
                })}
            </nav>

            {/* User Status */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 rounded-xl bg-gradient-to-br from-emerald-900/20 to-transparent border border-emerald-500/20"
            >
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-emerald-400 font-bold font-arabic">
                        جاهز للإنجاز
                    </span>
                </div>
            </motion.div>
        </motion.aside>
    );
}
