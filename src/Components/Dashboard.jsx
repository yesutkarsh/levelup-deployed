import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import SideBar from './SideBar';
import Header from './Header';

const Dashboard = () => {
  useEffect(() => {
    // Initialize ECharts instances
    const pieChart = echarts.init(document.getElementById('pieChart'));
    const barChart = echarts.init(document.getElementById('barChart'));
    const bookingsChart = echarts.init(document.getElementById('bookingsChart'));

    // Pie Chart Options
    const pieOption = {
      title: { text: 'Session Distribution', left: 'center' },
      tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
      legend: { orient: 'horizontal', bottom: 10 },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: { show: false },
          emphasis: { label: { show: true, fontSize: '16', fontWeight: 'bold' } },
          data: [
            { value: 1048, name: 'Mathematics' },
            { value: 735, name: 'Physics' },
            { value: 580, name: 'Chemistry' },
            { value: 484, name: 'Biology' },
            { value: 300, name: 'English' },
          ],
        },
      ],
    };

    // Bar Chart Options
    const barOption = {
      title: { text: 'Weekly Session Trend', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { type: 'value' },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: { color: 'rgba(180, 180, 180, 0.2)' },
        },
      ],
    };

    // Bookings Chart Options
    const bookingsOption = {
      title: { text: 'Monthly Session Analytics', left: 'center' },
      tooltip: { trigger: 'axis' },
      legend: { data: ['Completed Sessions', 'Cancelled Sessions'], bottom: 10 },
      xAxis: { type: 'category', data: Array.from({ length: 30 }, (_, i) => (i + 1).toString()) },
      yAxis: { type: 'value' },
      series: [
        {
          name: 'Completed Sessions',
          type: 'line',
          smooth: true,
          data: [30, 40, 35, 50, 45, 55, 45, 60, 65, 55, 50, 45, 55, 60, 65, 70, 65, 60, 55, 50, 45, 55, 50, 45, 40, 45, 50, 55, 60, 65],
          areaStyle: { opacity: 0.2 },
        },
        {
          name: 'Cancelled Sessions',
          type: 'line',
          smooth: true,
          data: [15, 10, 12, 8, 10, 7, 9, 11, 8, 10, 12, 15, 13, 10, 8, 7, 9, 11, 13, 15, 12, 10, 8, 9, 11, 13, 15, 12, 10, 8],
          areaStyle: { opacity: 0.2 },
        },
      ],
    };

    // Set options for each chart
    pieChart.setOption(pieOption);
    barChart.setOption(barOption);
    bookingsChart.setOption(bookingsOption);

    // Cleanup on component unmount
    return () => {
      pieChart.dispose();
      barChart.dispose();
      bookingsChart.dispose();
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        {/* <SideBar/> */}
        {/* Main Content */}
        <div className="flex-1">
          <Header/>

          <main className="p-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-indigo-50 rounded-lg">
                    <i className="fas fa-users text-custom text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Sessions</p>
                    <p className="text-2xl font-semibold text-gray-900">1,245</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-indigo-50 rounded-lg">
                    <i className="fas fa-clock text-custom text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Average Duration</p>
                    <p className="text-2xl font-semibold text-gray-900">45m</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-indigo-50 rounded-lg">
                    <i className="fas fa-check-circle text-custom text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                    <p className="text-2xl font-semibold text-gray-900">89%</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 bg-indigo-50 rounded-lg">
                    <i className="fas fa-star text-custom text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                    <p className="text-2xl font-semibold text-gray-900">4.8</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Statistics */}
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-white p-6 rounded-lg border border-gray-200 col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Session Statistics</h2>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div id="pieChart" style={{ height: '400px' }}></div>
                  <div id="barChart" style={{ height: '400px' }}></div>
                </div>
              </div>
            </div>

            {/* Recent Sessions Table */}
            <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200 col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Recent Sessions</h2>
                <div className="flex gap-2">
                  <button className="!rounded-button px-4 py-2 text-sm font-medium text-custom bg-indigo-50 hover:bg-indigo-100">Export</button>
                  <button className="!rounded-button px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100" id="new-view-all">View All</button>
                </div>
              </div>
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
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Emma Thompson</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Mathematics</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Mar 14, 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">45 minutes</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">Completed</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-custom hover:text-indigo-900">View Details</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">James Wilson</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Physics</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Mar 14, 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">60 minutes</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">In Progress</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-custom hover:text-indigo-900">View Details</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sophia Chen</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Chemistry</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Mar 13, 2024</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">30 minutes</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">Completed</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-custom hover:text-indigo-900">View Details</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Session Analytics Chart */}
            <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Session Analytics</h2>
                <div className="flex gap-2">
                  <button className="!rounded-button px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200">Week</button>
                  <button className="!rounded-button px-3 py-1.5 text-sm font-medium text-white bg-custom">Month</button>
                </div>
              </div>
              <div id="bookingsChart" style={{ width: '100%', height: '400px' }}></div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;