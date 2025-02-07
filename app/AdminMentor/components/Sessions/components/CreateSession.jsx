"use client";

import React, { useState } from "react";

const CreateSession = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    batch: "",
    subject: "",
    date: "",
    time: "",
    duration: 45,
    teacher: "",
    location: "",
    sessionNotes: "",
    resources: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "resources") {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Data:", formData);
      // You can add your form submission logic here
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        {/* <SideBar /> */}

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          {/* <Header /> */}

          {/* Main Form */}
          <main className="p-8">
            <h1>Create Session</h1>
            <div className="mt-0 w-full">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm w-full max-w-5xl mx-auto">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-6">
                    {/* Course Name */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Course Name</label>
                      <input
                        type="text"
                        name="courseName"
                        placeholder="Enter course name"
                        className={`mt-1 block w-full rounded-md border ${
                          errors.courseName ? "border-red-500" : "border-gray-300"
                        } p-2 shadow-sm focus:border-custom focus:ring-custom`}
                        onChange={handleChange}
                      />
                      {errors.courseName && <p className="text-red-500 text-sm mt-1">{errors.courseName}</p>}
                    </div>

                    {/* Batch */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Batch</label>
                      <select
                        name="batch"
                        className={`mt-1 block w-full rounded-md border ${
                          errors.batch ? "border-red-500" : "border-gray-300"
                        } p-2 shadow-sm focus:border-custom focus:ring-custom`}
                        onChange={handleChange}
                      >
                        <option value="">Select Batch</option>
                        <option>2024 Spring Semester - Advanced Mathematics</option>
                        <option>2024 Spring Semester - Basic Mathematics</option>
                      </select>
                      {errors.batch && <p className="text-red-500 text-sm mt-1">{errors.batch}</p>}
                    </div>

                    {/* Subject */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">Subject</label>
                      <select
                        name="subject"
                        className={`mt-1 block w-full rounded-md border ${
                          errors.subject ? "border-red-500" : "border-gray-300"
                        } p-2 shadow-sm focus:border-custom focus:ring-custom`}
                        onChange={handleChange}
                      >
                        <option value="">Select Subject</option>
                        <option>Mathematics</option>
                        <option>Physics</option>
                      </select>
                      {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                    </div>

                    {/* Date */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">Date</label>
                      <input
                        type="date"
                        name="date"
                        className={`mt-1 block w-full rounded-md border ${
                          errors.date ? "border-red-500" : "border-gray-300"
                        } p-2 shadow-sm focus:border-custom focus:ring-custom`}
                        onChange={handleChange}
                      />
                      {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                    </div>

                    {/* Time */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">Time</label>
                      <input
                        type="time"
                        name="time"
                        className={`mt-1 block w-full rounded-md border ${
                          errors.time ? "border-red-500" : "border-gray-300"
                        } p-2 shadow-sm focus:border-custom focus:ring-custom`}
                        onChange={handleChange}
                      />
                      {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                    </div>

                    {/* Duration */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                      <input
                        type="number"
                        name="duration"
                        className={`mt-1 block w-full rounded-md border ${
                          errors.duration ? "border-red-500" : "border-gray-300"
                        } p-2 shadow-sm focus:border-custom focus:ring-custom`}
                        defaultValue="45"
                        onChange={handleChange}
                      />
                      {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
                    </div>

                    {/* Teacher */}
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">Teacher</label>
                      <select
                        name="teacher"
                        className={`mt-1 block w-full rounded-md border ${
                          errors.teacher ? "border-red-500" : "border-gray-300"
                        } p-2 shadow-sm focus:border-custom focus:ring-custom`}
                        onChange={handleChange}
                      >
                        <option value="">Select Teacher</option>
                        <option>Dr. John Smith</option>
                        <option>Dr. Sarah Wilson</option>
                      </select>
                      {errors.teacher && <p className="text-red-500 text-sm mt-1">{errors.teacher}</p>}
                    </div>

                    {/* Location */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <select
                        name="location"
                        className={`mt-1 block w-full rounded-md border ${
                          errors.location ? "border-red-500" : "border-gray-300"
                        } p-2 shadow-sm focus:border-custom focus:ring-custom`}
                        onChange={handleChange}
                      >
                        <option value="">Select Location</option>
                        <option>Online (Zoom Meeting)</option>
                        <option>Classroom A1</option>
                        <option>Study Hall</option>
                      </select>
                      {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                    </div>

                    {/* Session Notes */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Session Notes</label>
                      <textarea
                        rows="4"
                        name="sessionNotes"
                        className={`mt-1 block w-full rounded-md border ${
                          errors.sessionNotes ? "border-red-500" : "border-gray-300"
                        } p-2 shadow-sm focus:border-custom focus:ring-custom`}
                        placeholder="Enter session notes here..."
                        onChange={handleChange}
                      />
                      {errors.sessionNotes && <p className="text-red-500 text-sm mt-1">{errors.sessionNotes}</p>}
                    </div>

                    {/* Upload Resources */}
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Upload Resources</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer rounded-md font-medium text-custom hover:text-custom/90">
                              <span>Upload a file</span>
                              <input type="file" name="resources" className="sr-only" onChange={handleChange} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PDF, PPTX, DOCX up to 10MB</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Buttons */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button type="button" className="!rounded-button px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100">
                      Cancel
                    </button>
                    <button type="submit" className="!rounded-button px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-custom/90">
                      Create Session
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreateSession;