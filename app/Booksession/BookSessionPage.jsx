"use client";
import React, { useState } from 'react';
import Success from './components/Success';
import { s } from 'framer-motion/client';
const SessionCard = ({ logo, title, description }) => {
  return (
    <div className="bg-[#f3f4f6] p-6 rounded-lg  flex items-center gap-4 min-w-[400px] min-h-[150px] dark:bg-white">
      <div className="w-16 h-16 flex-shrink-0">
        <img src={logo} alt={title} className="w-full h-full object-cover rounded-md" />
      </div>
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
};

const Calendar = ({ onDateSelect, onTimeSelect, selectedDate, selectedTime }) => {
  const [availableTimes] = useState([
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ]);

  const highlightedDates = [
    { date: 1, slots: 5 },
    { date: 2, slots: 7 },
    { date: 3, slots: 9 },
    { date: 4, slots: 12 },
    { date: 5, slots: 6 },
    { date: 6, slots: 10 },
    { date: 7, slots: 8 },
    { date: 8, slots: 4 },
    { date: 9, slots: 8 },
    { date: 14, slots: 15 },
  ];

  const year = 2024;
  const month = 2; // March (month index starts at 0)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const totalCells = 42;
  const cells = [];

  // Fill previous month's cells
  for (let i = startDay - 1; i >= 0; i--) {
    cells.push({
      day: daysInPrevMonth - i,
      currentMonth: false,
    });
  }

  // Fill current month's cells
  for (let d = 1; d <= daysInMonth; d++) {
    const highlight = highlightedDates.find((item) => item.date === d);
    cells.push({
      day: d,
      currentMonth: true,
      highlight,
    });
  }

  // Fill next month's cells
  let nextDay = 1;
  while (cells.length < totalCells) {
    cells.push({
      day: nextDay,
      currentMonth: false,
    });
    nextDay++;
  }

  const handleDateSelect = (day, highlight) => {
    if (highlight) {
      onDateSelect(day);
      // Reset time when a new date is selected
      onTimeSelect('');
    }
  };

  return (
    <div className="bg-[#f3f4f6] p-6 rounded-lg h-full">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">Calendar Overview</h2>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, index) => {
          if (!cell.currentMonth) {
            return (
              <div key={index} className="p-2 text-gray-400">
                {cell.day}
              </div>
            );
          }

          if (cell.highlight) {
            return (
              <div
                key={index}
                onClick={() => handleDateSelect(cell.day, cell.highlight)}
                className={`p-2 bg-white rounded-lg cursor-pointer hover:bg-gray-100 ${
                  selectedDate === cell.day ? 'ring-2 ring-black' : ''
                }`}
              >
                <span className="block">{cell.day}</span>
                <span className="text-xs text-gray-600">
                  {cell.highlight.slots} slots
                </span>
              </div>
            );
          }

          return (
            <div key={index} className="p-2">
              <span className="block">{cell.day}</span>
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Available Times</h3>
          <div className="grid grid-cols-3 gap-2">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => onTimeSelect(time)}
                className={`p-2 rounded-lg text-sm ${
                  selectedTime === time
                    ? 'bg-black text-white'
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// New EmailTagsInput component to manage multiple email entries
const EmailTagsInput = ({ emails, setEmails }) => {
  const [input, setInput] = useState('');

  // Adds the email if it is non-empty and not already added.
  const addEmail = (email) => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;
    // Optional: Add regex validation here.
    if (!emails.includes(trimmedEmail)) {
      setEmails([...emails, trimmedEmail]);
    }
    setInput('');
  };

  // When comma or Enter is pressed, add the current email as a tag.
  const handleKeyDown = (e) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      if (input) {
        addEmail(input);
      }
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Also add the email when the input loses focus.
  const handleBlur = () => {
    if (input) {
      addEmail(input);
    }
  };

  const removeEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  return (
    <div className="border rounded p-2 flex flex-wrap gap-2">
      {emails.map((email, index) => (
        <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
          {email}
          <button type="button" onClick={() => removeEmail(index)} className="ml-1 text-red-500">
            &times;
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder="Type email and press comma or enter"
        className="flex-grow outline-none p-1"
      />
    </div>
  );
};

const BookSessionPage = () => {
  const [sessionType, setSessionType] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);
  const [attendeeEmails, setAttendeeEmails] = useState([]); // State for multiple attendee emails

  const handleBooking = (e) => {
    e.preventDefault();
    const bookingDetails = {
      sessionType,
      date: selectedDate ? `March ${selectedDate}, 2024` : null,
      time: selectedTime,
      duration,
      notes,
      attendeeEmails, // Contains all the email tags added
    };
    console.log('Booking Details:', bookingDetails);
    setSuccess(!success);
  };

  return (
    <>
    {success &&
    <Success date={selectedDate} time={selectedTime} />
    }
    
      <div style={{ backgroundColor: "white" }} className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Book Session</h1>

      <div className="flex flex-wrap gap-6 mb-8">
        <SessionCard
          logo="https://cdn-icons-png.flaticon.com/128/33/33308.png"
          title="Dost/EC Connect"
          description="Peer-to-peer support and discussions"
        />
        <SessionCard
          logo="https://cdn-icons-png.flaticon.com/128/8262/8262226.png"
          title="Sherpa/lA/PP Connect"
          description="Academic and career planning guidance"
          />

<SessionCard
          logo="https://cdn-icons-png.flaticon.com/128/11232/11232823.png"
          title="Leadership Connect"
          description="Organizational insights and feedback"
        />

<SessionCard
          logo="https://cdn-icons-png.flaticon.com/128/9746/9746446.png"
          title="Mentor Connect"
          description="Industry expert guidance and advice"
          />

<SessionCard
          logo="https://cdn-icons-png.flaticon.com/128/33/33887.png"
          title="Group Session"
          description="Interactive group discussions and learning"
          />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <Calendar
            onDateSelect={setSelectedDate}
            onTimeSelect={setSelectedTime}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        </div>

        <div className="w-full md:w-1/2">
          <div className="bg-[#f3f4f6] shadow-md rounded-lg p-6 h-full">
            <form onSubmit={handleBooking}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Session Type
                </label>
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value)}
                  className="w-full p-2 border rounded bg-white"
                  >
                  <option value="">Select Session Type</option>
                  <option value="Workshop Connect">Workshop Connect</option>
                  <option value="Leadership Connect">Leadership Connect</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Date & Time
                </label>
                <input
                  type="text"
                  value={
                    selectedDate && selectedTime
                    ? `March ${selectedDate}, 2024 at ${selectedTime}`
                      : ''
                  }
                  readOnly
                  placeholder="Select date and time from calendar"
                  className="w-full p-2 border rounded bg-white"
                  />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-2 border rounded bg-white"
                  >
                  <option value="">Select Duration</option>
                  <option value="30">30 Minutes</option>
                  <option value="60">1 Hour</option>
                  <option value="90">90 Minutes</option>
                </select>
              </div>

              {/* Interactive Email Tags Input */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Attendee Emails
                </label>
                <EmailTagsInput emails={attendeeEmails} setEmails={setAttendeeEmails} />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                  placeholder="Additional notes"
                  className="w-full p-2 border rounded bg-white"
                  ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded hover:bg-gray-800"
                  >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
                  </>
  );
};

export default BookSessionPage;
