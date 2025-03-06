import PropTypes from "prop-types";
import React, { useState } from "react";
import "../../styles/components/Dropdown.css";

const Dropdown = ({ type = "button", text, onClick, className = "", disabled, options = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className={`dropdown ${className}`}>
            <button type={type} className="dropdown-button" onClick={toggleDropdown} disabled={disabled}>
                {text}
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((option, index) => (
                        <li key={index} className="dropdown-item" onClick={() => console.log(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// Update propTypes to accept either an array of objects or an array of strings
Dropdown.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    options: PropTypes.array.isRequired
};


export default Dropdown;