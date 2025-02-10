// app/student-profile/page.jsx
'use client';
import { useState, useEffect } from 'react';

export default function StudentProfile() {
  // User details
  const [name, setName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  
  // Courses data
  const [coursesList, setCoursesList] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  
  // Skills input state
  const [skills, setSkills] = useState('');
  const [skillChips, setSkillChips] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    const cookieString = document.cookie;
    const match = cookieString.match(new RegExp('(^| )userDetails=([^;]+)'));
    if (match) {
      try {
        const userDetails = JSON.parse(decodeURIComponent(match[2]));
        setName(userDetails.name || '');
      } catch (error) {
        console.error('Failed to parse userDetails cookie', error);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/courses/all');
        const data = await res.json();
        if (res.ok && data.success) {
          setCoursesList(data.data);
        } else {
          console.error('Failed to fetch courses:', data.message);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    setSkills(skillChips.join(','));
  }, [skillChips]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
    const payload = { 
      studentCode, 
      currentCourses: selectedCourses, 
      skills: skillsArray 
    };

    try {
      const res = await fetch('/api/student/profilesetup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.error || 'Update failed');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred');
    }
  };

  const handleSkillInputChange = (e) => {
    const { value } = e.target;
    if (value.includes(',')) {
      const parts = value.split(',');
      const newChip = parts[0].trim();
      if (newChip) {
        setSkillChips(prev => [...prev, newChip]);
      }
      setSkillInput(parts.slice(1).join(',').trim());
    } else {
      setSkillInput(value);
    }
  };

  const handleSkillInputKeyDown = (e) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      const trimmed = skillInput.trim();
      if (trimmed) {
        setSkillChips(prev => [...prev, trimmed]);
        setSkillInput('');
      }
    } else if (e.key === 'Backspace' && skillInput === '' && skillChips.length > 0) {
      e.preventDefault();
      setSkillChips(prev => prev.slice(0, -1));
    }
  };

  const toggleCourse = (courseId) => {
    setSelectedCourses(prev => 
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const removeChip = (index) => {
    setSkillChips(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#e2eafb] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8 transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-black bg-clip-text ">
          Student Profile Setup
        </h2>
        
        {message && (
          <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-700 animate-fade-in">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                value={name}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Student Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Code
              </label>
              <input
                value={studentCode}
                onChange={(e) => setStudentCode(e.target.value)}
                placeholder="Enter your student code"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Course Selection Grid */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Courses
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {coursesList.map((course) => (
                  <div
                    key={course._id}
                    onClick={() => toggleCourse(course._id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedCourses.includes(course._id)
                        ? 'border-black-500 bg-e2eafb-50 scale-[98%]'
                        : 'border-gray-200 hover: hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center 
                        ${selectedCourses.includes(course._id) ? 'border-purple-600 bg-purple-600' : 'border-gray-300'}`}
                      >
                        {selectedCourses.includes(course._id) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{course.courseName}</h3>
                        <p className="text-sm text-gray-500">{course._id}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills
              </label>
              <div className={`p-2 border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-blue-500 ${
                skillChips.length > 0 ? 'space-y-2' : ''
              }`}>
                <div className="flex flex-wrap gap-2">
                  {skillChips.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeChip(index)}
                        className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <input
                    value={skillInput}
                    onChange={handleSkillInputChange}
                    onKeyDown={handleSkillInputKeyDown}
                    placeholder="Type skills and press comma"
                    className="flex-1 min-w-[120px] px-2 py-1 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-black hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}