import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./style.css";
import { AiFillCheckCircle } from "react-icons/ai";

const Contact = () => {
  const form = useRef();
  const [clicked, setClicked] = useState(false);
  const messageRef = useRef;

  const sendEmail = (e) => {
    e.preventDefault();
    messageRef.current = "Message successfully sent";
    setClicked(true);
    emailjs
      .sendForm(
        "service_lf3v54x",
        "template_i5tuqfa",
        form.current,
        "v_q8wmfnNcxmRpK5E"
      )
      .then(
        (result) => {
          setTimeout(() => {
            setClicked(false);
          }, 500);
        },
        (error) => {
          messageRef.current = "Message failed to sent";
        }
      );
  };

  return (
    <div className="contactContainer">
      <div className="emailSend">
        <h2>Stay close and contact us.</h2>
        <div className="contactInfo">
          <div>
            <h3>Phone : </h3>
            <h4>Mobile : +962-780000000</h4>
          </div>

          <form className="contactForm" ref={form} onSubmit={sendEmail}>
            <h3>Send a message for us :</h3>
            <label>Name</label>
            <input type="text" name="from_name" placeholder="Name" />
            <label>Email</label>
            <input type="email" name="user_email" placeholder="Email" />
            <label>Message</label>
            <textarea name="message" placeholder="write a message..." />
            <button type="submit" value="Send">
              Send
            </button>
          </form>
        </div>
      </div>
      <div className="contactBackground"></div>
      <div className={clicked ? "msgPos" : "msgPosHide"}>
        <div className="msgCenter">
          <p className="Message">{messageRef.current}</p>
          <AiFillCheckCircle className="correct" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
