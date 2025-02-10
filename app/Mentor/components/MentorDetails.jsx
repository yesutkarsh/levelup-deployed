import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const InputField = ({ label, value, name, editMode, onChange }) => (
  <motion.div
    className="flex flex-col gap-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <label className="text-sm font-medium text-gray-600">{label}</label>
    {editMode ? (
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
      />
    ) : (
      <p className="px-4 py-2 text-gray-900 bg-gray-50 rounded-lg">{value}</p>
    )}
  </motion.div>
);

const SkillTag = ({ skill, onRemove, editMode }) => (
  <motion.span
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
  >
    {skill}
    {editMode && (
      <button
        onClick={onRemove}
        className="text-blue-600 hover:text-blue-800 transition-colors"
      >
        ×
      </button>
    )}
  </motion.span>
);

export default function MentorDetails() {
  const [editMode, setEditMode] = useState(false);
  const [mentorDetails, setMentorDetails] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    resume: "resume.pdf",
    skills: ["JavaScript", "React", "Next.js"],
    qualification: "MSc Computer Science",
  });
  const [newSkill, setNewSkill] = useState("");
  const fileInputRef = useRef(null);

  // Unified change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMentorDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillAdd = () => {
    if (newSkill.trim()) {
      setMentorDetails(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const handleSkillRemove = (index) => {
    setMentorDetails(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMentorDetails(prev => ({ ...prev, resume: file.name }));
    }
  };

  const handleSave = () => {
    setEditMode(false);
    // Here you would typically integrate with your API
    console.log("Saving data:", mentorDetails);
  };

  return (
    <div className=" bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mentor Profile</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={editMode ? handleSave : () => setEditMode(true)}
            className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            {editMode ? "Save Changes" : "Edit Profile"}
          </motion.button>
        </div>

        <div className="space-y-6">
          <InputField
            label="Full Name"
            name="name"
            value={mentorDetails.name}
            editMode={editMode}
            onChange={handleChange}
          />

          <InputField
            label="Email Address"
            name="email"
            value={mentorDetails.email}
            editMode={editMode}
            onChange={handleChange}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Resume</label>
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 text-gray-900 bg-gray-50 rounded-lg">
                {mentorDetails.resume}
              </span>
              {editMode && (
                <motion.label
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
                >
                  Upload New
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </motion.label>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Skills</label>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {mentorDetails.skills.map((skill, index) => (
                  <SkillTag
                    key={index}
                    skill={skill}
                    onRemove={() => handleSkillRemove(index)}
                    editMode={editMode}
                  />
                ))}
              </AnimatePresence>
            </div>
            {editMode && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2 mt-2"
              >
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add new skill"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSkillAdd}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add
                </motion.button>
              </motion.div>
            )}
          </div>

          <InputField
            label="Qualification"
            name="qualification"
            value={mentorDetails.qualification}
            editMode={editMode}
            onChange={handleChange}
          />
        </div>
      </motion.div>
    </div>
  );
}