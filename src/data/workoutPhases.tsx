import { Set } from "@/types/types";

export const workoutPhases: Set[] = [
  {
    name: "Warmup",
    exercises: [
      {
        name: "Jump Rope",
        duration: 60,
        repetition: 10,
        interRepetitionRest: 30,
      },
    ],
    afterSetRest: 120,
  },
  {
    name: "Back",
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
    name: "Abs 1",
    exercises: [
      {
        name: "Crunch",
        duration: 40,
        afterExerciseRest: 20,
      },
      {
        name: "Single Leg Raise",
        duration: 40,
        afterExerciseRest: 20,
      },
      {
        name: "Twist Crunch",
        duration: 40,
        afterExerciseRest: 20,
      },
      {
        name: "Leg Raise",
        duration: 40,
        afterExerciseRest: 20,
      },
      {
        name: "Russian Twist",
        duration: 40,
        afterExerciseRest: 20,
      },
      {
        name: "Plank",
        duration: 40,
        afterExerciseRest: 20,
      },
      {
        name: "Mountain Climbers",
        duration: 40,
        afterExerciseRest: 20,
      },
    ],
    afterSetRest: 120,
  },
  {
    name: "Abs 2",
    exercises: [
      {
        name: "Double Crunch",
        duration: 40,
        afterExerciseRest: 20,
      },
      {
        name: "Plank",
        duration: 40,
        afterExerciseRest: 20,
      },
      {
        name: "Crunch Arm Extended",
        duration: 40,
        afterExerciseRest: 20,
      },
      {
        name: "Boat Pose",
        duration: 40,
        afterExerciseRest: 20,
      },
      {
        name: "Long-Arm Plank",
        duration: 40,
        afterExerciseRest: 20,
      },
      {
        name: "Side Crunch",
        duration: 40,
        afterExerciseRest: 20,
      },
      {
        name: "Mountain Climbers",
        duration: 40,
        afterExerciseRest: 20,
      },
    ],
    afterSetRest: 120,
  },
  {
    name: "Chest",
    exercises: [
      {
        name: "Decline Push-Ups x 12 (with wrist weight) ",
        duration: 60,
        interRepetitionRest: 30,
        repetition: 3,
        afterExerciseRest: 45,
      },
      {
        name: "Dumbbell Chest Press (10kg) ",
        duration: 60,
        interRepetitionRest: 30,
        repetition: 3,
        afterExerciseRest: 45,
      },
      {
        name: "Push-Ups x 10",
        duration: 60,
        interRepetitionRest: 30,
        repetition: 3,
        afterExerciseRest: 45,
      },
      {
        name: "Dumbbell Pullover x 10 (10kg)",
        duration: 60,
        interRepetitionRest: 30,
        repetition: 3,
        afterExerciseRest: 45,
      },
    ],
    afterSetRest: 120,
  },
  {
    name: "Back",
    exercises: [
      {
        name: "Dumbbell Row x 10 (15kg + wrist weight)",
        duration: 90,
        interRepetitionRest: 30,
        repetition: 3,
        afterExerciseRest: 45,
      },
      {
        name: "Superman Hold",
        duration: 15,
        interRepetitionRest: 30,
        repetition: 3,
        afterExerciseRest: 45,
      },
    ],
    afterSetRest: 30,
  },
  {
    name: "Legs",
    repetition: 2,
    afterSetRest: 120,
    exercises: [
      {
        name: "Squats",
        duration: 30,
      },
      {
        name: "Jump Squats",
        duration: 30,
      },
      {
        name: "Forward Lunges",
        duration: 30,
      },
      {
        name: "Jump Forward Lunges",
        duration: 30,
      },
      {
        name: "Wall Sit",
        duration: 30,
      },
      {
        name: "Bunny Jumps",
        duration: 30,
      },
    ],
  },
  {
    name: "Arms",
    afterSetRest: 120,
    repetition: 2,
    exercises: [
      {
        name: "Curl x 12 (10kg + wrist weights)",
        duration: 45,
        afterExerciseRest: 30,
      },
      {
        name: "French Press x 12 (10kg + wrist weights)",
        duration: 45,
        afterExerciseRest: 30,
      },
      {
        name: "Zottman Curl x 12 (7kg + wrist weights)",
        duration: 45,
        afterExerciseRest: 30,
      },
      {
        name: "Diamond Push-Up x 12 (wrist weights)",
        duration: 45,
        afterExerciseRest: 30,
      },
      {
        name: "Low Curl x 12 (10kg + wrist weights)",
        duration: 45,
        afterExerciseRest: 30,
      },
      {
        name: "High Curl x 12 (10kg + wrist weights)",
        duration: 45,
        afterExerciseRest: 30,
      },
      {
        name: "Overhead Extensions x 12 (15kg + wrist weights)",
        duration: 45,
        afterExerciseRest: 30,
      },
      {
        name: "Hammer Curl x 10 (10kg + wrist weights)",
        duration: 45,
        afterExerciseRest: 30,
      },
    ],
  },
  {
    name: "Shoulders",
    exercises: [
      {
        name: "Lateral Raises x 10 (7kg + wrist weights)",
        duration: 60,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 45,
      },
      {
        name: "Shoulder Press  x 10 (15kg + wrist weights)",
        duration: 60,
        repetition: 3,
        interRepetitionRest: 30,
        afterExerciseRest: 45,
      },
    ],
  },
];
