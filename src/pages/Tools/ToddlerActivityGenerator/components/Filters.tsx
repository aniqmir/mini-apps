import React from "react";

type FiltersProps = {
  age: number | null;
  type: string | null;
  onChange: (field: string, value: string | number | null) => void;
};

const Filters: React.FC<FiltersProps> = ({ age, type,  onChange }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Select Filters</h2>

      {/* Age */}
      <label className="block mb-2 font-medium">Age</label>
      <select
        className="w-full p-2 border rounded mb-4"
        value={age ?? ""}
        onChange={(e) => onChange("age", e.target.value ? Number(e.target.value) : null)}
      >
        <option value="">Any</option>
        <option value={1}>1 Year</option>
        <option value={2}>2 Years</option>
        <option value={3}>3 Years</option>
        <option value={4}>4 Years</option>
        <option value={5}>5 Years</option>
      </select>

      {/* Type */}
      <label className="block mb-2 font-medium">Activity Type</label>
      <select
        className="w-full p-2 border rounded mb-4"
        value={type ?? ""}
        onChange={(e) => onChange("type", e.target.value || null)}
      >
        <option value="">Any</option>
        <option value="learning">Learning</option>
        <option value="motor">Motor Skills</option>
        <option value="creative">Creative</option>
        <option value="fun">Fun</option>
        <option value="sensory">Sensory</option>
      </select>
    </div>
  );
};

export default Filters;
