// File: dayA.ts
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
    name: "Chest & Shoulders",
    exercises: [
      {
        name: "Dumbbell Chest Press (10-15kg) slow 4-1",
        duration: 60,
        repetition: 4,
        interRepetitionRest: 30,
        afterExerciseRest: 60,
      },
      {
        name: "Push-Up (Decline/Standard) max (target 8-12 rip)",
        duration: 45,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 60,
      },
      {
        name: "Dumbbell Pullover x 12 (10-15kg)",
        duration: 60,
        repetition: 4,
        interRepetitionRest: 30,
        afterExerciseRest: 60,
      },
      {
        name: "Shoulder Press (15kg) (target 8-10 rip) slow 4-1",
        duration: 60,
        repetition: 4,
        interRepetitionRest: 30,
        afterExerciseRest: 60,
      },
      {
        name: "Lateral Raise x 15(7kg/elastico)",
        duration: 45,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 30,
      },
    ],
    afterSetRest: 120,
  },
  {
    name: "Core",
    exercises: [
      {
        name: "Plank to Push-Up x 10",
        duration: 45,
        repetition: 3,
        interRepetitionRest: 30,
      },
    ],
    afterSetRest: 90,
  },
];
