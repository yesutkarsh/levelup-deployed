"use client"
import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function MentorDashboard() {
  // Tab state
  const [activeTab, setActiveTab] = useState("details");

  // Mentor Details State
  const [editMode, setEditMode] = useState(false);
  const [mentorDetails, setMentorDetails] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    resume: "resume.pdf",
    skills: ["JavaScript", "React", "Next.js"],
    qualification: "MSc Computer Science",
  });
  const [newSkill, setNewSkill] = useState("");
  const fileInputRef = useRef(null);

  // Dummy booked dates for the calendar (days of the month)
  const bookedDates = [5, 12, 20];

  // Dummy available teachers for session pass
  const availableTeachers = ["Teacher A", "Teacher B", "Teacher C"];

  // Cancellation Modal state for upcoming sessions
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);

  // Schedule state for Tab 3 (Update Schedule)
  const [scheduleInput, setScheduleInput] = useState({
    date: "",
    day: "",
    time: "",
  });
  const [scheduleList, setScheduleList] = useState([]);

  // Dummy analytics data for Tab 4
  const sessionAnalytics = [
    { id: 1, title: "Session 1", date: "2025-02-01", likes: 10, dislikes: 1 },
    { id: 2, title: "Session 2", date: "2025-02-05", likes: 8, dislikes: 2 },
    { id: 3, title: "Session 3", date: "2025-02-10", likes: 15, dislikes: 0 },
  ];

  // Handlers for Mentor Details
  const handleDetailChange = (e) => {
    setMentorDetails({
      ...mentorDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For demo purposes, we just store the file name.
      setMentorDetails({
        ...mentorDetails,
        resume: file.name,
      });
      setResumeFile(file);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setMentorDetails({
        ...mentorDetails,
        skills: [...mentorDetails.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  // Handle schedule form submission
  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    setScheduleList([...scheduleList, scheduleInput]);
    setScheduleInput({ date: "", day: "", time: "" });
  };

  // Upcoming sessions: Open cancellation modal
  const handleCancelClick = (sessionDay) => {
    setSelectedSession(sessionDay);
    setShowCancelModal(true);
  };

  // Confirm cancellation (here you can add an API call)
  const handleConfirmCancellation = () => {
    console.log("Cancelling session:", selectedSession, "Reason:", cancellationReason);
    setCancellationReason("");
    setShowCancelModal(false);
    setSelectedSession(null);
  };

  return (
    <>
      <Head>
        <title>Mentor Dashboard</title>
        {/* Remixicon CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon/fonts/remixicon.css"
          rel="stylesheet"
        />
      </Head>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Mentor Dashboard</h1>

        {/* Tab Navigation */}
        <div className="flex justify-center space-x-6 mb-8 border-b pb-3">
          {[
            { id: "details", label: "Mentor Details" },
            { id: "sessions", label: "Upcoming Sessions" },
            { id: "schedule", label: "Update Schedule" },
            { id: "analytics", label: "Analytics" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-4 font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-b-4 border-black text-black"
                  : "text-gray-500 hover:text-black"
              } focus:outline-none`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ---------------------- Tab 1: Mentor Details ---------------------- */}
        {activeTab === "details" && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-semibold text-gray-800">Personal Details</h2>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                  Change Details
                </button>
              ) : (
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                  Save
                </button>
              )}
            </div>

            <div className="space-y-5">
              {/* Name */}
              <div className="flex items-center">
                <span className="w-40 font-medium text-gray-700">Name:</span>
                {editMode ? (
                  <input
                    name="name"
                    value={mentorDetails.name}
                    onChange={handleDetailChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                ) : (
                  <span className="text-gray-800">{mentorDetails.name}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex items-center">
                <span className="w-40 font-medium text-gray-700">Email:</span>
                {editMode ? (
                  <input
                    name="email"
                    value={mentorDetails.email}
                    onChange={handleDetailChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                ) : (
                  <span className="text-gray-800">{mentorDetails.email}</span>
                )}
              </div>

              {/* Resume */}
              <div className="flex items-center">
                <span className="w-40 font-medium text-gray-700">Resume:</span>
                <span className="text-gray-800 mr-4">{mentorDetails.resume}</span>
                {editMode && (
                  <>
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
                    >
                      Upload New Resume
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleResumeUpload}
                      className="hidden"
                    />
                  </>
                )}
              </div>

              {/* Skills */}
              <div className="flex items-start">
                <span className="w-40 font-medium text-gray-700">Skills:</span>
                <div className="w-full">
                  {mentorDetails.skills.length > 0 ? (
                    <ul className="list-disc pl-5 mb-3">
                      {mentorDetails.skills.map((skill, index) => (
                        <li key={index} className="text-gray-800">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-600">No skills added yet.</p>
                  )}
                  {editMode && (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add new skill"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      />
                      <button
                        onClick={handleAddSkill}
                        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                      >
                        Add Skill
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Qualification */}
              <div className="flex items-center">
                <span className="w-40 font-medium text-gray-700">Qualification:</span>
                {editMode ? (
                  <input
                    name="qualification"
                    value={mentorDetails.qualification}
                    onChange={handleDetailChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                ) : (
                  <span className="text-gray-800">{mentorDetails.qualification}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------- Tab 2: Upcoming Sessions ---------------------- */}
        {activeTab === "sessions" && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Upcoming Sessions</h2>

            {/* Calendar Display */}
            <div className="grid grid-cols-7 gap-3 mb-8">
              {Array.from({ length: 30 }, (_, i) => {
                const day = i + 1;
                const isBooked = bookedDates.includes(day);
                return (
                  <div
                    key={day}
                    className={`p-3 text-center rounded-lg border transition transform hover:scale-105 ${
                      isBooked
                        ? "bg-gradient-to-r from-blue-200 to-blue-300 border-blue-400"
                        : "bg-gray-100 border-gray-300"
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            {/* List of Booked Sessions */}
            <div className="space-y-5">
              {bookedDates.map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-between p-5 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-xl transition"
                >
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      Session on {`February ${day}, 2025`}
                    </p>
                    <p className="text-gray-600">Topic: Pear Programming Session</p>
                  </div>
                  <div className="flex items-center space-x-3">
                  <button
                      className="bg-[#328aff] text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                    >
                      Start Now
                    </button>

                    <button
                      onClick={() => handleCancelClick(day)}
                      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                    >
                      Cancel
                    </button>
                    <select className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
                      <option>Pass Session</option>
                      {availableTeachers.map((teacher, index) => (
                        <option key={index} value={teacher}>
                          {teacher}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------- Tab 3: Update Schedule ---------------------- */}
        {activeTab === "schedule" && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Update Schedule</h2>
            <form onSubmit={handleScheduleSubmit} className="space-y-5 mb-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={scheduleInput.date}
                  onChange={(e) =>
                    setScheduleInput({ ...scheduleInput, date: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">Day</label>
                <input
                  type="text"
                  placeholder="e.g., Monday"
                  value={scheduleInput.day}
                  onChange={(e) =>
                    setScheduleInput({ ...scheduleInput, day: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  value={scheduleInput.time}
                  onChange={(e) =>
                    setScheduleInput({ ...scheduleInput, time: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
              >
                Add Schedule
              </button>
            </form>
            <div>
              <h3 className="text-2xl font-medium mb-4 text-gray-800">Upcoming Schedule</h3>
              {scheduleList.length === 0 ? (
                <p className="text-gray-600">No schedule added yet.</p>
              ) : (
                <ul className="space-y-3">
                  {scheduleList.map((item, idx) => (
                    <li key={idx} className="p-4 border rounded-lg shadow bg-gray-50">
                      {item.date} - {item.day} at {item.time}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* ---------------------- Tab 4: Analytics ---------------------- */}
        {activeTab === "analytics" && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessionAnalytics.map((session) => (
                <div
                  key={session.id}
                  className="p-6 rounded-lg shadow-xl bg-gradient-to-br from-green-100 to-blue-100 border border-gray-200 transition transform hover:scale-105"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {session.title}
                  </h3>
                  <p className="text-gray-600 mb-4">Date: {session.date}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <i className="ri-thumb-up-line text-green-600 text-xl"></i>
                      <span className="font-medium text-gray-700">{session.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <i className="ri-thumb-down-line text-red-600 text-xl"></i>
                      <span className="font-medium text-gray-700">{session.dislikes}</span>
                    </div>
                  </div>
                  <Link href={"/Booksession/PostSessionMentor"}>
                  <button className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                    View Review
                  </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------------- Cancellation Modal ---------------------- */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Cancel Session on{" "}
                {selectedSession && `February ${selectedSession}, 2025`}
              </h2>
              <textarea
                placeholder="Reason for cancellation"
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 transition"
                >
                  Close
                </button>
                <button
                  onClick={handleConfirmCancellation}
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
