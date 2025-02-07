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

  // State for skills section
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [expertise, setExpertise] = useState([]);
  const [expertiseInput, setExpertiseInput] = useState('');
  const [ambitions, setAmbitions] = useState('');
  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState('');
  const [skillsUpdateMessage, setSkillsUpdateMessage] = useState('');

  // Predefined suggestion arrays
  const skillSuggestions = [
    "JavaScript",
    "React",
    "Node.js",
    "CSS",
    "HTML",
    "TypeScript",
    "Redux",
    "Next.js",
  ];
  const expertiseSuggestions = [
    "Front-end",
    "Back-end",
    "Full Stack",
    "UI/UX",
    "DevOps",
    "Data Science",
  ];
  const interestsSuggestions = [
    "Web Development",
    "Machine Learning",
    "Artificial Intelligence",
    "Blockchain",
    "Cloud Computing",
  ];

  // Filter suggestions only when user is typing
  const filteredSkillSuggestions = skillInput.trim()
    ? skillSuggestions.filter(
        (s) =>
          s.toLowerCase().includes(skillInput.toLowerCase()) &&
          !skills.includes(s)
      )
    : [];
  const filteredExpertiseSuggestions = expertiseInput.trim()
    ? expertiseSuggestions.filter(
        (s) =>
          s.toLowerCase().includes(expertiseInput.toLowerCase()) &&
          !expertise.includes(s)
      )
    : [];
  const filteredInterestSuggestions = interestInput.trim()
    ? interestsSuggestions.filter(
        (s) =>
          s.toLowerCase().includes(interestInput.toLowerCase()) &&
          !interests.includes(s)
      )
    : [];

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

  // --- Handlers for Skills Tab ---
  // Skills
  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };
  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };
  const handleSelectSkill = (suggestion) => {
    if (!skills.includes(suggestion)) {
      setSkills([...skills, suggestion]);
      setSkillInput('');
    }
  };

  // Expertise
  const handleAddExpertise = () => {
    if (expertiseInput.trim() && !expertise.includes(expertiseInput.trim())) {
      setExpertise([...expertise, expertiseInput.trim()]);
      setExpertiseInput('');
    }
  };
  const handleRemoveExpertise = (index) => {
    setExpertise(expertise.filter((_, i) => i !== index));
  };
  const handleSelectExpertise = (suggestion) => {
    if (!expertise.includes(suggestion)) {
      setExpertise([...expertise, suggestion]);
      setExpertiseInput('');
    }
  };

  // Interests
  const handleAddInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };
  const handleRemoveInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index));
  };
  const handleSelectInterest = (suggestion) => {
    if (!interests.includes(suggestion)) {
      setInterests([...interests, suggestion]);
      setInterestInput('');
    }
  };

  // Update button handler
  const handleSkillsUpdate = () => {
    // Here you can integrate an API call to update the student's skills details.
    setSkillsUpdateMessage('Details updated successfully!');
    setTimeout(() => setSkillsUpdateMessage(''), 3000);
  };

  // Tabs array including the new "Student Skills" tab
  const tabs = [
    { id: 'profile', label: 'Profile Details' },
    { id: 'guardian', label: 'Guardian Details' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'documents', label: 'Documents' },
    { id: 'activity', label: 'Account Activity' },
    { id: 'skills', label: 'Student Skills' },
  ];

  // Common styling for modern, appealing inputs & textareas
  const inputClass =
    "mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-150 ease-in-out py-2 px-3";
  // A similar style for disabled/read-only inputs
  const readOnlyInputClass =
    "mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-150 ease-in-out py-2 px-3";

  // Suggestion dropdown styling
  const suggestionDropdownClass =
    "absolute left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-10";
  const suggestionItemClass =
    "cursor-pointer px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-600";


    const courses = [
      { id: 1, title: "Introduction to Web Development", type: "previous" },
      { id: 2, title: "Advanced Next.js", type: "current" },
    ];

    
  const currentCourses = courses.filter((course) => course.type === "current");
  const previousCourses = courses.filter((course) => course.type === "previous");

  return (
    <div
      className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900"
      style={{
        width: '100vw',
        backgroundColor: 'white',
        minHeight: '100vh',
        overflow: 'hidden',
        
      }}
    >
      {/* Header */}
      <div className="flex flex-col space-y-6 w-full">
  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
    Student Profile
  </h1>
  
  <div className="relative w-full">
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex space-x-2 pb-2">
        {tabs.map((tab) => (
          <button
          style={{
            borderRadius: "10px 10px 0px 0px",
          }}
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              whitespace-nowrap px-4 py-2.5  text-sm font-medium
              transition-all duration-200 ease-in-out 
              ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white shadow-lg dark:bg-white dark:text-gray-900'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700" />
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
            style={{
              backgroundImage: profileImg ? `url(${profileImg})` : 'none',
            }}
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
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg  w-full md:w-auto">
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
                  placeholder="Enter your full name"
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
                  placeholder="Enter your email"
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
                  placeholder="Your Masai ID"
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
                  placeholder="Your course name"
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
                  placeholder="Enter your mobile number"
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
                  placeholder="Enter your LinkedIn URL"
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
                  placeholder="Enter your GitHub URL"
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
                    placeholder="Enter guardian's name"
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
                    placeholder="Enter guardian's mobile number"
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
                    placeholder="Enter relationship"
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
                    placeholder="Enter address"
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
                    placeholder="Enter additional info"
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
                    placeholder="Enter guardian's name"
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
                    placeholder="Enter guardian's mobile number"
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
                    placeholder="Enter relationship"
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
                    placeholder="Enter address"
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
                    placeholder="Enter additional info"
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

      {activeTab === 'skills' && (
        <div id="skills" className="tab-content">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Skills, Expertise, Ambitions & Interests
            </h2>
            {/* Skills Section */}
            <div className="mb-6 relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Skills
              </label>
              <div className="flex mt-2 relative">
                <input
                  type="text"
                  placeholder="Enter a skill (e.g., JavaScript)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className={inputClass}
                />
                <button
                  onClick={handleAddSkill}
                  className="ml-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md"
                >
                  Add
                </button>
              </div>
              {/* Suggestion Dropdown for Skills */}
              {filteredSkillSuggestions.length > 0 && (
                <div className={suggestionDropdownClass}>
                  {filteredSkillSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onMouseDown={() => handleSelectSkill(suggestion)}
                      className={suggestionItemClass}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
              {skills.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <li
                      key={index}
                      className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(index)}
                        className="ml-2 text-red-500"
                      >
                        <RiDeleteBinLine className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Expertise Section */}
            <div className="mb-6 relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Expertise Areas
              </label>
              <div className="flex mt-2 relative">
                <input
                  type="text"
                  placeholder="Enter an expertise area (e.g., Front-end)"
                  value={expertiseInput}
                  onChange={(e) => setExpertiseInput(e.target.value)}
                  className={inputClass}
                />
                <button
                  onClick={handleAddExpertise}
                  className="ml-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md"
                >
                  Add
                </button>
              </div>
              {/* Suggestion Dropdown for Expertise */}
              {filteredExpertiseSuggestions.length > 0 && (
                <div className={suggestionDropdownClass}>
                  {filteredExpertiseSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onMouseDown={() => handleSelectExpertise(suggestion)}
                      className={suggestionItemClass}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
              {expertise.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {expertise.map((exp, index) => (
                    <li
                      key={index}
                      className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full"
                    >
                      {exp}
                      <button
                        onClick={() => handleRemoveExpertise(index)}
                        className="ml-2 text-red-500"
                      >
                        <RiDeleteBinLine className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Ambitions Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Ambitions
              </label>
              <textarea
                placeholder="Enter your ambitions here..."
                value={ambitions}
                onChange={(e) => setAmbitions(e.target.value)}
                rows="3"
                className={inputClass}
              ></textarea>
            </div>
            {/* Interests Section */}
            <div className="mb-6 relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Interests
              </label>
              <div className="flex mt-2 relative">
                <input
                  type="text"
                  placeholder="Enter an interest (e.g., Web Development)"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  className={inputClass}
                />
                <button
                  onClick={handleAddInterest}
                  className="ml-2 px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md"
                >
                  Add
                </button>
              </div>
              {/* Suggestion Dropdown for Interests */}
              {filteredInterestSuggestions.length > 0 && (
                <div className={suggestionDropdownClass}>
                  {filteredInterestSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onMouseDown={() => handleSelectInterest(suggestion)}
                      className={suggestionItemClass}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
              {interests.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <li
                      key={index}
                      className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full"
                    >
                      {interest}
                      <button
                        onClick={() => handleRemoveInterest(index)}
                        className="ml-2 text-red-500"
                      >
                        <RiDeleteBinLine className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Update Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSkillsUpdate}
                className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-md"
              >
                Update Details
              </button>
            </div>
            {skillsUpdateMessage && (
              <p className="mt-4 text-green-600">{skillsUpdateMessage}</p>
            )}
          </div>
        </div>
      )}
<br />
<br />
<br />

<div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Courses</h2>
              <div className="mb-4 border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab("current")}
                    className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition ${
                      activeTab === "current"
                        ? "border-black bg-black text-white p-2 rounded-lg m-2"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Current Course
                  </button>
                  <button
                    onClick={() => setActiveTab("previous")}
                    className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm transition ${
                      activeTab === "previous"
                        ? "border-black bg-black text-white p-2 rounded-lg m-2"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Previous Course
                  </button>
                </nav>
              </div>
              <div>
                {activeTab === "current" && (
                  <div className="space-y-4">
                    {currentCourses.length > 0 ? (
                      currentCourses.map((course) => (
                        <div
                          key={course.id}
                          className="p-4 border rounded-lg flex items-center justify-between hover:shadow-md transition transform hover:-translate-y-1"
                        >
                          <p className="font-medium">{course.title}</p>
                          <span className="text-green-500 border border-green-500 px-2 py-1 rounded-full text-xs">
                            Active
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No current courses.</p>
                    )}
                  </div>
                )}
                {activeTab === "previous" && (
                  <div className="space-y-4">
                    {previousCourses.length > 0 ? (
                      previousCourses.map((course) => (
                        <div
                          key={course.id}
                          className="p-4 border rounded-lg opacity-50 flex items-center"
                        >
                          <p className="font-medium">{course.title}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No previous courses.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

    </div>
  );
};

export default StudentProfile;
