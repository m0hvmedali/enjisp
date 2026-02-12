import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Subject, Mission } from '@/types';
import { studyData as initialData } from '@/data/studyData';

interface StudyState {
    studyPlan: Subject[];
    completedMissions: Record<string, boolean>;

    // Actions
    toggleMission: (missionId: string) => void;
    updateMission: (subjectId: string, missionId: string, updates: Partial<Mission>) => void;
    addMission: (subjectId: string, unitName: string | null, newMission: Mission) => void;
    deleteMission: (subjectId: string, missionId: string) => void;
    updateSubject: (subjectId: string, updates: Partial<Subject>) => void;
    resetPlan: () => void;
}

export const useStudyStore = create<StudyState>()(
    persist(
        (set) => ({
            studyPlan: initialData,
            completedMissions: {},

            toggleMission: (missionId: string) => {
                set((state: StudyState) => ({
                    completedMissions: {
                        ...state.completedMissions,
                        [missionId]: !state.completedMissions[missionId],
                    },
                }));
            },

            updateMission: (subjectId: string, missionId: string, updates: Partial<Mission>) => {
                set((state: StudyState) => ({
                    studyPlan: state.studyPlan.map((sub: Subject) => {
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
                    })
                }));
            },

            addMission: (subjectId: string, unitName: string | null, newMission: Mission) => {
                // Optional: Implementation for adding missions
            },

            deleteMission: (subjectId: string, missionId: string) => {
                // Optional: Implementation for deleting missions
            },

            updateSubject: (subjectId: string, updates: Partial<Subject>) => {
                set((state: StudyState) => ({
                    studyPlan: state.studyPlan.map((sub: Subject) =>
                        sub.id === subjectId ? { ...sub, ...updates } : sub
                    )
                }));
            },

            resetPlan: () => set({ studyPlan: initialData }),
        }),
        {
            name: 'enji-v2-storage',
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
