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
    <div className="mb-4">
      <label
        htmlFor="workout-select"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select Workout
      </label>
      <select
        id="workout-select"
        value={selectedWorkout}
        onChange={handleWorkoutChange}
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
