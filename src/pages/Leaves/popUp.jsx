import React from "react";
import '../../styles/components/popUp.css'
import Dropdown from "../../components/common/DropDown";
import moment from 'moment';
import { ToastContainer, Toast, Row, Col } from "react-bootstrap";

const leaveTypes = ["Emergency leave", "Maternity leave", "Sick leave", "Vacation"]

const PopUp = ({ show, onClose }) => {
  return (
    <ToastContainer
      position="top-center"
      className="custom-toast-container p-3">
      <Toast onClose={onClose} show={show} delay={3000} autohide>
        <Toast.Body>
          <div className="head">
            <Row>
              <Col xs={6}>
                <h1>Apply for leave</h1>
              </Col>
              <Col xs={6}>
                <Dropdown text="Leave type" options={leaveTypes} />
              </Col>
            </Row>
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default PopUp;
