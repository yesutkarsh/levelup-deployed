"use client";
import { useState } from "react";
import { Laptop, Database } from "lucide-react";
import { Clock, Tag } from "lucide-react";
import sessionsData from "../../sessionsData";
import {
  getInitialCountdown,
  getRemainingToEnd,
} from "../../calculateCountdown";
import { useCountdown } from "../../useCountdown";

export default function UpcomingSessions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming"); // "upcoming" or "past"
  const [searchQuery, setSearchQuery] = useState("");

  // Split sessionsData into upcoming and past sessions based on status
  const UPCOMING_SESSIONS = sessionsData.filter(
    (session) => session.status === "Upcoming"
  );
  const PAST_SESSIONS = sessionsData.filter(
    (session) => session.status === "Past"
  );

  // Handler for Ratings button click
  const handleRatingClick = () => {
    window.location.href = "/Booksession/PostSessionStudent";
  };

  // Render a session card based on its status
  const renderSessionCard = (session) => {
    // A session is joinable if its status is "Upcoming"
    const isJoinable = session.status === "Upcoming";
    return (
      <div
        key={session.id}
        className={`flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 ${
          !isJoinable ? "opacity-50" : ""
        }`}
      >
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-black/20 rounded-lg flex items-center justify-center">
            {isJoinable ? (
              <Laptop className="text-black text-xl" />
            ) : (
              <Database className="text-black text-xl" />
            )}
          </div>
        </div>

        <div className="ml-4 flex-1">
          <h4 className="text-sm font-medium text-gray-900">{session.title}</h4>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <span>{session.instructor}</span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" /> {session.time}
            </span>
            <span className="flex items-center">
              <Tag className="w-4 h-4 mr-1" /> {session.subject}
            </span>
          </div>
        </div>

        {isJoinable ? (
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200">
            Join Now
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleRatingClick}
              className="bg-[#fef9c3] text-black px-4 py-2 rounded-lg hover:bg-yellow-200 transition-all duration-200"
            >
              Ratings
            </button>
            <button className="border border-black text-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-all duration-200">
              View Details
            </button>
          </div>
        )}
      </div>
    );
  };

  // Filter sessions by title, instructor, or subject using the search query
  const filteredSessions = (sessions) =>
    sessions.filter(
      (session) =>
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Main view shows only the first 4 upcoming sessions
  const mainSessions = filteredSessions(UPCOMING_SESSIONS).slice(0, 4);

  return (
    <div className="bg-white rounded-lg shadow relative p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Upcoming Sessions</h3>
        <button
          className="text-black hover:text-gray-700"
          onClick={() => setIsModalOpen(true)}
        >
          View All
        </button>
      </div>
      <input
        type="text"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
        placeholder="Search sessions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="space-y-4">
        {mainSessions.map((session) => renderSessionCard(session))}
      </div>

      {/* Modal for viewing all sessions */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold">All Sessions</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <div className="border-b">
              <nav className="flex">
                <button
                  className={`flex-1 text-center py-2 ${
                    activeTab === "upcoming"
                      ? "border-b-2 border-black font-semibold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Upcoming
                </button>
                <button
                  className={`flex-1 text-center py-2 ${
                    activeTab === "past"
                      ? "border-b-2 border-black font-semibold"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("past")}
                >
                  Past
                </button>
              </nav>
            </div>
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {activeTab === "upcoming"
                ? filteredSessions(UPCOMING_SESSIONS).map((session) =>
                    renderSessionCard(session)
                  )
                : filteredSessions(PAST_SESSIONS).map((session) =>
                    renderSessionCard(session)
                  )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
