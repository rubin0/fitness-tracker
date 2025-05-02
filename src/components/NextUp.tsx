// src/components/NextUp.tsx
import React from "react";

interface NextUpProps {
  nextSet: string;
  nextExercise: string;
}

export const NextUp: React.FC<NextUpProps> = ({ nextSet, nextExercise }) => (
  <div className="absolute right-0 top-0 flex flex-col items-center justify-center w-[250px] h-[250px] text-center">
    <p className="text-lg font-semibold mb-2">Up Next</p>
    <p className="text-xl font-bold">{nextSet}</p>
    <p className="text-md">{nextExercise}</p>
  </div>
);
