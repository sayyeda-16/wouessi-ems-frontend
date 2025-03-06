import React, { useState } from 'react';
import Button from '../../components/common/Button';
import PopUp from './popUp';

const Leaves = () => {
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <>
      <Button text="Apply for Leave" className="btn-primary" onClick={() => setShowPopUp(true)} />
      {showPopUp && <PopUp show={showPopUp} onClose={() => setShowPopUp(false)} />}
    </>
  );
};

export default Leaves;