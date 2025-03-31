import React, { useEffect, useState } from "react";
import {
  FaChartLine,
  FaCog,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaProjectDiagram,
  FaUmbrellaBeach,
  FaUser,
  FaUserTie,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Approvals from "../../assets/images/Approvals.png";
import Leaves from "../../assets/images/Leaves.png";
import MyProfile from "../../assets/images/myprofile.jpg";
import Onboarding from "../../assets/images/Onboarding.jpg";
import Payroll from "../../assets/images/Payroll.jpg";
import Performance from "../../assets/images/Performance.png";
import Project from "../../assets/images/project.jpg";
import Settings from "../../assets/images/Settings.png";
import Timesheets from "../../assets/images/Timesheets.png";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import { logout } from "../../services/authService";
import { getEmployeeById } from "../../services/employeeService";
import "../../styles/pages/Dashboard.css";
import LoadingSpinner from "../../components/common/LoadingSpinner.jsx";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const empId = localStorage.getItem("empId");
        if (!empId) throw new Error("Employee ID missing");

        const employeeData = await getEmployeeById(empId);
        if (!employeeData || !employeeData.employee)
          throw new Error("User not authenticated");
        setEmployee(employeeData.employee);
      } catch (error) {
        console.error("User not authenticated, redirecting...");
        localStorage.clear();
        sessionStorage.clear();
        navigate("/login");
      }
    };

    fetchEmployee();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  if (!employee) return <LoadingSpinner />;

  const menuItems = [
    { name: "My Profile", path: "/profile", icon: <FaUser /> },
    ...(employee.role === "admin"
      ? [
          {
            name: "Manage Employees",
            path: "/employee-management",
            icon: <FaUserTie />,
          },
          { name: "Settings", path: "/settings", icon: <FaCog /> },
        ]
      : [
          {
            name: "Timesheets",
            path: "/timesheets",
            icon: <FaHourglassHalf />,
          },
          { name: "Leaves", path: "/leaves", icon: <FaUmbrellaBeach /> },
          { name: "Payroll", path: "/payroll", icon: <FaMoneyBillWave /> },
          { name: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
          { name: "Performance", path: "/performance", icon: <FaChartLine /> },
        ]),
  ];

  const dashboardCards = [
    { title: "My Profile", path: "/profile", image: MyProfile },
    { title: "Onboarding", path: "/onboarding", image: Onboarding },
    { title: "Timesheets", path: "/timesheets", image: Timesheets },
    { title: "Leaves", path: "/leaves", image: Leaves },
    { title: "Payroll", path: "/payroll", image: Payroll },
    { title: "Projects", path: "/projects", image: Project },
    ...(employee.role === "admin"
      ? [
          { title: "Approvals", path: "/approvals", image: Approvals },
          { title: "Performance", path: "/performance", image: Performance },
          { title: "Settings", path: "/settings", image: Settings },
        ]
      : []),
  ];

  return (
    <div className="dashboard-wrapper">
      <Header
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      <main role="main" aria-label="Dashboard Main Content">
        <div className="dashboard-body">
          <Sidebar
            user={employee}
            navLinks={menuItems}
            isOpen={isSidebarOpen}
            onLogout={handleLogout}
          />
          <div
            className={`dashboard-content ${
              isSidebarOpen ? "sidebar-open" : "sidebar-closed"
            }`}
          >
            <div className="dashboard-cards">
              {dashboardCards.map((card, index) => (
                <div
                  key={index}
                  className="dashboard-card"
                  role="button"
                  tabIndex="0"
                  aria-label={`Navigate to ${card.title}`}
                  onClick={() => navigate(card.path)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") navigate(card.path);
                  }}
                >
                  <img src={card.image} alt={`${card.title} icon`} />
                  <p>{card.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
