"use client";

import { useState } from "react";
import { BookOpen, Award, Code, X } from "lucide-react";

export default function RecentActivity() {
  const [isOpen, setIsOpen] = useState(false);

  const activities = [
    {
      icon: <BookOpen className="text-gray-900 h-5 w-5" />,
      text: "Completed Chapter 5: Data Structures",
      time: "2 hours ago",
    },
    {
      icon: <Award className="text-gray-900 h-5 w-5" />,
      text: "Earned Python Programming Certificate",
      time: "Yesterday",
    },
    {
      icon: <Code className="text-gray-900 h-5 w-5" />,
      text: "Submitted Project: Web Development",
      time: "2 days ago",
    },
    {
      icon: <BookOpen className="text-gray-900 h-5 w-5" />,
      text: "Started New Course: JavaScript Basics",
      time: "3 days ago",
    },
    {
      icon: <Code className="text-gray-900 h-5 w-5" />,
      text: "Fixed Bug in Personal Portfolio",
      time: "5 days ago",
    },
  ];

  return (
    <div className="mt-6 bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>

          {/* "View All" button opens modal */}
          <button
            className="text-black hover:text-gray-700"
            onClick={() => setIsOpen(true)}
          >
            View All
          </button>
        </div>

        {/* Recent 3 Activities */}
        <div className="space-y-4">
          {activities.slice(0, 3).map((activity, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0">{activity.icon}</div>
              <div className="ml-4">
                <p className="text-sm text-gray-900">{activity.text}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popover Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[50%]">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold">All Activities</h4>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5 text-gray-700 hover:text-black" />
              </button>
            </div>

            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">{activity.icon}</div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-900">{activity.text}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
