import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Button from "../../components/common/Button";
import EmployeeForm from "../../components/forms/EmployeeForm";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import EmployeeUpdateModal from "../../components/modals/EmployeeUpdateModal";
import {
  createEmployee,
  getAllEmployees,
  updateEmployeeStatus,
} from "../../services/employeeService";
import "../../styles/pages/EmployeeManagement.css";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [activeTab, setActiveTab] = useState("VIEW EMPLOYEES LIST");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [authToken, setAuthToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) setAuthToken(storedToken);
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await getAllEmployees(authToken);
      setEmployees(res.employees);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddEmployee = async (formData) => {
    try {
      await createEmployee(formData, authToken);
      alert("Employee successfully added!");
      fetchEmployees();
      setActiveTab("VIEW EMPLOYEES LIST");
    } catch (error) {
      alert("Error adding employee.");
    }
  };

  const handleEditClick = (empId) => {
    setSelectedEmployeeId(empId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployeeId(null);
  };

  const handleDeactivateEmployee = async (empId) => {
    try {
      await updateEmployeeStatus(empId, authToken);
      fetchEmployees();
    } catch (error) {
      alert("Error updating employee status.");
    }
  };

  const filteredEmployees = employees.filter((emp) =>
    `${emp.empId} ${emp.firstName} ${emp.middleName} ${emp.lastName} ${emp.email}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const exportToExcel = () => {
    if (employees.length === 0) {
      alert("No employees to export.");
      return;
    }

    const employeeData = employees.map((emp) => ({
      "Emp ID": emp.empId,
      Name: `${emp.firstName} ${emp.middleName || ""} ${emp.lastName}`,
      Email: emp.email,
      "Work Email": emp.workMail,
      Gender: emp.gender,
      "Employment Type": emp.employmentType,
      Status: emp.status,
      "Contact Number": emp.contactNumber,
      "Date of Join": emp.dateOfJoin
        ? new Date(emp.dateOfJoin).toLocaleDateString()
        : "N/A",
      "Work Location": emp.workLocation,
    }));

    const worksheet = XLSX.utils.json_to_sheet(employeeData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    XLSX.writeFile(workbook, "EmployeeList.xlsx");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Header />
      <div className="container employee-management">
        {/* Navigation Tabs */}
        <ul className="nav nav-tabs mb-3">
          {[
            "VIEW EMPLOYEES LIST",
            "ADD NEW EMPLOYEE",
            "UPDATE EMPLOYEE",
            "DEACTIVATE EMPLOYEE",
          ].map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(tab);
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* Search Bar & Export Button */}
        {activeTab === "VIEW EMPLOYEES LIST" && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Search employees..."
              className="form-control search-input"
              value={searchQuery}
              onChange={handleSearch}
            />
            <Button
              text="Export to Excel"
              className="btn-export"
              onClick={exportToExcel}
            />
          </div>
        )}

        <table
          className="table table-striped table-hover"
          aria-label="View employees list"
        >
          <caption className="visually-hidden">
            List of all employees currently in the system
          </caption>
          <thead>
            <tr>
              <th scope="col">EmpID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Designation</th>
              <th scope="col">EmpType</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.empId}>
                <td>{emp.empId}</td>
                <td>{`${emp.firstName} ${emp.middleName || ""} ${
                  emp.lastName
                }`}</td>
                <td>{emp.workMail}</td>
                <td>{emp.gender}</td>
                <td>{emp.designations}</td>
                <td>{emp.employmentType}</td>
                <td>{emp.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ADD Employee - Uses Reusable Component */}
        {activeTab === "ADD NEW EMPLOYEE" && (
          <div className="form-container">
            <EmployeeForm onSubmit={handleAddEmployee} />
          </div>
        )}

        <table
          className="table table-striped table-hover"
          aria-label="Update employees information"
        >
          <caption className="visually-hidden">
            List of employees available for updates
          </caption>
          <thead>
            <tr>
              <th scope="col">EmpID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Designation</th>
              <th scope="col">EmpType</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.empId}>
                <td>{emp.empId}</td>
                <td>{`${emp.firstName} ${emp.middleName || ""} ${
                  emp.lastName
                }`}</td>
                <td>{emp.workMail}</td>
                <td>{emp.gender}</td>
                <td>{emp.designations}</td>
                <td>{emp.employmentType}</td>
                <td>{emp.status}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEditClick(emp.empId)}
                    aria-label={`Edit employee ${emp.firstName} ${emp.lastName}`}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <EmployeeUpdateModal
          show={isModalOpen}
          onClose={handleCloseModal}
          empId={selectedEmployeeId}
          authToken={authToken}
          onUpdate={fetchEmployees}
        />

        <table
          className="table table-bordered"
          aria-label="Deactivate or reactivate employees"
        >
          <caption className="visually-hidden">
            Toggle active status of employees
          </caption>
          <thead className="table-danger">
            <tr>
              <th scope="col">Emp ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Designation</th>
              <th scope="col">Emp Type</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.empId}>
                <td>{emp.empId}</td>
                <td>{`${emp.firstName} ${emp.middleName || ""} ${
                  emp.lastName
                }`}</td>
                <td>{emp.email}</td>
                <td>{emp.gender}</td>
                <td>{emp.designations}</td>
                <td>{emp.employmentType}</td>
                <td
                  className={
                    emp.status === "active" ? "text-success" : "text-danger"
                  }
                >
                  {emp.status}
                </td>
                <td>
                  <button
                    className={`btn ${
                      emp.status === "active" ? "btn-danger" : "btn-success"
                    } btn-sm`}
                    onClick={() => handleDeactivateEmployee(emp.empId)}
                    aria-label={`${
                      emp.status === "active" ? "Deactivate" : "Activate"
                    } employee ${emp.firstName} ${emp.lastName}`}
                  >
                    {emp.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default EmployeeManagement;
