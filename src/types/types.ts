export type Exercise = {
    name: string;
    duration: number;
    repetition?: number | null;
    interRepetitionRest?: number | null;
    afterExerciseRest?: number | null;
}

export type Set = {
    name: string;
    exercises: Exercise[];
    afterSetRest?: number | null;
    repetition?: number | null;
}

export type Phase = "exercise" | "exercise-rest" | "set-rest" | "inter-rep-rest" | "finished";