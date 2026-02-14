'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';

export default function VentingPage() {
    const { addVent } = useStudyStore();
    const [text, setText] = useState('');
    const [isDissolving, setIsDissolving] = useState(false);

    const handleDissolve = async () => {
        if (!text.trim()) return;

        setIsDissolving(true);

        // Wait for animation
        setTimeout(async () => {
            await addVent(text);
            setText('');
            setIsDissolving(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-organic-dark flex flex-col items-center justify-center p-6 pb-24">
            <div className="max-w-md w-full flex flex-col items-center gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                >
                    <h1 className="text-3xl font-bold text-organic-beige font-arabic">مساحة للتفريغ</h1>
                    <p className="text-organic-border text-sm">اكتب ما يثقل قلبك.. ثم دعه يتبخر</p>
                </motion.div>

                <div className="relative w-full aspect-square">
                    <AnimatePresence>
                        {!isDissolving ? (
                            <motion.textarea
                                key="input"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{
                                    opacity: 0,
                                    scale: 1.1,
                                    filter: 'blur(20px)',
                                    transition: { duration: 2 }
                                }}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="اكتب هنا..."
                                className="w-full h-full bg-organic-gray/30 border border-organic-border rounded-3xl p-6 text-organic-beige resize-none focus:border-organic-pink/50 focus:outline-none transition-all placeholder:text-organic-border/30 font-arabic leading-relaxed"
                            />
                        ) : (
                            <motion.div
                                key="particles"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="text-organic-green/50 font-english animate-pulse">
                                    Dissolving...
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDissolve}
                    disabled={!text.trim() || isDissolving}
                    className={`px-8 py-3 rounded-full font-bold transition-all ${text.trim() && !isDissolving
                            ? 'bg-organic-pink text-white shadow-lg shadow-organic-pink/20'
                            : 'bg-organic-gray text-organic-border cursor-not-allowed'
                        }`}
                >
                    {isDissolving ? '...' : 'تفريغ'}
                </motion.button>
            </div>
        </div>
    );
}
