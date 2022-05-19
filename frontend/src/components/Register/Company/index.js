import "./style.css";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterCompany = () => {
  //states for register
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [country, setCountry] = useState("");

  //Error color
  const [error, setError] = useState("");

  //state to show the result or error
  const [registered, setRegistered] = useState("");

  //navigate
  const navigate = useNavigate();

  //checking the info
  let testNumber = /^(?=.*[0-9]).*$/;
  let testLenght = /^.{6,16}$/;
  //callback-function to create
  const create = () => {
    if (name.trim()) {
      if (email.includes(".com") && email.trim()) {
        if (testLenght.test(password)) {
          if (testNumber.test(password)) {
            if (password === repeatPassword) {
              axios
                .post("http://localhost:5000/users/create/company", {
                  name,
                  field,
                  email,
                  password,
                  country,
                })
                .then((result) => {
                  setRegistered(result.data.message);
                  setTimeout(() => {
                    navigate("/login");
                  }, 300);
                })
                .catch((error) => {
                  setRegistered(error.response.data.message);
                  setError("name");
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
      setError("server");
    }
  };

  //call-back to close pop
  const close = () => {
    navigate("/register");
  };

  return (
    <div className="regMainContainer">
      <div className="regContainerCompany">
        <div className="closing">
          <button className="closeBtn" onClick={close}>
            &times;
          </button>
        </div>
        <h3>let's create your account</h3>

        {error === "server" ? (
          <label>Company name*</label>
        ) : error.includes("name") ? (
          <label>Company name*</label>
        ) : (
          <label>Company name</label>
        )}

        <input
          type="text"
          className={
            error === "name" ? "error" : error === "server" ? "error" : ""
          }
          placeholder="Company name"
          onChange={(e) => {
            setName(e.target.value);
            setRegistered("");
            setError("");
          }}
        />
        <label>Field</label>
        <input
          type="text"
          placeholder="Field"
          onChange={(e) => {
            setField(e.target.value);
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

        {error === "server" ? (
          <label>Email*</label>
        ) : error.includes("email") ? (
          <label>Email*</label>
        ) : (
          <label>Email</label>
        )}

        <input
          type="email"
          className={
            error === "email" ? "error" : error === "server" ? "error" : ""
          }
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
            setRegistered("");
            setError("");
          }}
        />

        {error === "server" ? (
          <label>Password*</label>
        ) : error.includes("password") ? (
          <label>Password*</label>
        ) : (
          <label>Password</label>
        )}

        <input
          type="password"
          className={
            error === "password" ? "error" : error === "server" ? "error" : ""
          }
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
            setRegistered("");
            setError("");
          }}
        />

        {error === "server" ? (
          <label>Repeat password*</label>
        ) : error.includes("repeat") ? (
          <label>Repeat password*</label>
        ) : (
          <label>Repeat password</label>
        )}

        <input
          type="password"
          className={
            error === "repeat" ? "error" : error === "server" ? "error" : ""
          }
          placeholder="Repeat password"
          onChange={(e) => {
            setRepeatPassword(e.target.value);
            setRegistered("");
            setError("");
          }}
        />
        <button className="continue" onClick={create}>Continue</button>
      </div>
      {registered ? (
        <div className={error ? "check" : "success"}>
          <div className="msgCenter">
            <p className="Message">{registered}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
