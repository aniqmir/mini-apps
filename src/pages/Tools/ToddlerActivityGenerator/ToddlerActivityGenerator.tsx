import { useState } from "react";
import Filters from "./components/Filters";
import ActivityCard from "./components/ActivityCard";
import { activities } from "./data/activities";
import { Activity } from "./types/Activity";

function App() {
  const [age, setAge] = useState<number | null>(null);
  const [type, setType] = useState<string | null>(null);

  const [results, setResults] = useState<Activity[]>([]);

  const handleChange = (field: string, value: any) => {
    if (field === "age") setAge(value);
    if (field === "type") setType(value);
  };

  const generateActivities = () => {
    let filtered = activities;

    if (age) filtered = filtered.filter((a) => a.age === age);
    if (type) filtered = filtered.filter((a) => a.type === type);

    setResults(filtered.slice(0, 3)); // show max 3
  };

  const surpriseMe = () => {
    const random = activities[Math.floor(Math.random() * activities.length)];
    setResults([random]);
  };



  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Toddler Activity Generator
      </h1>

      <Filters
        age={age}
        type={type}
        onChange={handleChange}
      />

      {/* Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={generateActivities}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
        >
          Generate
        </button>

        <button
          onClick={surpriseMe}
          className="flex-1 bg-green-600 text-white py-2 rounded-lg"
        >
          Surprise Me
        </button>
      </div>

      {/* Results */}
      <div className="grid gap-4">
        {results.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}

export default App;
