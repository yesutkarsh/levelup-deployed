import React from 'react';
import styles from "./styles.module.css"
const Calendar = () => {
  // Array of highlighted dates with their respective slots.
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

  // Set a fixed month/year (March 2024, for example).
  // Note: Month is 0-indexed (0 = January, 1 = February, 2 = March, etc.)
  const year = 2024;
  const month = 2; // March

  // Calculate the number of days in the current month.
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Determine the day of the week the month starts on (0 for Sunday, 1 for Monday, etc.)
  const startDay = new Date(year, month, 1).getDay();
  // Number of days in the previous month.
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // We'll generate 42 cells (6 weeks) for a full grid.
  const totalCells = 42;
  const cells = [];

  // Fill in previous month's dates (if any)
  for (let i = startDay - 1; i >= 0; i--) {
    cells.push({
      day: daysInPrevMonth - i,
      currentMonth: false,
    });
  }

  // Fill in current month's dates
  for (let d = 1; d <= daysInMonth; d++) {
    const highlight = highlightedDates.find(item => item.date === d);
    cells.push({
      day: d,
      currentMonth: true,
      highlight, // will be undefined if not highlighted
    });
  }

  // Fill in next month's dates until we reach 42 cells.
  let nextDay = 1;
  while (cells.length < totalCells) {
    cells.push({
      day: nextDay,
      currentMonth: false,
    });
    nextDay++;
  }

  return (
    <div id={styles.CalendarContainer} className="w-[50%] mt-8">
      <div  style={{marginRight: '30px', marginLeft: '20px'}} className="bg-white p-6 rounded-lg border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Calendar Overview</h2>
          <div className="flex gap-2">
            
           
          </div>
        </div>

        {/* Weekday labels */}
        <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600 mb-2">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((cell, index) => {
            // Dates not in the current month get a muted style.
            if (!cell.currentMonth) {
              return (
                <div key={index} className="p-2 text-gray-400">
                  {cell.day}
                </div>
              );
            }

            // Check if the date should be highlighted.
            if (cell.highlight) {
              return (
                <div key={index} className="p-2 bg-indigo-50 rounded-lg">
                  <span className="block text-custom">{cell.day}</span>
                  <span className="text-xs text-gray-600">
                    {cell.highlight.slots} slots
                  </span>
                </div>
              );
            }

            // Regular current month date
            return (
              <div key={index} className="p-2">
                <span className="block">{cell.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
