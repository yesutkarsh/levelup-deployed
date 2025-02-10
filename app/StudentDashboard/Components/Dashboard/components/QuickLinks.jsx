"use client";

import { Calendar, BookOpen, CheckSquare, LineChart } from "lucide-react";

export default function QuickLinks({ onNavChange }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onNavChange("Schedule")} // ✅ Navigate to Schedule
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-black hover:text-white group transition-all duration-200"
          >
            <Calendar className="h-6 w-6 mb-2 text-black group-hover:text-white" />
            <span className="text-sm text-gray-700 group-hover:text-white">
              Schedule
            </span>
          </button>
          <button
            onClick={() => onNavChange("Courses")} // ✅ Navigate to Courses
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-black hover:text-white group transition-all duration-200"
          >
            <BookOpen className="h-6 w-6 mb-2 text-black group-hover:text-white" />
            <span className="text-sm text-gray-700 group-hover:text-white">
              Courses
            </span>
          </button>
          <button
            onClick={() => onNavChange("Tasks")} // ✅ Navigate to Tasks
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-black hover:text-white group transition-all duration-200"
          >
            <CheckSquare className="h-6 w-6 mb-2 text-black group-hover:text-white" />
            <span className="text-sm text-gray-700 group-hover:text-white">
              Tasks
            </span>
          </button>
          <button
            onClick={() => onNavChange("Reports")} // ✅ Navigate to Reports
            className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-black hover:text-white group transition-all duration-200"
          >
            <LineChart className="h-6 w-6 mb-2 text-black group-hover:text-white" />
            <span className="text-sm text-gray-700 group-hover:text-white">
              Reports
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
