import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../style.css";
import { useNavigate } from "react-router-dom";

const UpdatePost = ({ token, postId }) => {
  //Post inputs
  const [post, setPost] = useState({});

  const salaryInputRef = useRef("0");
  const salaryCurrencyRef = useRef("Select");
  const salary = useRef("0");

  const [title, setTitle] = useState(post.title);

  const [description, setDescription] = useState(post.description);

  const [experience, setExperience] = useState(post.experience);

  const [location, setLocation] = useState(post.location);

  const [type, setType] = useState(post.type);

  const [remote, setRemote] = useState(post.remote);

  const [available, setAvailable] = useState(post.available);

  //to show the result and post
  const [result, setResult] = useState("");

  //navigate
  const navigate = useNavigate();

  //handle update
  const handleUpdate = (e) => {
    e.preventDefault();
    if (
      salaryCurrencyRef.current.value !== "Select" &&
      salaryInputRef.current.value !== ""
    ) {
      const valueOfSalary =
        salaryInputRef.current.value + " " + salaryCurrencyRef.current.value;
      salary.current = valueOfSalary;
      update();
    } else {
      setResult("Select salary currency and your salary number");
    }
  };

  const update = async () => {
    await axios
      .put(
        `http://localhost:5000/jobs/update/post/${postId}`,
        {
          title,
          description,
          salary: salary.current,
          experience,
          location,
          type,
          remote,
          available,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        localStorage.removeItem("post");
        navigate("/jobs");
      })
      .catch((error) => {
        setResult(error.response.data.message);
      });
  };

  useEffect(() => {
    //we need to get the post we want to update
    axios
      .get(`http://localhost:5000/jobs/search_3/${postId}`)
      .then((result) => {
        const Post = result.data.post;
        setPost(Post);
      })
      .catch((error) => {
        setResult(error.response.data.message);
      });
  }, []);

  return (
    <form className="postContainer">
      {result ? <label>Job title*</label> : <label>Job title</label>}

      <input
        defaultValue={post.title}
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
          setResult("");
        }}
      />

      {result ? (
        <label>Job description*</label>
      ) : (
        <label>Job description</label>
      )}

      <textarea
        onChange={(e) => {
          setDescription(e.target.value);
          setResult("");
        }}
      ></textarea>

      <label>Experience</label>
      <select
        onChange={(e) => {
          setExperience(e.target.value);
          setResult("");
        }}
      >
        <option>Please Select</option>
        <option>Entry-level</option>
        <option>Intermediate</option>
        <option>Mid-level</option>
        <option>Senior-level</option>
      </select>

      <label>Salary</label>
      <div className="salary">
        <input
          ref={salaryInputRef}
          type="number"
          onChange={(e) => {
            setResult("");
          }}
        />
        <select
          ref={salaryCurrencyRef}
          onChange={(e) => {
            setResult("");
          }}
        >
          <option>Select</option>
          <option>USD</option>
          <option>EUR</option>
          <option>JPY</option>
          <option>GBP</option>
          <option>CHF</option>
          <option>CAD</option>
          <option>AED</option>
          <option>JOD</option>
          <option>SAR</option>
        </select>
      </div>

      {result ? <label>Job type*</label> : <label>Job type</label>}

      <select
        onChange={(e) => {
          e.target.value
            ? e.target.value.includes("Select")
              ? setResult("Select one of the options")
              : setType(e.target.value)
            : setResult("Select one of the options");
          setResult("");
        }}
      >
        <option>Please Select</option>
        <option>Full-time</option>
        <option>Part-time</option>
        <option>Contract</option>
        <option>internship</option>
      </select>

      {result ? <label>Location*</label> : <label>Location</label>}

      <input
        type="text"
        onChange={(e) => {
          setLocation(e.target.value);
          setResult("");
        }}
      />

      <label>Remote</label>
      <select
        onChange={(e) => {
          e.target.value === "Yes" ? setRemote(true) : setRemote(false);

          setResult("");
        }}
      >
        <option>Please Select</option>
        <option>Yes</option>
        <option>No</option>
      </select>

      <label>Available</label>

      <select
        onChange={(e) => {
          e.target.value === "Yes" ? setAvailable(true) : setAvailable(false);

          setResult("");
        }}
      >
        <option>Please Select</option>
        <option>Yes</option>
        <option>No</option>
      </select>
      <button onClick={(e) => handleUpdate(e)}>Submit</button>
      <div className="note">
        <h5>Note :</h5>
        <p>- You should enter the salary value</p>
      </div>
      <p className={result ? "wrong" : ""}>{result}</p>
    </form>
  );
};

export default UpdatePost;
