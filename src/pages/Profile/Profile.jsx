import React, { useState, useEffect } from "react";
import {
  FaBuilding,
  FaCheck,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaTimes,
  FaVenusMars,
} from "react-icons/fa";
import profile from "../../assets/icons/profile.jpg";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import {
  getEmployeeById,
  updateEmployee,
} from "../../services/employeeService";
import "../../styles/pages/Profile.css";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";

const Profile = () => {
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState({});
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      const empId = localStorage.getItem("empId");
      if (!empId) return;
      try {
        const response = await getEmployeeById(empId);
        if (response && response.employee) {
          setEmployee(response.employee);
          setUpdatedData(response.employee);
        }
      } catch (error) {
        console.error("Failed to fetch employee data:", error);
      }
    };
    fetchEmployee();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (section) => {
    setIsEditing({ ...isEditing, [section]: true });
  };

  const handleCancel = (section) => {
    setUpdatedData(employee);
    setIsEditing({ ...isEditing, [section]: false });
  };

  const handleSave = async (section) => {
    try {
      await updateEmployee(employee.empId, updatedData);
      setEmployee(updatedData);
      setIsEditing({ ...isEditing, [section]: false });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!employee) return <LoadingSpinner message="Loading profile..." />;

  return (
    <>
      <Header />
      <div className="profile-container">
        {/* Left Profile Section */}
        <div className="profile-sidebar">
          <div className="profile-image-container">
            <img
              src={profile || employee.imageFolder}
              alt="Profile"
              className="profile-image"
            />
            <FaEdit className="edit-icon" aria-label="Edit Profile Image" />
          </div>
          <h3>
            {employee.firstName} {employee.lastName}
          </h3>
          <span className="designation">{employee.designations}</span>

          <div className="basic-info">
            <p>
              <FaEnvelope /> {employee.workMail}
            </p>
            <p>
              <FaPhone /> {employee.contactNumber}
            </p>
            <p>
              <FaVenusMars /> {employee.gender}
            </p>
            <p>
              <FaBuilding /> {employee.departmentId}
            </p>
          </div>
        </div>

        {/* Right Profile Sections */}
        <div className="profile-content">
          <h2 className="profile-title">Profile Details</h2>

          {/* Personal Information */}
          <div className="card">
            <div className="card-header">
              <span>Personal Information</span>
              <FaEdit
                onClick={() => handleEdit("personal")}
                aria-label="Edit Personal Information"
              />
            </div>
            <div className="info-row">
              <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={updatedData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing.personal}
                  aria-label="First Name"
                />
              </div>
              <div>
                <label htmlFor="middleName">Middle Name:</label>
                <input
                  type="text"
                  name="middleName"
                  value={updatedData.middleName}
                  onChange={handleInputChange}
                  disabled={!isEditing.personal}
                  aria-label="Middle Name"
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={updatedData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing.personal}
                  aria-label="Last Name"
                />
              </div>
              <div>
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={updatedData.dateOfBirth.split("T")[0]}
                  onChange={handleInputChange}
                  disabled={!isEditing.personal}
                  aria-label="Date of Birth"
                />
              </div>
              <div>
                <label htmlFor="gender">Gender:</label>
                <input
                  type="text"
                  name="gender"
                  value={updatedData.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing.personal}
                  aria-label="Gender"
                />
              </div>
              <div>
                <label htmlFor="contactNumber">Contact Number:</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={updatedData.contactNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing.personal}
                  aria-label="Contact Number"
                />
              </div>
              <div>
                <label htmlFor="email">Personal Email:</label>
                <input
                  type="text"
                  name="email"
                  value={updatedData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing.personal}
                  aria-label="Personal Email"
                />
              </div>
              <div>
                <label htmlFor="maritalStatus">Marital Status:</label>
                <input
                  type="text"
                  name="maritalStatus"
                  value={updatedData.maritalStatus}
                  onChange={handleInputChange}
                  disabled={!isEditing.personal}
                  aria-label="Marital Status"
                />
              </div>
            </div>
            {isEditing.personal && (
              <div className="button-group">
                <button
                  className="btn btn-save"
                  onClick={() => handleSave("personal")}
                  aria-label="Save Personal Info"
                >
                  <FaCheck /> Save
                </button>
                <button
                  className="btn btn-cancel"
                  onClick={() => handleCancel("personal")}
                  aria-label="Cancel Personal Info"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>

          {/* Work Information */}
          <div className="card">
            <div className="card-header">
              <span>Work Information</span>
              <FaEdit
                onClick={() => handleEdit("work")}
                aria-label="Edit Work Information"
              />
            </div>
            <div className="info-row">
              <div>
                <label htmlFor="empId">Employee ID:</label>
                <input
                  type="text"
                  name="empId"
                  value={employee.empId}
                  disabled
                  aria-label="Employee ID"
                />
              </div>
              <div>
                <label htmlFor="employmentType">Employment Type:</label>
                <input
                  type="text"
                  name="employmentType"
                  value={employee.employmentType}
                  disabled
                  aria-label="Employment Type"
                />
              </div>
              <div>
                <label htmlFor="workMail">Work Mail:</label>
                <input
                  type="text"
                  name="workMail"
                  value={employee.workMail}
                  disabled
                  aria-label="Work Mail"
                />
              </div>
              <div>
                <label htmlFor="departmentId">Department:</label>
                <input
                  type="text"
                  name="departmentId"
                  value={updatedData.departmentId}
                  onChange={handleInputChange}
                  disabled={!isEditing.work}
                  aria-label="Department ID"
                />
              </div>
              <div>
                <label htmlFor="workLocation">Work Location:</label>
                <input
                  type="text"
                  name="workLocation"
                  value={updatedData.workLocation}
                  onChange={handleInputChange}
                  disabled={!isEditing.work}
                  aria-label="Work Location"
                />
              </div>
              <div>
                <label htmlFor="status">Employment Status:</label>
                <input
                  type="text"
                  name="status"
                  value={updatedData.status}
                  disabled
                  aria-label="Employment Status"
                />
              </div>
            </div>
            {isEditing.work && (
              <div className="button-group">
                <button
                  className="btn btn-save"
                  onClick={() => handleSave("work")}
                  aria-label="Save Work Info"
                >
                  <FaCheck /> Save
                </button>
                <button
                  className="btn btn-cancel"
                  onClick={() => handleCancel("work")}
                  aria-label="Cancel Work Info"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>

          {/* Banking Information */}
          <div className="card">
            <div className="card-header">
              <span>Banking Details</span>
              <FaEdit
                onClick={() => handleEdit("banking")}
                aria-label="Edit Banking Details"
              />
            </div>
            <div className="info-row">
              <div>
                <label htmlFor="bankName">Bank Name:</label>
                <input
                  type="text"
                  value={employee.bankName}
                  disabled
                  aria-label="Bank Name"
                />
              </div>
              <div>
                <label htmlFor="accountNumber">Account Number:</label>
                <input
                  type="text"
                  value={employee.accountNumber}
                  disabled
                  aria-label="Account Number"
                />
              </div>
              <div>
                <label htmlFor="transitNumber">Transit Number:</label>
                <input
                  type="text"
                  value={employee.transitNumber}
                  disabled
                  aria-label="Transit Number"
                />
              </div>
              <div>
                <label htmlFor="institutionNumber">Institution Number:</label>
                <input
                  type="text"
                  value={employee.institutionNumber}
                  disabled
                  aria-label="Institution Number"
                />
              </div>
              <div>
                <label htmlFor="interacId">Interac ID:</label>
                <input
                  type="text"
                  value={employee.interacId}
                  disabled
                  aria-label="Interac ID"
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="card">
            <div className="card-header">
              <span>Emergency Contact</span>
              <FaEdit
                onClick={() => handleEdit("emergency")}
                aria-label="Edit Emergency Contact"
              />
            </div>
            <div className="info-row">
              <div>
                <label htmlFor="emergencyContactName">Full Name:</label>
                <input
                  type="text"
                  value={employee.emergencyContactName}
                  disabled
                  aria-label="Emergency Contact Name"
                />
              </div>
              <div>
                <label htmlFor="emergencyContactNumber">Contact Number:</label>
                <input
                  type="text"
                  value={employee.emergencyContactNumber}
                  disabled
                  aria-label="Emergency Contact Number"
                />
              </div>
              <div>
                <label htmlFor="emergencyContactRelation">Relationship:</label>
                <input
                  type="text"
                  value={employee.emergencyContactRelation}
                  disabled
                  aria-label="Emergency Contact Relationship"
                />
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="card">
            <div className="card-header">
              <span>Health Information</span>
              <FaEdit
                onClick={() => handleEdit("health")}
                aria-label="Edit Health Information"
              />
            </div>
            <div className="info-row">
              <div>
                <label htmlFor="healthCardNo">Health Card No:</label>
                <input
                  type="text"
                  name="healthCardNo"
                  value={updatedData.healthCardNo}
                  onChange={handleInputChange}
                  disabled={!isEditing.health}
                  aria-label="Health Card Number"
                />
              </div>
              <div>
                <label htmlFor="practitionerClinicName">
                  Practitioner Clinic:
                </label>
                <input
                  type="text"
                  name="practitionerClinicName"
                  value={updatedData.practitionerClinicName}
                  onChange={handleInputChange}
                  disabled={!isEditing.health}
                  aria-label="Practitioner Clinic"
                />
              </div>
              <div>
                <label htmlFor="practitionerName">Practitioner Name:</label>
                <input
                  type="text"
                  name="practitionerName"
                  value={updatedData.practitionerName}
                  onChange={handleInputChange}
                  disabled={!isEditing.health}
                  aria-label="Practitioner Name"
                />
              </div>
              <div>
                <label htmlFor="familyPractitionerName">
                  Family Practitioner Name:
                </label>
                <input
                  type="text"
                  name="familyPractitionerName"
                  value={updatedData.familyPractitionerName}
                  onChange={handleInputChange}
                  disabled={!isEditing.health}
                  aria-label="Family Practitioner Name"
                />
              </div>
            </div>
          </div>

          {/* Other Information */}
          <div className="card">
            <div className="card-header">
              <span>Other Information</span>
              <FaEdit
                onClick={() => handleEdit("others")}
                aria-label="Edit Other Information"
              />
            </div>
            <div className="info-row">
              <div>
                <label htmlFor="workPermitDetails">Work Permit ID:</label>
                <input
                  type="text"
                  name="workPermitDetails"
                  value={employee.workPermitDetails}
                  onChange={handleInputChange}
                  disabled={!isEditing.others}
                  aria-label="Work Permit ID"
                />
              </div>
              <div>
                <label htmlFor="prDetails">PR Card Number:</label>
                <input
                  type="text"
                  name="prDetails"
                  value={employee.prDetails}
                  onChange={handleInputChange}
                  disabled={!isEditing.others}
                  aria-label="PR Card Number"
                />
              </div>
              <div>
                <label htmlFor="sin">SIN:</label>
                <input
                  type="text"
                  name="sin"
                  value={employee.sin}
                  onChange={handleInputChange}
                  disabled={!isEditing.others}
                  aria-label="SIN"
                />
              </div>
              <div>
                <label htmlFor="citizenshipId">Citizenship ID:</label>
                <input
                  type="text"
                  name="citizenshipId"
                  value={employee.citizenshipId}
                  onChange={handleInputChange}
                  disabled={!isEditing.others}
                  aria-label="Citizenship ID"
                />
              </div>
              <div>
                <label htmlFor="taxCode">Tax Code:</label>
                <input
                  type="text"
                  name="taxCode"
                  value={employee.taxCode}
                  onChange={handleInputChange}
                  disabled={!isEditing.others}
                  aria-label="Tax Code"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
