// Components/Session/calculateCountdown.js

// Returns a formatted countdown string ("hh:mm:ss") until session start.
export function getInitialCountdown(session) {
  const { date, time } = session;
  const sessionStart = new Date(`${date} ${time}`);
  const now = new Date();
  const diffSeconds = Math.max(
    0,
    Math.floor((sessionStart.getTime() - now.getTime()) / 1000)
  );

  const hours = String(Math.floor(diffSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((diffSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(diffSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

// Parses a duration string like "1h 30m" into seconds.
export function parseDuration(durationStr) {
  let hours = 0,
    minutes = 0;
  const hourMatch = durationStr.match(/(\d+)\s*h/);
  if (hourMatch) {
    hours = parseInt(hourMatch[1], 10);
  }
  const minuteMatch = durationStr.match(/(\d+)\s*m/);
  if (minuteMatch) {
    minutes = parseInt(minuteMatch[1], 10);
  }
  return hours * 3600 + minutes * 60;
}

// Returns the remaining seconds until the session ends.
// If the session has ended, returns 0.
export function getRemainingToEnd(session) {
  const { date, time, duration } = session;
  const sessionStart = new Date(`${date} ${time}`);
  const durationSeconds = parseDuration(duration);
  const sessionEnd = new Date(sessionStart.getTime() + durationSeconds * 1000);
  const now = new Date();
  const diff = sessionEnd.getTime() - now.getTime();
  return diff > 0 ? Math.floor(diff / 1000) : 0;
}

// (Optional) getRemainingSeconds for sorting by start time:
export function getRemainingSeconds(session) {
  const { date, time } = session;
  const sessionStart = new Date(`${date} ${time}`);
  const now = new Date();
  const diff = sessionStart.getTime() - now.getTime();
  return diff > 0 ? Math.floor(diff / 1000) : Number.MAX_SAFE_INTEGER;
}
