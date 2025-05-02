import { useState, useEffect } from "react";
import { WorkoutSet } from "@/types/types";

interface WorkoutSelectorProps {
  onWorkoutSelect: (workout: WorkoutSet[]) => void;
}

interface WorkoutData {
  id: string;
  name: string;
  data: WorkoutSet[];
}

export const WorkoutSelector = ({ onWorkoutSelect }: WorkoutSelectorProps) => {
  const [selectedWorkout, setSelectedWorkout] = useState<string>("");
  const [workouts, setWorkouts] = useState<WorkoutData[]>([]);

  useEffect(() => {
    const loadWorkouts = async () => {
      const modules = import.meta.glob<{ workoutType: WorkoutSet[] }>(
        "@/data/*.ts",
        { eager: true }
      );

      const workoutList = Object.entries(modules).map(([path, module]) => {
        const fileName = path.split("/").pop()?.replace(".ts", "") || "";
        const workoutName = fileName
          .replace("workout", "Workout ")
          .replace(/([A-Z])/g, " $1")
          .trim();

        return {
          id: fileName,
          name: workoutName,
          data: module.workoutType,
        };
      });

      setWorkouts(workoutList);
    };

    loadWorkouts();
  }, []);

  const handleWorkoutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const workoutId = event.target.value;
    setSelectedWorkout(workoutId);
    const selectedWorkoutData = workouts.find((w) => w.id === workoutId)?.data;
    if (selectedWorkoutData) {
      onWorkoutSelect(selectedWorkoutData);
    }
  };

  return (
    <div className="w-full px-4 py-3 bg-white rounded-lg shadow-sm">
      <label
        htmlFor="workout-select"
        className="block text-base font-semibold text-gray-800 mb-2"
      >
        Select Workout
      </label>
      <select
        id="workout-select"
        value={selectedWorkout}
        onChange={handleWorkoutChange}
        className="block w-full px-4 py-3 text-base bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer"
        style={{
          WebkitAppearance: "none",
          MozAppearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "1.5em 1.5em",
          paddingRight: "2.5rem",
        }}
      >
        <option value="">Select a workout...</option>
        {workouts.map((workout) => (
          <option key={workout.id} value={workout.id}>
            {workout.name}
          </option>
        ))}
      </select>
    </div>
  );
};
