// pages/admin/index.js (Main Component)
"use client";
import React, { useState, useEffect } from 'react';
import Tabs from './components/Tabs';
import UserTable from './components/UserTable';
import ApproveModal from './components/ApproveModal';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagement = () => {
  // State Management
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users whenever the active tab changes
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const endpoint = `http://localhost:3001/api/admin/userManagement/${activeTab}`;
        const res = await fetch(endpoint);
        
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        
        const data = await res.json();
        setUsers(data.data || []);
        setError(null);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [activeTab]); // Re-fetch when tab changes

  // Approval Handler
  const confirmApproval = async (user, role, status) => {
    let obj ={
        userId:user._id,
        status:"verified",
        role:role,
    }
    console.log(obj)
    try {
      const response = await fetch('http://localhost:3001/api/admin/userManagement/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Approval failed');
      }

      // Remove approved user from local state
      setUsers(prev => prev.filter(u => u._id !== user._id));
      
      setShowModal(false);
      setSelectedUser(null);
      setSuccessMessage("User approved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error('Approval Error:', error);
      setError(error.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Ban Handler
  const handleBan = async (user) => {
    try {
      const response = await fetch('http://localhost:3001/api/admin/userManagement/ban', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user._id })
      });

      if (!response.ok) {
        throw new Error('Ban failed');
      }

      // Remove banned user from local state
      setUsers(prev => prev.filter(u => u._id !== user._id));
      
      setSuccessMessage("User banned successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error('Ban Error:', error);
      setError(error.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  // Filter users based on active tab
  const filteredUsers = users.filter(user => user.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">User Management</h1>
        
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Loading State */}
        {isLoading && (
          <div className="animate-pulse space-y-4 my-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        {/* User Table */}
        {!isLoading && !error && (
          <UserTable 
            users={filteredUsers}
            onApprove={(user) => {
              setSelectedUser(user);
              setShowModal(true);
            }}
            onBan={handleBan}
            onEdit={(user) => console.log('Edit:', user)} // Implement edit functionality
          />
        )}

        {/* Success Notification */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Approval Modal */}
        <AnimatePresence>
          {showModal && selectedUser && (
            <ApproveModal
              user={selectedUser}
              onClose={() => {
                setShowModal(false);
                setSelectedUser(null);
              }}
              onConfirm={confirmApproval}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserManagement;