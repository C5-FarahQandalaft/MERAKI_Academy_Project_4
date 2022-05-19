import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footer">
        <div className="copyRights">
          <h5>
            &copy;{new Date().getFullYear()} Seeker | All rights reserved.
          </h5>
        </div>
        <div className="footerLinks">
          <Link className="linkFooter" to="/">
            Home
          </Link>
          <Link className="linkFooter" to="/About">
            About
          </Link>
          <Link className="linkFooter" to="/contact">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
