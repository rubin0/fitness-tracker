// src/components/NextUp.tsx
import React from "react";

interface NextUpProps {
  nextSet: string;
  nextExercise: string;
}

export const NextUp: React.FC<NextUpProps> = ({ nextSet, nextExercise }) => (
  <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">Up Next</p>
        <p className="text-lg font-semibold text-gray-800 mt-1">{nextSet}</p>
        <p className="text-base text-gray-600 mt-1">{nextExercise}</p>
      </div>
      <div className="ml-4">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  </div>
);
