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
    name: "Legs",
    exercises: [
      {
        name: "Goblet Squat (15kg+polsiere) x10",
        duration: 60,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 60,
      },
      {
        name: "Romanian Deadlift (15kg manubri) x10",
        duration: 60,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 60,
      },
      {
        name: "Forward Lunges x12 per gamba",
        duration: 60,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 60,
      },
      {
        name: "Wall Sit",
        duration: 60,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 60,
      },
    ],
    afterSetRest: 120,
  },
  {
    name: "Full Body + Core",
    exercises: [
      { name: "Push-Up", duration: 45, afterExerciseRest: 30 },
      { name: "Plank", duration: 60, afterExerciseRest: 30 },
      { name: "Mountain Climbers", duration: 40, afterExerciseRest: 30 },
    ],
    afterSetRest: 90,
  },
];
