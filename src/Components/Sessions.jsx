import React from 'react';
import SideBar from './SideBar';
import Header from './Header';

const Sessions = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        {/* <SideBar/> */}
        {/* Main Content */}
        <div className="flex-1">
          {/* <Header/> */}

          <main className="p-8">
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-white p-6 rounded-lg border border-gray-200 col-span-2 min-h-[calc(100vh-9rem)]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-900">All Sessions</h2>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <input type="text" placeholder="Search sessions..." className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
                      <button className="!rounded-button px-4 py-2 text-sm font-medium text-white bg-custom hover:bg-custom/90">Search</button>
                    </div>
                    <button className="!rounded-button px-4 py-2 text-sm font-medium text-custom bg-indigo-50 hover:bg-indigo-100">Export All</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {/* Example Row */}
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Emma Thompson</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Mathematics</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Mar 14, 2024</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">45 minutes</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">Completed</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-custom hover:text-indigo-900 mr-2">View Details</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <div className="text-sm text-gray-700 fixed bottom-0 left-4 mb-4 bg-white px-4 py-2 rounded-lg shadow-lg z-10">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of <span className="font-medium">156</span> results
                  </div>
                  <div className="flex items-center gap-2 fixed bottom-0 right-4 mb-4 bg-white px-4 py-2 rounded-lg shadow-lg z-10">
                    <button className="!rounded-button px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100">Previous</button>
                    <button className="!rounded-button px-3 py-1 text-sm font-medium text-white bg-custom">1</button>
                    <button className="!rounded-button px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100">2</button>
                    <button className="!rounded-button px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100">3</button>
                    <button className="!rounded-button px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-100">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Sessions;