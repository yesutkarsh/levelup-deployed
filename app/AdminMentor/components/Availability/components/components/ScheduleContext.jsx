"use client";

import { createContext, useContext, useState } from "react";

// Create a context for schedule management
const ScheduleContext = createContext();

/**
 * ScheduleProvider is a context provider that shares state across components.
 */
export function ScheduleProvider({ children }) {
  const [workingHours, setWorkingHours] = useState({
    start: "09:00",
    end: "17:00",
  });

  const [sessionSettings, setSessionSettings] = useState({
    duration: "45",
    buffer: "10",
  });

  const [slots, setSlots] = useState([]);
  const [bookingRules, setBookingRules] = useState({ reassignMentor: "" });
  const [schedule, setSchedule] = useState([]);

  return (
    <ScheduleContext.Provider
      value={{
        workingHours,
        setWorkingHours,
        sessionSettings,
        setSessionSettings,
        slots,
        setSlots,
        bookingRules,
        setBookingRules,
        schedule,
        setSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

/**
 * Custom Hook for accessing the schedule context
 */
export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
}
