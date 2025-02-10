// Components/Session/SessionsPage.jsx
import React, { useState, useEffect } from "react";
import SessionTabs from "./SessionTabs";
import SessionList from "./SessionList";
import Pagination from "./Pagination";
import sessionsData from "../sessionsData";
import { getRemainingSeconds, getRemainingToEnd } from "../calculateCountdown";

export default function SessionsPage({
  onViewDetails,
  onJoinSession,
  onWriteReview,
}) {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Store sessions in state so we can update their status.
  const [sessions, setSessions] = useState(sessionsData);

  // Dummy tick state to force re-render every second.
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // On each tick, update sessions: if a session is "upcoming" and its remaining-to-end is 0, update its status to "Past".
  useEffect(() => {
    setSessions((prevSessions) =>
      prevSessions.map((session) => {
        if (
          session.status.toLowerCase() === "upcoming" &&
          getRemainingToEnd(session) === 0
        ) {
          return { ...session, status: "Past" };
        }
        return session;
      })
    );
  }, [tick]);

  // Filter sessions based on search query.
  const filtered = sessions.filter((session) =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter by active tab.
  let filteredSessions;
  if (activeTab === "upcoming") {
    filteredSessions = filtered.filter(
      (session) => session.status.toLowerCase() === "upcoming"
    );
  } else if (activeTab === "past") {
    filteredSessions = filtered.filter(
      (session) => session.status.toLowerCase() === "past"
    );
  } else {
    filteredSessions = filtered;
  }

  // Automatically sort sessions by remaining start time.
  filteredSessions.sort(
    (a, b) => getRemainingSeconds(a) - getRemainingSeconds(b)
  );

  const itemsPerPage = 10;
  const totalResults = filteredSessions.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredSessions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <SessionTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setCurrentPage={setCurrentPage}
      />
      <SessionList
        sessions={currentItems}
        handleViewDetails={onViewDetails}
        handleJoinSession={onJoinSession}
        handleWriteReview={onWriteReview}
      />
      {totalResults > 0 && (
        <Pagination
          currentPage={currentPage}
          totalResults={totalResults}
          itemsPerPage={itemsPerPage}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}
