import React from "react";
import { FaChartLine, FaCalendarAlt, FaBullhorn, FaNewspaper, FaChartBar } from "react-icons/fa";

function SideBar() {
  return (
    <>
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-16 border-b border-gray-200">
          <img src="https://cdn.masaischool.com/masai-website/Masai_Logo_dark_web_b21aab8c62.webp" alt="Logo" className="h-8" />
        </div>
        <nav className="p-4 space-y-1">
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
            <FaChartLine className="w-5 h-5 mr-3" />
            Dashboard
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-custom bg-indigo-50 rounded-lg">
            <FaCalendarAlt className="w-5 h-5 mr-3" />
            Sessions
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
            <FaBullhorn className="w-5 h-5 mr-3" />
            Events
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
            <FaNewspaper className="w-5 h-5 mr-3" />
            Posts
          </a>
          <a href="#" className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
            <FaChartBar className="w-5 h-5 mr-3" />
            Analytics
          </a>
        </nav>
      </aside>
    </>
  );
}

export default SideBar;