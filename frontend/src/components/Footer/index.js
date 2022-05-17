import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <div className="footerContainer">
    <div className="footer">
      <h5>About</h5>
      <h5>Contact</h5>
      <br />
      <br />
      <br />

      <h5>
        &copy;{new Date().getFullYear()} Seeker. | All rights reserved. |
        Privacy |
      </h5>
    </div>
    </div>
  );
};

export default Footer;
