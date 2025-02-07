import React from 'react';

export const NewsUpdate = () => {
  return (
    <div className="w-full px-4 py-8 ">
      {/* <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">Upcoming Mentor Connect</h2> */}
{/* 
      <div className="overflow-hidden relative w-full">
        <div className="flex space-x-4 w-full">
          <div className="flex space-x-4 scroll-left">
            <div className="bg-gray-800 dark:bg-gray-200 p-4 rounded-lg shadow-lg w-72">
              <img
                src="https://via.placeholder.com/300"
                alt="Event"
                className="rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-white dark:text-gray-900">Empowering Tomorrow’s Innovators</h3>
              <p className="text-gray-400 text-sm dark:text-gray-700">
                48-hour CodeSprint: Collaborate, innovate, and win prizes worth $50,000.
              </p>
            </div>
            <div className="bg-gray-800 dark:bg-gray-200 p-4 rounded-lg shadow-lg w-72">
              <img
                src="https://via.placeholder.com/300"
                alt="Event"
                className="rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-white dark:text-gray-900">Where Innovation Meets Collaboration</h3>
              <p className="text-gray-400 text-sm dark:text-gray-700">
                CodeFusion 2025 brings developers, engineers, and students together globally.
              </p>
            </div>
            <div className="bg-gray-800 dark:bg-gray-200 p-4 rounded-lg shadow-lg w-72">
              <img
                src="https://via.placeholder.com/300"
                alt="Event"
                className="rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-white dark:text-gray-900">InnovateX 2025</h3>
              <p className="text-gray-400 text-sm dark:text-gray-700">
                A premier event showcasing AI, robotics, blockchain, and renewable energy.
              </p>
            </div>
            <div className="bg-gray-800 dark:bg-gray-200 p-4 rounded-lg shadow-lg w-72">
              <img
                src="https://via.placeholder.com/300"
                alt="Event"
                className="rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-white dark:text-gray-900">Masai Meet Up Delhi</h3>
              <p className="text-gray-400 text-sm dark:text-gray-700">
                Meet industry leaders and tech enthusiasts for networking and innovation.
              </p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="grid md:grid-cols-2 gap-6 mt-8 bg">
        <div className="bg-[#e2ebfc] p-4 rounded-lg  flex items-center space-x-4 w-[1000px] max-w-[600px] h-[300px] border-gray-200 border-[1px]">
        <img
  src="https://preview.redd.it/join-us-for-an-ama-with-harkirat-singh-the-4cr-guy-an-iit-v0-sma7ypq5nuad1.jpg?width=1080&format=pjpg&auto=webp&s=74a497dc1f0dc6968760821f97bbc7f3e2a1c718"
  alt="Mentor"
  className="w-[200px] h-[260px] object-cover"
  style={{borderRadius: "12px"}}
/>

          <div>
            <h3 className="text-[35px] text-black">Mentor Connect</h3>
            <p className="text-gray-400 text-sm">
              Connect with top 120+ FANG/MANG employees for career guidance.
            </p>
            <div className="text-sm mt-2">
              <span className="text-blue-400">Career planning</span> •{' '}
              <span className="text-green-400">Industry Insight</span> •{' '}
              <span className="text-purple-400">Interview readiness</span>
            </div>
            <p className="text-sm mt-2">12 Slots Available</p>
          </div>
        </div>
      
      </div>
    </div>
  );
};
