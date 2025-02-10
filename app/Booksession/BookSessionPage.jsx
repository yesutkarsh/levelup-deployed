"use client";
import React, { useState, useEffect } from 'react';
import Success from './components/Success';
import Cookies from 'js-cookie';

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
  availableApiSlots = [] 
}) => {
  const year = 2024;
  const month = 2;
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
    cells.push({
      day: d,
      currentMonth: true,
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

  // Group API slots by date
  const apiSlotsByDate = {};
  availableApiSlots.forEach(slot => {
    const date = new Date(slot.startTime).getDate();
    if (!apiSlotsByDate[date]) {
      apiSlotsByDate[date] = [];
    }
    apiSlotsByDate[date].push(slot);
  });

  const handleDateSelect = (day) => {
    if (!apiSlotsByDate[day]) {
      alert("No available slots for this date.");
      return;
    }
    onDateSelect(day);
    onTimeSelect('');
  };

  // Get available times for selected date
  let availableTimes = [];
  if (selectedDate && apiSlotsByDate[selectedDate]) {
    availableTimes = apiSlotsByDate[selectedDate].map(slot => ({
      time: new Date(slot.startTime).toLocaleTimeString(),
      slot: slot
    }));
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
          const hasApiSlots = apiSlotsByDate[cell.day]?.length > 0;
          
          if (!cell.currentMonth) {
            return (
              <div key={index} className="p-2 text-gray-400">
                {cell.day}
              </div>
            );
          }

          if (hasApiSlots) {
            return (
              <div
                key={index}
                onClick={() => handleDateSelect(cell.day)}
                className={`p-2 bg-white rounded-lg cursor-pointer hover:bg-gray-100 ${
                  selectedDate === cell.day ? 'ring-2 ring-black' : ''
                }`}
              >
                <span className="block">{cell.day}</span>
                <span className="text-xs text-gray-600">
                  {`${apiSlotsByDate[cell.day].length} slots`}
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
        {selectedDate ? (
          availableTimes.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time, index) => {
                const timeStr = time.time;
                return (
                  <button
                    key={index}
                    onClick={() => onTimeSelect(time.slot)}
                    className={`p-2 rounded-lg text-sm ${
                      selectedTime === time.slot
                        ? 'bg-black text-white'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    {timeStr}
                  </button>
                );
              })}
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
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [mentorData, setMentorData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attendeeEmails, setAttendeeEmails] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses/all');
        const data = await response.json();
        console.log('Courses response:', data);
        if (data.success) {
          setCourses(data.data);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to fetch courses');
      }
    };

    fetchCourses();
  }, []);

  // Fetch slots when course is selected
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedCourse) return;

      try {
        // Call the internal API route (which proxies the external API)
        const response = await fetch(`/api/slots?course=${encodeURIComponent(selectedCourse)}`);
        const data = await response.json();
        console.log('Slots response:', data);
        if (data.success && data.data && data.data.length > 0) {
          setAvailableSlots(data.data[0].currentSlots);
          setMentorData(data.data[0]);
        }
      } catch (err) {
        console.error('Error fetching slots:', err);
        setError('Failed to fetch available slots');
      }
    };

    fetchSlots();
  }, [selectedCourse]);

  const handleBooking = async (e) => {
    e.preventDefault();
    
    try {
      // Get user details from cookie
      const userDetailsCookie = Cookies.get('userDetails');
      const userDetails = userDetailsCookie ? JSON.parse(decodeURIComponent(userDetailsCookie)) : null;
      
      if (!userDetails) {
        setError('User details not found');
        return;
      }
      
      // studentId: userDetails.id,
      const bookingData = {
        studentId: '67a92c8c038859d154a38b38',
        mentorId: mentorData._id,
        sessionType: "mentor-connect",
        courseId: selectedCourse,
        title: title,
        description: description,
        joinees: [],
        startTime: selectedTime.startTime,
        endTime: selectedTime.endTime
      };
  
      console.log('Sending booking data:', bookingData);
  
      // Call the new local API route built with Next.js App Router
      const response = await fetch('/api/booksession', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });
  
      const data = await response.json();
      console.log('Booking response:', data);
  
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.message || 'Booking failed');
      }
    } catch (err) {
      console.error('Error making booking:', err);
      setError('Failed to make booking');
    }
  };
  

  return (
    <>
    {success && <Success date={"Today"} time={"Today"} />}
      <div style={{ backgroundColor: "white" }} className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Book Session</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

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
            <div className="bg-[#f3f4f6] p-6 rounded-lg mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Select Course
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full p-2 border rounded bg-white"
              >
                <option value="">Select a Course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.courseName} - {course.category}
                  </option>
                ))}
              </select>
            </div>

            <Calendar
              onDateSelect={setSelectedDate}
              onTimeSelect={setSelectedTime}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              availableApiSlots={availableSlots}
            />
          </div>

          <div className="w-full md:w-1/2">
            <div className="bg-[#f3f4f6] shadow-md rounded-lg p-6 h-full">
              <form onSubmit={handleBooking}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Selected Time Slot
                  </label>
                  <input
                    type="text"
                    value={
                      selectedTime
                        ? `${new Date(selectedTime.startTime).toLocaleString()} - ${new Date(selectedTime.endTime).toLocaleString()}`
                        : ''
                    }
                    readOnly
                    placeholder="Select time slot from calendar"
                    className="w-full p-2 border rounded bg-gray-100"
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
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Session title"
                    className="w-full p-2 border rounded bg-white"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Session description"
                    rows="3"
                    className="w-full p-2 border rounded bg-white"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Attendee Emails
                  </label>
                  <EmailTagsInput emails={attendeeEmails} setEmails={setAttendeeEmails} />
                </div>

                <button
                  type="submit"
                  disabled={!selectedCourse || !selectedTime}
                  className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 disabled:bg-gray-400"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookSessionPage;