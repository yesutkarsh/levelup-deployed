"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  User,
  LogOut,
  Home,
  Info,
  Calendar,
  UserCircle,
  X,
} from "lucide-react";
import Link from "next/link";

// Create an animated Link component using Framer Motion
const MotionLink = motion(Link);

// Redesigned Side Panel Component
function SidePanel({ onClose }): React.ReactElement {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50"
    >
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-700" />
          </motion.button>
        </div>
      </div>
      <nav className="p-4 space-y-2">
        <MotionLink
          href="/Dashboard"
          whileHover={{ scale: 1.02 }}
          className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-800"
        >
          <Home className="w-5 h-5 mr-2" />
          Dashboard
        </MotionLink>
        <MotionLink
          href="/about"
          whileHover={{ scale: 1.02 }}
          className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-800"
        >
          <Info className="w-5 h-5 mr-2" />
          About
        </MotionLink>
        {/* Add more side panel links as needed */}
      </nav>
    </motion.div>
  );
}

export default function Navbar() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleMenu = () => setIsSidePanelOpen(!isSidePanelOpen);
  const closeMenu = () => setIsSidePanelOpen(false);

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 flex items-center px-4 justify-between">
        {/* Hamburger Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </motion.button>

        {/* Logo */}
        <MotionLink href="/" className="text-xl font-bold text-black">
          MASAI CONNECT
        </MotionLink>

        {/* Profile & Logout */}
        <div className="flex items-center space-x-2">
          <MotionLink
            href="/profile"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <User className="w-6 h-6 text-gray-700" />
          </MotionLink>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowLogoutModal(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <LogOut className="w-6 h-6 text-gray-700" />
          </motion.button>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowLogoutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-sm w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Confirm Logout
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-end gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </motion.button>
                <MotionLink
                  href="/"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                  onClick={() => {
                    // Insert actual logout logic here if needed
                    setShowLogoutModal(false);
                  }}
                >
                  Logout
                </MotionLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Panel Backdrop */}
      <AnimatePresence>
        {isSidePanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Side Panel */}
      <AnimatePresence>
        {isSidePanelOpen && <SidePanel onClose={closeMenu} />}
      </AnimatePresence>

      {/* Bottom Navbar (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-2 md:hidden z-50">
        <MotionLink
          href="/Dashboard"
          className="flex flex-col items-center text-gray-700"
          whileHover={{ scale: 1.05 }}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">Dashboard</span>
        </MotionLink>
        <MotionLink
          href="/Booksession"
          className="flex flex-col items-center text-gray-700"
          whileHover={{ scale: 1.05 }}
        >
          <Calendar className="w-6 h-6" />
          <span className="text-xs">Book Session</span>
        </MotionLink>
        <MotionLink
          href="/profile"
          className="flex flex-col items-center text-gray-700"
          whileHover={{ scale: 1.05 }}
        >
          <UserCircle className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </MotionLink>
      </div>
    </>
  );
}
