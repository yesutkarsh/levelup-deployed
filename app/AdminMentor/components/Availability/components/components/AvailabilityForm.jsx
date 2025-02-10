"use client";

import { useState } from "react";
import { useSchedule } from "./ScheduleContext";

export default function AvailabilityAndRules() {
  const {
    workingHours,
    setWorkingHours,
    sessionSettings,
    setSessionSettings, // Added setter for session settings
    slots,
    setSlots,
    setSchedule,
    bookingRules,
    setBookingRules,
  } = useSchedule();

  const [newSlotConfig, setNewSlotConfig] = useState({
    day: "Monday",
    slots: 1,
  });

  const sessionDuration = Number(sessionSettings.duration);
  const bufferDuration = Number(sessionSettings.buffer);

  const generateTimeSlots = (
    workingHours,
    slotCount,
    sessionDuration,
    bufferDuration
  ) => {
    const [startHour, startMinute] = workingHours.start.split(":").map(Number);
    const [endHour, endMinute] = workingHours.end.split(":").map(Number);
    const startTime = startHour * 60 + startMinute;
    const endTime = endHour * 60 + endMinute;
    const totalMinutes = endTime - startTime;

    const requiredTime =
      slotCount * sessionDuration + (slotCount - 1) * bufferDuration;
    if (requiredTime > totalMinutes) {
      return ["Not enough time for the selected session duration and buffer"];
    }

    const slotsArr = [];
    const formatTime = (minutes) => {
      const hr = Math.floor(minutes / 60);
      const min = minutes % 60;
      return `${hr.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}`;
    };

    for (let i = 0; i < slotCount; i++) {
      const slotStart = startTime + i * (sessionDuration + bufferDuration);
      const slotEnd = slotStart + sessionDuration;
      slotsArr.push(`${formatTime(slotStart)} - ${formatTime(slotEnd)}`);
    }
    return slotsArr;
  };

  const handleAddSlot = () => {
    if (newSlotConfig.day && newSlotConfig.slots) {
      const existingIndex = slots.findIndex(
        (slot) => slot.day === newSlotConfig.day
      );
      if (existingIndex !== -1) {
        setSlots((prev) => [
          ...prev.slice(0, existingIndex),
          newSlotConfig,
          ...prev.slice(existingIndex + 1),
        ]);
      } else {
        setSlots((prev) => [...prev, newSlotConfig]);
      }
      setNewSlotConfig({ day: "Monday", slots: 1 });
    }
  };

  const handleRemoveSlot = (index) => {
    setSlots((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveChanges = () => {
    let newSchedule = [];
    slots.forEach((slotConfig) => {
      const timeSlots = generateTimeSlots(
        workingHours,
        slotConfig.slots,
        sessionDuration,
        bufferDuration
      );
      if (timeSlots[0].startsWith("Not enough time")) return;
      timeSlots.forEach((ts) => {
        newSchedule.push({
          day: slotConfig.day, // Include day in schedule entry
          time: ts,
          status: "Available",
          student: "-",
          statusColor: "text-green-700 bg-green-100",
        });
      });
    });
    setSchedule(newSchedule);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Availability Form Section */}
        <div className="flex-1 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Set Mentor Availability
          </h2>

          {/* Working Hours */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Working Hours
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  value={workingHours.start}
                  onChange={(e) =>
                    setWorkingHours((prev) => ({
                      ...prev,
                      start: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={workingHours.end}
                  onChange={(e) =>
                    setWorkingHours((prev) => ({
                      ...prev,
                      end: e.target.value,
                    }))
                  }
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>
            </div>
          </div>

          {/* Slots Configuration */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Slots Configuration
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Day</label>
                <select
                  value={newSlotConfig.day}
                  onChange={(e) =>
                    setNewSlotConfig((prev) => ({
                      ...prev,
                      day: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                >
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Number of Slots
                </label>
                <select
                  value={newSlotConfig.slots}
                  onChange={(e) =>
                    setNewSlotConfig((prev) => ({
                      ...prev,
                      slots: Number(e.target.value),
                    }))
                  }
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num} value={num + 1}>
                      {num + 1} slot{num > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dynamic Preview */}
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700">
                Preview ({newSlotConfig.day}):{" "}
                {generateTimeSlots(
                  workingHours,
                  newSlotConfig.slots,
                  sessionDuration,
                  bufferDuration
                ).join(", ")}
              </p>
            </div>

            <button
              onClick={handleAddSlot}
              className="w-full mt-2 px-4 py-4 text-sm font-semibold text-white bg-black rounded-xl transition-all duration-200"
            >
              Add Slot Configuration
            </button>
          </div>
        </div>

        {/* Booking Rules Section */}
        <div className="flex-1 p-4 rounded-lg">
          <div className="mb-[50px] -mt-[30px]">
            {/* Save Changes Button */}
            <button
              onClick={handleSaveChanges}
              className="w-100 mt-4 px-4 py-3 float-right text-sm font-semibold text-white bg-[#000] rounded-xl transition-all duration-200"
            >
              Save Changes
            </button>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Session Settings
            </h3>
          </div>
          <div className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Duration
              </label>
              <select
                value={sessionSettings.duration}
                onChange={(e) =>
                  setSessionSettings((prev) => ({
                    ...prev,
                    duration: e.target.value,
                  }))
                }
                className="w-full rounded-md border-gray-300 border py-3 px-2"
              >
                <option value="10">10 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buffer Between Sessions
              </label>
              <select
                value={sessionSettings.buffer}
                onChange={(e) =>
                  setSessionSettings((prev) => ({
                    ...prev,
                    buffer: e.target.value,
                  }))
                }
                className="w-full rounded-md border-gray-300 border py-3 px-2"
              >
                <option value="0">0 minutes</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
              </select>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">
            Booking Rules
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                Reassign sessions to another mentor
              </span>
              <select
                value={bookingRules.reassignMentor}
                onChange={(e) =>
                  setBookingRules((prev) => ({
                    ...prev,
                    reassignMentor: e.target.value,
                  }))
                }
                className="w-[200px] rounded-md border-gray-300 border py-3 px-2"
              >
                <option value="">Select a mentor</option>
                <option value="mentor1">John Smith</option>
                <option value="mentor2">Sarah Wilson</option>
                <option value="mentor3">Mark Davis</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* Configured Slots Table */}
      <div className="mt-4 border border-gray-100 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Day
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Slots
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Time Slots
              </th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {slots.map((slot, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 py-2 text-sm font-medium text-gray-900">
                  {slot.day}
                </td>
                <td className="px-3 py-2 text-sm text-gray-600">
                  {slot.slots} {slot.slots > 1 ? "slots" : "slot"}
                </td>
                <td className="px-3 py-2 text-sm text-gray-600">
                  {generateTimeSlots(
                    workingHours,
                    slot.slots,
                    sessionDuration,
                    bufferDuration
                  ).join(", ")}
                </td>
                <td className="px-3 py-2 text-right">
                  <button
                    onClick={() => handleRemoveSlot(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
