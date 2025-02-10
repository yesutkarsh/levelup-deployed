"use client";
// components/Tabs.js
import React from "react";
import { motion } from "framer-motion";

const Tabs = ({ activeTab, setActiveTab }) => {
  // Define the available tabs
  const tabs = ["pending", "approved", "banned"];

  return (
    <div className="flex space-x-4 mb-6">
      {tabs.map((tab) => (
        <motion.button
          key={tab}
          className={`px-4 py-2 rounded focus:outline-none
            ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          onClick={() => setActiveTab(tab)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </motion.button>
      ))}
    </div>
  );
};

export default Tabs;
