'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, ArrowRight } from 'lucide-react';
import { useStudyStore } from '@/store/useStudyStore';
import toast from 'react-hot-toast';

interface UserSwitchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UserSwitchModal({ isOpen, onClose }: UserSwitchModalProps) {
    const { setUserName, userName } = useStudyStore();
    const [selectedUser, setSelectedUser] = useState<'Mohamed' | 'Enji' | null>(null);
    const [pin, setPin] = useState('');
    const [step, setStep] = useState<'select' | 'pin'>('select');

    const handleUserSelect = (user: 'Mohamed' | 'Enji') => {
        if (user === userName) {
            onClose();
            return;
        }
        setSelectedUser(user);
        setStep('pin');
        setPin('');
    };

    const handlePinSubmit = () => {
        if (pin === '0') {
            if (selectedUser) {
                setUserName(selectedUser);
                toast.success(`أهلاً بك يا ${selectedUser === 'Mohamed' ? 'محمد' : 'إنجي'}! 👋`, {
                    style: { background: '#121212', color: '#fff', border: '1px solid #00C853' }
                });
                onClose();
                setStep('select');
                setSelectedUser(null);
                setPin('');
            }
        } else {
            toast.error('رمز الدخول غير صحيح ❌');
            setPin('');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[250]"
                    />
                    <div className="fixed inset-0 z-[260] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-organic-gray w-full max-w-md rounded-3xl border border-white/10 p-6 shadow-2xl relative overflow-hidden"
                        >
                            {/* Background Effects */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-organic-green/5 rounded-full blur-[40px]" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-organic-pink/5 rounded-full blur-[40px]" />

                            <button
                                onClick={onClose}
                                className="absolute top-4 left-4 p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-colors z-10"
                            >
                                <X size={20} />
                            </button>

                            <div className="text-center mb-8 relative z-10">
                                <div className="w-16 h-16 bg-organic-dark rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                                    <User size={32} className="text-organic-green" />
                                </div>
                                <h2 className="text-2xl font-black font-arabic text-white mb-2">
                                    {step === 'select' ? 'تغيير المستخدم' : 'تأكيد الهوية'}
                                </h2>
                                <p className="text-gray-400 font-arabic text-sm">
                                    {step === 'select' ? 'اختر الحساب الذي تود الدخول إليه' : `أدخل رمز الدخول لحساب ${selectedUser === 'Mohamed' ? 'محمد' : 'إنجي'}`}
                                </p>
                            </div>

                            {step === 'select' ? (
                                <div className="space-y-3 relative z-10">
                                    {[
                                        { id: 'Mohamed', label: 'محمد', subtitle: 'حساب المشرف' },
                                        { id: 'Enji', label: 'إنجي', subtitle: 'حساب الطالبة' }
                                    ].map((user) => (
                                        <button
                                            key={user.id}
                                            onClick={() => handleUserSelect(user.id as any)}
                                            className={`w-full p-4 rounded-2xl border transition-all flex items-center gap-4 group
                                                ${userName === user.id
                                                    ? 'bg-organic-green/10 border-organic-green/30 cursor-default'
                                                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors
                                                ${userName === user.id ? 'bg-organic-green text-organic-dark' : 'bg-organic-dark text-gray-400 group-hover:text-white'}`}>
                                                {user.id[0]}
                                            </div>
                                            <div className="flex-1 text-right">
                                                <div className="font-bold font-arabic text-white">{user.label}</div>
                                                <div className="text-xs text-gray-500 font-arabic">{user.subtitle}</div>
                                            </div>
                                            {userName === user.id && (
                                                <div className="text-organic-green text-xs font-bold px-2 py-1 bg-organic-green/10 rounded-lg">الحالي</div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6 relative z-10">
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            type="password"
                                            autoFocus
                                            className="w-full bg-black/20 border border-white/5 rounded-xl py-4 pr-4 pl-12 text-center text-2xl tracking-[0.5em] text-white outline-none focus:border-organic-green/50 focus:bg-black/40 transition-all placeholder-gray-700 font-english"
                                            placeholder="••••"
                                            value={pin}
                                            onChange={(e) => setPin(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handlePinSubmit()}
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => { setStep('select'); setPin(''); }}
                                            className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl font-bold font-arabic transition-colors"
                                        >
                                            رجوع
                                        </button>
                                        <button
                                            onClick={handlePinSubmit}
                                            className="flex-[2] py-3 bg-organic-green text-organic-dark hover:bg-organic-green/90 rounded-xl font-bold font-arabic transition-colors shadow-lg shadow-organic-green/20 flex items-center justify-center gap-2"
                                        >
                                            دخول <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
