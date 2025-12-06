import { useState, useEffect, useRef, FormEvent } from "react";
import { CiVolumeHigh } from "react-icons/ci";
// import confetti from "canvas-confetti";

import BgImage from "./images/bg-image-numbers.svg"; // optional

// Create numbers 1–50
const numbers = Array.from({ length: 50 }, (_, i) => i + 1);

// Random playful colors
const getRandomPlayfulColor = (): string => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 30) + 70;
  const lightness = Math.floor(Math.random() * 20) + 50;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// Pre-generate colors for each number
const numberColors: Record<number, string> = {};
numbers.forEach((num) => {
  numberColors[num] = getRandomPlayfulColor();
});

export default function NumberGame() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [numberColor, setNumberColor] = useState<string>(
    numberColors[numbers[0]]
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const currentNumber = numbers[currentIndex];

  useEffect(() => {
    inputRef.current?.focus();
    setNumberColor(numberColors[currentNumber]);
  }, [currentNumber]);

  const speakNumber = (value: number) => {
    const utterance = new SpeechSynthesisUtterance(String(value));
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => v.name === "Google UK English") || voices[0];

    utterance.voice = preferred;
    utterance.pitch = 1.2;
    utterance.rate = 0.6;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (parseInt(inputValue) === currentNumber) {
      setError("");
      speakNumber(currentNumber);

      if (currentIndex < numbers.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Game complete 🎉
        // confetti({
        //   particleCount: 200,
        //   spread: 90,
        //   origin: { y: 0.6 },
        // });
        alert("🎉 Number Game Completed! Great job!");
        setCurrentIndex(0);
      }

      setInputValue("");
    } else {
      setError("Oops! Try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2 className="text-4xl font-bold text-indigo-600 mb-8 text-center drop-shadow-md">
        Number Identification Game (1–50)
      </h2>

      {/* Bounce animation for number */}
      <div
        key={currentNumber}
        className="text-[150px] font-extrabold drop-shadow-lg mb-6 animate-bounce transition-colors duration-500"
        style={{ color: numberColor }}
      >
        {currentNumber}
      </div>

      {/* Sound */}
      <button
        onClick={() => speakNumber(currentNumber)}
        className="mb-8 p-3 bg-indigo-100 rounded-full shadow hover:bg-indigo-200 transition"
      >
        <CiVolumeHigh size={32} className="text-indigo-600" />
      </button>

      {/* Input + Submit */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          ref={inputRef}
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="text-4xl text-center w-32 h-24 border-2 border-indigo-300 rounded-xl shadow focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <button
          type="submit"
          className="px-10 py-3 bg-indigo-500 text-white text-2xl rounded-xl shadow hover:bg-indigo-600 transition"
        >
          Submit
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-xl font-medium animate-pulse mt-2">
            {error}
          </p>
        )}
      </form>

      {/* Progress */}
      <p className="mt-8 text-lg text-gray-600">
        Progress:{" "}
        <span className="font-semibold">
          {currentIndex + 1} / {numbers.length}
        </span>
      </p>
    </div>
  );
}
