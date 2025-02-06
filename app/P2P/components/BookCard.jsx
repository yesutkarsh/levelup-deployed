"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingSuccessCard from './BookingSuccessCard';

// Enhanced SESSION_TYPES with dynamic time slots
const SESSION_TYPES = [
  {
    id: 'pair-programming',
    label: 'Pair Programming',
    description: 'Code together with a peer to solve problems and learn collaboratively',
    availableSlots: {
      // Day of week (0-6) mapped to time slots
      0: ['10:00', '12:00', '14:00'], // Sunday
      1: ['09:00', '11:00', '15:00'], // Monday
      2: ['10:30', '13:00', '16:00'], // Tuesday
      3: ['11:00', '14:00', '17:00'], // Wednesday
      4: ['09:30', '12:30', '15:30'], // Thursday
      5: ['10:00', '13:00'], // Friday
      6: ['11:00', '14:00'], // Saturday
    }
  },
  {
    id: 'dost-connect',
    label: 'Dost Connect',
    description: 'Connect with a friend for general guidance and support',
    availableSlots: {
      0: ['09:00', '11:00', '15:00'], // Sunday
      1: ['10:00', '12:00', '16:00'], // Monday
      2: ['09:30', '13:00', '17:00'], // Tuesday
      3: ['10:30', '14:00', '16:30'], // Wednesday
      4: ['11:00', '13:30', '15:00'], // Thursday
      5: ['09:00', '12:00'], // Friday
      6: ['10:30', '15:00'], // Saturday
    }
  },
  {
    id: 'mentor-session',
    label: 'Mentor Session',
    description: 'Get personalized guidance from an experienced mentor',
    availableSlots: {
      0: ['10:00', '14:00'], // Sunday
      1: ['11:00', '15:00'], // Monday
      2: ['09:30', '13:30'], // Tuesday
      3: ['10:30', '16:00'], // Wednesday
      4: ['12:00', '15:30'], // Thursday
      5: ['11:00'], // Friday
      6: ['14:30'], // Saturday
    }
  }
];

const mockAuthData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  batch: 'FSD-2023',
  tag: 'student-123',
  phone_number: '+1234567890',
};

