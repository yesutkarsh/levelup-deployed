import React from "react";
import { FaChartLine, FaCalendarAlt, FaBullhorn, FaNewspaper, FaChartBar, FaBell, FaEdit, FaFilePdf, FaFilePowerpoint } from "react-icons/fa";
import SideBar from "./SideBar";
import Header from "./Header";
import ReactECharts from "echarts-for-react";
const SessionDetails = () => {

    const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
    const performanceData = [65, 72, 80, 85, 90]; // Example performance scores
  
    // ECharts configuration
    const option = {
      title: {
        text: "Student Performance Trend",
        left: "center",
        textStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: "#333",
        },
      },
      tooltip: {
        trigger: "axis",
        formatter: "Week {b}: {c}% Performance",
      },
      xAxis: {
        type: "category",
        data: weeks,
        axisLabel: {
          color: "#666",
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          color: "#666",
          formatter: "{value}%",
        },
      },
      series: [
        {
          name: "Performance",
          type: "line",
          data: performanceData,
          smooth: true,
          lineStyle: {
            color: "#6366f1", // Purple line
            width: 3,
          },
          itemStyle: {
            color: "#6366f1", // Purple dots
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(99, 102, 241, 0.3)", // Light purple
                },
                {
                  offset: 1,
                  color: "rgba(99, 102, 241, 0)", // Transparent
                },
              ],
            },
          },
        },
      ],
      grid: {
        containLabel: true,
        left: "10%",
        right: "10%",
        bottom: "10%",
        top: "20%",
      },
    };
  

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        {/* <SideBar /> */}

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          {/* <Header title="Session Details" /> */}

          {/* Main Content */}
          <main className="p-8 relative">
            {/* Edit Page Button */}
            <div className="flex justify-end mb-4">
              <button className="!rounded-button px-4 py-2 text-sm font-medium text-gray-100 bg-gray-800 hover:bg-custom/90 shadow-sm hover:shadow-md transition-all duration-200">
                <FaEdit className="mr-2 inline-block" /> Edit Session
              </button>
            </div>

            {/* Current Batch Overview */}
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-900">Current Batch Overview</h2>
                  <span className="text-sm text-gray-500">2024 Spring Semester</span>
                  <button className="ml-2 p-2 text-gray-600 hover:text-gray-900">
                    <FaEdit />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">32</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Classes per Week</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">3</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Average Attendance</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">95%</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Course Progress</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">65%</p>
                  </div>
                  <div className="col-span-4 mt-6" id="batch-chart">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ReactECharts
          option={option}
          style={{ width: "100%", height: "300px" }}
        />
        <div className="mt-4 text-sm text-gray-500">
          <p><strong>Week 1:</strong> Initial assessment and baseline performance.</p>
          <p><strong>Week 2:</strong> Early progress and adaptation to the curriculum.</p>
          <p><strong>Week 3:</strong> Mid-point evaluation with noticeable improvements.</p>
          <p><strong>Week 4:</strong> Continued growth and skill development.</p>
          <p><strong>Week 5:</strong> Final assessment showcasing overall progress.</p>
        </div>
      </div>
    </div>
                </div>
              </div>

              {/* Session Information */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200" id="session-details">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Session Information</h2>
                  <div className="flex items-center gap-4">
                    <button className="!rounded-button px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">Back to Sessions</button>
                    <button className="p-2 text-gray-600 hover:text-gray-900">
                      <FaEdit />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8 bg-gray-50 p-6 rounded-lg">
                  <div className="col-span-2 mb-4">
                    <label className="block text-sm font-medium text-gray-700">Batch</label>
                    <p className="mt-1 text-sm text-gray-900">2024 Spring Semester - Advanced Mathematics Group</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Student Name</label>
                      <p className="mt-1 text-sm text-gray-900">Emma Thompson</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Subject</label>
                      <p className="mt-1 text-sm text-gray-900">Mathematics</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <p className="mt-1 text-sm text-gray-900">Mar 14, 2024</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration</label>
                      <p className="mt-1 text-sm text-gray-900">45 minutes</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <span className="mt-1 inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">Completed</span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Teacher</label>
                      <p className="mt-1 text-sm text-gray-900">Dr. John Smith</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <p className="mt-1 text-sm text-gray-900">Online (Zoom Meeting)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Session ID</label>
                      <p className="mt-1 text-sm text-gray-900">#12345</p>
                    </div>
                  </div>
                </div>

                {/* Session Notes */}
                <div className="mt-10">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Session Notes</h3>
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <p className="text-sm text-gray-600">
                      Covered quadratic equations and their applications. Student showed good understanding of the concepts. Homework assigned: Chapter 5, exercises 1-10. Areas for improvement: Word problems involving quadratic equations.
                    </p>
                  </div>
                  <button className="ml-2 p-2 text-gray-600 hover:text-gray-900">
                    <FaEdit />
                  </button>
                </div>

                {/* Resources Used */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Resources Used</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FaFilePdf className="text-red-500" />
                      <a href="#" className="text-sm text-custom hover:underline">Quadratic Equations Worksheet.pdf</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaFilePowerpoint className="text-orange-500" />
                      <a href="#" className="text-sm text-custom hover:underline">Math Concepts Presentation.pptx</a>
                    </div>
                  </div>
                  <button className="ml-2 p-2 text-gray-600 hover:text-gray-900">
                    <FaEdit />
                  </button>
                </div>

                {/* Buttons at the Bottom */}
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <div className="flex justify-end gap-4">
                    <button className="!rounded-button px-4 py-2 text-sm font-medium text-custom bg-indigo-50 hover:bg-indigo-100 transition-colors duration-200">Download Report</button>
                    <button className="!rounded-button px-4 py-2 text-sm font-medium text-white bg-custom hover:bg-custom/90 shadow-sm hover:shadow-md transition-all duration-200">Schedule Follow-up</button>
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

export default SessionDetails;