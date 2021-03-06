import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../style.css";
import { FiEdit, FiTrash2, FiPlus, FiMinus, FiSearch } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { postIdContext } from "../../../App";

const AppliedJobs = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const userId = jwt_decode(token).userId;
  const [error, setError] = useState("");

  //category states
  const [Remotly, setRemotly] = useState("Remote");
  const [experienceCat, setExperienceCat] = useState("Experience");
  const [typeCat, setTypeCat] = useState("Job type");
  const [availableCat, setAvailableCat] = useState("Available");

  //navigate
  const navigate = useNavigate();

  //search
  const [searchTitle, setSearchTitle] = useState("");

  //apply to job
  const [success, setSuccess] = useState("");
  const [fault, setFault] = useState("");

  //show all posts
  const AllAppliedJobs = () => {
    axios
      .get("http://localhost:5000/users/appliedjob", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        const allPosts = result.data.jobs;
        setPosts(allPosts);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  //to view post
  const { setPostId } = useContext(postIdContext);
  const ViewPost = (e) => {
    if (e.target.id) {
      setPostId(e.target.id);
      navigate("/jobs/post");
    }
  };

  //search by title
  const seachByTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  //filter by remote
  const filterRemote = (e) => {
    let remoteAnswer = e.target.value;
    if (remoteAnswer !== "Remote") {
      remoteAnswer === "Yes" ? setRemotly(true) : setRemotly(false);
    } else {
      setRemotly("Remote");
    }
  };

  //filter by experience
  const filterExperience = (e) => {
    let experienceAnswer = e.target.value;
    experienceAnswer !== "Experience"
      ? setExperienceCat(experienceAnswer)
      : setExperienceCat("Experience");
  };

  //filter by type
  const filterType = (e) => {
    e.target.value !== "Job type"
      ? setTypeCat(e.target.value)
      : setTypeCat("Job type");
  };

  //filter by Available
  const filterAvailable = (e) => {
    let availableAnswer = e.target.value;
    if (availableAnswer !== "Available") {
      availableAnswer === "Yes"
        ? setAvailableCat(true)
        : setAvailableCat(false);
    } else {
      setAvailableCat("Available");
    }
  };

  //apply to job
  const applyToJob = (e) => {
    if (e.target.id) {
      axios
        .post(
          `http://localhost:5000/users/appliedjob/${e.target.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((result) => {
          setSuccess(result.data.message);
          setTimeout(() => {
            setSuccess("");
          }, 800);
          AllAppliedJobs();
        })
        .catch((err) => {
          setFault(err.response.data.message);

          setTimeout(() => {
            setFault("");
          }, 800);
        });
    }
  };

  //withdraw job
  const withdrawJob = (e) => {
    if (e.target.id) {
      axios
        .delete(
          `http://localhost:5000/users/appliedjob/delete/${e.target.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((result) => {
          setFault(result.data.message);

          setTimeout(() => {
            setFault("");
          }, 800);
          AllAppliedJobs();
        })
        .catch((err) => {
          setFault(err.response.data.message);
          setTimeout(() => {
            setFault("");
          }, 800);
        });
    }
  };

  //useEffect to show all posts
  useEffect(() => {
    AllAppliedJobs();
  }, []);

  return (
    <div className="Container">
      <div className="filter">
        <div className="searchBar">
          <h2 className="myApps">My applications :</h2>
          <FiSearch className="searchIcon" />
          <input
            className="searchInput"
            placeholder="Search Job title or Company"
            onChange={seachByTitle}
          />
        </div>
        <div className="selectors">
          <select onChange={filterExperience}>
            <option>Experience</option>
            <option>Entry-level</option>
            <option>Intermediate</option>
            <option>Mid-level</option>
            <option>Senior-level</option>
          </select>

          <select onChange={filterType}>
            <option>Job type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>internship</option>
          </select>
          <select onChange={filterRemote}>
            <option>Remote</option>
            <option>Yes</option>
            <option>No</option>
          </select>
          <select onChange={filterAvailable}>
            <option>Available</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>
      <div className="mainContainer">
        <div className="showPosts">
          {error ? (
            <p>{error}</p>
          ) : posts ? (
            posts
              .filter((el) => {
                if (Remotly === "Remote") {
                  return el;
                } else {
                  return el.remote === Remotly;
                }
              })
              .filter((el) => {
                if (availableCat === "Available") {
                  return el;
                } else {
                  return el.remote === availableCat;
                }
              })
              .filter((el) => {
                if (typeCat === "Job type") {
                  return el;
                } else {
                  return el.type === typeCat;
                }
              })
              .filter((el) => {
                if (experienceCat === "Experience") {
                  return el;
                } else {
                  return el.experience === experienceCat;
                }
              })
              .filter((el) => {
                return (
                  el.title.includes(searchTitle) ||
                  el.company.name.includes(searchTitle)
                );
              })
              .map((element) => {
                return (
                  <div key={element._id}>
                    <div className="post">
                      <div className="postHeader">
                        <h2>{element.company.name}</h2>
                      </div>

                      <div className="info">
                        <h3>Job title : </h3>
                        <p>{element.title}</p>
                      </div>

                      <div className="info">
                        <h3>Experience : </h3>
                        <p>{element.experience}</p>
                      </div>

                      <div className="info">
                        <h3>Job type : </h3>
                        <p>{element.type}</p>
                      </div>

                      <div className="info">
                        <h3>Applicants : </h3>
                        <p>{element.applicants.length}</p>
                      </div>

                      <div className="info">
                        <h3>Remote : </h3>
                        <p>{element.remote ? "Yes" : "No"}</p>
                      </div>

                      <div className="info">
                        <h3>Available : </h3>
                        <p>{element.available ? "Yes" : "No"}</p>
                      </div>
                    </div>
                    <div className="bottomBtns">
                      {element.applicants.includes(userId) ? (
                        <button
                          id={element._id}
                          className="withdrawBtn"
                          onClick={withdrawJob}
                        >
                          <FiMinus id={element._id} className="plus" />
                          Withdraw job
                        </button>
                      ) : (
                        <button
                          id={element._id}
                          className="applyBtn"
                          onClick={applyToJob}
                        >
                          <FiPlus id={element._id} className="plus" /> Apply to
                          job
                        </button>
                      )}

                      <button
                        className="view"
                        id={element._id}
                        onClick={ViewPost}
                      >
                        <AiOutlineEye className="viewIcon" id={element._id} />
                        View job
                      </button>
                    </div>
                  </div>
                );
              })
          ) : (
            <h5 className="failed">No posts found.</h5>
          )}
        </div>
        <div className={success ? "applyMsg" : "hide"}>
          <div className="Msg">
            <p>{success}</p>
          </div>
        </div>
        <div className={fault ? "faultMsg" : "hide"}>
          <div className="Msg">
            <p>{fault}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
