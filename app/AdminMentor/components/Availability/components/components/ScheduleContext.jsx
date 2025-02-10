"use client";

import { createContext, useContext, useState } from "react";

// Create a context for schedule management
const ScheduleContext = createContext();

/**
 * ScheduleProvider is a context provider that shares state across components.
 * It manages working hours, session settings, slot configurations, booking rules, and schedule data.
 */
export function ScheduleProvider({ children }) {
  // State to manage working hours
  const [workingHours, setWorkingHours] = useState({
    start: "09:00", // Start of the working day
    end: "17:00", // End of the working day
  });

  // State to manage session settings (duration and buffer)
  const [sessionSettings, setSessionSettings] = useState({
    duration: "45", // Session duration in minutes (as a string)
    buffer: "10", // Buffer time between sessions in minutes
  });

  // State to manage slot configurations for different days
  const [slots, setSlots] = useState([]);

  // State to manage booking rules
  const [bookingRules, setBookingRules] = useState({
    reassignMentor: "", // Option to reassign a mentor
  });

  // State to manage the schedule, which updates as bookings change
  const [schedule, setSchedule] = useState([]);

  // Provide the state and its setters to the children components
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
 * useSchedule is a custom hook for accessing the schedule context.
 * It provides all the shared state and setters from the ScheduleProvider.
 */
export function useSchedule() {
  return useContext(ScheduleContext);
}
