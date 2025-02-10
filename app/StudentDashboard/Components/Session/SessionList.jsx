// Components/Session/SessionList.jsx
import React from "react";
import SessionItem from "./SessionItem";

const SessionList = ({
  sessions,
  handleViewDetails,
  handleJoinSession,
  handleWriteReview,
}) => {
  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <SessionItem
          key={session.id}
          session={session}
          handleViewDetails={handleViewDetails}
          handleJoinSession={handleJoinSession}
          handleWriteReview={handleWriteReview}
        />
      ))}
    </div>
  );
};

export default SessionList;
