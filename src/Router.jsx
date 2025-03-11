import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import EmployeeManagement from "./pages/EmployeeManagement/EmployeeManagement";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/employee-management" element={<EmployeeManagement />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
