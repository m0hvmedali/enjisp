'use client';

import { Home, Calendar, User, Heart, Mic2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const tabs = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Schedule', href: '/schedule', icon: Calendar },
    { name: 'Timeline', href: '/profile', icon: User }, // Profile/Timeline
    { name: 'Wishes', href: '/wishes', icon: Heart },
    { name: 'Venting', href: '/venting', icon: Mic2 }, // Venting
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-2 bg-gradient-to-t from-organic-dark via-organic-dark to-transparent md:hidden">
            <nav className="flex items-center justify-around bg-organic-gray/80 backdrop-blur-xl border border-organic-border rounded-full px-2 py-3 shadow-2xl shadow-organic-green/5">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    return (
                        <Link key={tab.name} href={tab.href} className="relative p-3 group">
                            {isActive && (
                                <motion.div
                                    layoutId="nav-glow"
                                    className="absolute inset-0 bg-organic-green/20 rounded-full blur-md"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <tab.icon
                                size={24}
                                className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-organic-green' : 'text-organic-beige/50 group-hover:text-organic-beige'
                                    }`}
                            />
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
