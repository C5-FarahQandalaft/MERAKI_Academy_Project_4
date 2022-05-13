import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { tokenContext, isLoggedInContext } from "../../../../App";

const CompanyIn = () => {
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
    <div>
      <Link className="link" to="/" onClick={logout}>
        Logout
      </Link>
    </div>
  );
};

export default CompanyIn;
