import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { postIdContext } from "../../App";

const AllJobs = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const typeOfUser = jwt_decode(token).typeOfUser;
  const company = jwt_decode(token).company;

  //navigate
  const navigate = useNavigate();

  //search
  const [searchTitle, setSearchTitle] = useState("");

  //to update post
  const { setPostId } = useContext(postIdContext);
  const showUpdateForm = (id) => {
    if (id) {
      setPostId(id);
      navigate("/update/post");
    }
  };

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

  //search by title
  const seachByTitle = (e) => {
    setSearchTitle(e.target.value);
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
        getAllJobs();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  //useEffect to show all posts
  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div className="Container">
      <input placeholder="Search" onChange={seachByTitle} />
      <div className="mainContainer">
        {error ? (
          <p>{error}</p>
        ) : posts ? (
          posts
            .filter((el) => {
              return (
                el.title.includes(searchTitle) ||
                el.company.name.includes(searchTitle)
              );
            })
            .map((element) => {
              return (
                <div key={element._id} className="post">
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

                  <div className="info">
                    <h3>Job description : </h3>
                    <p>{element.description}</p>
                  </div>

                  <div className="info">
                    <h3>Experience : </h3>
                    <p>{element.experience}</p>
                  </div>

                  <div className="info">
                    <h3>Salary : </h3> <p>{element.salary}</p>
                  </div>

                  <div className="info">
                    <h3>Job type : </h3>
                    <p>{element.type}</p>
                  </div>

                  <div className="info">
                    <h3>Location : </h3>
                    <p>{element.location}</p>
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
              );
            })
        ) : (
          "No jobs found"
        )}
      </div>
    </div>
  );
};

export default AllJobs;
