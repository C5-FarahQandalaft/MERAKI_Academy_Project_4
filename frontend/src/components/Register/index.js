import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Register = () => {
  return (
    <div className="registerContainer">
      <div className="employeeReg">
        <h2>Looking for a job?</h2>
        <Link className="linkReg" to="/register/employee">
          Register as Employee
        </Link>
      </div>
      <div className="companyReg">
        <h2>Looking to hire?</h2>
        <Link className="linkReg" to="/register/company">
          Register as Employer
        </Link>
      </div>
    </div>
  );
};

export default Register;
