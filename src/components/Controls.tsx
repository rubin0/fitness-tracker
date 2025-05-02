import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

interface ControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onBack: () => void;
  onForward: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isRunning,
  isPaused,
  onStart,
  onPause,
  onReset,
  onBack,
  onForward,
}) => (
  <div className="grid grid-cols-2 gap-3 sm:flex sm:space-x-3">
    <button
      onClick={onBack}
      disabled={!isRunning}
      className="flex items-center justify-center px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl shadow transition-transform transform hover:scale-105 disabled:opacity-50"
    >
      <ArrowLeftIcon className="h-5 w-5 mr-2" />
      Back
    </button>
    <button
      onClick={onStart}
      disabled={isRunning}
      className={`px-6 py-3 rounded-xl shadow font-bold text-white ${
        isRunning ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
      } disabled:opacity-50`}
    >
      Start
    </button>
    <button
      onClick={onPause}
      disabled={!isRunning}
      className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl shadow disabled:opacity-50"
    >
      {isPaused ? "Resume" : "Pause"}
    </button>
    <button
      onClick={onReset}
      disabled={!isRunning}
      className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow disabled:opacity-50"
    >
      Reset
    </button>
    <button
      onClick={onForward}
      disabled={!isRunning}
      className="flex items-center justify-center px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-xl shadow transition-transform transform hover:scale-105 disabled:opacity-50"
    >
      Forward
      <ArrowRightIcon className="h-5 w-5 ml-2" />
    </button>
  </div>
);

export default Controls;
