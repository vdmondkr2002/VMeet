import React from "react";
import "./styles.css";
import { Button,Link } from "@material-ui/core";

const HomePage = () => {
  return (
    <>
      <div className="main1">
        <div className="left">
          <div className="YpQfNc">
            Premium video meetings. Now free for everyone.
          </div>
          <div className="rH9mRb">
            We re-engineered the service we built for secure business meetings,
            Google Meet, to make it free and available for all.
          </div>
        </div>
        <Link to="/join"><Button>Joining Page</Button></Link>
        <div className="right">Right</div>
      </div>
    </>
  );
};

export default HomePage;
