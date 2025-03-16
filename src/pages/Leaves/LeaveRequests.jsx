import React, { useState } from "react";
import "../../styles/pages/Leaves.css";
import Dropdown from "../../components/common/DropDown.jsx";  
import Tag from "../../components/common/Tag";  

const LeaveRequests = () => {
  const initialRequests = [
    {
      startDate: "10 Feb 2025",
      endDate: "14 Feb 2025",
      duration: "4 days",
      appDate: "10 Jan 2025",
      aprDate: "1 Feb 2025",
      apManager: "Mohit Singhvi",
      type: "Sick",
      status: "Pending",
    },
    {
      startDate: "10 Feb 2025",
      endDate: "14 Feb 2025",
      duration: "4 days",
      appDate: "10 Jan 2025",
      aprDate: "-",
      apManager: "Mohit Singhvi",
      type: "Unpaid",
      status: "Rejected",
    },
    {
      startDate: "10 Feb 2025",
      endDate: "14 Feb 2025",
      duration: "4 days",
      appDate: "10 Jan 2025",
      aprDate: "1 Feb 2025",
      apManager: "Mohit Singhvi",
      type: "Vacation",
      status: "Accepted",
    },
  ];

  const [requests] = useState(initialRequests);
  const [selectedStatus, setSelectedStatus] = useState("");

  //Fix: Define handleStatusChange function
  const handleStatusChange = (value) => {
    setSelectedStatus(value === "Status" ? "" : value);
  };

  const filteredRequests = selectedStatus === "" ? requests :
    requests.filter((req) => req.status === selectedStatus);

  return (
    <div className="requests-container">
      <div className="table-header">
        <h5>Time off requests summary</h5>
        <Dropdown 
          label="" 
          alt="Status" 
          options={["Status", "Pending", "Accepted", "Rejected"]} 
          onSelect={handleStatusChange} 
        />
      </div>
    <div className="table-wrap">
      <table className="leaves-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Duration</th>
            <th>Applied Date</th>
            <th>Approved Date</th>
            <th>Approving Manager</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length === 0 ? (
            <tr>
              <td colSpan="9" className="no-data">No leave requests found</td>
            </tr>
          ) : (
            filteredRequests.map((req, index) => (
              <tr key={index}>
                <td>{req.type}</td>
                <td>{req.startDate}</td>
                <td>{req.endDate}</td>
                <td>{req.duration}</td>
                <td>{req.appDate}</td>
                <td>{req.aprDate}</td>
                <td>{req.apManager}</td>
                <td>
                  <Tag text={req.status} className={req.status.toLowerCase()} />
                </td>
                <td className="actions">
                  <button className="action-btn">
                    <span className="dots">⋮</span>
                  </button>
                </td>
              </tr>
              ))
            )}
          </tbody>  
        </table>
      </div>
    </div>
  );
};

export default LeaveRequests;
