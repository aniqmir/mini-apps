import { useState, useEffect, useRef, FormEvent } from "react";
import { CiVolumeHigh } from "react-icons/ci";

import BgImage from './images/bg-image-alphabet.svg'

const alphabets: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Generate playful, bright color for children
const getRandomPlayfulColor = (): string => {
  const hue = Math.floor(Math.random() * 360);       
  const saturation = Math.floor(Math.random() * 30) + 70; 
  const lightness = Math.floor(Math.random() * 20) + 50;  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

// Pre-generate a color for each letter
const letterColors: Record<string, string> = {};
alphabets.forEach(letter => {
  letterColors[letter] = getRandomPlayfulColor();
});

export default function AlphabetGame() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [letterColor, setLetterColor] = useState<string>(
    letterColors[alphabets[0]]
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const currentLetter: string = alphabets[currentIndex];

  useEffect(() => {
    inputRef.current?.focus();
    // Update letter color on letter change
    setLetterColor(letterColors[currentLetter]);
  }, [currentLetter]);

  // Hardcoded TTS voice
  const speakLetter = (letter: string) => {
    const utterance = new SpeechSynthesisUtterance(letter);
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice =
      voices.find(v => v.name === "Google UK English") || voices[0];
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice.lang;
    utterance.pitch = 1;  // playful
    utterance.rate = 0.8;   // slower for toddlers
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const playSound = (letter: string) => {
    speakLetter(letter);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.toUpperCase() === currentLetter) {
      setError("");
      playSound(currentLetter);

      if (currentIndex < alphabets.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        alert("🎉 Game completed! Well done!");
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
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <h2 className="text-4xl font-bold text-indigo-600 mb-8 text-center drop-shadow-md">
        Alphabet Identification Game
      </h2>

      {/* Letter display */}
      <div
      key={currentLetter}
        className="text-[150px] font-extrabold drop-shadow-lg mb-6 transition-colors duration-500 animate-bounce"
        style={{ color: letterColor }}
      >
        {currentLetter}
      </div>

      {/* Sound button */}
      <button
        onClick={() => playSound(currentLetter)}
        className="mb-8 p-3 bg-indigo-100 rounded-full shadow hover:bg-indigo-200 transition"
      >
        <CiVolumeHigh size={32} className="text-indigo-600" />
      </button>

      {/* Input + Submit */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <input
          ref={inputRef}
          maxLength={1}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="text-4xl text-center w-24 h-24 border-2 border-indigo-300 rounded-xl shadow focus:ring-2 focus:ring-indigo-500 outline-none"
        />

        <button
          type="submit"
          className="px-10 py-3 bg-indigo-500 text-white text-2xl rounded-xl shadow hover:bg-indigo-600 transition"
        >
          Submit
        </button>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-xl font-medium animate-pulse mt-2">
            {error}
          </p>
        )}
      </form>

      {/* Progress */}
      <p className="mt-8 text-lg text-black-300">
        Progress: <span className="font-semibold">{currentIndex + 1}</span> / 26
      </p>
    </div>
  );
}
