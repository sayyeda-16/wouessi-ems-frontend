import React, { useEffect, useState } from "react";
import {
    FaChartLine,
    FaCog, FaHourglassHalf, FaMoneyBillWave,
    FaProjectDiagram, FaUmbrellaBeach, FaUser,
    FaUserTie
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
import { getUserDetails, logout } from "../../services/authService";
import "../../styles/pages/Dashboard.css";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserDetails();
                if (!userData) {
                    throw new Error("User not authenticated");
                }
                setUser(userData);
            } catch (error) {
                console.error("User not authenticated, redirecting...");
                localStorage.clear();
                sessionStorage.clear();
                navigate("/login");
            }
        };

        fetchUser();
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

    if (!user) return <p>Loading...</p>;

    const menuItems = [
        { name: "My Profile", path: "/profile", icon: <FaUser /> },
        ...(user.role === "admin"
            ? [
                { name: "Manage Employees", path: "/employee-management", icon: <FaUserTie /> },
                { name: "Settings", path: "/settings", icon: <FaCog /> }
            ]
            : [
                { name: "Timesheets", path: "/timesheets", icon: <FaHourglassHalf /> },
                { name: "Leaves", path: "/leaves", icon: <FaUmbrellaBeach /> },
                { name: "Payroll", path: "/payroll", icon: <FaMoneyBillWave /> },
                { name: "Projects", path: "/projects", icon: <FaProjectDiagram /> },
                { name: "Performance", path: "/performance", icon: <FaChartLine /> }
            ])
    ];

    const dashboardCards = [
        { title: "My Profile", path: "/profile", image: MyProfile },
        { title: "Onboarding", path: "/onboarding", image: Onboarding },
        { title: "Timesheets", path: "/timesheets", image: Timesheets },
        { title: "Leaves", path: "/leaves", image: Leaves },
        { title: "Payroll", path: "/payroll", image: Payroll },
        { title: "Projects", path: "/projects", image: Project },
        { title: "Approvals", path: "/approvals", image: Approvals },
        { title: "Performance", path: "/performance", image: Performance },
        ...(user.role === "admin" ? [{ title: "Settings", path: "/settings", image: Settings }] : [])
    ];

    return (
        <div className="dashboard-wrapper">
            <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
            <div className="dashboard-body">
                <Sidebar user={user} navLinks={menuItems} isOpen={isSidebarOpen} onLogout={handleLogout} />
                <div className={`dashboard-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
                    <h2>Welcome {user.firstName}!</h2>
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
            <Footer />
        </div>
    );
};

export default Dashboard;