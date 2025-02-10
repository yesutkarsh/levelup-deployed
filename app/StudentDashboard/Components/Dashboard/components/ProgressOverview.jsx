export default function ProgressOverview() {
  const progressData = [
    { label: "Course Completion", percentage: 75 },
    { label: "Assignments", percentage: 85 },
    { label: "Attendance", percentage: 90 },
    { label: "Project Submission", percentage: 60 }, // Example of adding a new item dynamically
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Progress Overview
        </h3>
        <div className="space-y-4">
          {progressData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {item.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-black h-2 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
