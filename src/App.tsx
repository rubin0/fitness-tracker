import "./index.css";
import { Header } from "./components/Header";
import { NextUp } from "./components/NextUp";
import { useWorkoutLogic } from "./hooks/useWorkoutLogic";
import { TimerDisplay } from "./components/TimerDisplay";
import Controls from "./components/Controls";
import { useState } from "react";
import { WorkoutSet } from "./types/types";
import { WorkoutSelector } from "./components/WorkoutSelector";

function App() {
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutSet[]>([]);

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
  } = useWorkoutLogic(selectedWorkout);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 bg-gray-100">
      <Header />
      <div className="w-full max-w-md mb-8">
        <WorkoutSelector onWorkoutSelect={setSelectedWorkout} />
      </div>
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
