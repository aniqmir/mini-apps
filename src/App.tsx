import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ToddlerActivityGenerator from "./pages/Tools/ToddlerActivityGenerator";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Home />} />
      <Route path="/toddler-activity-generator" element={<ToddlerActivityGenerator />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  );
}