import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Profile, SubjectWithMissions, Wish, VentLog, Mission } from '@/types';
import toast from 'react-hot-toast';

interface StudyState {
    user: Profile | null;
    subjects: SubjectWithMissions[];
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

    // Wish Actions
    fetchWishes: () => Promise<void>;
    addWish: (title: string, date: string) => Promise<void>;
    toggleWish: (id: string, currentStatus: boolean) => Promise<void>;

    // Vent Actions
    addVent: (content: string) => Promise<void>;

    // Realtime Subscriptions
    subscribeToChanges: () => void;
    unsubscribe: () => void;
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
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user:', error);
            set({ user: null, isLoading: false });
            return;
        }

        set({ user: data as Profile, isLoading: false });
        // Fetch data after user is set
        get().fetchPlan();
        get().fetchWishes();
    },

    fetchPlan: async () => {
        const { data: subjects, error: subjError } = await supabase
            .from('subjects')
            .select('*')
            .order('name'); // Or order by day

        if (subjError) {
            console.error('Error fetching subjects:', subjError);
            return;
        }

        const { data: missions, error: missError } = await supabase
            .from('missions')
            .select('*');

        if (missError) {
            console.error('Error fetching missions:', missError);
            return;
        }

        // Merge logic
        const mergedSubjects: SubjectWithMissions[] = subjects.map(sub => ({
            ...sub,
            missions: missions.filter(m => m.subject_id === sub.id)
        }));

        set({ subjects: mergedSubjects });
    },

    toggleMission: async (missionId, currentStatus, currentProgress) => {
        // Optimistic update
        const newStatus = !currentStatus;
        const newProgress = newStatus ? 100 : (currentProgress === 100 ? 0 : currentProgress);

        set(state => ({
            subjects: state.subjects.map(sub => ({
                ...sub,
                missions: sub.missions.map(m =>
                    m.id === missionId ? { ...m, is_completed: newStatus, progress: newProgress } : m
                )
            }))
        }));

        const { error } = await supabase
            .from('missions')
            .update({ is_completed: newStatus, progress: newProgress })
            .eq('id', missionId);

        if (error) {
            toast.error('Failed to update mission');
            get().fetchPlan(); // Revert
        }
    },

    updateMissionProgress: async (missionId, progress) => {
        set(state => ({
            subjects: state.subjects.map(sub => ({
                ...sub,
                missions: sub.missions.map(m =>
                    m.id === missionId ? { ...m, progress: progress, is_completed: progress === 100 } : m
                )
            }))
        }));

        const { error } = await supabase
            .from('missions')
            .update({ progress: progress, is_completed: progress === 100 })
            .eq('id', missionId);

        if (error) toast.error('Failed to update progress');
    },

    fetchWishes: async () => {
        const user = get().user;
        if (!user) return;

        const { data, error } = await supabase
            .from('wishes')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (data) set({ wishes: data });
    },

    addWish: async (title, date) => {
        const user = get().user;
        if (!user) return;

        const { data, error } = await supabase
            .from('wishes')
            .insert({ user_id: user.id, title, week_start_date: date })
            .select()
            .single();

        if (data) {
            set(state => ({ wishes: [data, ...state.wishes] }));
            toast.success('Wish added successfully');
        }
    },

    toggleWish: async (id, currentStatus) => {
        set(state => ({
            wishes: state.wishes.map(w => w.id === id ? { ...w, completed: !currentStatus } : w)
        }));

        await supabase.from('wishes').update({ completed: !currentStatus }).eq('id', id);
    },

    addVent: async (content) => {
        const user = get().user;
        // Venting doesn't strictly require a user if we want anonymous venting, but schema says user_id is nullable.
        // If we want to capture history for Mohamed, we should send ID.

        const { error } = await supabase
            .from('venting_logs')
            .insert({ user_id: user?.id || null, content });

        if (!error) {
            toast.success('Dissolved into the void...', { icon: '🍃' });
        }
    },

    subscribeToChanges: () => {
        const channels = [
            supabase.channel('public:missions').on('postgres_changes', { event: '*', schema: 'public', table: 'missions' }, () => {
                get().fetchPlan();
            }).subscribe(),
            supabase.channel('public:wishes').on('postgres_changes', { event: '*', schema: 'public', table: 'wishes' }, () => {
                get().fetchWishes();
            }).subscribe()
        ];

        // Store channels to unsubscribe later if needed, or just rely on global singleton in simple app
    },

    unsubscribe: () => {
        supabase.removeAllChannels();
    }
}));
