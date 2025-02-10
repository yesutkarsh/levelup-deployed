"use client";
import React, { useState } from "react";

const MentorAvailability = () => {
  const [workingHours, setWorkingHours] = useState({
    start: "09:00",
    end: "17:00",
  });
  const [selectedDays, setSelectedDays] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ]);
  const [sessionDuration, setSessionDuration] = useState(30);
  const [breakDuration, setBreakDuration] = useState(15);
  const [bookingBuffer, setBookingBuffer] = useState(false);
  const [slots, setSlots] = useState([
    { day: "Monday", slots: 4 },
    { day: "Wednesday", slots: 3 },
  ]);
  const [newSlotConfig, setNewSlotConfig] = useState({
    day: "Monday",
    slots: 1,
  });

  // Handle day selection
  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // Add new slot configuration
  const handleAddSlot = () => {
    if (newSlotConfig.day && newSlotConfig.slots) {
      setSlots((prev) => [...prev, newSlotConfig]);
      setNewSlotConfig({ day: "Monday", slots: 1 });
    }
  };

  // Remove slot configuration
  const handleRemoveSlot = (index) => {
    setSlots((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle save all data
  const handleSave = () => {
    const formData = {
      workingHours,
      selectedDays,
      sessionDuration,
      breakDuration,
      bookingBuffer,
      slots,
    };
    console.log("Saving data:", formData);
    // Here you would typically add your API call
  };

  return (
    <div className="mt-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-lg">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Mentor Availability Settings
        </h2>
        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-xl text-base font-semibold text-white bg-black hover:bg-[#1e1e1e] transition-all duration-200 shadow-sm hover:shadow-indigo-200"
        >
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side */}
        <div className="space-y-6">
          {/* Working Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Working Hours
            </h3>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
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
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
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
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          {/* Working Days */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Working Days
            </h3>
            <div className="flex flex-wrap gap-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    selectedDays.includes(day)
                      ? "text-black bg-white hover:bg-gray-200 hover:text-white shadow-sm"
                      : "text-white bg-black hover:bg-black"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Session Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Session Settings
            </h3>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Session Duration
                </label>
                <select
                  value={sessionDuration}
                  onChange={(e) => setSessionDuration(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none appearance-none"
                >
                  {[30, 45, 60, 90].map((time) => (
                    <option key={time} value={time}>
                      {time} minutes
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Break Between Sessions
                </label>
                <select
                  value={breakDuration}
                  onChange={(e) => setBreakDuration(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none appearance-none"
                >
                  {[5, 10, 15, 30].map((breakTime) => (
                    <option key={breakTime} value={breakTime}>
                      {breakTime} minutes
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium text-gray-700">
                  Allow Booking Buffer
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bookingBuffer}
                    onChange={(e) => setBookingBuffer(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-200 after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                </label>
              </div>
            </div>
          </div>

          {/* Slots Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Slots Configuration
            </h3>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Day</label>
                <select
                  value={newSlotConfig.day}
                  onChange={(e) =>
                    setNewSlotConfig((prev) => ({
                      ...prev,
                      day: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
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
              <div className="space-y-2">
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
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num} value={num + 1}>
                      {num + 1} slot{num > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleAddSlot}
              className="w-full px-6 py-3 rounded-xl text-base font-semibold text-white bg-black hover:bg-[#1e1e1e] transition-all duration-200 shadow-sm hover:shadow-indigo-200"
            >
              Add Slot Configuration
            </button>

            <div className="mt-6 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Day
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Slots
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {slots.map((slot, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3.5 text-sm font-medium text-gray-900">
                        {slot.day}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-gray-600">
                        {slot.slots} slots
                      </td>
                      <td className="px-4 py-3.5 text-right">
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
        </div>
      </div>
    </div>
  );
};

export default MentorAvailability;
