"use client";

import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
}

const calculateTimeLeft = (targetDate: Date): TimeLeft | null => {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return null; // Time is up
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      if (!newTimeLeft) {
        clearInterval(timer);
        onComplete?.();
      }
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  if (!timeLeft) {
    return (
      <div className="text-xl mt-4">The event should be starting now!</div>
    );
  }

  return (
    <div className="mt-4 text-2xl md:text-3xl font-mono flex justify-center gap-x-2 md:gap-x-4 tabular-nums">
      <div>
        <span className="font-bold">
          {String(timeLeft.days).padStart(2, "0")}
        </span>
        <span className="text-sm block text-gray-400">DAYS</span>
      </div>
      <div>:</div>
      <div>
        <span className="font-bold">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
        <span className="text-sm block text-gray-400">HOURS</span>
      </div>
      <div>:</div>
      <div>
        <span className="font-bold">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
        <span className="text-sm block text-gray-400">MINS</span>
      </div>
      <div>:</div>
      <div>
        <span className="font-bold">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
        <span className="text-sm block text-gray-400">SECS</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
