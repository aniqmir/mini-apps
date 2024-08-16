import { useEffect, useRef, useState } from 'react';

// icons
import { CiClock1 } from 'react-icons/ci';
import { MdClear, MdStart, MdStop } from 'react-icons/md';

const StopwatchApp = () => {
  const [timePassed, setTimePassed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const interval = useRef<any>(null);

  useEffect(() => {
    return () => clearInterval(interval.current);
  }, []);

  const startTimer = () => {
    setIsTimerRunning(true);
    interval.current = setInterval(() => {
      setTimePassed((prev: number) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    clearInterval(interval.current);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    clearInterval(interval.current);
    setTimePassed(0);
  };

  const renderSeconds = () => {
    const seconds = Math.floor(timePassed % 60);

    if (seconds < 10) {
      return `0${seconds}`;
    }
    return seconds;
  };

  const renderMinutes = () => {
    const minutes = Math.floor(timePassed / 60);

    if (minutes < 10) {
      return `0${minutes}`;
    }
    return minutes;
  };

  const timer = `${renderMinutes()}:${renderSeconds()}`;

  const buttonClass =
    'transition-all p-4 text-3xl bg-slate-800 text-slate-100 rounded-md hover:opacity-90 disabled:opacity-50';

  return (
    <div className='flex flex-col space-y-5 mt-10 justify-center items-center'>
      <div className='text-slate-900'>
        <CiClock1 className='text-9xl' />
      </div>
      <p className='text-4xl'>{timer}</p>
      <div className='flex justify-center space-x-10'>
        <button
          onClick={startTimer}
          className={buttonClass}
          disabled={isTimerRunning}
        >
          <MdStart />
        </button>
        <button
          onClick={stopTimer}
          className={buttonClass}
          disabled={!isTimerRunning}
        >
          <MdStop />
        </button>
        <button
          onClick={resetTimer}
          className={buttonClass}
          disabled={timePassed === 0}
        >
          <MdClear />
        </button>
      </div>
    </div>
  );
};

export default StopwatchApp;