const getNextSevenDays = () => {
  const days = [];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push({
      date: date.toISOString().split('T')[0],
      fullDate: `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
      day: dayNames[date.getDay()],
      dayOfMonth: date.getDate(),
      dayOfWeek: date.getDay(),
      dateObj: date
    });
  }
  return days;
};

const formatTime = (timeStr) => {
  const [hour, minute] = timeStr.split(':');
  const date = new Date();
  date.setHours(parseInt(hour, 10));
  date.setMinutes(parseInt(minute, 10));
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
};

const getAvailableTimeSlots = (sessionTypeId, dateStr) => {
  const session = SESSION_TYPES.find(s => s.id === sessionTypeId);
  if (!session) return [];

  const selectedDate = new Date(dateStr);
  const dayOfWeek = selectedDate.getDay();
  
  // Get slots for this day of the week
  let slots = session.availableSlots[dayOfWeek] || [];

  const today = new Date();
  const todayISO = today.toISOString().split('T')[0];

  // If the selected date is today, filter out past time slots
  if (dateStr === todayISO) {
    const currentMinutes = today.getHours() * 60 + today.getMinutes();
    slots = slots.filter((timeStr) => {
      const [hour, minute] = timeStr.split(':').map(Number);
      const slotMinutes = hour * 60 + minute;
      return slotMinutes > currentMinutes;
    });
  }

  return slots;
};

const EnhancedBookingCard = ({ onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('pair-programming');
  const [selectedDate, setSelectedDate] = useState(getNextSevenDays()[0].date);
  const [editableFields, setEditableFields] = useState({
    name: false,
    email: false,
    batch: false,
    phone: false
  });
  const [formData, setFormData] = useState({
    auth: mockAuthData,
    session_type: activeTab,
    topic: {
      type: '',
      detailed_description: '',
    },
    booking_reason: '',
    specific_problem: '',
    schedule: {
      date: selectedDate,
      time: '',
    },
    group_or_solo: 'solo',
    group_members: [],
  });

  const toggleEdit = (field) => {
    setEditableFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleAuthFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      auth: {
        ...prev.auth,
        [field]: value
      }
    }));
  };

  const [emailInput, setEmailInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEmailInput = (e) => {
    const value = e.target.value;
    setEmailInput(value);
    
    if (value.endsWith(',')) {
      const email = value.slice(0, -1).trim();
      if (email && !formData.group_members.includes(email)) {
        setFormData(prev => ({
          ...prev,
          group_members: [...prev.group_members, email]
        }));
      }
      setEmailInput('');
    }
  };

  const removeEmail = (emailToRemove) => {
    setFormData(prev => ({
      ...prev,
      group_members: prev.group_members.filter(email => email !== emailToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setFormData(prev => ({
        ...prev,
        group_members: [...prev.group_members, emailInput.trim()]
      }));
    }
    setShowSuccess(true);
  };

  // Retrieve available time slots based on current session type and selected date
  const timeSlots = getAvailableTimeSlots(activeTab, selectedDate);

  return (
    <AnimatePresence>



      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          className="bg-[#e2ebfc] text-black dark:text-white rounded-lg shadow-2xl p-6 w-full max-w-2xl mx-auto overflow-y-auto my-8 max-h-[90vh] relative" 
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Session Type Tabs */}
          <div className="mb-6">
            <div className="bg-black-300  text-white text-black flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {SESSION_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setActiveTab(type.id);
                    setFormData(prev => ({ ...prev, session_type: type.id }));
                  }}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === type.id
                      ? 'bg-[black]  text-white shadow'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {SESSION_TYPES?.description}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Auth Section with Edit Buttons */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-black  ">Your Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.auth.name}
                      onChange={(e) => handleAuthFieldChange('name', e.target.value)}
                      readOnly={!editableFields.name}
                      className={` w-full p-2 border border-gray-300 rounded-lg ${
                        !editableFields.name ? 'bg-gray-100  text-gray-500' : 'bg-white text-black'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => toggleEdit('name')}
                      className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-black border border-gray-300 focus:outline-none"
                    >
                      {editableFields.name ? 'Save' : 'Edit'}
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="email"
                      value={formData.auth.email}
                      onChange={(e) => handleAuthFieldChange('email', e.target.value)}
                      readOnly={!editableFields.email}
                      className={`w-full p-2 border border-gray-300 rounded-lg ${
                        !editableFields.email ? 'bg-gray-100  text-gray-500' : 'bg-white text-black'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => toggleEdit('email')}
                      className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-black border border-gray-300 focus:outline-none"
                    >
                      {editableFields.email ? 'Save' : 'Edit'}
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Batch</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.auth.batch}
                      onChange={(e) => handleAuthFieldChange('batch', e.target.value)}
                      readOnly={!editableFields.batch}
                      className={`w-full p-2 border border-gray-300 rounded-lg ${
                        !editableFields.batch ? 'bg-gray-100  text-gray-500' : 'bg-white text-black'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => toggleEdit('batch')}
                      className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-black border border-gray-300 focus:outline-none"
                    >
                      {editableFields.batch ? 'Save' : 'Edit'}
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="tel"
                      value={formData.auth.phone_number}
                      onChange={(e) => handleAuthFieldChange('phone_number', e.target.value)}
                      readOnly={!editableFields.phone}
                      className={`w-full p-2 border border-gray-300 rounded-lg ${
                        !editableFields.phone ? 'bg-gray-100  text-gray-500' : 'bg-white text-black'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => toggleEdit('phone')}
                      className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-black border border-gray-300 focus:outline-none"
                    >
                      {editableFields.phone ? 'Save' : 'Edit'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Reason */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Why do you want to book this session?
              </label>
              <textarea
                name="booking_reason"
                value={formData.booking_reason}
                onChange={handleChange}
                placeholder="Explain your reasons for booking this session..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                rows={3}
              />
            </div>

            {/* Specific Problem */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Do you have a specific problem to discuss?
              </label>
              <textarea
                name="specific_problem"
                value={formData.specific_problem}
                onChange={handleChange}
                placeholder="Describe any specific issues or topics you'd like to cover..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                rows={3}
              />
            </div>

            {/* Date Selection */}
            <div className="space-y-4">
            <h2 className="text-xl font-semibold text-black">Select Date & Time</h2>
            <p className="text-sm text-gray-600 mb-2">
              Available time slots vary by day and session type
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {getNextSevenDays().map((dayInfo) => (
                <motion.button
                  key={dayInfo.date}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => {
                    setSelectedDate(dayInfo.date);
                    setFormData(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, date: dayInfo.date, time: '' }
                    }));
                  }}
                  className={`flex flex-col items-center p-2 rounded-lg min-w-[4.5rem] ${
                    selectedDate === dayInfo.date
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  <span className="text-xs font-medium">{dayInfo.day}</span>
                  <span className="text-lg font-bold">{dayInfo.dayOfMonth}</span>
                </motion.button>
              ))}
            </div>

            {/* Time Slots */}
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.length ? (
                timeSlots.map((time) => (
                  <motion.button
                    key={time}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        schedule: { ...prev.schedule, time },
                      }))
                    }
                    className={`p-2 text-sm border rounded-lg ${
                      formData.schedule.time === time
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-black hover:bg-gray-200'
                    }`}
                  >
                    {formatTime(time)}
                  </motion.button>
                ))
              ) : (
                <div className="col-span-4 text-center text-gray-500">
                  No available slots for this day and session type.
                </div>
              )}
            </div>
          </div>

            {/* Group or Solo */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-black">Session Type</h2>
              <select
                name="group_or_solo"
                value={formData.group_or_solo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
              >
                <option value="solo">Solo</option>
                <option value="group">Group</option>
              </select>
            </div>

            {/* Group Members */}
            <AnimatePresence>
              {formData.group_or_solo === 'group' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-4 overflow-hidden text-black"
                >
                  <h2 className="text-xl font-semibold text-black">Group Members</h2>
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={emailInput}
                      onChange={handleEmailInput}
                      placeholder="Enter email and press comma to add"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <div className="flex flex-wrap gap-2">
                      {formData.group_members.map((email, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          <span className="text-sm">{email}</span>
                          <button
                            type="button"
                            onClick={() => removeEmail(email)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  type="submit"
  className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition duration-300 text-sm mx-auto block w-64"
>
  Book Session
</motion.button>

          </form>
        </motion.div>
      </motion.div>
      
      {showSuccess && (
        <BookingSuccessCard
        key={123}
        onClose={() => {
          setShowSuccess(false);
          onClose();
        }}
        bookingDetails={formData}
      />
      )}
    </AnimatePresence>
  );
};

export default EnhancedBookingCard;
