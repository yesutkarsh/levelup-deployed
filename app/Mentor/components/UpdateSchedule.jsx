"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const convertToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

const minutesToTime24 = (minutes) => {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
};

const time24To12 = (timeStr) => {
  const [hour, minute] = timeStr.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const adjustedHour = hour % 12 || 12;
  return `${adjustedHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${period}`;
};

const SuccessMessage = ({ message }) => (
  <div className="p-4 mb-4 text-green-700 bg-green-50 border border-green-300 rounded shadow">
    {message}
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="p-4 mb-4 text-red-700 bg-red-50 border border-red-300 rounded shadow">
    {message}
  </div>
);

const Calendar = ({ selectedDate, onDateSelect, year, month }) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay();

  const calendarDays = [];
  for (let i = 0; i < startDay; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(new Date(year, month, i));

  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) weeks.push(calendarDays.slice(i, i + 7));

  const weekDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-2 text-center font-semibold">
        {weekDayNames.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {weeks.flat().map((date, index) =>
          date ? (
            <motion.div
              key={index}
              layout
              whileHover={{ scale: 1.05 }}
              onClick={() => onDateSelect(date)}
              className={`p-3 text-center rounded-full cursor-pointer transition-colors duration-200 
                ${
                  date.toDateString() === selectedDate?.toDateString()
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {date.getDate()}
            </motion.div>
          ) : (
            <div key={index} className="p-2" />
          )
        )}
      </div>
    </div>
  );
};

const TimePicker = ({ label, value, onChange }) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = ["00", "15", "30", "45"];
  const periods = ["AM", "PM"];

  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <div className="flex gap-2">
        <select
          value={value.hours}
          onChange={(e) => onChange({ ...value, hours: e.target.value })}
          className="w-20 px-3 py-2 border rounded-lg bg-white"
        >
          {hours.map((h) => (
            <option key={h} value={h}>
              {h.toString().padStart(2, "0")}
            </option>
          ))}
        </select>
        <select
          value={value.minutes}
          onChange={(e) => onChange({ ...value, minutes: e.target.value })}
          className="w-20 px-3 py-2 border rounded-lg bg-white"
        >
          {minutes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={value.period}
          onChange={(e) => onChange({ ...value, period: e.target.value })}
          className="w-24 px-3 py-2 border rounded-lg bg-white"
        >
          {periods.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const SessionSummary = ({ startTime, sessionsCount, sessionDuration, bufferTime, wastedTime }) => {
  if (!startTime || sessionsCount <= 0) return null;

  const startMinutes = convertToMinutes(startTime);
  const sessions = [];

  for (let i = 0; i < sessionsCount; i++) {
    const sessionStart = startMinutes + i * (sessionDuration + bufferTime);
    const sessionEnd = sessionStart + sessionDuration;
    sessions.push({
      start: minutesToTime24(sessionStart),
      end: minutesToTime24(sessionEnd),
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full">
          {sessionsCount} Session Slots
        </div>
        {wastedTime > 0 && (
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full">
            {wastedTime} Minutes Wasted
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.map((session, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <div className="font-semibold text-green-800 mb-1">Session {index + 1}</div>
            <div className="text-sm text-gray-600">
              {time24To12(session.start)} - {time24To12(session.end)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MentorSlotScheduler = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const [startTime, setStartTime] = useState({ hours: "01", minutes: "00", period: "AM" });
  const [endTime, setEndTime] = useState({ hours: "01", minutes: "00", period: "AM" });
  const [sessionDuration, setSessionDuration] = useState(30);
  const [bufferTime, setBufferTime] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [sessionsCount, setSessionsCount] = useState(0);
  const [wastedTime, setWastedTime] = useState(0);

  const convertTimeTo24 = (time) => {
    let hours = parseInt(time.hours);
    if (time.period === "PM" && hours !== 12) hours += 12;
    if (time.period === "AM" && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, "0")}:${time.minutes}`;
  };

  useEffect(() => {
    const start24 = convertTimeTo24(startTime);
    const end24 = convertTimeTo24(endTime);
    const startTotal = convertToMinutes(start24);
    const endTotal = convertToMinutes(end24);

    if (endTotal > startTotal) {
      setTotalMinutes(endTotal - startTotal);
    } else {
      setTotalMinutes(0);
    }
  }, [startTime, endTime]);

  useEffect(() => {
    if (totalMinutes > 0 && sessionDuration > 0) {
      const count = Math.floor((totalMinutes + bufferTime) / (sessionDuration + bufferTime));
      const usedTime = count > 0 ? count * sessionDuration + (count - 1) * bufferTime : 0;
      setSessionsCount(count);
      setWastedTime(totalMinutes - usedTime);
    } else {
      setSessionsCount(0);
      setWastedTime(0);
    }
  }, [totalMinutes, sessionDuration, bufferTime]);

  useEffect(() => {
    const start24 = convertTimeTo24(startTime);
    const end24 = convertTimeTo24(endTime);
    const startTotal = convertToMinutes(start24);
    const endTotal = convertToMinutes(end24);

    if (selectedDate && endTotal > startTotal && errorMsg) {
      setErrorMsg("");
    }
  }, [selectedDate, startTime, endTime, errorMsg]);

  // --- UPDATED handleSaveSlots FUNCTION ---
  const handleSaveSlots = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!selectedDate) {
      setErrorMsg("Please select a date for your slots.");
      return;
    }

    const start24 = convertTimeTo24(startTime);
    const end24 = convertTimeTo24(endTime);
    const startTotal = convertToMinutes(start24);
    const endTotal = convertToMinutes(end24);

    if (endTotal <= startTotal) {
      setErrorMsg("End time must be after start time.");
      return;
    }

    // Construct the slots array based on the number of sessions.
    const slots = [];
    let baseStartMinutes = startTotal;
    for (let i = 0; i < sessionsCount; i++) {
      const sessionStartMinutes = baseStartMinutes + i * (sessionDuration + bufferTime);
      const sessionEndMinutes = sessionStartMinutes + sessionDuration;

      // Create Date objects using the selected date.
      const sessionStartDate = new Date(selectedDate);
      sessionStartDate.setHours(
        Math.floor(sessionStartMinutes / 60),
        sessionStartMinutes % 60,
        0,
        0
      );
      const sessionEndDate = new Date(selectedDate);
      sessionEndDate.setHours(
        Math.floor(sessionEndMinutes / 60),
        sessionEndMinutes % 60,
        0,
        0
      );

      slots.push({
        startTime: sessionStartDate.toISOString(),
        endTime: sessionEndDate.toISOString(),
      });
    }

    // Retrieve userDetails cookie dynamically.
    const getCookie = (name) => {
      const cookieArr = document.cookie.split(";");
      for (let cookie of cookieArr) {
        const [key, value] = cookie.trim().split("=");
        if (key === name) {
          return value;
        }
      }
      return null;
    };

    const userDetailsCookie = getCookie("userDetails");
    if (!userDetailsCookie) {
      setErrorMsg("User details not found in cookies.");
      return;
    }
    let userDetails;
    try {
      userDetails = JSON.parse(decodeURIComponent(userDetailsCookie));
    } catch (error) {
      setErrorMsg("Failed to parse user details.");
      return;
    }
    const mentorId = userDetails.id;
    const apiUrl = `https://5c93-2402-a00-166-1023-4d6d-24c2-49dc-fe9.ngrok-free.app/api/v1/mentor/create-slot/${mentorId}`;

    // Log the API URL and payload.
    console.log("API URL:", apiUrl);
    console.log("Payload:", slots );

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {slots} ),
      });
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || "Failed to create slots");
      // }
      const data = await response.json();
      console.log("API Response:", data);
      setSuccessMsg("Slots created successfully!");
    } catch (error) {
      console.error("Error creating slots:", error);
      setErrorMsg("Error creating slots: " + error.message);
    }
  };
  // --- END UPDATED FUNCTION ---

  const handleMonthChange = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);

    if (
      selectedDate &&
      (selectedDate.getMonth() !== newMonth || selectedDate.getFullYear() !== newYear)
    ) {
      setSelectedDate(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Open Your Slots for Students
      </h2>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">
          Select Date
        </label>
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => handleMonthChange(-1)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition"
          >
            ←
          </button>
          <span className="font-semibold text-gray-800">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={() => handleMonthChange(1)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition"
          >
            →
          </button>
        </div>
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          year={currentYear}
          month={currentMonth}
        />
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <TimePicker label="Start Time" value={startTime} onChange={setStartTime} />
        <TimePicker label="End Time" value={endTime} onChange={setEndTime} />
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Session Duration
          </label>
          <select
            value={sessionDuration}
            onChange={(e) => setSessionDuration(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg bg-white"
          >
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>60 minutes</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Buffer Time
          </label>
          <select
            value={bufferTime}
            onChange={(e) => setBufferTime(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg bg-white"
          >
            <option value={0}>None</option>
            <option value={5}>5 minutes</option>
            <option value={10}>10 minutes</option>
            <option value={15}>15 minutes</option>
          </select>
        </div>
      </div>

      {errorMsg && <ErrorMessage message={errorMsg} />}
      {successMsg && <SuccessMessage message={successMsg} />}

      <button
        onClick={handleSaveSlots}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
      >
        Save Slots
      </button>
      <br />

      {totalMinutes > 0 && (
        <div className="mb-6">
          <SessionSummary
            startTime={convertTimeTo24(startTime)}
            sessionsCount={sessionsCount}
            sessionDuration={sessionDuration}
            bufferTime={bufferTime}
            wastedTime={wastedTime}
          />
        </div>
      )}
    </div>
  );
};

export default MentorSlotScheduler;
