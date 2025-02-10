"use client";
// Components/sessions/SessionDetailsPage.jsx
import React from "react";

const SessionDetailsPage = ({ session, onBack }) => {
  if (!session) return <div>Session not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold mb-4">{session.title}</h1>
        <p className="mb-2">
          <strong>Instructor:</strong> {session.instructor}
        </p>
        <p className="mb-2">
          <strong>Batch:</strong> {session.batch}
        </p>
        <p className="mb-2">
          <strong>Subject:</strong> {session.subject}
        </p>
        <p className="mb-2">
          <strong>Date:</strong> {session.date}
        </p>
        <p className="mb-2">
          <strong>Time:</strong> {session.time}
        </p>
        <p className="mb-2">
          <strong>Duration:</strong> {session.duration}
        </p>
        <p className="mb-2">
          <strong>Course Name:</strong> {session.courseName}
        </p>
        <div className="my-4">
          <strong>Description:</strong>
          <p>{session.description}</p>
        </div>
        {session.resources && session.resources.length > 0 && (
          <div className="my-4">
            <strong>Resources:</strong>
            <ul className="list-disc list-inside">
              {session.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Add additional sections (e.g., video recordings) as needed */}
        <div className="flex justify-end">
          <button
            onClick={onBack}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-200"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionDetailsPage;
