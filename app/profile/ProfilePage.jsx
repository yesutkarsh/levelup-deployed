"use client";
import React, { useState } from 'react';

const StudentProfile = () => {
  // State for tabs
  const [activeTab, setActiveTab] = useState('profile');

  // State for profile image
  const [profileImg, setProfileImg] = useState(null);

  // State for GitHub integration
  const [githubUsername, setGithubUsername] = useState('');
  const [githubConnected, setGithubConnected] = useState(false);

  // State for resume management
  const [resumeURL, setResumeURL] = useState(null);
  const [resumeMessage, setResumeMessage] = useState('');

  // Tab click handler
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Profile Image Upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImg(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // GitHub Connect handler
  const handleGithubConnect = () => {
    if (githubUsername.trim()) {
      setGithubConnected(true);
    }
  };

  // Resume Upload handler
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // If a previous URL exists, revoke it
      if (resumeURL) {
        URL.revokeObjectURL(resumeURL);
      }
      const newUrl = URL.createObjectURL(file);
      setResumeURL(newUrl);
      setResumeMessage('Resume uploaded successfully!');
    }
  };

  // View Resume handler
  const handleViewResume = () => {
    if (resumeURL) {
      window.open(resumeURL, '_blank');
    } else {
      setResumeMessage('No resume uploaded.');
    }
  };

  // Delete Resume handler
  const handleDeleteResume = () => {
    if (resumeURL) {
      URL.revokeObjectURL(resumeURL);
      setResumeURL(null);
      setResumeMessage('Resume deleted successfully.');
    } else {
      setResumeMessage('No resume to delete.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-800 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className=" text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-0">
          Student Profile
        </h1>
        <div className="flex space-x-4">
          {[
            { id: 'profile', label: 'Profile Details' },
            { id: 'guardian', label: 'Guardian Details' },
            { id: 'integrations', label: 'Integrations' },
            { id: 'documents', label: 'Documents' },
            { id: 'activity', label: 'Account Activity' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-4 py-2 font-medium ${
                activeTab === tab.id
                  ? 'border-b-4 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex items-center space-x-6 mb-8">
        {/* Profile Image Upload */}
        <div className="relative w-32 h-32 min-w-[128px] min-h-[128px]">
          <div
            id="profileImg"
            className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white shadow-md bg-cover bg-center"
            style={{ backgroundImage: profileImg ? `url(${profileImg})` : 'none' }}
          ></div>
          <label className="absolute bottom-0 right-0 bg-black p-2 rounded-full cursor-pointer">
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </label>
        </div>
        {/* Name and Student ID */}
        <div className="text-left p-4 rounded-lg w-[500px] bg-white dark:bg-gray-800 shadow">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            John Doe
          </h2>
          <p className="text-gray-500 dark:text-gray-400">MASAI-1234</p>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'profile' && (
        <div id="profile" className="tab-content">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring focus:ring-gray-900 dark:focus:ring-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="john@masaischool.com"
                  disabled
                  className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Masai ID
                </label>
                <input
                  type="text"
                  defaultValue="MASAI-1234"
                  disabled
                  className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Course
                </label>
                <input
                  type="text"
                  defaultValue="Full Stack Web Development"
                  disabled
                  className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
              Personal & Contact Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  defaultValue="+91 9876543210"
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring focus:ring-gray-900 dark:focus:ring-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  LinkedIn
                </label>
                <input
                  type="url"
                  defaultValue="https://linkedin.com/in/johndoe"
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring focus:ring-gray-900 dark:focus:ring-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  GitHub
                </label>
                <input
                  type="url"
                  defaultValue="https://github.com/johndoe"
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring focus:ring-gray-900 dark:focus:ring-gray-100"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'guardian' && (
        <div id="guardian" className="tab-content">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Guardian Details
            </h2>
            <div className="space-y-6">
              {/* Guardian 1: Mother Details */}
              <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Mother Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Guardian Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Jane Doe"
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring focus:ring-gray-900 dark:focus:ring-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Guardian Mobile Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+91 9876543211"
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring focus:ring-gray-900 dark:focus:ring-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Relationship
                    </label>
                    <input
                      type="text"
                      defaultValue="Mother"
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring focus:ring-gray-900 dark:focus:ring-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Address
                    </label>
                    <input
                      type="text"
                      defaultValue="123 Main St, City, Country"
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring focus:ring-gray-900 dark:focus:ring-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Additional Info
                    </label>
                    <textarea
                      rows="3"
                      defaultValue="Additional details about Mother."
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring focus:ring-gray-900 dark:focus:ring-gray-100"
                    ></textarea>
                  </div>
                </div>
              </div>
              {/* Guardian 2: Father Details */}
              <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Father Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Guardian Name
                    </label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring focus:ring-gray-900 dark:focus:ring-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Guardian Mobile Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+91 9876543212"
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring focus:ring-gray-900 dark:focus:ring-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Relationship
                    </label>
                    <input
                      type="text"
                      defaultValue="Father"
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring focus:ring-gray-900 dark:focus:ring-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Address
                    </label>
                    <input
                      type="text"
                      defaultValue="456 Another St, City, Country"
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring focus:ring-gray-900 dark:focus:ring-gray-100"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Additional Info
                    </label>
                    <textarea
                      rows="3"
                      defaultValue="Additional details about Father."
                      className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 shadow-sm text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring focus:ring-gray-900 dark:focus:ring-gray-100"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'integrations' && (
        <div id="integrations" className="tab-content">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              GitHub Integration
            </h2>
            <div id="githubIntegration">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  id="githubUsername"
                  placeholder="Enter GitHub Username"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  disabled={githubConnected}
                  className="mt-1 block flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100 focus:border-gray-900 dark:focus:border-gray-100 focus:ring focus:ring-gray-900 dark:focus:ring-gray-100"
                />
                <button
                  id="connectGithub"
                  onClick={handleGithubConnect}
                  disabled={githubConnected}
                  className={`px-4 py-2 rounded-md ${
                    githubConnected
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-black text-white'
                  }`}
                >
                  {githubConnected ? 'Connected' : 'Connect GitHub'}
                </button>
              </div>
              {githubConnected && (
                <div id="githubConnected" className="mt-4">
                  <p className="text-green-600">
                    GitHub connected successfully!
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Username: <span>{githubUsername}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div id="documents" className="tab-content">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Resume Management
            </h2>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                id="resumeUpload"
                accept=".pdf,.docx"
                onChange={handleResumeUpload}
                className="hidden"
              />
              <label
                htmlFor="resumeUpload"
                className="bg-black text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Upload Resume
              </label>
              <button
                id="viewResume"
                onClick={handleViewResume}
                className="bg-black text-white px-4 py-2 rounded-md"
              >
                View Resume
              </button>
              <button
                id="deleteResume"
                onClick={handleDeleteResume}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Delete Resume
              </button>
            </div>
            <div id="resumeMessage" className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              {resumeMessage}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div id="activity" className="tab-content">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Account Activity
            </h2>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-3 text-left text-gray-900 dark:text-gray-100">Date</th>
                  <th className="p-3 text-left text-gray-900 dark:text-gray-100">Activity</th>
                  <th className="p-3 text-left text-gray-900 dark:text-gray-100">IP Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 text-gray-900 dark:text-gray-100">2024-02-06 10:30 AM</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">Profile Login</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">192.168.1.100</td>
                </tr>
                <tr>
                  <td className="p-3 text-gray-900 dark:text-gray-100">2024-02-05 03:45 PM</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">Resume Updated</td>
                  <td className="p-3 text-gray-900 dark:text-gray-100">192.168.1.100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
