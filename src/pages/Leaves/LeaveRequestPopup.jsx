import React, { useState } from "react";
import "../../styles/components/PopUp.css";

const LeaveRequestPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    file: null, 
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    setFormData({
      ...formData,
      file: file, 
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Leave Request Submitted:", formData);

    if (formData.file) {
      console.log("File to upload:", formData.file);
    }

    onClose(); 
  };
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Leave Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Leave Type</label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              required
            >
              <option value="">Select Leave Type</option>
              <option value="sick">Sick Leave</option>
              <option value="vacation">Vacation Leave</option>
              <option value="personal">Personal Leave</option>
            </select>
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Supporting Documents</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.png" 
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LeaveRequestPopup;