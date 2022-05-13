import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Registerbar = () => {
  return (
    <div className="registerBar">
      <Link className="link" to="/">
        Home
      </Link>

      <Link className="link" to="/login">
        Login
      </Link>
      <Link className="link" to="/register/company">
        Register as Company
      </Link>
      <Link className="link" to="/register/employee">
        Register as Employee
      </Link>
    </div>
  );
};

export default Registerbar;
