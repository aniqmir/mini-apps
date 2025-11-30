import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import AlphabetGame from "./pages/Tools/FindTheLetter";
import ToddlerActivityGenerator from "./pages/Tools/ToddlerActivityGenerator";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/find-the-letter-game" element={<AlphabetGame />} />
      <Route path="/toddler-activity-generator" element={<ToddlerActivityGenerator />} />
    </Routes>
  );
}