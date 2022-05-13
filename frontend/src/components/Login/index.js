import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Login = () => {
  return (
    <div className="registerBar">
      <Link className="link" to="/login/employee">
        Login as Employee
      </Link>
      <Link className="link" to="/login/company">
        Login as Company
      </Link>
    </div>
  );
};

export default Login;
