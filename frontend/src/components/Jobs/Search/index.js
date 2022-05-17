import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import "../style.css";
import { FiEdit, FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { postIdContext } from "../../../App";

const Search = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const typeOfUser = token ? jwt_decode(token).typeOfUser : null;
  const company = token ? jwt_decode(token).company : null;
  const userId = token ? jwt_decode(token).userId : null;

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

  //to update post
  const { setPostId } = useContext(postIdContext);
  const showUpdateForm = (id) => {
    if (id) {
      setPostId(id);
      navigate("/update/post");
    }
  };

  //to view post
  const ViewPost = (e) => {
    if (e.target.id) {
      setPostId(e.target.id);
      navigate("/jobs/post");
    }
  };

  //show all posts
  const getAllJobs = () => {
    axios
      .get("http://localhost:5000/jobs/search")
      .then((result) => {
        const allPosts = result.data.jobs;
        setPosts(allPosts);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  //search by title
  const seachByTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  //delete post
  const deletePost = (id) => {
    if (id) {
      axios
        .delete(`http://localhost:5000/jobs/delete/post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          getAllJobs();
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
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
          getAllJobs();
        })
        .catch((err) => {
          setSuccess(err.response.data.message);
          setTimeout(() => {
            setSuccess("");
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
          setSuccess(result.data.message);
          setTimeout(() => {
            setSuccess("");
          }, 800);
          getAllJobs();
        })
        .catch((err) => {
          setSuccess(err.response.data.message);
          setTimeout(() => {
            setSuccess("");
          }, 800);
        });
    }
  };

  //useEffect to show all posts
  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div className="Container">
      <div className="filter">
        <input
          placeholder="Search Job title or Company"
          onChange={seachByTitle}
        />

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
      <div className="mainContainer">
        {error ? (
          <p>{error}</p>
        ) : posts?(
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

                      {typeOfUser === "company" ? (
                        company === element.company.name ? (
                          <div id={element._id} className="controlDiv">
                            <FiEdit
                              id={element._id}
                              className="edit"
                              onClick={(e) => {
                                const id = e.target.id;
                                showUpdateForm(id);
                              }}
                            />

                            <FiTrash2
                              id={element._id}
                              className="delete"
                              onClick={(e) => {
                                const id = e.target.id;
                                deletePost(id);
                              }}
                            />
                          </div>
                        ) : (
                          <></>
                        )
                      ) : (
                        <></>
                      )}
                    </div>

                    <div className="info">
                      <h3>Job title : </h3>
                      <p>{element.title}</p>
                    </div>
                    {element.url ? (
                      <div className="info">
                        <h3>Job description : </h3>
                        <img src={element.url} />
                      </div>
                    ) : (
                      <></>
                    )}

                    <div className="info">
                      <h3>Experience : </h3>
                      <p>{element.experience}</p>
                    </div>

                    <div className="info">
                      <h3>Job type : </h3>
                      <p>{element.type}</p>
                    </div>

                    <div className="info">
                      <h3>Appliacants : </h3>
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
                    {typeOfUser === "employee" ? (
                      element.applicants.includes(userId) ? (
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
                      )
                    ) : (
                      <></>
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
        ):<h5>No posts found</h5>}
      </div>
      <div className={success ? "applyMsg" : "hide"}>
        <div className="Msg">
          <p>{success}</p>
        </div>
      </div>
    </div>
  );
};

export default Search;
