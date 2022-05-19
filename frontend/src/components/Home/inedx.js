import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const Home = () => {
  return (
    <div className="Home">
      <div className="backgroundMsg">
        <h1>You're here to hire. We're here to help.</h1>
        <Link className="linkRegHome" to="/register">
          Join Now
        </Link>
        <h4>Post your job, find a job, all on Seeker. Start hiring today.</h4>
      </div>
      <div className="backgroundHome"></div>
    </div>
  );
};

export default Home;
