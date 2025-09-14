
"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type Student = {
    name: string;
    email: string;
    age: number;
    collegeYear: string;
    collegeName: string;
    avatar: string;
    wellnessHistory: WellnessEntry[];
};

type WellnessEntry = {
    month: string;
    phq9: number;
    gad7: number;
    ghq12: number;
};

type Counselor = {
    name: string;
    specialty: string;
    image: string;
};

type Appointment = {
    counselor: Counselor;
    date: string; // ISO string
};

const scoreInterpretations = {
  phq9: {
    levels: { "0-4": "Minimal", "5-9": "Mild", "10-14": "Moderate", "15-19": "Moderately Severe", "20-27": "Severe" },
  },
  gad7: {
    levels: { "0-4": "Minimal", "5-9": "Mild", "10-14": "Moderate", "15-21": "Severe" },
  },
  ghq12: {
    levels: { "0-11": "Healthy", "12-19": "Some Distress", "20-36": "Significant Distress" },
  },
};

type AppContextType = {
    student: Student;
    setStudent: React.Dispatch<React.SetStateAction<Student>>;
    appointments: Appointment[];
    addAppointment: (appointment: Appointment) => void;
    addWellnessEntry: (entry: WellnessEntry) => void;
    getInterpretation: (type: 'phq9' | 'gad7' | 'ghq12', score: number) => string;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialWellnessHistory: WellnessEntry[] = [
    // This could be pre-populated or fetched, but for now, onboarding will add the first entry.
];

export function AppContextProvider({ children }: { children: ReactNode }) {
    const [student, setStudent] = useState<Student>({
        name: "Student User",
        email: "student@flourishu.edu",
        age: 0,
        collegeYear: "",
        collegeName: "",
        avatar: "https://picsum.photos/seed/user/100/100",
        wellnessHistory: initialWellnessHistory,
    });
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const addAppointment = (appointment: Appointment) => {
        setAppointments(prev => [...prev, appointment]);
    };

    const addWellnessEntry = useCallback((entry: WellnessEntry) => {
        setStudent(prev => ({
            ...prev,
            // Simple addition of the new entry to the history array
            wellnessHistory: [...prev.wellnessHistory, entry]
        }));
    }, []);

    const getInterpretation = useCallback((type: 'phq9' | 'gad7' | 'ghq12', score: number) => {
      const interpretation = scoreInterpretations[type];
      for (const range in interpretation.levels) {
        const [min, max] = range.split('-').map(Number);
        if (score >= min && score <= max) {
          return interpretation.levels[range as keyof typeof interpretation.levels];
        }
      }
      return "N/A";
    }, []);

    return (
        <AppContext.Provider value={{ student, setStudent, appointments, addAppointment, addWellnessEntry, getInterpretation }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
}
