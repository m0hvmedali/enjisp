'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';
import { supabase } from '@/lib/supabase';
import { Profile } from '@/types';
import toast from 'react-hot-toast';

export default function EntryGate() {
    const { user, setUser, fetchUser } = useStudyStore();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pinInput, setPinInput] = useState('');
    const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);

    useEffect(() => {
        const getProfiles = async () => {
            const { data, error } = await supabase.from('profiles').select('*');
            if (data) setProfiles(data);
            setIsLoading(false);
        };
        getProfiles();
    }, []);

    const handleSelect = (profile: Profile) => {
        if (profile.role === 'admin') {
            setSelectedProfileId(profile.id);
            setPinInput('');
        } else {
            enterApp(profile);
        }
    };

    const handlePinSubmit = () => {
        if (pinInput === '0') {
            const profile = profiles.find(p => p.id === selectedProfileId);
            if (profile) enterApp(profile);
        } else {
            toast.error('Wrong PIN');
        }
    };

    const enterApp = (profile: Profile) => {
        fetchUser(profile.id); // This will load the plan
    };

    if (user) return null; // Hide gate if logged in

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-organic-dark text-white overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />

            <AnimatePresence mode='wait'>
                {!selectedProfileId ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="z-10 flex flex-col items-center gap-8"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold font-english tracking-tighter text-organic-beige">
                            Who are you?
                        </h1>

                        {isLoading ? (
                            <div className="text-organic-green animate-pulse">Scanning DB...</div>
                        ) : profiles.length === 0 ? (
                            <div className="text-center space-y-4">
                                <p className="text-red-400 font-bold">No Users Found</p>
                                <div className="text-sm text-gray-400 bg-white/5 p-4 rounded-xl">
                                    Please run <code>seed_v2.sql</code> in Supabase to create users.
                                </div>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-6">
                                {profiles.map((profile) => (
                                    <motion.button
                                        key={profile.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleSelect(profile)}
                                        className="group relative w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-organic-gray/50 border border-organic-border backdrop-blur-md flex flex-col items-center justify-center gap-2 hover:border-organic-green transition-all"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-organic-green/20 flex items-center justify-center text-xl">
                                            {profile.full_name?.[0]}
                                        </div>
                                        <span className="font-bold text-lg">{profile.full_name}</span>
                                        <div className="absolute inset-0 rounded-2xl bg-organic-green/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="z-10 flex flex-col items-center gap-4 bg-organic-gray/80 p-8 rounded-3xl border border-organic-border backdrop-blur-xl"
                    >
                        <h2 className="text-2xl font-bold font-arabic mb-4">Enter Access Code</h2>
                        <input
                            type="password"
                            value={pinInput}
                            onChange={(e) => setPinInput(e.target.value)}
                            className="bg-black/50 border border-organic-border rounded-xl px-4 py-2 text-center text-2xl tracking-widest focus:border-organic-green outline-none w-48"
                            autoFocus
                        />
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={() => setSelectedProfileId(null)}
                                className="px-6 py-2 rounded-xl text-sm opacity-70 hover:opacity-100"
                            >
                                Back
                            </button>
                            <button
                                onClick={handlePinSubmit}
                                className="px-6 py-2 rounded-xl bg-organic-green text-black font-bold hover:bg-green-400 transition-colors"
                            >
                                Unlock
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
