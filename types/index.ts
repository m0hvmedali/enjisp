export type Role = 'admin' | 'user';

export interface Profile {
    id: string;
    full_name: string | null;
    role: Role;
    avatar_url: string | null;
    created_at: string;
}

export interface Subject {
    id: string;
    name: string;
    day_of_week: string | null; // e.g. 'Monday'
    image_url: string | null; // Cinematic background
    created_at?: string;
}

export interface Unit {
    id: string;
    subject_id: string;
    title: string;
    order: number;
    created_at?: string;
    missions?: Mission[]; // For flexible fetching
}

export interface Mission {
    id: string;
    subject_id: string;
    unit_id?: string | null;
    title: string;
    description: string | null;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    is_completed: boolean; // Keep for backward compatibility or computed
    progress: number; // 0-100
    notebook_link: string | null;
    archive_link: string | null;
    deadline?: string | null;
    estimated_time?: number | null; // minutes
    actual_time?: number | null; // minutes
    type: 'study' | 'solve' | 'revision';
    created_at?: string;
}

export interface SubjectWithUnits extends Subject {
    units: Unit[];
    missions: Mission[]; // Direct missions (orphaned) or all missions flat
}

export interface VentLog {
    id: string;
    user_id: string;
    content: string;
    created_at: string;
}

export interface Wish {
    id: string;
    user_id: string;
    title: string;
    completed: boolean;
    week_start_date: string;
    created_at: string;
}

// Frontend helper types (aggregations)
export interface SubjectWithMissions extends Subject {
    missions: Mission[];
    progress?: number; // Calculated on frontend
}
