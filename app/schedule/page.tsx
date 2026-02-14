'use client';

import { motion } from 'framer-motion';
import { useStudyStore } from '@/store/useStudyStore';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { format, addDays, startOfWeek } from 'date-fns';
import { ar } from 'date-fns/locale';

// Schedule Logic
const SCHEDULE = {
    'Saturday': { subject: 'English', color: 'text-organic-pink', bg: 'bg-organic-pink/10' },
    'Sunday': { subject: 'Chemistry', color: 'text-organic-green', bg: 'bg-organic-green/10' },
    'Monday': { subject: 'Math', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    'Tuesday': { subject: 'Arabic', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    'Wednesday': { subject: 'Physics', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    'Thursday': { subject: 'Math', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    'Friday': { subject: 'Physics', color: 'text-purple-400', bg: 'bg-purple-400/10' },
};

const DAYS_ORDER = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function SchedulePage() {
    const { subjects } = useStudyStore();

    // Helper to get formatted date for the upcoming/current week days
    // We assume week starts on Saturday for this schedule
    const today = new Date();
    // Logic to map days to dates is a bit complex without a strict library, 
    // but for display we can just list the schedule as a static plan + active indicator

    const currentDayName = format(today, 'EEEE'); // e.g., 'Monday'

    return (
        <div className="min-h-screen bg-organic-dark p-6 pb-24 font-arabic">
            <header className="mb-8 pt-12">
                <h1 className="text-4xl font-bold text-organic-beige mb-2">الجدول الأسبوعي</h1>
                <p className="text-organic-border">التزم بالخطة لتصل إلى هدفك 🚀</p>
            </header>

            <div className="space-y-4">
                {DAYS_ORDER.map((day, index) => {
                    const info = SCHEDULE[day as keyof typeof SCHEDULE];
                    const isToday = currentDayName === day;

                    return (
                        <motion.div
                            key={day}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${isToday
                                    ? 'bg-organic-gray/80 border-organic-green shadow-[0_0_15px_rgba(0,200,83,0.1)]'
                                    : 'bg-organic-gray/20 border-organic-border/10'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${isToday ? 'bg-organic-green text-black' : 'bg-organic-border/10 text-organic-border'
                                    }`}>
                                    {day.slice(0, 3)}
                                </div>
                                <div>
                                    <h3 className={`font-bold text-lg ${isToday ? 'text-white' : 'text-organic-beige/70'}`}>
                                        {info.subject}
                                    </h3>
                                    <span className="text-xs text-organic-border/50 font-english">
                                        {/* Placeholder time or details */}
                                        08:00 AM - 12:00 PM
                                    </span>
                                </div>
                            </div>

                            {isToday && (
                                <div className="px-3 py-1 bg-organic-green/20 text-organic-green rounded-full text-xs font-bold animate-pulse">
                                    اليوم
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
