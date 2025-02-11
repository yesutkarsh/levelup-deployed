"use client";
import React, { useState } from "react";
import Cookies from 'js-cookie';

import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  User,
  LogOut,
  Home,
  Calendar,
  UserCircle,
  X,
  FileVideo2,
  LayoutDashboard,
  SquareDashedBottomCode
} from "lucide-react";
import Link from "next/link";

type SidePanelProps = {
  onClose: () => void;
  onLogoutClick: () => void;
};

const MotionLink = motion(Link);

function SidePanel({ onClose, onLogoutClick }: SidePanelProps): React.ReactElement {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col"
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
      <nav className="p-4 flex-1 flex flex-col">
        <div className="space-y-2">
          <MotionLink
            href="/Dashboard"
            whileHover={{ scale: 1.02 }}
            className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-800"
          >
            <Home className="w-5 h-5 mr-2" />
            Dashboard
          </MotionLink>
          <MotionLink
            href="/UserManagement"
            whileHover={{ scale: 1.02 }}
            className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-800"
          >
            <User className="w-5 h-5 mr-2" />
            UserManagement
          </MotionLink>
          <MotionLink
            href="/StudentDashboard"
            whileHover={{ scale: 1.02 }}
            className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-800"
          >
            <SquareDashedBottomCode className="w-5 h-5 mr-2" />
            Student Dashboard
          </MotionLink>
          <MotionLink
            href="/Mentor"
            whileHover={{ scale: 1.02 }}
            className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-800"
          >
            <LayoutDashboard className="w-5 h-5 mr-2" />
            Mentor Dashboard
          </MotionLink>
          <MotionLink
            href="/Booksession"
            whileHover={{ scale: 1.02 }}
            className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-800"
          >
            <FileVideo2 className="w-5 h-5 mr-2" />
            Book Session
          </MotionLink>
        </div>

        {/* Sidebar Logout Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => {
            onClose();
            onLogoutClick();
          }}
          className="mt-auto flex items-center p-2 rounded-md hover:bg-red-50 text-red-600 w-full transition-colors"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </motion.button>
      </nav>
    </motion.div>
  );
}

export default function Navbar() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);


  const handleLogout = () => {
    // List of cookies to delete
    const cookiesToDelete = [
      'accessToken',
      'refreshToken',
      'userDetails',
      'role'
    ];
  
    // Delete specific cookies using js-cookie
    cookiesToDelete.forEach(cookieName => {
      // Remove cookie for all paths
      Cookies.remove(cookieName, { path: '/' });
      
      // If your cookies are set with different domains or paths, 
      // you might need to specify those:
      // Cookies.remove(cookieName, { path: '/', domain: '.yourdomain.com' });
    });
  
    // If you're using HTTP-only cookies set by the server,
    // you'll need to call an API endpoint to clear them
    fetch('/api/logout', {
      method: 'POST',
      credentials: 'include', // Important for cookies
    }).catch(error => {
      console.error('Logout API error:', error);
    });
  
    // Start logout animation
    setIsLoggingOut(true);
    setShowLogoutModal(false);
  
    // Redirect after animation
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };
  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 flex items-center px-4 justify-between">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidePanelOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </motion.button>

        <MotionLink href="/" className="text-xl font-bold text-black">
          MASAI CONNECT
        </MotionLink>

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

      {/* Logout Loading Overlay */}
      <AnimatePresence>
        {isLoggingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-sm z-[60] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-24 h-24">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full border-4 border-indigo-500/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-full border-4 border-indigo-500 border-t-transparent rounded-full"
                />
              </div>
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-4 text-gray-700 font-medium"
              >
                Logging out...
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                  onClick={handleLogout}
                >
                  Logout
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Panel */}
      <AnimatePresence>
        {isSidePanelOpen && (
          <SidePanel
            onClose={() => setIsSidePanelOpen(false)}
            onLogoutClick={() => setShowLogoutModal(true)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navbar */}
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