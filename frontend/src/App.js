import "./App.css";

// import routes
import { Routes, Route } from "react-router-dom";

//importing the hooks
import React, { useState, createContext } from "react";

//importing components
import { Navbar } from "./components/Navbar";
import { RegisterCompany } from "./components/Register/Company/index";
import { RegisterEmployee } from "./components/Register/Employee/index";
import { LoginCompany } from "./components/Login/Company/index";
import { LoginEmployee } from "./components/Login/Employee/index";
import Login from "./components/Login";

//get the token
export const tokenContext = createContext("");
export const isLoggedInContext = createContext(false);

function App() {
  //check if user logged in
  const tokenInLocal = localStorage.getItem("token");

  //save the token in state
  const [token, setToken] = useState(
    tokenInLocal === "null" ? null : tokenInLocal
  );

  //save token in locale storage
  localStorage.setItem("token", token);

  //check if logged in
  const [isLoggedIn, setIsLoggedIn] = useState(
    tokenInLocal === "null" ? false : true
  );

  return (
    <div className="App">
      <isLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <tokenContext.Provider value={{ token, setToken }}>
          <Navbar />
          <Routes>
            <Route path="/jobs" element={<></>} />
            <Route path="/" element={<></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/employee" element={<LoginEmployee />} />
            <Route path="/login/company" element={<LoginCompany />} />
            <Route path="/register/company" element={<RegisterCompany />} />
            <Route path="/register/employee" element={<RegisterEmployee />} />
          </Routes>
        </tokenContext.Provider>
      </isLoggedInContext.Provider>
    </div>
  );
}

export default App;
