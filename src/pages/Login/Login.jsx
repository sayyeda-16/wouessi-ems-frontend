import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/icons/WouessiLogo.png";
import LoginImage from "../../assets/images/WouessiLoginPageImage2.jpg";
import Button from "../../components/common/Button";
import CheckBox from "../../components/common/CheckBox";
import TextBox from "../../components/common/TextBox";
import "../../styles/pages/Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <div className="login-container">
            <div className="login-page-image">
                <img src={LoginImage} alt="Login Page Company Image" />
            </div>
            <div className="form-login">
                {/* ✅ Logo moved to Top-Right */}
                <div className="company-logo">
                    <img src={Logo} alt="Wouessi Company Logo" />
                </div>
                <div className="form-login-header">
                    <h1>Wouessi Digital</h1>
                </div>

                <div className="username-field">
                    <label htmlFor="userid">Employee ID</label>
                    <TextBox
                        id="userid"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter User Name or Email"
                        required
                    />
                </div>

                <div className="password-field">
                    <label htmlFor="password">Password</label>
                    <TextBox
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required
                    />
                </div>

                {/* ✅ Remember Me & Forgot Password in Same Line */}
                <div className="remember-forgot-container">
                    <div className="remember-me">
                        <CheckBox
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="rememberMe">Remember Me</label>
                    </div>

                    <div className="forgot-password">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                </div>

                <div className="login-button">
                    <Button type="Submit" text="Login" className="btn-primary" />
                </div>
            </div>
        </div>
    );
};

export default Login;
