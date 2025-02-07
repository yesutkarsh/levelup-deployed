export default function EventStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 lg:p-6">
      <div className="p-4 bg-white rounded-lg border">
        <div className="text-sm text-gray-600">Total Events</div>
        <div className="text-2xl font-semibold mt-1">847</div>
      </div>
      <div className="p-4 bg-white rounded-lg border">
        <div className="text-sm text-gray-600">Upcoming Events</div>
        <div className="text-2xl font-semibold mt-1">156</div>
      </div>
      <div className="p-4 bg-white rounded-lg border">
        <div className="text-sm text-gray-600">Past Events</div>
        <div className="text-2xl font-semibold mt-1">691</div>
      </div>
    </div>
  )
}

