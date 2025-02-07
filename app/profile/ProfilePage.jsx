"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Activity } from "lucide-react";

// Data arrays
const upcomingSessions = [
  {
    id: 1,
    title: "Pair Programming with Jane",
    time: "10:00 AM",
    joinable: false,
  },
  {
    id: 2,
    title: "Code Review Session",
    time: "2:00 PM",
    joinable: true,
  },
  // Additional upcoming sessions (for demonstration)
  {
    id: 5,
    title: "Debugging Workshop",
    time: "4:00 PM",
    joinable: true,
  },
];

const pastSessions = [
  {
    id: 3,
    title: "Debugging Workshop",
    time: "Yesterday 3:00 PM",
    joinable: false,
  },
  {
    id: 4,
    title: "CSS Flexbox Crash Course",
    time: "Yesterday 5:00 PM",
    joinable: false,
  },
];

const recentActivities = [
  { id: 1, activity: "Attended React Workshop" },
  { id: 2, activity: "Won DSA Contest" },
  { id: 3, activity: "Participated in Hackathon" },
  { id: 4, activity: "Completed JavaScript Challenge" },
];

const courses = [
  { id: 1, title: "Introduction to Web Development", type: "previous" },
  { id: 2, title: "Advanced Next.js", type: "current" },
];

const quickLinks = [
  { id: 1, label: "My Details", href: "/profile/me" },
  { id: 2, label: "Settings", href: "#" },
  { id: 3, label: "Support", href: "#" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("current");
  // Modal related states
  const [showModal, setShowModal] = useState(false);
  const [modalTab, setModalTab] = useState("upcoming"); // "upcoming" or "past"
  const [showAllSessions, setShowAllSessions] = useState(false);

  const currentCourses = courses.filter((course) => course.type === "current");
  const previousCourses = courses.filter((course) => course.type === "previous");

  // Determine which sessions to display in the modal based on the active modal tab
  const sessionsToShow = modalTab === "upcoming" ? upcomingSessions : pastSessions;
  const displayedSessions = showAllSessions ? sessionsToShow : sessionsToShow.slice(0, 2);

  const handleCloseModal = () => {
    setShowModal(false);
    setShowAllSessions(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Greeting */}
        <h1 className="text-3xl font-bold mb-8">Hello, Utkarsh</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Upcoming Sessions Card */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
                <button 
                  onClick={() => setShowModal(true)}
                  className="text-sm text-black border border-black px-3 py-1 rounded hover:bg-black hover:text-white transition"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition transform hover:-translate-y-1"
                  >
                    <div>
                      <p className="font-medium">{session.title}</p>
                      <p className="text-sm text-gray-500">{session.time}</p>
                    </div>
                    <button
                      disabled={!session.joinable}
                      className={`px-4 py-2 rounded transition ${
                        session.joinable
                          ? "bg-black text-white hover:bg-gray-800"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 border rounded-lg bg-gray-50 hover:bg-white hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer"
                  >
                    <p className="font-medium text-gray-700">
                      {activity.activity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Progress Overview Card */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-2">
                    <p className="text-sm text-gray-500">Sessions Attended</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Contests Won</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                </div>
                <Activity size={48} className="text-gray-300" />
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
              <div className="flex flex-wrap gap-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Courses Card with Tabs */}
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Courses</h2>
              <div className="mb-4 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab("current")}
                    className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition ${
                      activeTab === "current"
                        ? "border-black bg-black text-white p-2 rounded-lg m-2"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Current Course
                  </button>
                  <button
                    onClick={() => setActiveTab("previous")}
                    className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition ${
                      activeTab === "previous"
                        ? "border-black bg-black text-white p-2 rounded-lg m-2"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Previous Course
                  </button>
                </nav>
              </div>
              <div>
                {activeTab === "current" && (
                  <div className="space-y-4">
                    {currentCourses.length > 0 ? (
                      currentCourses.map((course) => (
                        <div
                          key={course.id}
                          className="p-4 border rounded-lg flex items-center justify-between hover:shadow-md transition transform hover:-translate-y-1"
                        >
                          <p className="font-medium">{course.title}</p>
                          <span className="text-green-500 border border-green-500 px-2 py-1 rounded-full text-xs">
                            Active
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No current courses.</p>
                    )}
                  </div>
                )}
                {activeTab === "previous" && (
                  <div className="space-y-4">
                    {previousCourses.length > 0 ? (
                      previousCourses.map((course) => (
                        <div
                          key={course.id}
                          className="p-4 border rounded-lg opacity-50 flex items-center"
                        >
                          <p className="font-medium">{course.title}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No previous courses.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Sessions */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-xl font-semibold">Sessions</h3>
              <button onClick={handleCloseModal} className="text-black hover:text-gray-600">
                Close
              </button>
            </div>
            {/* Modal Tabs */}
            <div className="mb-4 border-b">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setModalTab("upcoming")}
                  className={`pb-2 border-b-2 font-medium transition ${
                    modalTab === "upcoming"
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setModalTab("past")}
                  className={`pb-2 border-b-2 font-medium transition ${
                    modalTab === "past"
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Past
                </button>
              </nav>
            </div>
            {/* Session Cards */}
            <div className="space-y-4">
              {displayedSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-4 border rounded-lg hover:shadow-md transition transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{session.title}</p>
                      <p className="text-sm text-gray-500">{session.time}</p>
                    </div>
                    <button
                      disabled={!session.joinable}
                      className={`px-4 py-2 rounded transition ${
                        session.joinable
                          ? "bg-black text-white hover:bg-gray-800"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Show More / Show Less */}
            {sessionsToShow.length > 2 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowAllSessions(!showAllSessions)}
                  className="text-sm text-black border border-black px-3 py-1 rounded hover:bg-black hover:text-white transition"
                >
                  {showAllSessions ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
