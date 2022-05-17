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
import AllJobs from "./components/Jobs";
import CreatePost from "./components/Jobs/CreatePost";
import UpdatePost from "./components/Jobs/UpdatePost";
import ViewPost from "./components/Jobs/ViewPost";
import AppliedJobs from "./components/Jobs/AppliedJobs";
import PostedJobs from "./components/Jobs/PostedJobs";
import Footer from "./components/Footer";
import Search from "./components/Jobs/Search";

//get the token
export const tokenContext = createContext("");
export const isLoggedInContext = createContext(false);
export const postIdContext = createContext("");

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

  //check if there is there is already postId
  const postInLocal = localStorage.getItem("post");

  //to share postId
  const [postId, setPostId] = useState(postInLocal ? postInLocal : "");

  //save postId in local
  localStorage.setItem("post", postId);

  return (
    <div className="App">
      <postIdContext.Provider value={{ postId, setPostId }}>
        <isLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <tokenContext.Provider value={{ token, setToken }}>
            <Navbar token={token} />
            <Routes>
              <Route path="/jobs" element={<AllJobs token={token} />} />

              <Route
                path="/postedjobs"
                element={<PostedJobs token={token} />}
              />
              <Route
                path="/appliedjobs"
                element={<AppliedJobs token={token} />}
              />
              <Route
                path="/jobs/post"
                element={<ViewPost token={token} postId={postId} />}
              />
              <Route
                path="/update/post"
                element={<UpdatePost token={token} postId={postId} />}
              />
              <Route
                path="/create/post"
                element={<CreatePost token={token} />}
              />
              <Route path="/jobs/search" element={<Search token={token} />} />
              <Route path="/" element={<></>} />
              <Route path="/login" element={<Login />} />
              <Route path="/login/employee" element={<LoginEmployee />} />
              <Route path="/login/company" element={<LoginCompany />} />
              <Route path="/register/company" element={<RegisterCompany />} />
              <Route path="/register/employee" element={<RegisterEmployee />} />
            </Routes>
            <Footer />
          </tokenContext.Provider>
        </isLoggedInContext.Provider>
      </postIdContext.Provider>
    </div>
  );
}

export default App;
