import { useState, useCallback, useEffect, useRef } from "react";
import { workoutPhases } from "../data/workoutDay1";
import { useWorkoutTimer } from "./useWorkoutTimer";
import { useSpeech } from "./useSpeech";
import { Phase } from "../types/types";

export function useWorkoutLogic() {
    const speakAsync = useSpeech();
    const handleNextPhaseRef = useRef<() => Promise<void>>(async () => { });
    const [phase, setPhase] = useState<Phase>("exercise");
    const [currentSetRepetition, setCurrentSetRepetition] = useState<number>(0);
    const [currentExerciseRepetition, setCurrentExerciseRepetition] = useState<number>(0);
    const [currentSet, setCurrentSet] = useState<number>(0);
    const [currentExercise, setCurrentExercise] = useState<number>(0);
    const [nextSet, setNextSet] = useState<string>("");
    const [nextExercise, setNextExercise] = useState<string>("");
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    const checkNextExercise = useCallback(() => {
        if (currentExercise + 1 < workoutPhases[currentSet].exercises.length) {
            setNextSet(workoutPhases[currentSet].name);
            setNextExercise(
                workoutPhases[currentSet].exercises[currentExercise + 1].name
            );
        } else if (currentSet + 1 < workoutPhases.length) {
            setNextSet(workoutPhases[currentSet + 1].name);
            setNextExercise(workoutPhases[currentSet + 1].exercises[0].name);
        } else {
            setNextSet("DONE");
            setNextExercise("DONE");
        }
    }, [currentSet, currentExercise]);

    useEffect(() => {
        checkNextExercise();
    }, [checkNextExercise]);

    // Timer hook
    const { timeLeft, setTimeLeft } = useWorkoutTimer({
        isRunning,
        isPaused,
        time: workoutPhases[currentSet].exercises[currentExercise].duration,
        onFinish: () => handleNextPhaseRef.current(),
    });

    // Main phase transition logic
    const handleNextPhase = useCallback(async () => {
        const current = workoutPhases[currentSet];
        const exerciseData = current.exercises[currentExercise];
        const setRep = current.repetition ?? 1;
        const exeRep = exerciseData.repetition ?? 1;
        const nextExeIdx = currentExercise + 1;

        if (phase === "exercise") {
            // Inter-rep rest
            if (
                currentExerciseRepetition + 1 < exeRep &&
                exerciseData.interRepetitionRest
            ) {
                setPhase("inter-rep-rest");
                setTimeLeft(exerciseData.interRepetitionRest);
                await speakAsync("Rest between repetitions");
                return;
            }
            // After-exercise rest
            const restTime = exerciseData.afterExerciseRest ?? 0;
            setPhase("exercise-rest");
            if (restTime > 0) {
                setTimeLeft(restTime);
                await speakAsync("Rest between exercises");
                return;
            }
        }

        if (phase === "inter-rep-rest") {
            setPhase("exercise");
            setCurrentExerciseRepetition((prev) => prev + 1);
            setTimeLeft(exerciseData.duration);
            await speakAsync(
                `Exercise Repetition: ${currentExerciseRepetition + 2} of ${exeRep}`
            );
            return;
        }

        if (phase === "exercise-rest") {
            setPhase("exercise");
            // Continue same exercise repetition
            if (currentExerciseRepetition + 1 < exeRep) {
                setCurrentExerciseRepetition((prev) => prev + 1);
                setTimeLeft(exerciseData.duration);
                await speakAsync(
                    `Exercise Repetition: ${currentExerciseRepetition + 2} of ${exeRep}`
                );
                return;
            }
            // Reset exercise repetition and move on
            setCurrentExerciseRepetition(0);
            if (nextExeIdx < current.exercises.length) {
                setCurrentExercise(nextExeIdx);
                setTimeLeft(current.exercises[nextExeIdx].duration);
                await speakAsync(
                    `Exercise: ${current.exercises[nextExeIdx].name}`
                );
                return;
            }
            // Rest between sets
            const restAfterSet = current.afterSetRest ?? 0;
            setPhase("set-rest");
            if (restAfterSet > 0) {
                setTimeLeft(restAfterSet);
                await speakAsync("Rest between sets");
                return;
            }
        }

        if (phase === "set-rest") {
            setPhase("exercise");
            // Repeat set
            if (currentSetRepetition + 1 < setRep) {
                setCurrentSetRepetition((prev) => prev + 1);
                setCurrentExercise(0);
                setTimeLeft(current.exercises[0].duration);
                await speakAsync(
                    `Set Repetition: ${currentSetRepetition + 2} of ${setRep}`
                );
                await speakAsync(`Exercise: ${current.exercises[0].name}`);
                return;
            }
            // Move to next set or finish
            const nextSetIdx = currentSet + 1;
            if (nextSetIdx < workoutPhases.length) {
                const next = workoutPhases[nextSetIdx];
                setCurrentSet(nextSetIdx);
                setCurrentSetRepetition(0);
                setCurrentExercise(0);
                setCurrentExerciseRepetition(0);
                setTimeLeft(next.exercises[0].duration);
                await speakAsync(`Set: ${next.name}`);
                await speakAsync(`Exercise: ${next.exercises[0].name}`);
                return;
            }
            setPhase("finished");
            await speakAsync("Workout complete!");
            setIsRunning(false);
            return;
        }

        // Fallback: loop again
        handleNextPhase();
    }, [
        phase,
        currentSet,
        currentExercise,
        currentExerciseRepetition,
        currentSetRepetition,
        setTimeLeft,
        speakAsync,
    ]);

    useEffect(() => {
        handleNextPhaseRef.current = handleNextPhase;
    }, [handleNextPhase]);


    // Control handlers
    const startWorkout = useCallback(async () => {
        setPhase("exercise");
        const setName = workoutPhases[currentSet].name.toLowerCase();
        const exeName =
            workoutPhases[currentSet].exercises[currentExercise].name.toLowerCase();

        await speakAsync(`Set: ${setName}`);
        if (workoutPhases[currentSet].repetition != null) {
            await speakAsync(
                `Repetition: ${currentSetRepetition + 1} of ${workoutPhases[currentSet].repetition
                }`
            );
        }
        await speakAsync(`Exercise: ${exeName}`);
        if (
            workoutPhases[currentSet].exercises[currentExercise].repetition != null
        ) {
            await speakAsync(
                `Exercise Repetition: ${currentExerciseRepetition + 1} of ${workoutPhases[currentSet].exercises[currentExercise].repetition
                }`
            );
        }

        setIsRunning(true);
        setIsPaused(false);
    }, [
        currentSet,
        currentExercise,
        currentSetRepetition,
        currentExerciseRepetition,
        speakAsync,
    ]);

    const pauseWorkout = useCallback(() => {
        setIsPaused((prev) => !prev);
    }, []);

    const resetWorkout = useCallback(() => {
        setCurrentSetRepetition(0);
        setCurrentExerciseRepetition(0);
        setIsRunning(false);
        setIsPaused(false);
        setCurrentSet(0);
        setCurrentExercise(0);
        setTimeLeft(workoutPhases[0].exercises[0].duration);
        speechSynthesis.cancel();
    }, [setTimeLeft]);

    const back = useCallback(() => {
        if (currentExercise !== 0) {
            setCurrentExercise(currentExercise - 1);
            setTimeLeft(
                workoutPhases[currentSet].exercises[currentExercise - 1].duration
            );
        } else if (currentExercise === 0 && currentSet !== 0) {
            setCurrentSet(currentSet - 1);
            setCurrentExercise(
                workoutPhases[currentSet - 1].exercises.length - 1
            );
            setTimeLeft(
                workoutPhases[currentSet - 1].exercises[
                    workoutPhases[currentSet - 1].exercises.length - 1
                ].duration
            );
        } else {
            setTimeLeft(workoutPhases[0].exercises[0].duration);
        }
        setPhase("exercise");
    }, [
        currentExercise,
        currentSet,
        setTimeLeft,
    ]);

    const forward = useCallback(() => {
        if (currentExercise + 1 < workoutPhases[currentSet].exercises.length) {
            setCurrentExercise(currentExercise + 1);
            setTimeLeft(
                workoutPhases[currentSet].exercises[currentExercise + 1].duration
            );
        } else if (currentSet + 1 < workoutPhases.length) {
            setCurrentSet(currentSet + 1);
            setCurrentExercise(0);
            setTimeLeft(workoutPhases[currentSet + 1].exercises[0].duration);
        }
        setPhase("exercise");
    }, [
        currentExercise,
        currentSet,
        setTimeLeft,
    ]);

    // Presentation values
    const repetitionInfo =
        phase === "exercise"
            ? `Repetition: ${currentExerciseRepetition + 1} of ${workoutPhases[currentSet].exercises[currentExercise].repetition ?? 1
            }`
            : undefined;

    return {
        phase,
        timeLeft,
        currentSetName: workoutPhases[currentSet].name,
        currentExerciseName:
            workoutPhases[currentSet].exercises[currentExercise].name,
        repetitionInfo,
        nextUp: { nextSet, nextExercise },
        isRunning,
        isPaused,
        handlers: {
            startWorkout,
            pauseWorkout,
            resetWorkout,
            back,
            forward,
        },
    };
}