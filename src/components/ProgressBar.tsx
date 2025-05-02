import React from "react";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => (
  <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden mb-6">
    <div
      className="h-full bg-green-500 transition-all"
      style={{ width: `${progress}%` }}
    />
  </div>
);

export default ProgressBar;
