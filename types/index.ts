export interface Mission {
    id: string;
    title: string;
    content: string;
    duration: string;
    method?: string;
    outcome?: string;
    completed: boolean;
    links?: {
        notebook?: string;
        questions?: string;
    };
}

export interface Unit {
    name: string;
    missions: Mission[];
}

export interface Section {
    name: string;
    missions: Mission[];
}

export interface Subject {
    id: string;
    name: string;
    icon: string;
    theme: {
        primary: string;
        gradient: string;
        scientist: string;
    };
    lessonDay?: string;
    lessonDays?: string[];
    missions?: Mission[];
    units?: Unit[];
    sections?: Section[];
    scheduleImage?: string;
}

export interface StudyPlan {
    subjects: Subject[];
    philosophy: {
        title: string;
        principles: string[];
    };
}
