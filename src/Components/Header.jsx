import React from 'react'
import { FaBell,  FaUser } from 'react-icons/fa'

export default function Header() {
  return (
  <><header className="bg-white border-b border-gray-200">
  <div className="px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="flex items-center gap-4">
        <button className="!rounded-button relative p-2 text-gray-600 hover:text-gray-900">
          <FaBell/>
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <div className="flex items-center gap-3">
          <FaUser/>
          <span className="text-sm font-medium text-gray-900">Admin User</span>
        </div>
      </div>
    </div>
  </div>
</header></>
  )
}
