import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmpImage from "../../assets/images/employee.png";
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
    { name: "My Profile", path: "/profile", icon: "👤" },
    { name: "Onboarding", path: "/onboarding", icon: "📋" },
    { name: "Timesheets", path: "/timesheets", icon: "⏳" },
    { name: "Leaves", path: "/leaves", icon: "🌴" },
    { name: "Payroll", path: "/payroll", icon: "💰" },
    { name: "Projects", path: "/projects", icon: "📊" },
    { name: "Team Members", path: "/team", icon: "👥" },
    { name: "Approvals", path: "/approvals", icon: "✅" },
    { name: "Performance", path: "/performance", icon: "📈" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
];

// Dashboard Cards
const dashboardCards = [
    { title: "My Profile", path: "/profile", image: EmpImage },
    { title: "Onboarding", path: "/onboarding", image: EmpImage },
    { title: "Timesheets", path: "/timesheets", image: EmpImage },
    { title: "Leaves", path: "/leaves", image: EmpImage },
    { title: "Payroll", path: "/payroll", image: EmpImage },
    { title: "Projects", path: "/projects", image: EmpImage },
    { title: "Approvals", path: "/approvals", image: EmpImage },
    { title: "Performance", path: "/performance", image: EmpImage },
    { title: "Settings", path: "/performance", image: EmpImage },
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
