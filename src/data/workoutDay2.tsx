// File: dayB.ts
import { Set } from "@/types/types";

export const workoutPhases: Set[] = [
  {
    name: "Back Stretch",
    exercises: [
      { name: "Bottom-to-Heels Stretch x10", duration: 60 },
      { name: "Opposite Arm/Leg Raises x10", duration: 60 },
      { name: "Back Extensions x10", duration: 60 },
      { name: "Bridge x10", duration: 60 },
      { name: "Knee Roll x10", duration: 60 },
    ],
    afterSetRest: 20,
  },
  {
    name: "Warmup",
    exercises: [
      {
        name: "Jump Rope",
        duration: 60,
        repetition: 5,
        interRepetitionRest: 30,
      },
    ],
    afterSetRest: 120,
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
      {
        name: "Single Leg Raise",
        repetition: 3,
        duration: 40,
        afterExerciseRest: 20,
      },
    ],
  },
];
