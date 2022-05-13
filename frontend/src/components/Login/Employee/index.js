import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//to share the token
import { tokenContext, isLoggedInContext } from "../../../App";

export const LoginEmployee = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //message if not signed in
  const [signedIn, setSignedIn] = useState("");

  //navigate
  const navigate = useNavigate();

  //Error color
  const [error, setError] = useState("");

  //value of token
  const { setToken } = useContext(tokenContext);

  //is the user logged in
  const { setIsLoggedIn } = useContext(isLoggedInContext);

  //Callback-function for login
  const signIn = () => {
    if (email.trim()) {
      axios
        .post("http://localhost:5000/login/employee", { email, password })
        .then((result) => {
          setToken(result.data.token);
          setIsLoggedIn(true);
          navigate("/jobs");
        })
        .catch((error) => {
          setSignedIn(error.response.data.message);
          setError(error.response.data.message);
        });
    } else {
      setSignedIn("Enter your email and password.");
      setError("all");
    }
  };

  //call-back to close pop
  const close = () => {
    navigate("/login");
  };

  //return for Login function
  return (
    <div className="regContainer">
      <div className="closing">
        <button className="closeBtn" onClick={close}>
          &times;
        </button>
      </div>
      <h3>Ready to get your job?</h3>
      {error === "all" ? (
        <label>Email*</label>
      ) : error.includes("email") ? (
        <label>Email*</label>
      ) : (
        <label>Email</label>
      )}
      <input
        type="email"
        placeholder="Email"
        className={
          error === "all" ? "error" : error.includes("email") ? "error" : ""
        }
        onChange={(e) => {
          setEmail(e.target.value);
          setSignedIn("");
          setError("");
        }}
      />
      {error === "all" ? (
        <label>Password*</label>
      ) : error.includes("password") ? (
        <label>Password*</label>
      ) : (
        <label>Password</label>
      )}
      <input
        type="password"
        className={
          error === "all" ? "error" : error.includes("password") ? "error" : ""
        }
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
          setSignedIn("");
          setError("");
        }}
      />
      <button onClick={signIn}>Login</button>
      <p className={signedIn ? "wrong" : ""}>{signedIn}</p>
    </div>
  );
};
