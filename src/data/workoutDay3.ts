import { WorkoutSet } from "@/types/types";
export const workoutType: WorkoutSet[] = [
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
    name: "Legs",
    exercises: [
      {
        name: "Goblet Squat x 12 (15kg+polsiere, tempo 3-0-1)",
        duration: 60,
        repetition: 4,
        interRepetitionRest: 30,
        afterExerciseRest: 60,
      },
      {
        name: "Romanian Deadlift x 10 (15kg manubri)",
        duration: 60,
        repetition: 4,
        interRepetitionRest: 30,
        afterExerciseRest: 60,
      },
      {
        name: "Bulgarian Split Squat x8 (10-15kg)",
        duration: 120,
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
      {
        name: "Push-Up to max (target 10 rip)",
        duration: 45,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 30,
      },
      {
        name: "Russian Twist (peso leggero) x 10 x side",
        duration: 40,
        repetition: 3,
        interRepetitionRest: 20,
        afterExerciseRest: 20,
      },
    ],
    afterSetRest: 90,
  },
];
