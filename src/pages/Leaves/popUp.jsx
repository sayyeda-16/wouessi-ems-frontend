import React from "react";
import './popUp.css'
import { ToastContainer, Toast } from "react-bootstrap";

const PopUp = ({ show, onClose }) => {
  return (
    <ToastContainer
      position="top-center"
      className="custom-toast-container p-3">
      <Toast onClose={onClose} show={show} delay={3000} autohide>
        <Toast.Body>Hello world</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default PopUp;
