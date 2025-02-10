// useCountdown.js
import { useState, useEffect } from "react";

// Helper function to parse a countdown string ("hh:mm:ss") into seconds.
export function parseCountdown(countdownStr) {
  const parts = countdownStr.split(":");
  if (parts.length !== 3) return 0;
  const hours = parseInt(parts[0], 10) || 0;
  const minutes = parseInt(parts[1], 10) || 0;
  const seconds = parseInt(parts[2], 10) || 0;
  return hours * 3600 + minutes * 60 + seconds;
}

// Custom hook returns the remaining time (formatted) and a flag to show the Join button.
// When timeLeft is 5 minutes (300 seconds) or less, the countdown stops and showJoinButton is set to true.
export function useCountdown(initialCountdownStr, threshold = 300) {
  const initialSeconds = parseCountdown(initialCountdownStr);
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [showJoinButton, setShowJoinButton] = useState(false);

  useEffect(() => {
    if (timeLeft <= threshold) {
      setShowJoinButton(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= threshold + 1) {
          clearInterval(timer);
          setShowJoinButton(true);
          return threshold;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, threshold]);

  const formattedTime = {
    hours: String(Math.floor(timeLeft / 3600)).padStart(2, "0"),
    minutes: String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0"),
    seconds: String(timeLeft % 60).padStart(2, "0"),
  };

  return { timeLeft, formattedTime, showJoinButton };
}
