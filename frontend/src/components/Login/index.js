import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Login = () => {
  return (
    <div className="registerContainer">
      <div className="employeeLog">
        <h2>Let's find for you a job</h2>
        <Link className="linkReg" to="/login/employee">
          Login as Employee
        </Link>
      </div>
      <div className="companyLog">
        <h2>let's help you to share your job</h2>
        <Link className="linkReg" to="/login/company">
          Login as Employer
        </Link>
      </div>
    </div>
  );
};

export default Login;
