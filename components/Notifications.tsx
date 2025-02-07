import { Bell, Calendar } from 'lucide-react';

export default function Notifications() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200">
            <Bell className="text-black h-5 w-5" />
            <div className="ml-3">
              <p className="text-sm text-gray-900">Assignment due tomorrow</p>
              <p className="text-xs text-gray-500">Data Structures - Chapter 6</p>
            </div>
          </div>
          <div className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-200">
            <Calendar className="text-black h-5 w-5" />
            <div className="ml-3">
              <p className="text-sm text-gray-900">Team Meeting</p>
              <p className="text-xs text-gray-500">Today at 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}