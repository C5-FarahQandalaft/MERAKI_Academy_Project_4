import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2, FiSend } from "react-icons/fi";

const ViewPost = ({ token, postId }) => {
  const typeOfUser = jwt_decode(token).typeOfUser;
  const company = jwt_decode(token).company;

  const [post, setPost] = useState([]);
  const [comanyName, setCompanyName] = useState("");
  const [applicants, setApplicants] = useState(0);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const writeRef = useRef("");

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
    setApplicants(mapped[10].length);
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
  const getPost = (id) => {
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

  useEffect(() => {
    getPost(postId);
  }, []);

  return (
    <div>
      <div className="singleContainer">
        <div className="singlePost">
          <div className="postHeader">
            <h2>{comanyName}</h2>
            {typeOfUser === "company" ? (
              company === comanyName ? (
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
            <p>{applicants}</p>
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
      <div className="commentDiv">
        <h3>Comments :</h3>
        {comments.map((el) => {
          console.log(el);
          return (
            <div className="showComment" key={el._id}>
              <h4>
                {el.commenterCompany
                  ? el.commenterCompany.name
                  : `${el.commenterEmployee.firstName} ${el.commenterEmployee.lastName}`}{" "}
                :
              </h4>
              <p> {el.comment}</p>
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
    </div>
  );
};

export default ViewPost;
