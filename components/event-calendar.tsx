const SAMPLE_EVENTS = {
  4: 4, // 4 events on day 4
  7: 2, // 2 events on day 7
  14: 3, // 3 events on day 14
  21: 1, // 1 event on day 21
}

export default function EventCalendar() {
  return (
    <div className="p-4 lg:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Event Calendar</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-sm rounded-md bg-white">Week</button>
          <button className="px-3 py-1 text-sm rounded-md bg-black text-white">Month</button>
        </div>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-7 text-sm">
          <div className="p-2 text-center border-b">Sun</div>
          <div className="p-2 text-center border-b">Mon</div>
          <div className="p-2 text-center border-b">Tue</div>
          <div className="p-2 text-center border-b">Wed</div>
          <div className="p-2 text-center border-b">Thu</div>
          <div className="p-2 text-center border-b">Fri</div>
          <div className="p-2 text-center border-b">Sat</div>
        </div>
        <div className="grid grid-cols-7 text-sm">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className={`relative text-center text-2xl p-2 border-b border-r min-h-[80px] ${
                i % 7 === 6 ? "border-r-0" : ""
              } ${[4, 7, 14, 21].includes(i) ? "bg-blue-50" : ""}`}
            >
              <span className="block mb-6">{i + 1}</span>
              {SAMPLE_EVENTS[i] && (
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="text-sm text-#4B5563 bg-#eef2ff rounded px-1 py-0.5 text-center">
                    {SAMPLE_EVENTS[i]} slots
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
