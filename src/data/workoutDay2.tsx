// File: dayB.ts
import { Set } from "@/types/types";

export const workoutPhases: Set[] = [
  {
    name: "Warmup",
    exercises: [
      {
        name: "Jump Rope",
        duration: 60,
        repetition: 5,
        interRepetitionRest: 20,
      },
    ],
    afterSetRest: 90,
  },
  {
    name: "Back & Biceps",
    exercises: [
      {
        name: "Dumbbell Row (15kg+polsiere) x8-12",
        duration: 60,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 60,
      },
      {
        name: "Superman Hold",
        duration: 20,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 45,
      },
      {
        name: "Hammer Curl (10kg+polsiere) x10",
        duration: 45,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 30,
      },
      {
        name: "Zottman Curl (7kg) x10",
        duration: 45,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 30,
      },
      {
        name: "Face Pull (elastico) x15",
        duration: 30,
        repetition: 3,
        interRepetitionRest: 20,
        afterExerciseRest: 30,
      },
    ],
    afterSetRest: 120,
  },
  {
    name: "Core",
    exercises: [
      { name: "Leg Raise", duration: 40, afterExerciseRest: 20 },
      { name: "Russian Twist", duration: 40, afterExerciseRest: 20 },
      { name: "Side Plank", duration: 30, afterExerciseRest: 20 },
    ],
    afterSetRest: 90,
  },
];
