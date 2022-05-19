import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { tokenContext, isLoggedInContext } from "../../../../App";

const EmployeeIn = () => {
  //check if user in
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  const { token, setToken } = useContext(tokenContext);

  //Callback-function to logout
  const logout = () => {
    localStorage.clear();
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="registerBar">
      <Link className="link" to="/jobs">
        Home
      </Link>
      <Link className="link" to="/jobs/search">
        Search
      </Link>
      <Link className="link" to="/appliedjobs">
        Applications
      </Link>
      <Link className="link" to="/" onClick={logout}>
        Logout
      </Link>
    </div>
  );
};

export default EmployeeIn;
