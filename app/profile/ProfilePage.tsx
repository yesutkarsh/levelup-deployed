"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  User,
  Calendar,
  BarChart2,
  FileText,
  Settings,
  Award,
  Star,
} from "lucide-react";

// Framer Motion animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
  hover: { scale: 1.02 }
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // Dummy session data
  const upcomingSessions = [
    {
      id: 1,
      title: "React Hooks Deep Dive",
      date: "2025-02-15",
      time: "10:00 AM",
      mentor: "Alice Johnson",
    },
    {
      id: 2,
      title: "Next.js SSR vs SSG",
      date: "2025-02-20",
      time: "2:00 PM",
      mentor: "Bob Smith",
    },
  ];

  const pastSessions = [
    {
      id: 1,
      title: "Introduction to Tailwind CSS",
      date: "2025-01-10",
      time: "11:00 AM",
      mentor: "Carol Danvers",
      feedback: "Great session on utility-first CSS!",
    },
    {
      id: 2,
      title: "Advanced JavaScript Concepts",
      date: "2025-01-20",
      time: "3:00 PM",
      mentor: "Dave Lee",
      feedback: "Very informative session.",
    },
  ];

  // ----------------------
  // Mobile Tab Content
  // ----------------------
  const renderMobileTabContent = () => {
    const commonClasses =
      "space-y-4 p-4 bg-white/30 dark:bg-[#181914]/30 rounded-3xl backdrop-blur-md shadow-lg";
    switch (activeTab) {
      case "profile":
        return (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={commonClasses}
          >
            <h3 className="text-xl font-bold border-b pb-2">Profile Information</h3>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john.doe@example.com</p>
            <p><strong>Phone:</strong> +1 234 567 890</p>
            <p><strong>Location:</strong> New York, USA</p>
            <p>
              <strong>Bio:</strong> Passionate web developer who loves modern design and innovative solutions.
            </p>
          </motion.div>
        );
      case "sessions":
        return (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={commonClasses}
          >
            <h3 className="text-xl font-bold border-b pb-2">Upcoming Sessions</h3>
            {upcomingSessions.map((session) => (
              <div key={session.id} className="p-3 border rounded-xl bg-white/40 dark:bg-[#181914]/40">
                <p className="font-semibold">{session.title}</p>
                <p>{session.date} at {session.time}</p>
                <p><strong>Mentor:</strong> {session.mentor}</p>
              </div>
            ))}
            <h3 className="text-xl font-bold border-b pb-2 mt-6">Past Sessions</h3>
            {pastSessions.map((session) => (
              <div key={session.id} className="p-3 border rounded-xl bg-white/40 dark:bg-[#181914]/40">
                <p className="font-semibold">{session.title}</p>
                <p>{session.date} at {session.time}</p>
                <p><strong>Mentor:</strong> {session.mentor}</p>
                <p><strong>Feedback:</strong> {session.feedback}</p>
              </div>
            ))}
          </motion.div>
        );
      case "performance":
        return (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={commonClasses}
          >
            <h3 className="text-xl font-bold border-b pb-2">Performance</h3>
            <p><strong>Overall Rating:</strong> 4.5/5</p>
            <p><strong>Total Sessions Attended:</strong> 10</p>
            <p><strong>Average Feedback:</strong> 4.7/5</p>
            <div className="border rounded-xl p-4 mt-3 bg-white/40 dark:bg-[#181914]/40">
              <p>Performance Chart (Placeholder)</p>
            </div>
          </motion.div>
        );
      case "resume":
        return (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={commonClasses}
          >
            <h3 className="text-xl font-bold border-b pb-2">Resume Upload</h3>
            <p>Upload your latest resume.</p>
            <input type="file" className="w-full p-2 border rounded-xl" />
          </motion.div>
        );
      case "settings":
        return (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={commonClasses}
          >
            <h3 className="text-xl font-bold border-b pb-2">Account Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block mb-1">Current Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-xl"
                  placeholder="Current Password"
                />
              </div>
              <div>
                <label className="block mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-xl"
                  placeholder="New Password"
                />
              </div>
              <div>
                <label className="block mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-xl"
                  placeholder="Confirm New Password"
                />
              </div>
              <button className="px-4 py-2 border rounded-xl mt-2 hover:bg-gray-200 dark:hover:bg-[#181914] transition">
                Update Password
              </button>
            </div>
          </motion.div>
        );
      case "achievements":
        return (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={commonClasses}
          >
            <h3 className="text-xl font-bold border-b pb-2">Achievements</h3>
            <ul className="list-disc pl-5">
              <li>Won Best Developer Award 2024</li>
              <li>Completed 50+ coding challenges</li>
              <li>Top 10% in Hackathons</li>
            </ul>
          </motion.div>
        );
      case "skills":
        return (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className={commonClasses}
          >
            <h3 className="text-xl font-bold border-b pb-2">Skills</h3>
            <p>JavaScript, React, Next.js, Node.js, Tailwind CSS, TypeScript</p>
            <p>Also proficient in GraphQL, Docker, and AWS.</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  // ----------------------
  // Desktop Card Layout
  // ----------------------
  const DesktopCards = () => {
    const commonClasses =
      "border rounded-3xl p-6 shadow-lg bg-white/30 dark:bg-[#181914]/30 backdrop-blur-md";
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className={commonClasses}
        >
          <h3 className="text-xl font-bold border-b pb-2 mb-4 flex items-center">
            <User size={20} className="mr-2" /> Profile Information
          </h3>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john.doe@example.com</p>
          <p><strong>Phone:</strong> +1 234 567 890</p>
          <p><strong>Location:</strong> New York, USA</p>
          <p>
            <strong>Bio:</strong> Passionate web developer who loves modern design and innovative solutions.
          </p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className={commonClasses}
        >
          <h3 className="text-xl font-bold border-b pb-2 mb-4 flex items-center">
            <Calendar size={20} className="mr-2" /> Sessions
          </h3>
          <div>
            <h4 className="font-semibold">Upcoming Sessions</h4>
            {upcomingSessions.map((session) => (
              <div key={session.id} className="mt-2 p-3 border rounded-xl bg-white/40 dark:bg-[#181914]/40">
                <p className="font-medium">{session.title}</p>
                <p>{session.date} at {session.time}</p>
                <p><strong>Mentor:</strong> {session.mentor}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h4 className="font-semibold">Past Sessions</h4>
            {pastSessions.map((session) => (
              <div key={session.id} className="mt-2 p-3 border rounded-xl bg-white/40 dark:bg-[#181914]/40">
                <p className="font-medium">{session.title}</p>
                <p>{session.date} at {session.time}</p>
                <p><strong>Mentor:</strong> {session.mentor}</p>
                <p><strong>Feedback:</strong> {session.feedback}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className={commonClasses}
        >
          <h3 className="text-xl font-bold border-b pb-2 mb-4 flex items-center">
            <BarChart2 size={20} className="mr-2" /> Performance
          </h3>
          <p><strong>Overall Rating:</strong> 4.5/5</p>
          <p><strong>Total Sessions Attended:</strong> 10</p>
          <p><strong>Average Feedback:</strong> 4.7/5</p>
          <div className="border rounded-xl p-4 mt-3 bg-white/40 dark:bg-[#181914]/40">
            <p>Performance Chart (Placeholder)</p>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className={commonClasses}
        >
          <h3 className="text-xl font-bold border-b pb-2 mb-4 flex items-center">
            <FileText size={20} className="mr-2" /> Resume
          </h3>
          <p>Upload your latest resume to showcase your skills.</p>
          <input type="file" className="w-full mt-3 p-2 border rounded-xl" />
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className={commonClasses}
        >
          <h3 className="text-xl font-bold border-b pb-2 mb-4 flex items-center">
            <Settings size={20} className="mr-2" /> Account Settings
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block mb-1">Current Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded-xl"
                placeholder="Current Password"
              />
            </div>
            <div>
              <label className="block mb-1">New Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded-xl"
                placeholder="New Password"
              />
            </div>
            <div>
              <label className="block mb-1">Confirm New Password</label>
              <input
                type="password"
                className="w-full p-2 border rounded-xl"
                placeholder="Confirm New Password"
              />
            </div>
            <button className="px-4 py-2 border rounded-xl mt-2 hover:bg-gray-200 dark:hover:bg-[#181914] transition">
              Update Password
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className={commonClasses}
        >
          <h3 className="text-xl font-bold border-b pb-2 mb-4 flex items-center">
            <Award size={20} className="mr-2" /> Achievements
          </h3>
          <ul className="list-disc pl-5">
            <li>Won Best Developer Award 2024</li>
            <li>Completed 50+ coding challenges</li>
            <li>Top 10% in Hackathons</li>
          </ul>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className={commonClasses}
        >
          <h3 className="text-xl font-bold border-b pb-2 mb-4 flex items-center">
            <Star size={20} className="mr-2" /> Skills
          </h3>
          <p>JavaScript, React, Next.js, Node.js, Tailwind CSS, TypeScript</p>
          <p>Also proficient in GraphQL, Docker, and AWS.</p>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#181914] text-gray-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="w-32 h-32 relative rounded-full overflow-hidden border">
            <Image
              src="/profile.jpg"
              alt="Profile Picture"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="mt-4 text-3xl font-bold">John Doe</h1>
          <p className="mt-1">john.doe@example.com | +1 234 567 890</p>
        </div>

        {/* Mobile Layout: Tabs */}
        <div className="md:hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {[
              { key: "profile", label: "Profile", icon: <User size={16} /> },
              { key: "sessions", label: "Sessions", icon: <Calendar size={16} /> },
              { key: "performance", label: "Performance", icon: <BarChart2 size={16} /> },
              { key: "resume", label: "Resume", icon: <FileText size={16} /> },
              { key: "settings", label: "Settings", icon: <Settings size={16} /> },
              { key: "achievements", label: "Achievements", icon: <Award size={16} /> },
              { key: "skills", label: "Skills", icon: <Star size={16} /> },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3 text-center transition-colors ${
                  activeTab === tab.key
                    ? "border-b-2 border-gray-900 dark:border-white font-bold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="flex flex-col items-center">
                  {tab.icon}
                  <span className="text-xs mt-1">{tab.label}</span>
                </span>
              </button>
            ))}
          </div>
          <div>{renderMobileTabContent()}</div>
        </div>

        {/* Desktop Layout: Grid Cards */}
        <div className="hidden md:block">
          <DesktopCards />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
