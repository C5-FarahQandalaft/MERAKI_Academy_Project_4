import "./style.css";
import React, { useContext } from "react";
import jwt_decode from "jwt-decode";

import { isLoggedInContext } from "../../App";

//import compenents
import Registerbar from "./Registerbar/index";
import EmployeeIn from "./Userbar/Employee";
import CompanyIn from "./Userbar/Company";

export const Navbar = ({ token }) => {
  //check if user in
  const { isLoggedIn, setIsLoggedIn } = useContext(isLoggedInContext);
  //type of user
  let typeOfUser;
  isLoggedIn
    ? (typeOfUser = jwt_decode(token).typeOfUser)
    : (typeOfUser = "Not User");

  return (
    <div>
      {isLoggedIn ? (
        typeOfUser === "employee" ? (
          <EmployeeIn />
        ) : (
          <CompanyIn />
        )
      ) : (
        <Registerbar />
      )}
    </div>
  );
};
