import React from "react";
import { Phase } from "../types/types";

interface Props {
  phase: Phase;
  timeLeft: number;
  currentSetName: string;
  currentExerciseName: string;
  repetitionInfo?: string;
}

export const TimerDisplay: React.FC<Props> = ({
  phase,
  timeLeft,
  currentSetName,
  currentExerciseName,
  repetitionInfo,
}) => (
  <div className="flex flex-col items-center">
    <div className="mb-4 text-center">
      <p className="text-xl font-medium text-gray-800">
        Current Set: <span className="font-bold">{currentSetName}</span>
      </p>
      {repetitionInfo && (
        <p className="text-md text-gray-600">{repetitionInfo}</p>
      )}
    </div>
    <div className="mb-4 text-center">
      <p className="text-2xl font-semibold text-gray-800">
        {currentExerciseName}
      </p>
    </div>
    {phase !== "exercise" && (
      <p className="text-lg mb-2 font-medium text-{ phase === 'exercise-rest' ? 'blue' : phase === 'set-rest' ? 'purple' : 'cyan' }-500">
        {phase.replace("-", " ")}
      </p>
    )}
    <div className="text-6xl font-mono text-gray-800 mb-6">{timeLeft}s</div>
  </div>
);
