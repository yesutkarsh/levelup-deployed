// components/ApproveModal.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const rolesOptions = ["admin", "student", "mentor"];

const ApproveModal = ({ user, onClose, onConfirm }) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // Track loading state

  const handleConfirm = async () => {
    if (!selectedRole) return;
    
    setIsProcessing(true);
    try {
      await onConfirm(user, selectedRole);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-lg p-6 w-96"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4">Approve {user.name}</h2>
        <p className="mb-4">Select a role for the user:</p>
        
        {/* Role Selection Radio Buttons */}
        <div className="mb-4 space-y-2">
          {rolesOptions.map(role => (
            <label key={role} className="flex items-center space-x-2">
              <input 
                type="radio"
                name="role"
                value={role}
                checked={selectedRole === role}
                onChange={() => setSelectedRole(role)}
                className="form-radio h-4 w-4 text-green-500"
              />
              <span className="capitalize">{role}</span>
            </label>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
            disabled={isProcessing}
          >
            Cancel
          </button>
          <motion.button 
            onClick={handleConfirm}
            disabled={!selectedRole || isProcessing}
            className={`px-4 py-2 rounded text-white transition-colors ${
              (!selectedRole || isProcessing) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {isProcessing ? 'Processing...' : 'Confirm'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ApproveModal;