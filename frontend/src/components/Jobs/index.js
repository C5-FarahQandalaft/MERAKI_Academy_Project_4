import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import "./style.css";
import {
  FiEdit,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import { postIdContext } from "../../App";

const AllJobs = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const typeOfUser = token ? jwt_decode(token).typeOfUser : null;
  const company = token ? jwt_decode(token).company : null;
  const userId = token ? jwt_decode(token).userId : null;

  //category states
  const [totalPages, setTotalPages] = useState([]);
  // const [page, setPage] = useState(1);
  const pageRef = useRef(1);
  //navigate
  const navigate = useNavigate();

  //apply to job
  const [success, setSuccess] = useState("");
  const [fault, setFault] = useState("");

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
      .get("http://localhost:5000/jobs", { params: { page: pageRef.current } })
      .then((result) => {
        const allPosts = result.data.jobs;
        setPosts(allPosts);
        const arrOfNumbers = [];
        for (let i = 1; i <= result.data.totalPages; i++) {
          arrOfNumbers.push(i);
          if (i <= result.data.totalPages) {
            setTotalPages(arrOfNumbers);
          }
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
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
        .then((result) => {
          setFault(result.data.message);
          getAllJobs();
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
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
          getAllJobs();
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
    getAllJobs();
  }, []);

  return (
    <div className="Container">
      <div className="mainContainer">
        <div className="showPosts">
          {error ? (
            <p>{error}</p>
          ) : posts ? (
            posts.map((element) => {
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
                      <>
                        <div className="info">
                          <h3>Experience : </h3>
                          <p>{element.experience}</p>
                        </div>

                        <div className="info">
                          <h3>Job type : </h3>
                          <p>{element.type}</p>
                        </div>
                      </>
                    )}

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
          ) : (
            <h5 className="failed">No posts found.</h5>
          )}
        </div>
        {posts ? (
          <div className="pagination">
            {pageRef.current == totalPages[0] ? (
              <></>
            ) : (
              <button
                onClick={(e) => {
                  --pageRef.current;
                  getAllJobs();
                  window.scrollTo(0, 0);
                }}
              >
                <FiArrowLeft className="Arrow" />
              </button>
            )}

            <ul className="pages">
              {totalPages.map((el) => {
                return (
                  <li
                    id={el}
                    key={el}
                    onClick={(e) => {
                      pageRef.current = e.target.id;
                      getAllJobs();
                      window.scrollTo(0, 0);
                    }}
                  >
                    {el}
                  </li>
                );
              })}
            </ul>
            {pageRef.current == totalPages.length ? (
              <></>
            ) : (
              <button
                onClick={(e) => {
                  ++pageRef.current;
                  getAllJobs();
                  window.scrollTo(0, 0);
                }}
              >
                <FiArrowRight className="Arrow" />
              </button>
            )}
          </div>
        ) : (
          <></>
        )}
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

export default AllJobs;
