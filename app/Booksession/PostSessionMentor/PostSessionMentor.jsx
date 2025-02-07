"use client";
import React, { useState } from "react";

// Reusable Star component using inline SVG for a modern look
const Star = ({ filled, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="focus:outline-none transition-transform transform hover:scale-110"
  >
    {filled ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-yellow-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.168c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.176 0l-3.37 2.447c-.785.57-1.84-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.055 9.394c-.783-.57-.38-1.81.588-1.81h4.168a1 1 0 00.95-.69l1.286-3.967z" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.168c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.176 0l-3.37 2.447c-.785.57-1.84-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.055 9.394c-.783-.57-.38-1.81.588-1.81h4.168a1 1 0 00.95-.69l1.286-3.967z"
        />
      </svg>
    )}
  </button>
);

// Reusable InfoCard component with modern styling
const InfoCard = ({ icon, bgColor, textColor, title, value }) => (
  <div className="border border-gray-200 rounded-xl p-4">
    <div className="flex items-center">
      <div className={`rounded-full ${bgColor} p-2`}>
        <i className={`${icon} ${textColor}`}></i>
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  </div>
);

// Reusable FeedbackSection component with updated spacing
const FeedbackSection = ({ title, items }) => (
  <div className="mt-4">
    <h4 className="text-lg font-semibold text-gray-800">{title}:</h4>
    <ul className="mt-2 text-gray-600 list-disc list-inside">
      {items.map((item, index) => (
        <li key={index} className="ml-4">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default function PostSessionInstructor() {
  // States for the instructor's session analysis section
  const [sessionRating, setSessionRating] = useState(0);
  const [observations, setObservations] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");

  const handleUpdate = () => {
    console.log("Session Rating:", sessionRating, "Observations:", observations);
    setUpdateMessage("Analysis saved!");
    setTimeout(() => setUpdateMessage(""), 3000);
  };

  return (
    <div className="bg-gray-50 font-[Inter] min-h-screen flex flex-col">
      {/* Navigation can be added here if needed */}

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Session Details */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Post-Session Analysis
              </h1>
              <p className="text-gray-600 mt-2">
                <i className="far fa-calendar-alt mr-2"></i>March 15, 2024 • 10:00 AM - 11:30 AM
              </p>
              <p className="text-gray-600">
                <i className="far fa-clock mr-2"></i>Duration: 90 minutes
              </p>
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <img
                src="https://creatie.ai/ai/api/search-image?query=A%20professional%20headshot%20of%20a%20male%20teacher"
                alt="Instructor"
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
              <div className="ml-4">
                <p className="text-xl font-semibold text-gray-800">
                  Dr. Michael Anderson
                </p>
                <p className="text-gray-500">Senior Mathematics Instructor</p>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InfoCard
              icon="fas fa-check"
              bgColor="bg-green-100"
              textColor="text-green-600"
              title="Status"
              value="Completed"
            />
            <InfoCard
              icon="fas fa-user-check"
              bgColor="bg-blue-100"
              textColor="text-blue-600"
              title="Student Attendance"
              value="85%"
            />
            <InfoCard
              icon="fas fa-hashtag"
              bgColor="bg-gray-100"
              textColor="text-gray-600"
              title="Reference"
              value="MAT-2024-0315"
            />
          </div>

          {/* Session Recap */}
          <div className="border-t border-gray-200 pt-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Session Recap
            </h2>
            <div className="bg-gray-50 rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(4)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.168c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.176 0l-3.37 2.447c-.785.57-1.84-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.055 9.394c-.783-.57-.38-1.81.588-1.81h4.168a1 1 0 00.95-.69l1.286-3.967z" />
                    </svg>
                  ))}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.168c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.37-2.447a1 1 0 00-1.176 0l-3.37 2.447c-.785.57-1.84-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.055 9.394c-.783-.57-.38-1.81.588-1.81h4.168a1 1 0 00.95-.69l1.286-3.967z"
                    />
                  </svg>
                </div>
                <span className="ml-4 text-xl text-gray-600">
                  4.0 out of 5
                </span>
              </div>
              <p className="text-gray-700 mb-6">
                The session observed a high level of student engagement, with most participants actively contributing. Core concepts were clearly explained, leading to a positive learning environment.
              </p>
              <FeedbackSection
                title="Highlights"
                items={[
                  "Clear explanation of complex topics",
                  "Interactive problem-solving",
                  "Effective use of visual aids",
                ]}
              />
              <FeedbackSection
                title="Opportunities for Growth"
                items={[
                  "Increase time for Q&A sessions",
                  "Integrate more real-world examples",
                ]}
              />
            </div>
          </div>

          {/* Session Analysis Section */}
          <div className="bg-gray-100 rounded-xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Session Analysis
            </h2>
            <div className="mb-6">
              <p className="text-lg text-gray-700 mb-2">
                Assess Session Effectiveness
              </p>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    filled={index < sessionRating}
                    onClick={() => setSessionRating(index + 1)}
                  />
                ))}
                <span className="ml-4 text-lg text-gray-600">
                  {sessionRating === 0
                    ? "Select a rating"
                    : `${sessionRating} / 5`}
                </span>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-lg text-gray-700 mb-2">
                Observations
              </label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
                placeholder="Share your insights on the session’s performance, strengths and areas for improvement..."
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              {updateMessage && (
                <div className="text-green-600 font-semibold text-lg transition-opacity duration-300">
                  {updateMessage}
                </div>
              )}
              <button
                onClick={handleUpdate}
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 transition"
              >
                Save Analysis
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
