import { useState } from "react";
import "./index.css";
import { workoutPhases } from "./data/workoutPhases";
import { useWorkoutTimer } from "./hooks/useWorkoutTimer";
import { Phase } from "./types/types";

const speakAsync = (text: string): Promise<void> =>
  new Promise((resolve) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1;
    utter.onend = () => setTimeout(() => resolve(), 500);
    utter.onerror = () => resolve();
    speechSynthesis.speak(utter);
  });

function App() {
  const [phase, setPhase] = useState<Phase>("exercise");
  const [currentSetRepetition, setCurrentSetRepetition] = useState<number>(0);
  const [currentExerciseRepetition, setCurrentExerciseRepetition] =
    useState<number>(0);
  const [currentSet, setCurrentSet] = useState<number>(0);
  const [currentExercise, setCurrentExercise] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const { timeLeft, setTimeLeft } = useWorkoutTimer({
    isRunning,
    isPaused,
    time: workoutPhases[currentSet].exercises[currentExercise].duration,
    onFinish: handleNextPhase,
  });

  async function handleNextPhase() {
    const current = workoutPhases[currentSet];
    const currentExerciseData = current.exercises[currentExercise];
    const setRepetition = current.repetition ?? 1;
    const exerciseRepetition = currentExerciseData.repetition ?? 1;
    const nextExerciseIndex = currentExercise + 1;

    // Phase: exercise → check for rest
    if (phase === "exercise") {
      if (
        currentExerciseRepetition + 1 < exerciseRepetition &&
        currentExerciseData.interRepetitionRest
      ) {
        setPhase("inter-rep-rest");
        setTimeLeft(currentExerciseData.interRepetitionRest);
        await speakAsync("Rest between repetitions");
        return;
      }

      const restTime = currentExerciseData.afterExerciseRest ?? 0;
      setPhase("exercise-rest");
      if (restTime > 0) {
        setTimeLeft(restTime);
        await speakAsync("Rest between exercises");
        return;
      }
    }

    if (phase === "inter-rep-rest") {
      setPhase("exercise");
      setCurrentExerciseRepetition(currentExerciseRepetition + 1);
      setTimeLeft(currentExerciseData.duration);
      await speakAsync(
        `Exercise Repetition: ${
          currentExerciseRepetition + 2
        } of ${exerciseRepetition}`
      );
      return;
    }

    // Phase: rest after exercise → continue with same or next exercise
    if (phase === "exercise-rest") {
      setPhase("exercise");

      // Repeat current exercise?
      if (currentExerciseRepetition + 1 < exerciseRepetition) {
        setCurrentExerciseRepetition(currentExerciseRepetition + 1);
        setTimeLeft(currentExerciseData.duration);
        await speakAsync(
          `Exercise Repetition: ${
            currentExerciseRepetition + 2
          } of ${exerciseRepetition}`
        );
        return;
      }

      // Reset exercise repetition
      setCurrentExerciseRepetition(0);

      // Move to next exercise
      if (nextExerciseIndex < current.exercises.length) {
        setCurrentExercise(nextExerciseIndex);
        setTimeLeft(current.exercises[nextExerciseIndex].duration);
        await speakAsync(
          `Exercise: ${current.exercises[nextExerciseIndex].name}`
        );
        return;
      }

      // End of set, check for rest
      const restAfterSet = current.afterSetRest ?? 0;
      setPhase("set-rest");
      if (restAfterSet > 0) {
        setTimeLeft(restAfterSet);
        await speakAsync("Rest between sets");
        return;
      }
    }

    // Phase: rest after set → repeat or go to next set
    if (phase === "set-rest") {
      setPhase("exercise");

      // Repeat the set?
      if (currentSetRepetition + 1 < setRepetition) {
        setCurrentSetRepetition(currentSetRepetition + 1);
        setCurrentExercise(0);
        setTimeLeft(current.exercises[0].duration);
        await speakAsync(
          `Set Repetition: ${currentSetRepetition + 2} of ${setRepetition}`
        );
        await speakAsync(`Exercise: ${current.exercises[0].name}`);
        return;
      }

      // Next set
      const nextSetIndex = currentSet + 1;
      if (nextSetIndex < workoutPhases.length) {
        const nextSet = workoutPhases[nextSetIndex];
        setCurrentSet(nextSetIndex);
        setCurrentSetRepetition(0);
        setCurrentExercise(0);
        setCurrentExerciseRepetition(0);
        setTimeLeft(nextSet.exercises[0].duration);
        await speakAsync(`Set: ${nextSet.name}`);
        await speakAsync(`Exercise: ${nextSet.exercises[0].name}`);
        return;
      }

      // Workout complete
      setPhase("finished");
      await speakAsync("Workout complete!");
      setIsRunning(false);
      return;
    }

    handleNextPhase(); // ricorsivo se manca un phase match
  }

  const startWorkout = async (): Promise<void> => {
    setPhase("exercise");
    const setName = workoutPhases[currentSet].name.toLowerCase();
    const exerciseName =
      workoutPhases[currentSet].exercises[currentExercise].name.toLowerCase();

    await speakAsync(`Set: ${setName}`);
    if (workoutPhases[currentSet].repetition != null) {
      await speakAsync(
        `Repetition: ${currentSetRepetition + 1} of ${
          workoutPhases[currentSet].repetition
        }`
      );
    }
    await speakAsync(`Exercise: ${exerciseName}`);
    if (
      workoutPhases[currentSet].exercises[currentExercise].repetition != null
    ) {
      await speakAsync(
        `Exercise Repetition: ${currentExerciseRepetition + 1} of ${
          workoutPhases[currentSet].exercises[currentExercise].repetition
        }`
      );
    }

    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseWorkout = (): void => {
    setIsPaused(!isPaused);
  };

  const resetWorkout = (): void => {
    setCurrentSetRepetition(0);
    setCurrentExerciseRepetition(0);
    setIsRunning(false);
    setIsPaused(false);
    setCurrentSet(0);
    setCurrentExercise(0);
    setTimeLeft(workoutPhases[0].exercises[0].duration);
    speechSynthesis.cancel();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Workout Timer</h1>

      <div className="mb-4 text-center">
        <p className="text-xl font-medium text-gray-800">
          Current Set:{" "}
          <span className="font-bold">{workoutPhases[currentSet].name}</span>
        </p>
        {workoutPhases[currentSet].repetition != null && (
          <p className="text-md text-gray-600">
            Repetition {currentSetRepetition + 1} of{" "}
            {workoutPhases[currentSet].repetition}
          </p>
        )}
      </div>

      <div className="mb-4 text-center">
        <p className="text-2xl font-semibold text-gray-800">
          {workoutPhases[currentSet].exercises[currentExercise].name}
        </p>
        {workoutPhases[currentSet].exercises[currentExercise].repetition !=
          null && (
          <p className="text-md text-gray-600">
            Repetition {currentExerciseRepetition + 1} of{" "}
            {workoutPhases[currentSet].exercises[currentExercise].repetition}
          </p>
        )}
      </div>

      {phase === "exercise-rest" && (
        <p className="text-blue-500 text-lg mb-2 font-medium">
          Rest between exercises
        </p>
      )}
      {phase === "set-rest" && (
        <p className="text-purple-500 text-lg mb-2 font-medium">
          Rest between sets
        </p>
      )}
      {phase === "inter-rep-rest" && (
        <p className="text-cyan-500 text-lg mb-2 font-medium">
          Rest between repetitions
        </p>
      )}

      <div className="text-6xl font-mono text-gray-800 mb-6">{timeLeft}s</div>

      <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-green-500 transition-all"
          style={{
            width: `${
              ((currentExercise +
                currentSet * workoutPhases[0].exercises.length) /
                (workoutPhases.length * workoutPhases[0].exercises.length)) *
              100
            }%`,
          }}
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={startWorkout}
          disabled={isRunning}
          className={`px-6 py-2 rounded-xl shadow font-bold text-white ${
            isRunning ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          Start
        </button>
        <button
          onClick={pauseWorkout}
          disabled={!isRunning}
          className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl shadow"
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
        <button
          onClick={resetWorkout}
          disabled={!isRunning}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
