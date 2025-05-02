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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto px-4 py-10 flex flex-col gap-8">
        <Header />
        <WorkoutSelector onWorkoutSelect={setSelectedWorkout} />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6 flex flex-col justify-center">
            <TimerDisplay
              phase={phase}
              timeLeft={timeLeft}
              currentSetName={currentSetName}
              currentExerciseName={currentExerciseName}
              repetitionInfo={repetitionInfo}
            />
          </div>
          {nextUp.nextSet !== "DONE" && (
            <div className="flex-1 flex items-center">
              <NextUp {...nextUp} />
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
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
      </div>
    </div>
  );
}

export default App;
