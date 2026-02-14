import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Profile, SubjectWithUnits, Wish, VentLog, Mission } from '@/types';
import toast from 'react-hot-toast';

interface StudyState {
    user: Profile | null;
    subjects: SubjectWithUnits[];
    wishes: Wish[];
    ventLogs: VentLog[];
    isLoading: boolean;

    // Actions
    fetchUser: (userId: string) => Promise<void>;
    setUser: (profile: Profile | null) => void;
    fetchPlan: () => Promise<void>;

    // Mission Actions
    toggleMission: (missionId: string, currentStatus: boolean, currentProgress: number) => Promise<void>;
    updateMissionProgress: (missionId: string, progress: number) => Promise<void>;

    // Admin Actions (V2)
    createSubject: (name: string, day: string, icon: string) => Promise<void>;
    createUnit: (subjectId: string, title: string, order: number) => Promise<void>;
    createMission: (mission: Partial<Mission>) => Promise<void>;
    deleteItem: (table: 'subjects' | 'units' | 'missions', id: string) => Promise<void>;

    // Wish Actions
    fetchWishes: () => Promise<void>;
    addWish: (title: string, date: string) => Promise<void>;
    toggleWish: (id: string, currentStatus: boolean) => Promise<void>;

    // Vent Actions
    addVent: (content: string) => Promise<void>;
}

export const useStudyStore = create<StudyState>((set, get) => ({
    user: null,
    subjects: [],
    wishes: [],
    ventLogs: [],
    isLoading: false,

    setUser: (profile) => set({ user: profile }),

    fetchUser: async (userId) => {
        set({ isLoading: true });
        const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
        if (error) { set({ user: null, isLoading: false }); return; }
        set({ user: data as Profile, isLoading: false });
        get().fetchPlan();
        get().fetchWishes();
    },

    fetchPlan: async () => {
        const { data: subjects } = await supabase.from('subjects').select('*').order('name');
        const { data: units } = await supabase.from('units').select('*').order('order');
        const { data: missions } = await supabase.from('missions').select('*');

        if (!subjects) return;

        const mergedSubjects: SubjectWithUnits[] = subjects.map(sub => {
            const subUnits = (units || []).filter(u => u.subject_id === sub.id);
            const subMissions = (missions || []).filter(m => m.subject_id === sub.id);

            return {
                ...sub,
                units: subUnits.map(u => ({ ...u })),
                missions: subMissions
            };
        });
        set({ subjects: mergedSubjects });
    },

    toggleMission: async (missionId, currentStatus, currentProgress) => {
        const newStatus = !currentStatus;
        const newProgress = newStatus ? 100 : (currentProgress === 100 ? 0 : currentProgress);
        // Optimistic
        set(state => ({
            subjects: state.subjects.map(sub => ({
                ...sub,
                missions: sub.missions.map(m => m.id === missionId ? { ...m, is_completed: newStatus, progress: newProgress } : m)
            }))
        }));
        await supabase.from('missions').update({ is_completed: newStatus, progress: newProgress }).eq('id', missionId);
    },

    updateMissionProgress: async (missionId, progress) => {
        const isCompleted = progress === 100;
        set(state => ({
            subjects: state.subjects.map(sub => ({
                ...sub,
                missions: sub.missions.map(m => m.id === missionId ? { ...m, progress, is_completed: isCompleted } : m)
            }))
        }));
        await supabase.from('missions').update({ progress, is_completed: isCompleted }).eq('id', missionId);
    },

    createSubject: async (name, day, icon) => {
        await supabase.from('subjects').insert({ name, day_of_week: day });
        get().fetchPlan();
    },
    createUnit: async (subjectId, title, order) => {
        await supabase.from('units').insert({ subject_id: subjectId, title, order });
        get().fetchPlan();
    },
    createMission: async (mission) => {
        await supabase.from('missions').insert(mission);
        get().fetchPlan();
    },
    deleteItem: async (table, id) => {
        await supabase.from(table).delete().eq('id', id);
        get().fetchPlan();
    },

    fetchWishes: async () => {
        const user = get().user;
        if (!user) return;
        const { data } = await supabase.from('wishes').select('*').eq('user_id', user.id);
        if (data) set({ wishes: data });
    },
    addWish: async (title, date) => {
        const user = get().user;
        if (!user) return;
        const { data } = await supabase.from('wishes').insert({ user_id: user.id, title, week_start_date: date }).select().single();
        if (data) set(state => ({ wishes: [data, ...state.wishes] }));
    },
    toggleWish: async (id, currentStatus) => {
        set(state => ({ wishes: state.wishes.map(w => w.id === id ? { ...w, completed: !currentStatus } : w) }));
        await supabase.from('wishes').update({ completed: !currentStatus }).eq('id', id);
    },
    addVent: async (content) => {
        const user = get().user;
        await supabase.from('venting_logs').insert({ user_id: user?.id, content });
    }
}));
