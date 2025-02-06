"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, User } from 'lucide-react';
import Link from 'next/link';
import Sidepanel, { Notification } from "../../components/SidePanel/Sidepanel";
const dummyNotifications:Notification[] = [
  {
    id:1,
    title:"Industry Expose Sessions with Deepinder Goyal",
    description:"CEO ZOMATO",
    date:"Date",
    link:"Link"
  },
  {
    id:2,
    title:"Title",
    description:"Description",
    date:"Date",
    link:"Link"
  },
  {
    id:3,
    title:"Title",
    description:"Description",
    date:"Date",
    link:"Link"
  }
]

export default function Navbar():React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Hamburger Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </motion.button>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center"
          >
            <Link href="/">
            <span className="text-xl font-bold bg-clip-text text-black dark:text-white">
              MASAI CONNECT
            </span>
            </Link>
          </motion.div>

          {/* Profile Icon */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <User className="w-6 h-6 text-gray-700 dark:text-gray-200" />
          </motion.button>
        </div>
      </nav>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Side Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed top-0 left-0 z-50"
          >
            <Sidepanel 
              event={1} 
              news={2} 
              updates={3} 
              weekTrends={4} 
              notifications={dummyNotifications}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}