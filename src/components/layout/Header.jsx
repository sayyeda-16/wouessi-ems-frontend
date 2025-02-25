import React from "react";
import "../../styles/components/Header.css";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
    return (
        <header className="header">
            <button className="hamburger-btn" onClick={toggleSidebar}>
                {isSidebarOpen ? "✖" : "☰"}
            </button>
            <span className="header-title">Employee Dashboard</span>
        </header>
    );
};

export default Header;