
export default function RecentEvents() {
  return (
    <div className="p-4 lg:p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Events</h2>
        <button variant="link" className="text-sm">
          View All
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0" />
            <div>
              <h3 className="font-medium">Annual Tech Conference 2024</h3>
              <p className="text-sm text-gray-600">Posted by Sarah Johnson • 2 hours ago</p>
            </div>
          </div>
          <button className="bg-green-500 hover:bg-green-600 w-full sm:w-auto p-2 rounded-lg text-white">Approve</button>
        </div>
        {/* <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0" />
            <div>
              <h3 className="font-medium">Leadership Workshop</h3>
              <p className="text-sm text-gray-600">Posted by Mike Chen • 5 hours ago</p>
            </div>
          </div>
          <button className="bg-green-500 hover:bg-green-600 w-full sm:w-auto">Approve</button>
        </div> */}
      </div>
    </div>
  )
}

