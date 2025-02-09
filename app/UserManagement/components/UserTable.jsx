// components/UserTable.js
import React from 'react';
import { motion } from 'framer-motion';
// You can import Lucid React icons here if desired, for example:
// import { SomeIcon } from 'lucid-react';

const UserTable = ({ users, onApprove, onBan, onEdit }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user._id} className="text-center">
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.role}</td>
                <td className="px-4 py-2 border capitalize">{user.status}</td>
                <td className="px-4 py-2 border space-x-2">
                  {/* Approve button only for pending users */}
                  {user.status === "pending" && (
                    <motion.button 
                      onClick={() => onApprove(user)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Approve
                    </motion.button>
                  )}
                  {/* Ban button for users not already banned */}
                  {user.status !== "banned" && (
                    <motion.button 
                      onClick={() => onBan(user)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ban
                    </motion.button>
                  )}
                  <motion.button 
                    onClick={() => onEdit(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit
                  </motion.button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 border text-center" colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
