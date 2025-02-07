"use client";
import { useState } from 'react';
import { Laptop, Database } from 'lucide-react';

// Updated data arrays with status:
// - "active": session is joinable now (shows "Join Now")
// - "future": session is scheduled for later (dimmed, shows "Ratings" and "View Details")
// - "past": completed session (only shown in the modal under Past tab)
const upcomingSessions = [
  {
    id: 1,
    title: "Pair Programming with Jane",
    time: "Today, 10:00 AM",
    status: "active", // joinable now
  },
  {
    id: 2,
    title: "Code Review Session",
    time: "Today, 2:00 PM",
    status: "future", // future meeting (dimmed)
  },
  {
    id: 3,
    title: "Debugging Workshop",
    time: "Today, 4:00 PM",
    status: "active", // joinable now
  },
];

const pastSessions = [
  {
    id: 4,
    title: "Retrospective Meeting",
    time: "Yesterday, 3:00 PM",
    status: "past",
  },
  {
    id: 5,
    title: "Sprint Planning",
    time: "Last week, 11:00 AM",
    status: "past",
  },
];

export default function UpcomingSessions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming'); // "upcoming" or "past"

  // Handler for Ratings button click
  const handleRatingClick = () => {
    // Redirect to the required page
    window.location.href = '/Booksession/PostSessionStudent';
  };

  // Render a session card based on its status
  const renderSessionCard = (session) => {
    // Dim the card if the session is scheduled for the future.
    const isDimmed = session.status === 'future';

    return (
      <div
        key={session.id}
        className={`flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 ${
          isDimmed ? 'opacity-50' : ''
        }`}
      >
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-black/20 rounded-lg flex items-center justify-center">
            {session.status === 'active' ? (
              <Laptop className="text-black text-xl" />
            ) : (
              <Database className="text-black text-xl" />
            )}
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h4 className="text-sm font-medium text-gray-900">{session.title}</h4>
          <p className="text-sm text-gray-500">{session.time}</p>
        </div>
        {session.status === 'active' ? (
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200">
            Join Now
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleRatingClick}
              className="bg-yellow-100 text-black px-4 py-2 rounded-lg hover:bg-yellow-200 transition-all duration-200"
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

  return (
    <div className="bg-white rounded-lg shadow relative">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Sessions</h3>
          <button
            className="text-black hover:text-gray-700"
            onClick={() => setIsModalOpen(true)}
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {upcomingSessions.map((session) => renderSessionCard(session))}
        </div>
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

            {/* Tab Navigation */}
            <div className="border-b">
              <nav className="flex">
                <button
                  className={`flex-1 text-center py-2 ${
                    activeTab === 'upcoming'
                      ? 'border-b-2 border-black font-semibold'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming
                </button>
                <button
                  className={`flex-1 text-center py-2 ${
                    activeTab === 'past'
                      ? 'border-b-2 border-black font-semibold'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('past')}
                >
                  Past
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {activeTab === 'upcoming'
                ? upcomingSessions.map((session) => renderSessionCard(session))
                : pastSessions.map((session) => renderSessionCard(session))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
