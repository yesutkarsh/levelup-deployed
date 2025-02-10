"use client";

import { useState } from "react";
import { useSchedule } from "./ScheduleContext";

export default function AvailabilityOverview() {
  const { schedule, setSchedule } = useSchedule();
  const [openPopover, setOpenPopover] = useState(null);
  const [editData, setEditData] = useState(null);
  const [reassignStudent, setReassignStudent] = useState("");

  const togglePopover = (index, type) => {
    setEditData(
      type === "edit" ? { ...schedule[index], index } : schedule[index]
    );
    setOpenPopover(type);
  };

  const closePopover = () => {
    setOpenPopover(null);
    setEditData(null);
  };

  const updateSlotStatus = (index, newStatus, student = "-") => {
    setSchedule((prev) => {
      const newSchedule = [...prev];

      let statusColor;
      if (newStatus === "Booked") {
        statusColor = "text-[#f00] bg-blue-100"; // Blue for booked slots
      } else if (newStatus === "Blocked") {
        statusColor = "text-gray-700 bg-gray-200"; // Gray for blocked slots
      } else if (newStatus === "Available") {
        statusColor = "text-green-700 bg-green-100"; // Green for available slots
      }

      newSchedule[index] = {
        ...newSchedule[index],
        status: newStatus,
        student,
        statusColor,
      };

      return newSchedule;
    });
  };

  const handleEditSave = () => {
    if (!editData) return;
    setSchedule((prev) => {
      const newSchedule = [...prev];
      newSchedule[editData.index] = {
        ...newSchedule[editData.index],
        time: editData.time,
        student: editData.student,
        status: editData.status,
      };
      return newSchedule;
    });
    closePopover();
  };

  const deleteSlot = (index) => {
    setSchedule((prev) => prev.filter((_, i) => i !== index));
    closePopover();
  };

  const handleReassign = () => {
    if (editData && reassignStudent) {
      updateSlotStatus(editData.index, "Booked", reassignStudent);
      setReassignStudent("");
      closePopover();
    }
  };

  const toggleBlock = (index) => {
    setSchedule((prev) => {
      const newSchedule = [...prev];
      const isBlocked = newSchedule[index].status === "Blocked";
      newSchedule[index] = {
        ...newSchedule[index],
        status: isBlocked ? "Available" : "Blocked",
        student: isBlocked ? "-" : "N/A",
        statusColor: isBlocked
          ? "text-green-700 bg-green-100"
          : "text-gray-700 bg-gray-200",
      };
      return newSchedule;
    });
  };

  const actions = [
    {
      icon: "fas fa-eye",
      title: "View",
      onClick: (index) => togglePopover(index, "view"),
    },
    {
      icon: "fas fa-edit",
      title: "Edit",
      onClick: (index) => togglePopover(index, "edit"),
    },
    {
      icon: "fas fa-trash",
      title: "Delete",
      onClick: (index) => deleteSlot(index),
    },
    {
      icon: "fas fa-exchange-alt",
      title: "Reassign",
      onClick: (index) => togglePopover(index, "reassign"),
    },
  ];

  // Include original index when grouping
  const groupedByDay = schedule.reduce((acc, slot, originalIndex) => {
    if (!acc[slot.day]) acc[slot.day] = [];
    acc[slot.day].push({ ...slot, originalIndex });
    return acc;
  }, {});

  return (
    <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Availability Overview
      </h2>
      <div className="space-y-8">
        {Object.keys(groupedByDay).map((day) => (
          <div key={day}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{day}</h3>
            {groupedByDay[day].map((slot, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between p-4 mb-4 bg-gray-100 rounded-lg">
                  <span className="text-gray-900">{slot.time}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${slot.statusColor}`}
                  >
                    {slot.status}
                  </span>
                  <span className="text-gray-700">{slot.student || "-"}</span>
                  <div className="flex gap-4">
                    {actions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => action.onClick(slot.originalIndex)}
                        className="text-gray-500 hover:text-gray-700"
                        title={action.title}
                      >
                        <i className={action.icon}></i> {action.title}
                      </button>
                    ))}
                    <button
                      onClick={() => toggleBlock(slot.originalIndex)}
                      className="text-gray-500 hover:text-gray-700"
                      title={slot.status === "Blocked" ? "Unblock" : "Block"}
                    >
                      <i
                        className={
                          slot.status === "Blocked"
                            ? "fas fa-unlock"
                            : "fas fa-ban"
                        }
                      ></i>
                      {slot.status === "Blocked" ? "Unblock" : "Block"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Large Centered Popover */}
      {openPopover && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {openPopover === "edit"
                ? "Edit Slot"
                : openPopover === "reassign"
                ? "Reassign Slot"
                : "Slot Details"}
            </h3>

            {openPopover === "view" && editData && (
              <>
                <p className="text-sm text-gray-700">
                  <strong>Time:</strong> {editData.time}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Status:</strong> {editData.status}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Student:</strong> {editData.student}
                </p>
              </>
            )}

            {openPopover === "edit" && editData && (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Time:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  value={editData.time}
                  onChange={(e) =>
                    setEditData({ ...editData, time: e.target.value })
                  }
                />

                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Student:
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded mt-1"
                  value={editData.student}
                  onChange={(e) =>
                    setEditData({ ...editData, student: e.target.value })
                  }
                />

                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Status:
                </label>
                <select
                  className="w-full p-2 border rounded mt-1"
                  value={editData.status}
                  onChange={(e) =>
                    setEditData({ ...editData, status: e.target.value })
                  }
                >
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                  <option value="Blocked">Blocked</option>
                </select>

                <button
                  onClick={handleEditSave}
                  className="mt-4 w-full bg-[#000] text-white py-2 rounded"
                >
                  Save Changes
                </button>
              </>
            )}

            {openPopover === "reassign" && (
              <>
                <label className="block text-sm font-medium text-gray-700">
                  Select New Student:
                </label>
                <select
                  className="w-full p-2 border rounded mt-1"
                  value={reassignStudent}
                  onChange={(e) => setReassignStudent(e.target.value)}
                >
                  <option value="">Select a mentor</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Alice Johnson">Alice Johnson</option>
                </select>

                <button
                  onClick={handleReassign}
                  className="mt-4 w-full bg-[#000] text-white py-2 rounded"
                  disabled={!reassignStudent}
                >
                  Reassign
                </button>
              </>
            )}

            <div className="flex justify-end gap-4 mt-4">
              {openPopover === "edit" && (
                <button
                  onClick={() => deleteSlot(editData.index)}
                  className="text-red-600"
                >
                  Delete Slot
                </button>
              )}
              <button onClick={closePopover} className="text-gray-700">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
