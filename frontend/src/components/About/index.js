import React from "react";
import "./style.css";
const About = () => {
  return (
    <div className="About">
      <div className="AboutUs">
        <div className="centerAbout">
          <div className="AboutFirstMsg">
            <h1>What is this site for?</h1>
            <h4>
              Seeker is a job search site. Cares to put job seekers first,
              giving them free access to search for jobs, apply to jobs, and
              research companies.
              <br />
              Also we help companies to share their job opportunities.
            </h4>
          </div>
          <div className="AboutSecondMsg">
            <h1>Who is this site for?</h1>
            <h4>
              This project developed by Farah Qandalaft and guided by MERAKI
              Academy.
            </h4>
          </div>
        </div>
      </div>
      <div className="backgroundAbout"></div>
    </div>
  );
};

export default About;
