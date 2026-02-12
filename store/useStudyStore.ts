import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Subject, Mission } from '@/types';
import { studyData as initialData } from '@/data/studyData';
import { supabase } from '@/lib/supabase';

interface Wish {
    id: string;
    text: string;
    completed: boolean;
    createdAt: string;
}

interface VentLog {
    id: string;
    text: string;
    createdAt: string;
    mood: string;
}

interface TimelineEvent {
    id: string;
    title: string;
    type: 'mission' | 'wish' | 'vent';
    createdAt: string;
}

interface StudyState {
    studyPlan: Subject[];
    completedMissions: Record<string, boolean>;
    userId: string | null;
    userName: 'Mohamed' | 'Enji' | null;
    wishes: Wish[];
    ventLogs: VentLog[];
    timeline: TimelineEvent[];

    // Actions
    setUserId: (id: string | null) => void;
    setUserName: (name: 'Mohamed' | 'Enji' | null) => void;
    toggleMission: (missionId: string) => void;
    updateMission: (subjectId: string, missionId: string, updates: Partial<Mission>) => void;
    updateSubject: (subjectId: string, updates: Partial<Subject>) => void;
    addWish: (text: string) => void;
    toggleWish: (id: string) => void;
    addVent: (text: string, mood: string) => void;
    resetPlan: () => void;

    // Cloud Sync
    syncToCloud: () => Promise<void>;
    pullFromCloud: () => Promise<void>;
}

export const useStudyStore = create<StudyState>()(
    persist(
        (set, get) => ({
            studyPlan: initialData,
            completedMissions: {},
            userId: null,
            userName: null,
            wishes: [],
            ventLogs: [],
            timeline: [],

            setUserId: (id) => set({ userId: id }),
            setUserName: (name) => {
                set({ userName: name, userId: name ? `user_${name.toLowerCase()}` : null });
                if (name) get().pullFromCloud();
            },

            toggleMission: (missionId: string) => {
                set((state) => {
                    const newCompleted = {
                        ...state.completedMissions,
                        [missionId]: !state.completedMissions[missionId],
                    };

                    // Add to timeline if completing
                    let newTimeline = [...state.timeline];
                    if (!state.completedMissions[missionId]) {
                        newTimeline.unshift({
                            id: Math.random().toString(36).substr(2, 9),
                            title: `أكملت مهمة دراسية بنجاح! 🎉`,
                            type: 'mission' as const,
                            createdAt: new Date().toISOString()
                        });
                    }

                    setTimeout(() => get().syncToCloud(), 1000);
                    return { completedMissions: newCompleted, timeline: newTimeline.slice(0, 50) };
                });
            },

            addWish: (text) => {
                set((state) => ({
                    wishes: [
                        { id: Math.random().toString(36).substr(2, 9), text, completed: false, createdAt: new Date().toISOString() },
                        ...state.wishes
                    ]
                }));
                get().syncToCloud();
            },

            toggleWish: (id) => {
                set((state) => ({
                    wishes: state.wishes.map(w => w.id === id ? { ...w, completed: !w.completed } : w)
                }));
                get().syncToCloud();
            },

            addVent: (text, mood) => {
                set((state) => ({
                    ventLogs: [
                        { id: Math.random().toString(36).substr(2, 9), text, mood, createdAt: new Date().toISOString() },
                        ...state.ventLogs
                    ],
                    timeline: [
                        { id: Math.random().toString(36).substr(2, 9), title: `فرغت عما بداخلي.. أشعر بـ ${mood}`, type: 'vent' as const, createdAt: new Date().toISOString() },
                        ...state.timeline
                    ].slice(0, 50)
                }));
                get().syncToCloud();
            },

            updateMission: (subjectId, missionId, updates) => {
                set((state) => {
                    const newPlan = state.studyPlan.map((sub: Subject) => {
                        if (sub.id !== subjectId) return sub;
                        let updatedSub = { ...sub };
                        if (updatedSub.missions) updatedSub.missions = updatedSub.missions.map(m => m.id === missionId ? { ...m, ...updates } : m);
                        if (updatedSub.units) updatedSub.units = updatedSub.units.map(u => ({ ...u, missions: u.missions.map(m => m.id === missionId ? { ...m, ...updates } : m) }));
                        if (updatedSub.sections) updatedSub.sections = updatedSub.sections.map(s => ({ ...s, missions: s.missions.map(m => m.id === missionId ? { ...m, ...updates } : m) }));
                        return updatedSub;
                    });
                    setTimeout(() => get().syncToCloud(), 1000);
                    return { studyPlan: newPlan };
                });
            },

            updateSubject: (subjectId, updates) => {
                set((state) => {
                    const newPlan = state.studyPlan.map((sub: Subject) => sub.id === subjectId ? { ...sub, ...updates } : sub);
                    setTimeout(() => get().syncToCloud(), 1000);
                    return { studyPlan: newPlan };
                });
            },

            resetPlan: () => set({ studyPlan: initialData, completedMissions: {}, wishes: [], ventLogs: [], timeline: [] }),

            syncToCloud: async () => {
                const { userId, studyPlan, completedMissions, wishes, ventLogs, timeline, userName } = get();
                if (!userId) return;
                try {
                    await supabase.from('user_plans').upsert({
                        user_id: userId,
                        plan_data: studyPlan,
                        progress_data: { completedMissions, wishes, ventLogs, timeline, userName },
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_id' });
                } catch (err) { console.error(err); }
            },

            pullFromCloud: async () => {
                const { userId } = get();
                if (!userId) return;
                try {
                    const { data } = await supabase.from('user_plans').select('*').eq('user_id', userId).single();
                    if (data) {
                        const progress = data.progress_data;
                        set({
                            studyPlan: data.plan_data,
                            completedMissions: progress.completedMissions || {},
                            wishes: progress.wishes || [],
                            ventLogs: progress.ventLogs || [],
                            timeline: progress.timeline || [],
                            userName: progress.userName || null
                        });
                    }
                } catch (err) { console.error(err); }
            }
        }),
        {
            name: 'enji-v4-google-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
