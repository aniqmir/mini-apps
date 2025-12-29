// components/Filters.tsx
import React from "react";

interface FiltersProps {
  age: string | null;
  type: string | null;
  onChange: (field: string, value: any) => void;
}


const Filters: React.FC<FiltersProps> = ({ age, type, onChange }) => {
  return (
    <div className="flex gap-4 mb-6">
      <select
        value={age || ""}
        onChange={(e) => onChange("age", e.target.value)}
        className="flex-1 p-2 border rounded"
      >
        <option value="">Select Age</option>
        <option value="0-2">0-2 years</option>
        <option value="1-3">1-3 years</option>
        <option value="3-5">3-5 years</option>
      </select>

      <select
        value={type || ""}
        onChange={(e) => onChange("type", e.target.value)}
        className="flex-1 p-2 border rounded"
      >
        <option value="">Select Type</option>
        <option value="Educational">Educational</option>
        <option value="Puzzle">Puzzle</option>
        <option value="Outdoor">Outdoor</option>
        <option value="Building">Building</option>

      </select>
    </div>
  );
};

export default Filters;
