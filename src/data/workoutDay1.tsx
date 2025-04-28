// File: dayA.ts
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
    name: "Chest & Shoulders",
    exercises: [
      {
        name: "Dumbbell Chest Press (10-15kg) x8-12",
        duration: 60,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 60,
      },
      {
        name: "Push-Up (Decline/Standard) x8-12",
        duration: 45,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 60,
      },
      {
        name: "Dumbbell Pullover (10-15kg) x10",
        duration: 60,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 60,
      },
      {
        name: "Shoulder Press (15kg) x8-12",
        duration: 60,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 60,
      },
    ],
    afterSetRest: 120,
  },
  {
    name: "Arms",
    exercises: [
      {
        name: "French Press x12 (10kg+polsiere)",
        duration: 45,
        afterExerciseRest: 30,
      },
      {
        name: "Diamond Push-Up x max reps",
        duration: 45,
        afterExerciseRest: 30,
      },
    ],
    afterSetRest: 90,
  },
  {
    name: "Core",
    exercises: [
      { name: "Plank", duration: 60, afterExerciseRest: 20 },
      { name: "Mountain Climbers", duration: 40, afterExerciseRest: 20 },
      { name: "Boat Pose", duration: 40, afterExerciseRest: 20 },
    ],
    afterSetRest: 90,
  },
];
