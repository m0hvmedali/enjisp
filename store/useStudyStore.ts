import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface StudyState {
    completedMissions: Record<string, boolean>;
    toggleMission: (missionId: string) => void;
    getProgress: (subjectId: string, allMissions: string[]) => number;
}

export const useStudyStore = create<StudyState>()(
    persist(
        (set, get) => ({
            completedMissions: {},

            toggleMission: (missionId: string) => {
                set((state) => ({
                    completedMissions: {
                        ...state.completedMissions,
                        [missionId]: !state.completedMissions[missionId],
                    },
                }));
            },

            getProgress: (subjectId: string, allMissions: string[]) => {
                const { completedMissions } = get();
                const subjectMissions = allMissions.filter((id) =>
                    id.startsWith(subjectId) && completedMissions[id]
                );
                return allMissions.length > 0
                    ? (subjectMissions.length / allMissions.length) * 100
                    : 0;
            },
        }),
        {
            name: 'enji-study-storage',
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
