// App.tsx
import { useState } from "react";
import Filters from "./components/Filters";
import ToyCard from "./components/ToyCard";
import { toys } from "./data/toys";
import { Toy } from "./types/Toy";

function App() {
  const [age, setAge] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [results, setResults] = useState<Toy[]>([]);

  const handleChange = (field: string, value: any) => {
    if (field === "age") setAge(value);
    if (field === "type") setType(value);
  };

 const ageGroups: any = {
  "0-2": { min: 0, max: 2 },
  "1-3": { min: 1, max: 3 },
  "3-5": { min: 3, max: 5 },
};

const generateToys = () => {
  let filtered = toys;

  if (age) {
    const { min: selMin, max: selMax } = ageGroups[age];
    filtered = filtered.filter(
      (toy) =>
        toy.ageRange.min <= selMax && toy.ageRange.max >= selMin
    );
  }

  if (type) {
    filtered = filtered.filter((toy) => toy.type === type);
  }

  setResults(filtered); // max 3 results
};

  const surpriseMe = () => {
    const random = toys[Math.floor(Math.random() * toys.length)];
    setResults([random]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Toy Suggestion Generator</h1>

      <Filters age={age} type={type} onChange={handleChange} />

      <div className="flex gap-4 mb-6">
        <button
          onClick={generateToys}
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

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {results.map((toy) => (
          <ToyCard key={toy.id} toy={toy} />
        ))}
      </div>
    </div>
  );
}

export default App;
