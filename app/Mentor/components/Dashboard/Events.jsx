"use client";

import React, { useState } from "react";
import styles from "./styles.module.css"
const events = [
  { id: 1, name: "React Advanced Workshop", date: "Feb 15, 2025", participants: 120, status: "Active", mentor: "" },
  { id: 2, name: "JavaScript Performance Tips", date: "Mar 2, 2025", participants: 85, status: "Pending", mentor: "" },
  { id: 3, name: "CSS for Developers", date: "Apr 10, 2025", participants: 100, status: "Active", mentor: "" },
];

const mentors = ["John Doe", "Jane Smith", "Mike Johnson", "Emily White"];

const UpcomingEvents = () => {
  const [eventData, setEventData] = useState(events);

  const handleMentorChange = (eventId, mentor) => {
    setEventData((prevData) =>
      prevData.map((event) => (event.id === eventId ? { ...event, mentor } : event))
    );
  };

  const handleDelete = (eventId) => {
    setEventData(eventData.filter((event) => event.id !== eventId));
  };

  return (
    <div id={styles.upcomingEvents} className="bg-white p-8 rounded-xl shadow-lg ">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left pb-4 font-semibold text-gray-900">Event Name</th>
              <th className="text-left pb-4 font-semibold text-gray-900">Date</th>
              <th className="text-left pb-4 font-semibold text-gray-900">Participants</th>
              <th className="text-left pb-4 font-semibold text-gray-900">Status</th>
              <th className="text-left pb-4 font-semibold text-gray-900">Mentor</th>
              <th className="text-left pb-4 font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {eventData.map((event) => (
              <tr key={event.id} className="border-b border-gray-100 last:border-none">
                <td className="py-4 pr-4">
                  <span className="font-medium text-gray-900">{event.name}</span>
                </td>
                <td className="py-4 pr-4 text-gray-600">{event.date}</td>
                <td className="py-4 pr-4 text-gray-600">{event.participants}</td>
                <td className="py-4 pr-4">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-lg ${
                      event.status === "Active"
                        ? "bg-[#DCFCE7] text-green-700"
                        : "bg-[#FEF9C3] text-yellow-700"
                    }`}
                  >
                    {event.status}
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <select
                    className="w-full max-w-[200px] px-3 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    value={event.mentor}
                    onChange={(e) => handleMentorChange(event.id, e.target.value)}
                  >
                    <option value="">Select Mentor</option>
                    {mentors.map((mentor, index) => (
                      <option key={index} value={mentor}>
                        {mentor}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingEvents;