import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiSend, FiPlus, FiMinus } from "react-icons/fi";

const ViewPost = ({ token, postId }) => {
  const typeOfUser = jwt_decode(token).typeOfUser;
  const company = jwt_decode(token).company;
  const userId = jwt_decode(token).userId;

  //states
  const [post, setPost] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [firstValue, setFirstValue] = useState("");
  const writeRef = useRef("");
  //apply to job
  const [success, setSuccess] = useState("");

  //navigate
  const navigate = useNavigate();

  //to update post
  const showUpdateForm = (id) => {
    if (id) {
      navigate("/update/post");
    }
  };

  const postObject = (post) => {
    const postKeys = Object.values(post);
    const mapped = postKeys.map((el) => {
      return el;
    });
    setCompanyName(mapped[1].name);
    setApplicants(mapped[10]);
    setComments(mapped[11]);
  };

  //delete post
  const deletePost = (id) => {
    axios
      .delete(`http://localhost:5000/jobs/delete/post/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/jobs");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  //we need to get the post we want to view
  const getPost = () => {
    axios
      .get(`http://localhost:5000/jobs/search_3/${postId}`)
      .then((result) => {
        const Post = result.data.post;
        setPost(Post);
        postObject(Post);
      })
      .catch((error) => {
        setPost(error.response.data.message);
      });
  };

  //write comment
  const writingComment = (e) => {
    setComment(e.target.value);
  };

  //add comment
  const addComment = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:5000/comment/create/${postId} `,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        writeRef.current.reset();

        getPost();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  //update comment
  const updateComment = (e) => {
    if (e.target.id) {
      if (updateId !== e.target.id) {
        axios
          .get(`http://localhost:5000/comment/show/${e.target.id}`)
          .then((result) => {
            setUpdateId(e.target.id);
            setUpdateValue(result.data.comment.comment);
            setFirstValue(result.data.comment.comment);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .put(
            `http://localhost:5000/comment/update/${updateId}`,
            { comment: updateValue },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((result) => {
            getPost();
            setUpdateId("");
          });
      }
    }
  };

  //delete comment
  const deleteComment = (e) => {
    if (e.target.id) {
      axios
        .delete(`http://localhost:5000/comment/${e.target.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          getPost();
        })
        .catch((err) => {
          console.log(err);
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
          getPost();
        })
        .catch((err) => {
          setSuccess(err.response.data.message);
          setTimeout(() => {
            setSuccess("");
          }, 800);
        });
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="singleMainContainer">
      <div className="singleContainer">
        <div className="singlePost">
          <div className="postHeader">
            <h2>{companyName}</h2>
            {typeOfUser === "company" ? (
              company === companyName ? (
                <div id={post._id} className="controlDiv">
                  <FiEdit
                    id={post._id}
                    className="edit"
                    onClick={(e) => {
                      const id = e.target.id;
                      showUpdateForm(id);
                    }}
                  />

                  <FiTrash2
                    id={post._id}
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

          <div className="singleInfo">
            <h3>Job title : </h3>
            <p>{post.title}</p>
          </div>
          <div className="singleInfo">
            <h3>Job description : </h3>
            <p>{post.description}</p>
          </div>

          <div className="singleInfo">
            <h3>Experience : </h3>
            <p>{post.experience}</p>
          </div>

          <div className="singleInfo">
            <h3>Salary : </h3>
            <p>{post.salary}</p>
          </div>

          <div className="singleInfo">
            <h3>location : </h3>
            <p>{post.location}</p>
          </div>

          <div className="singleInfo">
            <h3>Job type : </h3>
            <p>{post.type}</p>
          </div>

          <div className="singleInfo">
            <h3>Appliacants : </h3>
            <p>{applicants.length}</p>
          </div>

          <div className="singleInfo">
            <h3>Remote : </h3>
            <p>{post.remote ? "Yes" : "No"}</p>
          </div>

          <div className="singleInfo">
            <h3>Available : </h3>
            <p>{post.available ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
      <div className="applyDiv">
        <div className="commentDiv">
          <h3>Comments :</h3>
          {comments &&
            comments.map((el) => {
              return (
                <div className="showComment" key={el._id}>
                  <div>
                    <h4 className="commenter" style={{ display: "flex" }}>
                      {el.commenterCompany
                        ? `${el.commenterCompany.name} `
                        : `${el.commenterEmployee.firstName} ${el.commenterEmployee.lastName}`}
                      {` `}:
                    </h4>
                    <div className="editable">
                      <p className="comment"> {el.comment}</p>

                      <div
                        className={
                          updateId === el._id ? "updateComment" : "hide"
                        }
                      >
                        <textarea
                          defaultValue={updateValue}
                          onChange={(e) => {
                            e.target.value
                              ? setUpdateValue(e.target.value)
                              : setUpdateValue(firstValue);
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {typeOfUser === "employee" ? (
                    el.commenterEmployee ? (
                      el.commenterEmployee._id === userId ? (
                        <div className="commentBtn">
                          <FiEdit
                            className="editComment"
                            id={el._id}
                            onClick={updateComment}
                          />
                          <FiTrash2
                            className="deleteComment"
                            id={el._id}
                            onClick={deleteComment}
                          />
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )
                  ) : typeOfUser === "company" ? (
                    el.commenterCompany ? (
                      el.commenterCompany._id === userId ? (
                        company === companyName ? (
                          <div className="commentBtn" style={{ height: "40%" }}>
                            <FiEdit
                              id={el._id}
                              onClick={updateComment}
                              className="adminEdit"
                            />
                          </div>
                        ) : (
                          <div className="commentBtn">
                            <FiEdit
                              id={el._id}
                              onClick={updateComment}
                              className="editComment"
                            />
                            <FiTrash2
                              id={el._id}
                              onClick={deleteComment}
                              className="deleteComment"
                            />
                          </div>
                        )
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}

                  {company === companyName ? (
                    <div className="adminDiv">
                      <FiTrash2
                        id={el._id}
                        onClick={deleteComment}
                        className="adminDelete"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          <div className="commentSection">
            <form ref={writeRef}>
              <textarea
                placeholder="Write a comment..."
                onChange={writingComment}
              ></textarea>
              <button id={post._id} onClick={addComment}>
                <FiSend className="send-icon" />
              </button>
            </form>
          </div>
        </div>

        {typeOfUser === "employee" ? (
          applicants.includes(userId) ? (
            <button id={post._id} className="withdrawViewBtn">
              <FiMinus id={post._id} className="plus" />
              Withdraw job
            </button>
          ) : (
            <button id={post._id} className="applyViewBtn" onClick={applyToJob}>
              <FiPlus id={post._id} className="plus" /> Apply to job
            </button>
          )
        ) : (
          <></>
        )}
        <div className={success ? "applyMsg" : "hide"}>
          <div className="Msg">
            <p>{success}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
