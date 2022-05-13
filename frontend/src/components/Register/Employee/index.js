import "../style.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterEmployee = () => {
  //states for register
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);
  const [degree, setDegree] = useState("");
  const [country, setCountry] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  //state to show the result or error
  const [registered, setRegistered] = useState("");

  //Error color
  const [error, setError] = useState("");

  //navigate
  const navigate = useNavigate();

  //checking the info
  let testNumber = /^(?=.*[0-9]).*$/;
  let testLenght = /^.{6,16}$/;
  //callback-function to create
  const create = () => {
    if (firstName.trim()) {
      if (email.includes(".com")) {
        if (testLenght.test(password)) {
          if (testNumber.test(password)) {
            if (password === repeatPassword) {
              axios
                .post("http://localhost:5000/users/create/employee", {
                  firstName,
                  lastName,
                  email,
                  password,
                  country,
                  age,
                  degree,
                })
                .then((result) => {
                  setRegistered(result.data.message);
                })
                .catch((error) => {
                  setRegistered(error.response.data.message);
                  error.response.data.message.includes("Server")
                    ? setError("server")
                    : setError("email");
                });
            } else {
              setRegistered("Password didn't match");
              setError("repeat");
            }
          } else {
            setRegistered("Password must contain at least one Number.");
            setError("password");
          }
        } else {
          setRegistered("Password must be 6-16 Characters Long.");
          setError("password");
        }
      } else {
        setRegistered(`Wrong email, it should contain @ and .com`);
        setError("email");
      }
    } else {
      setRegistered(`Please fill all required fields*`);
      setError("all");
    }
  };

  //call-back to close pop
  const close = () => {
    navigate("/");
  };

  return (
    <div className="regContainer">
      <div className="closing">
        <button className="closeBtn" onClick={close}>
          &times;
        </button>
      </div>
      <h3>let's create your account</h3>

      {error === "server" ? (
        <label>First name*</label>
      ) : error.includes("all") ? (
        <label>First name*</label>
      ) : (
        <label>First name</label>
      )}

      <input
        type="text"
        className={
          error === "server" ? "error" : error === "all" ? "error" : ""
        }
        placeholder="First name"
        onChange={(e) => {
          setFirstName(e.target.value);
          setRegistered("");
          setError("");
        }}
      />

      {error === "server" ? (
        <label>Last Name*</label>
      ) : error.includes("all") ? (
        <label>Last Name*</label>
      ) : (
        <label>Last Name</label>
      )}
      <input
        type="text"
        className={
          error === "server" ? "error" : error === "all" ? "error" : ""
        }
        placeholder="Last Name"
        onChange={(e) => {
          setLastName(e.target.value);
          setError("");
        }}
      />

      <label>Age</label>
      <input
        type="number"
        placeholder="Age"
        onChange={(e) => {
          setAge(e.target.value);
        }}
      />

      <label>Degree</label>
      <input
        type="text"
        placeholder="Degree"
        onChange={(e) => {
          setDegree(e.target.value);
        }}
      />
      <label>Country</label>
      <input
        type="text"
        placeholder="Country"
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />
      {error === "all" ? (
        <label>Email*</label>
      ) : error.includes("email") ? (
        <label>Email*</label>
      ) : (
        <label>Email</label>
      )}
      <input
        type="email"
        className={error === "email" ? "error" : error === "all" ? "error" : ""}
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
          setRegistered("");
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
          error === "password" ? "error" : error === "all" ? "error" : ""
        }
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
          setRegistered("");
          setError("");
        }}
      />

      {error === "all" ? (
        <label>Repeat password*</label>
      ) : error.includes("repeat") ? (
        <label>Repeat password*</label>
      ) : (
        <label>Repeat password</label>
      )}
      <input
        type="password"
        className={
          error === "repeat" ? "error" : error === "all" ? "error" : ""
        }
        placeholder="Repeat password"
        onChange={(e) => {
          setRepeatPassword(e.target.value);
          setRegistered("");
          setError("");
        }}
      />
      <button onClick={create}>Continue</button>
      {registered ? (
        <p className={error ? "message" : "success"}>{registered}</p>
      ) : (
        <></>
      )}
    </div>
  );
};
