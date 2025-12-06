import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import NumberGame from "./pages/Tools/FindTheNumber";
import AlphabetGame from "./pages/Tools/FindTheLetter";

import ToddlerActivityGenerator from "./pages/Tools/ToddlerActivityGenerator";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/find-the-letter-game" element={<AlphabetGame />} />
      <Route path="/find-the-number-game" element={<NumberGame />} />
      <Route path="/toddler-activity-generator" element={<ToddlerActivityGenerator />} />
    </Routes>
  );
}