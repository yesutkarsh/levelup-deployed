"use client";
// Components/Session/SessionItem.jsx
import React from "react";
import { Clock, Tag } from "lucide-react";
import { useCountdown } from "../useCountdown"; // adjust the relative path if needed
import { getInitialCountdown, getRemainingToEnd } from "../calculateCountdown";

const SessionItem = ({
  session,
  handleJoinSession,
  handleViewDetails,
  handleWriteReview,
}) => {
  // Get the countdown until the session starts.
  const initialCountdownStr = getInitialCountdown(session);
  const { formattedTime, showJoinButton } = useCountdown(
    initialCountdownStr,
    300
  );

  // Compute remaining seconds until session ends.
  const remainingToEnd = getRemainingToEnd(session);
  // If the session was "upcoming" but the remaining-to-end is 0, we treat it as "past".
  const effectiveStatus =
    session.status.toLowerCase() === "upcoming" && remainingToEnd === 0
      ? "past"
      : session.status.toLowerCase();

  return (
    <div className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
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
      {effectiveStatus === "upcoming" ? (
        <div className="flex flex-col space-y-2">
          {showJoinButton ? (
            <button
              onClick={() => handleJoinSession(session)}
              className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200"
            >
              Join Now
            </button>
          ) : (
            <div className="text-custom font-medium text-right">
              Starts in: {formattedTime.hours} : {formattedTime.minutes} :{" "}
              {formattedTime.seconds}
            </div>
          )}
        </div>
      ) : (
        <div className="space-x-2">
          <button
            onClick={() => handleViewDetails(session)}
            className="border border-custom text-custom px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-all duration-200"
          >
            View Details
          </button>
          <button
            onClick={() => handleWriteReview(session)}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-200"
          >
            Write Review
          </button>
        </div>
      )}
    </div>
  );
};

export default SessionItem;
