import PropTypes from "prop-types";
import React from "react";
import "../../styles/components/CheckBox.css";

const CheckBox = ({ id, checked, onChange, className }) => {
    return (
        <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            className={`checkbox-input ${className || ""}`.trim()}
        />
    );
};

// Prop Types for validation
CheckBox.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

// Default Props → Ensures it's unchecked by default
CheckBox.defaultProps = {
    checked: false,
    className: "",
};

export default CheckBox;
