import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { tokenContext, isLoggedInContext } from "../../../../App";

const CompanyIn = () => {
  //check if user in
  const { setIsLoggedIn } = useContext(isLoggedInContext);
  const { setToken } = useContext(tokenContext);

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
      <Link className="link" to="/postedjobs">
        Posted jobs
      </Link>
      <Link className="link" to="/create/post">
        Create Post
      </Link>
      <Link className="link" to="/" onClick={logout}>
        Logout
      </Link>
    </div>
  );
};

export default CompanyIn;
