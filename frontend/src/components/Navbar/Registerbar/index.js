import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Registerbar = () => {
  return (
    <div className="registerBar">
      <Link className="link" to="/">
        Home
      </Link>
      <Link className="link" to="/About">
        About
      </Link>
      <Link className="link" to="/jobs/search">
        Search
      </Link>
      <Link className="link" to="/login">
        Login
      </Link>
      <Link className="link" to="/register">
        Register
      </Link>
    </div>
  );
};

export default Registerbar;
