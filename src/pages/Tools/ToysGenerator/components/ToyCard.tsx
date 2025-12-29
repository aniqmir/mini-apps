// components/ToyCard.tsx
import React from "react";
import { Toy } from "../types/Toy";

interface ToyCardProps {
  toy: Toy;
}

const ToyCard: React.FC<ToyCardProps> = ({ toy }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-200">
      <img
        src={toy.image}
        alt={toy.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h2 className="font-bold text-lg mb-2">{toy.name}</h2>
      <p className="text-sm mb-2">{toy.description}</p>
      <p className="text-xs text-gray-500">Age: {toy.ageRange.min} - {toy.ageRange.max}</p>
      <p className="text-xs text-gray-500">Type: {toy.type}</p>
    </div>
  );
};

export default ToyCard;
