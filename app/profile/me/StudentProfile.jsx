"use client";
import React, { useState } from 'react';
import {
  RiCameraLine,
  RiGithubLine,
  RiUploadLine,
  RiEyeLine,
  RiDeleteBinLine,
} from '@remixicon/react';

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

  const tabs = [
    { id: 'profile', label: 'Profile Details' },
    { id: 'guardian', label: 'Guardian Details' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'documents', label: 'Documents' },
    { id: 'activity', label: 'Account Activity' },
  ];

  // Common styling for modern, appealing inputs & textareas
  const inputClass =
    "mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-150 ease-in-out py-2 px-3";

  // A similar style for disabled/read-only inputs (a subtle background change)
  const readOnlyInputClass =
    "mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-150 ease-in-out py-2 px-3";

  return (
    <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900" style={{
        width: '100vw',
        backgroundColor: 'white',
        minHeight: '100vh'
    }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-0">
          Student Profile
        </h1>
        <div className="flex space-x-2 md:space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-4 py-2 rounded-t-md transition-colors duration-300 ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-black text-white opacity-70 hover:opacity-90'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        {/* Profile Image */}
        <div className="relative w-32 h-32">
          <div
            className={`w-full h-full rounded-full border-4 border-white shadow-md bg-cover bg-center ${
              profileImg ? '' : 'bg-gray-200 dark:bg-gray-700'
            }`}
            style={{ backgroundImage: profileImg ? `url(${profileImg})` : 'none' }}
          ></div>
          <label className="absolute bottom-0 right-0 bg-black hover:bg-gray-800 p-2 rounded-full cursor-pointer shadow-lg">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <RiCameraLine className="w-5 h-5 text-white" />
          </label>
        </div>
        {/* Name and Student ID */}
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full md:w-auto">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            John Doe
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">MASAI-1234</p>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'profile' && (
        <div id="profile" className="tab-content">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className={inputClass}
                />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="john@masaischool.com"
                  disabled
                  className={readOnlyInputClass}
                />
              </div>
              {/* Masai ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Masai ID
                </label>
                <input
                  type="text"
                  defaultValue="MASAI-1234"
                  disabled
                  className={readOnlyInputClass}
                />
              </div>
              {/* Course */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Course
                </label>
                <input
                  type="text"
                  defaultValue="Full Stack Web Development"
                  disabled
                  className={readOnlyInputClass}
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-gray-100">
              Personal & Contact Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  defaultValue="+91 9876543210"
                  className={inputClass}
                />
              </div>
              {/* LinkedIn */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  LinkedIn
                </label>
                <input
                  type="url"
                  defaultValue="https://linkedin.com/in/johndoe"
                  className={inputClass}
                />
              </div>
              {/* GitHub */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  GitHub
                </label>
                <input
                  type="url"
                  defaultValue="https://github.com/johndoe"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'guardian' && (
        <div id="guardian" className="tab-content">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Guardian Details
            </h2>
            {/* Mother Details */}
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
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Guardian Mobile Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+91 9876543211"
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Relationship
                  </label>
                  <input
                    type="text"
                    defaultValue="Mother"
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address
                  </label>
                  <input
                    type="text"
                    defaultValue="123 Main St, City, Country"
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Additional Info
                  </label>
                  <textarea
                    rows="3"
                    defaultValue="Additional details about Mother."
                    className={inputClass}
                  ></textarea>
                </div>
              </div>
            </div>
            {/* Father Details */}
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
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Guardian Mobile Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+91 9876543212"
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Relationship
                  </label>
                  <input
                    type="text"
                    defaultValue="Father"
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address
                  </label>
                  <input
                    type="text"
                    defaultValue="456 Another St, City, Country"
                    className={inputClass}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Additional Info
                  </label>
                  <textarea
                    rows="3"
                    defaultValue="Additional details about Father."
                    className={inputClass}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'integrations' && (
        <div id="integrations" className="tab-content">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
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
                  className={inputClass}
                />
                <button
                  id="connectGithub"
                  onClick={handleGithubConnect}
                  disabled={githubConnected}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-300 ${
                    githubConnected
                      ? 'bg-black opacity-60 cursor-not-allowed'
                      : 'bg-black hover:bg-gray-800 text-white'
                  }`}
                >
                  {githubConnected ? (
                    <span>Connected</span>
                  ) : (
                    <>
                      <RiGithubLine className="w-5 h-5" />
                      <span>Connect GitHub</span>
                    </>
                  )}
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
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
                className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                <RiUploadLine className="w-5 h-5" />
                <span>Upload Resume</span>
              </label>
              <button
                id="viewResume"
                onClick={handleViewResume}
                className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md"
              >
                <RiEyeLine className="w-5 h-5" />
                <span>View Resume</span>
              </button>
              <button
                id="deleteResume"
                onClick={handleDeleteResume}
                className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md"
              >
                <RiDeleteBinLine className="w-5 h-5" />
                <span>Delete Resume</span>
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Account Activity
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      IP Address
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      2024-02-06 10:30 AM
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      Profile Login
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      192.168.1.100
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      2024-02-05 03:45 PM
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      Resume Updated
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      192.168.1.100
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
