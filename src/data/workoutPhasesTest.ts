import { WorkoutSet } from "@/types/types";

export const workoutType: WorkoutSet[] = [
  {
    name: "Warm Up",
    repetition: 1,
    afterSetRest: 3,
    exercises: [
      {
        name: "Jumping Jacks",
        duration: 5,
        interRepetitionRest: 5,
        afterExerciseRest: 2,
        repetition: 3,
      },
      { name: "Arm Circles", duration: 6, afterExerciseRest: 5 },
    ],
  },
  {
    name: "Main Set",
    repetition: 2,
    afterSetRest: 8,
    exercises: [
      { name: "Push Ups", duration: 4 },
      { name: "Squats", duration: 6 },
    ],
  },
  {
    name: "Repetition Set",
    repetition: 1,
    afterSetRest: 5,
    exercises: [
      { name: "Yooooo", duration: 4, repetition: 5 },
      { name: "AHH OOHH", duration: 6, repetition: 2 },
    ],
  },
];
