"use client";
// pages/calendar.js
import React from 'react';

function DayCell({ day, dayEvents }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const timeoutRef = React.useRef();

  // When the mouse enters either the cell or the card,
  // clear any pending hide timer and show the card.
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  // On mouse leave, set a short delay before hiding the card.
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 100);
  };

  return (
    <div
      className="relative p-3 border border-gray-200 h-20 flex flex-col justify-center items-center rounded-lg transition duration-200 ease-in-out hover:bg-gray-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={`text-lg z-10 ${dayEvents ? 'text-blue-600 font-bold' : 'text-gray-800'}`}>
        {day}
      </span>

      {/* If there are events, add a subtle background highlight */}
      {dayEvents && (
        <div className="absolute inset-0 bg-blue-100 opacity-50 rounded-lg pointer-events-none"></div>
      )}

      {/* Show the hover card if there are events and the cell (or card) is hovered */}
      {dayEvents && isHovered && (
        <div
          className="absolute z-20 bg-white p-4 border border-gray-300 rounded-lg shadow-xl w-56 -top-40 left-0 transition-opacity duration-200"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {dayEvents.map((event) => (
            <div key={event.id} className="mb-3 last:mb-0">
              <h3 className="font-semibold text-sm text-gray-800">{event.title}</h3>
              <p className="text-xs text-gray-600">{event.description}</p>
              <a
                href={event.link || "#"}
                className="text-blue-500 text-xs hover:underline"
              >
                View More
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const Calendar = () => {
  // Sample events array; later you can replace this with data fetched from an API.
  const events = [
    {
      id: 1,
      title: "React Conference",
      description: "Join us to explore the latest in React.",
      date: "2025-02-14",
      link: "/events/1",
    },
    {
      id: 2,
      title: "Tailwind CSS Workshop",
      description: "A hands-on workshop on Tailwind CSS.",
      date: "2025-02-10",
      link: "/events/2",
    },
    {
      id: 3,
      title: "Next.js Meetup",
      description: "Discuss the latest Next.js features.",
      date: "2025-02-20",
      // If the link is missing, we fallback to "#"
      link: undefined,
    },
  ];

  // Set the year and month for the calendar (February 2025 in this example)
  const year = 2025;
  const month = 2; // February
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

  // Build an array for the calendar cells.
  const calendarCells = [];
  // Add empty cells for days before the first of the month.
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarCells.push(null);
  }
  // Add the actual days.
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }

  // Group events by day (assumes event.date in "YYYY-MM-DD" format)
  const eventsByDay = {};
  events.forEach((event) => {
    const eventDay = parseInt(event.date.split("-")[2], 10);
    if (eventsByDay[eventDay]) {
      eventsByDay[eventDay].push(event);
    } else {
      eventsByDay[eventDay] = [event];
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          {new Date(year, month - 1).toLocaleString('default', { month: 'long' })} {year} Tech Events
        </h1>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((weekday, index) => (
            <div key={index} className="text-center font-medium text-gray-700">
              {weekday}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarCells.map((cell, index) => {
            if (cell === null) {
              return <div key={index} className="p-3 border border-gray-200 rounded-lg"></div>;
            }

            // Prepare the events for the current day.
            const dayEvents = eventsByDay[cell];
            return (
              <DayCell key={index} day={cell} dayEvents={dayEvents} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
