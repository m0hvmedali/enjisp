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
        toast.success('تم الاتصال بالسحابة بنجاح ☁️', {
            style: { background: '#121212', color: '#fff', border: '1px solid #00C853' }
        });
    };

    const handleManualSync = async () => {
        setIsSyncing(true);
        await syncToCloud();
        setIsSyncing(false);
        toast.success('تمت المزامنة بنجاح ✅', {
            style: { background: '#121212', color: '#fff', border: '1px solid #00C853' }
        });
    };

    return (
        <div className="bg-organic-gray border border-white/5 rounded-3xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-lg">
            <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${userId ? 'bg-organic-green/10 text-organic-green' : 'bg-white/5 text-gray-500'}`}>
                    {userId ? <Cloud size={20} /> : <CloudOff size={20} />}
                </div>
                <div>
                    <p className="text-[10px] text-gray-500 font-arabic font-bold uppercase tracking-wider">حالة المزامنة</p>
                    <p className={`text-sm font-black font-arabic ${userId ? 'text-white' : 'text-gray-400'}`}>
                        {userId ? 'متصل بالسحابة' : 'غير متصل'}
                    </p>
                </div>
            </div>

            <div className="h-8 w-[1px] bg-white/5 hidden md:block" />

            {userId ? (
                <div className="flex gap-2 w-full md:w-auto">
                    <button
                        onClick={handleManualSync}
                        disabled={isSyncing}
                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-organic-green/20 hover:text-organic-green border border-white/5 hover:border-organic-green/30 rounded-xl transition-all text-sm font-arabic font-bold text-gray-300"
                    >
                        <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                        مزامنة
                    </button>
                    <button
                        onClick={() => setUserId(null)}
                        className="px-5 py-2.5 text-organic-pink hover:bg-organic-pink/10 border border-transparent hover:border-organic-pink/20 rounded-xl transition-all text-sm font-arabic font-bold"
                    >
                        خروج
                    </button>
                </div>
            ) : (
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                        <input
                            className="w-full bg-black/20 border border-white/5 rounded-xl py-2.5 pl-9 pr-4 text-xs font-english outline-none focus:border-organic-green/50 focus:bg-black/40 transition-all text-white placeholder-gray-600"
                            placeholder="User ID / Name"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleConnect}
                        className="px-6 py-2.5 bg-organic-green text-organic-dark hover:scale-105 rounded-xl transition-all text-sm font-arabic font-black shadow-lg shadow-organic-green/20"
                    >
                        اتصال
                    </button>
                </div>
            )}
        </div>
    );
}
