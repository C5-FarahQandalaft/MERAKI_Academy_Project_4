import axios from "axios";
import React, { useState, useEffect } from "react";
import "./style.css";
const AllJobs = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  //show all posts
  const getAllJobs = () => {
    axios
      .get("http://localhost:5000/jobs")
      .then((result) => {
        const allPosts = result.data.jobs;
        setPosts(allPosts);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };
  //useEffect to show all posts
  useEffect(() => {
    getAllJobs();
  }, []);
  return (
    <div className="mainContainer">
      {error ? (
        <p>{error}</p>
      ) : posts ? (
        posts.map((element) => {
          return (
            <div key={element._id} className="post">
              <h2>{element.company.name}</h2>
              <div className="info">
                <h3>Job title : </h3>
                <p>{element.title}</p>
              </div>

              <div className="info">
                <h3>Job description : </h3>
                <p>{element.description}</p>
              </div>
              <div className="info">
                <h3>Salary : </h3> <p>{element.salary} JD</p>
              </div>

              <div className="info">
                <h3>Country : </h3>
                <p>{element.country}</p>
              </div>

              <div className="info">
                <h3>Remote : </h3>
                <p>{element.remote ? "Yes" : "No"}</p>
              </div>

              <div className="info">
                <h3>Available : </h3>
                <p>{element.available ? "Yes" : "No"}</p>
              </div>
              <div className="info">
                <h3>Appliacants : </h3>
                <p>{element.applicants.length}</p>
              </div>
            </div>
          );
        })
      ) : (
        "No jobs found"
      )}
    </div>
  );
};

export default AllJobs;
