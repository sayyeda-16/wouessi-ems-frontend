import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import LeaveRequestPopup from "./LeaveRequestPopup.jsx";
import Button from "../../components/common/Button.jsx";
import CardV2 from "../../components/common/CardV2.jsx";
import LeaveRequests from "./LeaveRequests.jsx";
import "../../styles/pages/Leaves.css";
import Sidebar from "./LeavesSidebar.jsx";

const Leaves = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const leaveCards = [
    { leaveType: "Sick Leave", remaining: 3, total: 10, color: "#D7CFF3" },
    { leaveType: "Annual Leave", remaining: 1, total: 10, color: "#A4EAFF" },
    { leaveType: "Casual Leave", remaining: 5, total: 10, color: "#ABFBD3" },
    { leaveType: "Unpaid Leave", remaining: 9, total: 10, color: "#FCA1A1" },
  ];

  return (
    <>
      <div className="container-fluid">
        <Row>
          <Col xs={2}>
            <Sidebar />
          </Col>
          <Col xs={10}>
            <Row className="head-row">
              <Col xs={2}>
                <h5>Leave Availability</h5>
              </Col>
              <Col xs={2}>
                <Button 
                  onClick={handleOpenPopup} 
                  className={'purplebtn'} 
                  text={"Apply for leave"}
                  aria-label="Open leave request form"
                />
                {showPopup && <LeaveRequestPopup onClose={handleClosePopup} />}
              </Col>
            </Row>
            <Row>
              <div className="card-row">
                {leaveCards.map((card, index) => (
                  <CardV2
                    key={index}
                    leaveType={card.leaveType}
                    remaining={card.remaining}
                    total={card.total}
                    color={card.color}
                    aria-label={`${card.leaveType} balance, ${card.remaining} out of ${card.total} days remaining`}
                  />
                ))}
              </div>
            </Row> 
            <Row>
              <div className="container-fluid" aria-live="polite">
                <LeaveRequests empId={"EMP1001"} />
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Leaves;
