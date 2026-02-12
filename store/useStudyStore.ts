import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Subject, Mission } from '@/types';
import { studyData as initialData } from '@/data/studyData';
import { supabase } from '@/lib/supabase';

interface StudyState {
    studyPlan: Subject[];
    completedMissions: Record<string, boolean>;
    userId: string | null;

    // Actions
    setUserId: (id: string | null) => void;
    toggleMission: (missionId: string) => void;
    updateMission: (subjectId: string, missionId: string, updates: Partial<Mission>) => void;
    updateSubject: (subjectId: string, updates: Partial<Subject>) => void;
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

            setUserId: (id) => set({ userId: id }),

            toggleMission: (missionId: string) => {
                set((state: StudyState) => {
                    const newCompleted = {
                        ...state.completedMissions,
                        [missionId]: !state.completedMissions[missionId],
                    };
                    const updatedState = { completedMissions: newCompleted };
                    // Trigger async sync
                    setTimeout(() => get().syncToCloud(), 1000);
                    return updatedState;
                });
            },

            updateMission: (subjectId: string, missionId: string, updates: Partial<Mission>) => {
                set((state: StudyState) => {
                    const newPlan = state.studyPlan.map((sub: Subject) => {
                        if (sub.id !== subjectId) return sub;

                        let updatedSub = { ...sub };

                        if (updatedSub.missions) {
                            updatedSub.missions = updatedSub.missions.map((m: Mission) =>
                                m.id === missionId ? { ...m, ...updates } : m
                            );
                        }

                        if (updatedSub.units) {
                            updatedSub.units = updatedSub.units.map((u: any) => ({
                                ...u,
                                missions: u.missions.map((m: Mission) =>
                                    m.id === missionId ? { ...m, ...updates } : m
                                )
                            }));
                        }

                        if (updatedSub.sections) {
                            updatedSub.sections = updatedSub.sections.map((s: any) => ({
                                ...s,
                                missions: s.missions.map((m: Mission) =>
                                    m.id === missionId ? { ...m, ...updates } : m
                                )
                            }));
                        }

                        return updatedSub;
                    });

                    setTimeout(() => get().syncToCloud(), 1000);
                    return { studyPlan: newPlan };
                });
            },

            updateSubject: (subjectId: string, updates: Partial<Subject>) => {
                set((state: StudyState) => {
                    const newPlan = state.studyPlan.map((sub: Subject) =>
                        sub.id === subjectId ? { ...sub, ...updates } : sub
                    );
                    setTimeout(() => get().syncToCloud(), 1000);
                    return { studyPlan: newPlan };
                });
            },

            resetPlan: () => set({ studyPlan: initialData, completedMissions: {} }),

            syncToCloud: async () => {
                const { userId, studyPlan, completedMissions } = get();
                if (!userId) return;

                try {
                    const { error } = await supabase
                        .from('user_plans')
                        .upsert({
                            user_id: userId,
                            plan_data: studyPlan,
                            progress_data: completedMissions,
                            updated_at: new Date().toISOString()
                        }, { onConflict: 'user_id' });

                    if (error) throw error;
                    console.log('✅ Synced to Supabase');
                } catch (err) {
                    console.error('❌ Sync failed:', err);
                }
            },

            pullFromCloud: async () => {
                const { userId } = get();
                if (!userId) return;

                try {
                    const { data, error } = await supabase
                        .from('user_plans')
                        .select('*')
                        .eq('user_id', userId)
                        .single();

                    if (error && error.code !== 'PGRST116') throw error;

                    if (data) {
                        set({
                            studyPlan: data.plan_data,
                            completedMissions: data.progress_data
                        });
                        console.log('✅ Loaded from Supabase');
                    }
                } catch (err) {
                    console.error('❌ Pull failed:', err);
                }
            }
        }),
        {
            name: 'enji-v3-storage',
            storage: createJSONStorage(() => {
                if (typeof window !== 'undefined') {
                    return localStorage;
                }
                return {
                    getItem: () => null,
                    setItem: () => { },
                    removeItem: () => { },
                };
            }),
        }
    )
);
