// File: dayB.ts
import { Set } from "@/types/types";

export const workoutPhases: Set[] = [
  {
    name: "Warmup",
    exercises: [{ name: "Jump Rope", duration: 120 }],
    afterSetRest: 90,
  },
  {
    name: "Back & Biceps",
    exercises: [
      {
        name: "1-Arm Dumbbell Row (15kg + polsiere) (target 8-10 rip)",
        duration: 120,
        repetition: 4,
        interRepetitionRest: 30,
        afterExerciseRest: 60,
      },
      {
        name: "Face Pull x 15 (elastico alto)",
        duration: 45,
        repetition: 3,
        interRepetitionRest: 20,
        afterExerciseRest: 30,
      },
      {
        name: "Hammer Curl x 12 (10kg + polsiere)",
        duration: 45,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 30,
      },
      {
        name: "Zottman Curl x 12 (7kg)",
        duration: 45,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 30,
      },
      {
        name: "Superman Hold",
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
      {
        name: "Leg Raise x12",
        repetition: 3,
        duration: 40,
        afterExerciseRest: 20,
      },
    ],
    afterSetRest: 90,
  },
];
