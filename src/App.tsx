import "./index.css";
import { Header } from "./components/Header";
import { NextUp } from "./components/NextUp";
import { useWorkoutLogic } from "./hooks/useWorkoutLogic";
import { TimerDisplay } from "./components/TimerDisplay";
import Controls from "./components/Controls";
import { useState } from "react";
import { WorkoutSet } from "./types/types";
import { workoutType as test } from "./data/workoutPhasesTest";

// Dynamically load workout modules
const modules = import.meta.glob<{ default: WorkoutSet[] }>("./data/*.ts", {
  eager: true,
});
const workoutsMap: Record<string, string> = {};
for (const path in modules) {
  const match = path.match(/\/([^/]+)\.tsx?$/);
  if (match) {
    workoutsMap[match[1]] = path;
  }
}

function App() {
  const {
    phase,
    timeLeft,
    currentSetName,
    currentExerciseName,
    repetitionInfo,
    nextUp,
    isRunning,
    isPaused,
    handlers: { startWorkout, pauseWorkout, resetWorkout, back, forward },
  } = useWorkoutLogic();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 bg-gray-100">
      <Header />
      <div className="relative flex flex-col items-center justify-center w-full mb-8">
        <TimerDisplay
          phase={phase}
          timeLeft={timeLeft}
          currentSetName={currentSetName}
          currentExerciseName={currentExerciseName}
          repetitionInfo={repetitionInfo}
        />
        <NextUp {...nextUp} />
      </div>
      <Controls
        isRunning={isRunning}
        isPaused={isPaused}
        onStart={startWorkout}
        onPause={pauseWorkout}
        onReset={resetWorkout}
        onBack={back}
        onForward={forward}
      />
    </div>
  );
}

export default App;
