"use client";
import { useState, useEffect } from 'react';
import { Laptop, Database, Calendar, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { format, parseISO, isBefore, isAfter } from 'date-fns';

export default function UpcomingSessions() {
  const [sessions, setSessions] = useState({
    upcoming: [],
    past: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');

  // Categorize sessions based on current time
  const categorizeSessions = (bookedSessions) => {
    const now = new Date();
    return bookedSessions.reduce((acc, session) => {
      const start = parseISO(session.startTime);
      const end = parseISO(session.endTime);
      
      if (isAfter(now, end)) {
        acc.past.push({ ...session, status: 'past' });
      } else if (isBefore(now, start)) {
        acc.upcoming.push({ ...session, status: 'upcoming' });
      } else {
        acc.upcoming.push({ ...session, status: 'active' });
      }
      return acc;
    }, { upcoming: [], past: [] });
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch('/api/sessions/studentsession');
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const { data } = await res.json();
        const bookedSessions = data?.bookedSessions || [];

        const categorized = categorizeSessions(bookedSessions);
        setSessions(categorized);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const renderSessionTime = (startTime, endTime) => {
    try {
      const start = parseISO(startTime);
      const end = parseISO(endTime);
      return `${format(start, 'MMM d, yyyy')} • ${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
    } catch {
      return 'Time not available';
    }
  };

  const renderSessionCard = (session) => (
    <div
      key={session._id}
      className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
    >
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center">
          {session.status === 'active' ? (
            <Laptop className="text-black text-xl" />
          ) : (
            <Database className="text-black text-xl" />
          )}
        </div>
      </div>
      <div className="ml-4 flex-1 min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">{session.title}</h4>
        <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
          <Calendar size={14} />
          {renderSessionTime(session.startTime, session.endTime)}
        </p>
        {session.description && (
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{session.description}</p>
        )}
      </div>
      <div className="ml-4 flex-shrink-0">
        {session.status === 'active' ? (
          <a
            href={session.sessionJoinLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 block"
          >
            Join Now
          </a>
        ) : (
          <div className="flex gap-2">
            {session.status === 'past' && (
              <button className="bg-[#fef9c3] text-black px-4 py-2 rounded-lg hover:bg-yellow-200 transition-all duration-200">
                Rate Session
              </button>
            )}
            <button className="border border-black text-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-all duration-200">
              Details
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className="text-center py-12">
      <div className="mx-auto max-w-md">
        <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
        <p className="text-gray-500 mb-6">
          {activeTab === 'upcoming' 
            ? "You don't have any upcoming sessions. Book one now!"
            : "Your past sessions will appear here once you've completed some meetings."}
        </p>
        {activeTab === 'upcoming' && (
          <Link
            href="/Booksession"
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
          >
            Book a Session
          </Link>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading sessions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-400 mb-4" />
        <h3 className="text-lg font-medium text-red-800 mb-2">Error loading sessions</h3>
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-100 text-red-800 px-6 py-2 rounded-lg hover:bg-red-200 transition-all duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow relative">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Sessions</h3>
          {sessions.upcoming.length > 0 && (
            <button
              className="text-black hover:text-gray-700"
              onClick={() => setIsModalOpen(true)}
            >
              View All
            </button>
          )}
        </div>
        
        <div className="space-y-4">
          {sessions.upcoming.length > 0 ? (
            sessions.upcoming.slice(0, 3).map(renderSessionCard)
          ) : (
            renderEmptyState()
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-xl font-semibold">All Sessions</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="border-b">
              <nav className="flex">
                <button
                  className={`flex-1 py-2 ${
                    activeTab === 'upcoming'
                      ? 'border-b-2 border-black font-semibold'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming ({sessions.upcoming.length})
                </button>
                <button
                  className={`flex-1 py-2 ${
                    activeTab === 'past'
                      ? 'border-b-2 border-black font-semibold'
                      : 'text-gray-500'
                  }`}
                  onClick={() => setActiveTab('past')}
                >
                  Past ({sessions.past.length})
                </button>
              </nav>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeTab === 'upcoming' ? (
                sessions.upcoming.length > 0 ? (
                  sessions.upcoming.map(renderSessionCard)
                ) : (
                  renderEmptyState()
                )
              ) : sessions.past.length > 0 ? (
                sessions.past.map(renderSessionCard)
              ) : (
                renderEmptyState()
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}