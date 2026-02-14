'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, Sparkles, Brain, HeartPulse } from 'lucide-react';
import { analyzeVent } from '@/app/actions/ai';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function AnalysisEngine() {
    const [ventText, setVentText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<{ feedback: string; mood: string } | null>(null);

    const handleAnalyze = async () => {
        if (!ventText.trim()) return;
        setIsAnalyzing(true);
        setAnalysis(null);

        try {
            // 1. Get AI Analysis
            const result = await analyzeVent(ventText);
            setAnalysis(result);

            // 2. Save to Supabase
            const { error } = await supabase.from('venting_logs').insert({
                content: ventText,
                feedback: result.feedback,
                mood: result.mood,
                sentiment_score: result.sentiment_score
            });

            if (error) throw error;
            toast.success('Your thoughts have been processed.');

        } catch (error) {
            console.error(error);
            toast.error('Failed to connect to Rafeeq Core.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="relative">
                <div className="absolute inset-0 bg-sage-glow blur-3xl opacity-20" />
                <textarea
                    value={ventText}
                    onChange={(e) => setVentText(e.target.value)}
                    placeholder="Speak your mind... Physics got you down? Feeling overwhelmed?"
                    className="w-full h-48 bg-obsidian-card border border-white/10 rounded-3xl p-6 text-lg text-sage-dim placeholder:text-white/20 focus:outline-none focus:border-sage-DEFAULT/50 resize-none transition-all"
                />

                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                        <Mic className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing || !ventText}
                        className="px-6 py-3 rounded-full bg-sage-DEFAULT text-black font-bold flex items-center gap-2 hover:bg-sage-dim disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isAnalyzing ? (
                            <>
                                <Sparkles className="w-5 h-5 animate-spin" />
                                <span className="text-sm uppercase tracking-wider">Analyzing...</span>
                            </>
                        ) : (
                            <>
                                <Brain className="w-5 h-5" />
                                <span className="text-sm uppercase tracking-wider">Analyze</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {analysis && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-obsidian-surface border border-sage-DEFAULT/20 rounded-3xl p-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sage-glow blur-[80px]" />

                        <div className="flex items-start gap-4 mb-6">
                            <div className="p-3 bg-sage-DEFAULT/10 rounded-xl">
                                <HeartPulse className="w-6 h-6 text-sage-DEFAULT" />
                            </div>
                            <div>
                                <h3 className="text-xl font-english text-white">Rafeeq's Insight</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs font-bold uppercase text-white/30 tracking-widest">Detected Mood:</span>
                                    <span className="text-xs font-bold uppercase text-sage-dim tracking-widest">{analysis.mood}</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-lg text-sage-dim leading-relaxed font-english">
                            "{analysis.feedback}"
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
