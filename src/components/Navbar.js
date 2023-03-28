import React, {useState} from "react";
import "../CSS/Navbar.css";

function Header() {

  const [switchToggle, setSwitchToggle] = useState(false);

  function ToggleBar (){
    switchToggle ? setSwitchToggle(false) : setSwitchToggle(true);
  }

  return ( <div>
    <div id="head" className="Header">
    <div className="title">
    <a href="/" id="anchor"><h1>Hospital Management</h1></a>
    </div>
    <div id="sidebar" className={switchToggle ? "active" : ""} onClick={ToggleBar}>
    <div className="togglebtn">
      <span className="one"/>
      <span className="two"/>
      <span className="three"/>
    </div>
      <ul>
        <li><a href="/">Doctor Registration</a></li>
        <li><a href="/hospitalregistration" >Hospital Registration</a></li>
        <li><a href="/patientregistration">Patient Registration</a></li>
        <li><a href="/patientdetails">View Patient Details</a></li>
        <li><a href="/medicalrecords">View Medical Record</a></li>
        <li><a href="/updateexaminedetails">Update Pateint Examine Details</a></li>
      </ul>
      </div>
    </div>
    </div>
  )
};

export default Header;