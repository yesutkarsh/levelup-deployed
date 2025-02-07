import { BookOpen, Award, Code } from 'lucide-react';

export default function RecentActivity() {
  return (
    <div className="mt-6 bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
          <button className="text-black hover:text-gray-700">View All</button>
        </div>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <BookOpen className="text-gray-900 h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-900">Completed Chapter 5: Data Structures</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Award className="text-gray-900 h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-900">Earned Python Programming Certificate</p>
              <p className="text-sm text-gray-500">Yesterday</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Code className="text-gray-900 h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-900">Submitted Project: Web Development</p>
              <p className="text-sm text-gray-500">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}