"use client";
import React, { useState, useEffect } from 'react';
import Success from './components/Success';

// Define the data structure for session types, mentors, and per-day time slots.
const sessionOptions = {
  "Workshop Connect": {
    mentors: [
      {
        name: "Alice Johnson",
        available: {
          1: ['09:00', '10:00', '11:00'],
          2: ['10:00', '11:00', '14:00'],
          3: ['09:00', '11:00', '15:00'],
          7: ['14:00', '16:00']
        }
      },
      {
        name: "Bob Smith",
        available: {
          1: ['14:00', '15:00', '16:00'],
          2: ['09:00', '10:00'],
          4: ['10:00', '12:00'],
          5: ['09:00', '11:00']
        }
      }
    ]
  },
  "Leadership Connect": {
    mentors: [
      {
        name: "Carol Williams",
        available: {
          4: ['09:00', '10:00'],
          5: ['10:00', '11:00'],
          6: ['11:00', '12:00'],
          8: ['13:00', '14:00']
        }
      }
    ]
  },
  // Add more session types if needed.
};

const SessionCard = ({ logo, title, description }) => {
  return (
    <div className="bg-[#f3f4f6] p-6 rounded-lg flex items-center gap-4 min-w-[400px] min-h-[150px] dark:bg-white">
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

const Calendar = ({ 
  onDateSelect, 
  onTimeSelect, 
  selectedDate, 
  selectedTime,
  sessionType,
  selectedMentor,
  sessionOptions
}) => {
  const year = 2024;
  const month = 2; // March (month index starts at 0)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const totalCells = 42;
  const cells = [];

  // Compute available schedule for the chosen session type and mentor (if provided)
  let availableSchedule = {};
  if (sessionType && selectedMentor && sessionOptions[sessionType]) {
    const mentorData = sessionOptions[sessionType].mentors.find(m => m.name === selectedMentor);
    if (mentorData) {
      availableSchedule = mentorData.available;
    }
  }

  // Build a list of highlighted dates based on available slots from the chosen mentor.
  const computedHighlightedDates = [];
  for (let d = 1; d <= daysInMonth; d++) {
    if (availableSchedule[d]) {
      computedHighlightedDates.push({ date: d, slots: availableSchedule[d].length });
    }
  }

  // Fill previous month's cells
  for (let i = startDay - 1; i >= 0; i--) {
    cells.push({
      day: daysInPrevMonth - i,
      currentMonth: false,
    });
  }

  // Fill current month's cells
  for (let d = 1; d <= daysInMonth; d++) {
    const highlight = computedHighlightedDates.find((item) => item.date === d);
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
    // Only allow date selection if a session type (and mentor, if applicable) is selected
    if (!sessionType) {
      alert("Please select session type first.");
      return;
    }
    if (sessionOptions[sessionType].mentors.length > 1 && !selectedMentor) {
      alert("Please select a mentor.");
      return;
    }
    if (highlight) {
      onDateSelect(day);
      // Reset time when a new date is selected
      onTimeSelect('');
    }
  };

  // Compute available times for the selected date from the mentor's schedule.
  let availableTimes = [];
  if (selectedDate && sessionType && selectedMentor && availableSchedule[selectedDate]) {
    availableTimes = availableSchedule[selectedDate];
  }

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
                  {cell.highlight.slots} slot{cell.highlight.slots > 1 ? 's' : ''}
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

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Available Times</h3>
        {!sessionType ? (
          <p className="text-red-500">Please select session type to view available times.</p>
        ) : (sessionOptions[sessionType].mentors.length > 1 && !selectedMentor) ? (
          <p className="text-red-500">Please select a mentor to view available times.</p>
        ) : selectedDate ? (
          availableTimes.length > 0 ? (
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
          ) : (
            <p className="text-gray-600">No available times for selected date.</p>
          )
        ) : (
          <p className="text-gray-600">Please select a date to view available times.</p>
        )}
      </div>
    </div>
  );
};

const EmailTagsInput = ({ emails, setEmails }) => {
  const [input, setInput] = useState('');

  // Adds the email if it is non-empty and not already added.
  const addEmail = (email) => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return;
    if (!emails.includes(trimmedEmail)) {
      setEmails([...emails, trimmedEmail]);
    }
    setInput('');
  };

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
  const [selectedMentor, setSelectedMentor] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);
  const [attendeeEmails, setAttendeeEmails] = useState([]);

  // When the session type changes, auto-select the mentor if there’s only one option.
  useEffect(() => {
    if (sessionType && sessionOptions[sessionType]) {
      const mentors = sessionOptions[sessionType].mentors;
      if (mentors.length === 1) {
        setSelectedMentor(mentors[0].name);
      } else {
        setSelectedMentor('');
      }
      // Reset date and time when session type changes.
      setSelectedDate(null);
      setSelectedTime('');
    } else {
      setSelectedMentor('');
      setSelectedDate(null);
      setSelectedTime('');
    }
  }, [sessionType]);

  const handleBooking = (e) => {
    e.preventDefault();
    const bookingDetails = {
      sessionType,
      mentor: selectedMentor,
      date: selectedDate ? `March ${selectedDate}, 2024` : null,
      time: selectedTime,
      duration,
      notes,
      attendeeEmails,
    };
    console.log('Booking Details:', bookingDetails);
    setSuccess(true);
  };

  return (
    <>
      {success && <Success date={selectedDate} time={selectedTime} />}
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
              sessionType={sessionType}
              selectedMentor={selectedMentor}
              sessionOptions={sessionOptions}
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
                    {Object.keys(sessionOptions).map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {sessionType && sessionOptions[sessionType].mentors.length > 1 && (
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Select Mentor
                    </label>
                    <select
                      value={selectedMentor}
                      onChange={(e) => setSelectedMentor(e.target.value)}
                      className="w-full p-2 border rounded bg-white"
                    >
                      <option value="">Select Mentor</option>
                      {sessionOptions[sessionType].mentors.map((mentor) => (
                        <option key={mentor.name} value={mentor.name}>
                          {mentor.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {sessionType && sessionOptions[sessionType].mentors.length === 1 && (
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Mentor
                    </label>
                    <input
                      type="text"
                      value={selectedMentor}
                      readOnly
                      className="w-full p-2 border rounded bg-gray-100"
                    />
                  </div>
                )}

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
