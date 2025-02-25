import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/Sidebar.css";

const Sidebar = ({ employee, navLinks, onLogout, isOpen }) => {
    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <div className="sidebar-header">Welcome</div>

            <div className="sidebar-profile">
                <img src={employee.image} alt="Profile" className="profile-image" />
                <h3>{employee.name}</h3>
                <p>{employee.role}</p>
            </div>

            <div className="sidebar-content">
                <ul className="sidebar-nav">
                    {navLinks.map((item, index) => (
                        <li key={index}>
                            <span>{item.icon}</span>
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    ))}
                    
                    <li className="logout-nav">
                        <button className="logout-btn" onClick={onLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
