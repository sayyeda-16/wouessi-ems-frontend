import React, { useState } from "react";
import {
    FaChartLine, FaCheckCircle, FaClipboardList, FaCog, FaHourglassHalf, FaMoneyBillWave,
    FaProjectDiagram, FaUmbrellaBeach, FaUser, FaUsers, FaUserTie
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Approvals from "../../assets/images/Approvals.png";
import EmpImage from "../../assets/images/employee.png";
import Leaves from "../../assets/images/Leaves.png";
import MyProfile from "../../assets/images/myprofile.jpg";
import Onboarding from "../../assets/images/Onboarding.jpg";
import Payroll from "../../assets/images/Payroll.jpg";
import Perfromance from "../../assets/images/Performance.png";
import Project from "../../assets/images/project.jpg";
import Settings from "../../assets/images/Settings.png";
import Timesheets from "../../assets/images/Timesheets.png";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import "../../styles/pages/Dashboard.css";

const employee = {
    name: "Chandu",
    role: "Software Engineer",
    image: EmpImage,
};

// Sidebar Navigation Menu
const menuItems = [
    { name: "My Profile", path: "/profile", icon: <FaUser /> },
    { name: "Manage Employees", path: "/employee-management", icon: <FaUserTie /> },
    { name: "Onboarding", path: "/onboarding", icon: <FaClipboardList /> },
    { name: "Timesheets", path: "/timesheets", icon: <FaHourglassHalf /> },
    { name: "Leaves", path: "/leaves", icon: <FaUmbrellaBeach /> },
    { name: "Payroll", path: "/payroll", icon: <FaMoneyBillWave /> },
    { name: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
    { name: "Team Members", path: "/team", icon: <FaUsers /> },
    { name: "Approvals", path: "/approvals", icon: <FaCheckCircle /> },
    { name: "Performance", path: "/performance", icon: <FaChartLine /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
];

// Dashboard Cards
const dashboardCards = [
    { title: "My Profile", path: "/profile", image: MyProfile },
    { title: "Onboarding", path: "/onboarding", image: Onboarding },
    { title: "Timesheets", path: "/timesheets", image: Timesheets },
    { title: "Leaves", path: "/leaves", image: Leaves },
    { title: "Payroll", path: "/payroll", image: Payroll },
    { title: "Projects", path: "/projects", image: Project },
    { title: "Approvals", path: "/approvals", image: Approvals },
    { title: "Performance", path: "/performance", image: Perfromance },
    { title: "Settings", path: "/performance", image: Settings },
];

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="dashboard-wrapper">
            {/* Header */}
            <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

            {/* Main Body */}
            <div className="dashboard-body">
                {/* Sidebar Inside Body */}
                <Sidebar employee={employee} navLinks={menuItems} onLogout={() => alert("Logged out")} isOpen={isSidebarOpen} />

                {/* Content Section */}
                <div className={`dashboard-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
                    <div className="dashboard-cards">
                        {dashboardCards.map((card, index) => (
                            <div key={index} className="dashboard-card" onClick={() => navigate(card.path)}>
                                <img src={card.image} alt={card.title} />
                                <p>{card.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer*/}
            <Footer />
        </div>
    );
};

export default Dashboard;
