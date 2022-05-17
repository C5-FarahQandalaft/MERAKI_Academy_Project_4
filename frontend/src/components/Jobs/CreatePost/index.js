import React, { useState, useRef } from "react";
import axios from "axios";
import "../style.css";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ token }) => {
  //Post inputs
  const salaryInputRef = useRef(0);
  const salaryCurrencyRef = useRef("Select");
  const salary = useRef("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("Entry-level");
  const [location, setLocation] = useState("");

  const [type, setType] = useState("");
  const [remote, setRemote] = useState(false);
  const [available, setAvailable] = useState(true);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  //to show the result and error
  const [result, setResult] = useState("");

  //navigate
  const navigate = useNavigate();

  //handling errors
  const checkPost = () => {
    if (title.trim()) {
      if (description.trim()) {
        if (salaryCurrencyRef.current.value !== "Select") {
          const valueOfSalary =
            salaryInputRef.current.value +
            " " +
            salaryCurrencyRef.current.value;
          salary.current = valueOfSalary;
          addPost();
        } else {
          setResult("Select salary currency");
        }
      } else {
        setResult("Please add job description");
      }
    } else {
      setResult("Please fill all required fields*");
    }
  };

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "farrahqa");
    data.append("cloud_name", "dtiuiyrdu");
    fetch("https://api.cloudinary.com/v1_1/dtiuiyrdu/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  //function to create the post
  const addPost = () => {
    axios
      .post(
        "http://localhost:5000/jobs/create/post",
        {
          title,
          description,
          url,
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
      .then(() => {
        navigate("/jobs");
      })
      .catch((error) => {
        error.response.data.message
          ? setResult("Please fill all required fields*")
          : setResult("");
      });
  };

  return (
    <div className="postContainer">
      <h3>Create your post</h3>
      {result ? <label>Job title*</label> : <label>Job title</label>}

      <input
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

      <label>Image description</label>

      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      ></input>
      <button onClick={uploadImage}>Upload</button>

      <h5>Uploaded image will be displayed here</h5>
      <img src={url} />
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
      <button onClick={checkPost}>Submit</button>
      <div className="note">
        <h5>Note :</h5>
        <p>
          - Experience default value : Entry-level
          <br />
          - Remote default value : No
          <br />- Available default value : Yes
        </p>
      </div>
      <p className={result ? "wrong" : ""}>{result}</p>
    </div>
  );
};

export default CreatePost;
