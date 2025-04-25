import { useEffect, useRef, useState } from "react";

export const useWorkoutTimer = ({
    isRunning,
    isPaused,
    onFinish,
    time,
}: {
    isRunning: boolean;
    isPaused: boolean;
    onFinish: () => void;
    time: number;
}) => {
    const [timeLeft, setTimeLeft] = useState(time);
    const prevTime = useRef(time);

    useEffect(() => {
        // Reset if input time changes (like when switching exercises)
        if (time !== prevTime.current) {
            setTimeLeft(time);
            prevTime.current = time;
        }
    }, [time]);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isRunning && !isPaused && timeLeft <= 3 && timeLeft > 0) {
            new Audio("https://actions.google.com/sounds/v1/alarms/beep_short.ogg").play();
        }

        if (isRunning && !isPaused && timeLeft > 0) {
            timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        } else if (isRunning && !isPaused && timeLeft === 0) {
            onFinish();
        }

        return () => clearTimeout(timer);
    }, [isRunning, isPaused, timeLeft, onFinish]);

    return { timeLeft, setTimeLeft };
};
