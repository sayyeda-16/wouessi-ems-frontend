import React, { useState } from 'react';
import Dropdown from '../../components/common/DropDown';
import "../../styles/components/Dropdown.css";


const Options=["Emergency leave", "Maternity leave", "Sick leave", "Vacation"]

const Leaves = () => {
  return (
    <>
      <Dropdown label={"Type "} alt={"Choose you case"} options = {Options}/>
    </>
  );
};

export default Leaves;