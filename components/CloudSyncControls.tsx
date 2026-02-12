'use client';

import { useState } from 'react';
import { useStudyStore } from '@/store/useStudyStore';
import { Cloud, CloudOff, RefreshCw, Key } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CloudSyncControls() {
    const { userId, setUserId, syncToCloud, pullFromCloud } = useStudyStore();
    const [inputValue, setInputValue] = useState(userId || '');
    const [isSyncing, setIsSyncing] = useState(false);

    const handleConnect = async () => {
        if (!inputValue.trim()) {
            toast.error('يرجى إدخال معرف المستخدم');
            return;
        }
        setUserId(inputValue);
        setIsSyncing(true);
        await pullFromCloud();
        setIsSyncing(false);
        toast.success('تم الاتصال بالسحابة بنجاح ☁️');
    };

    const handleManualSync = async () => {
        setIsSyncing(true);
        await syncToCloud();
        setIsSyncing(false);
        toast.success('تمت المزامنة بنجاح ✅');
    };

    return (
        <div className="bg-dark-card border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-xl">
            <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${userId ? 'bg-accent-blue/20 text-accent-blue' : 'bg-gray-500/20 text-gray-500'}`}>
                    {userId ? <Cloud size={20} /> : <CloudOff size={20} />}
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-arabic">حالة المزامنة السحابية</p>
                    <p className="text-sm font-bold font-arabic">
                        {userId ? 'متصل بالسحابة' : 'وضع الأوفلاين'}
                    </p>
                </div>
            </div>

            <div className="h-8 w-[1px] bg-white/10 hidden md:block" />

            {userId ? (
                <div className="flex gap-2">
                    <button
                        onClick={handleManualSync}
                        disabled={isSyncing}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-sm font-arabic font-bold"
                    >
                        <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                        مزامنة الآن
                    </button>
                    <button
                        onClick={() => setUserId(null)}
                        className="px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all text-sm font-arabic font-bold"
                    >
                        تسجيل الخروج
                    </button>
                </div>
            ) : (
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                        <input
                            className="w-full bg-dark-bg border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs font-english outline-none focus:border-accent-blue transition-all"
                            placeholder="User ID (e.g. Email)"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleConnect}
                        className="px-6 py-2 bg-accent-blue hover:bg-accent-blue/80 rounded-xl transition-all text-sm font-arabic font-bold shadow-lg shadow-accent-blue/20"
                    >
                        اتصال
                    </button>
                </div>
            )}
        </div>
    );
}
