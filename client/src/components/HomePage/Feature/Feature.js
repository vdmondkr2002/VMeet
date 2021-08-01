import React from "react";
import "./styles.css";
import { Grid } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhoneIcon from "@material-ui/icons/Phone";

const Feature = () => {
  return (
    <>
      <section id="feature">
        <div>
          <div className="feat bg-gray pt-5 pb-5">
            <div className="container">
              <div className="row">
                <div className="section-head col-sm-12">
                  <h4>
                    <span>What we</span> Offer?
                  </h4>
                  <p>
                    We're here to help you connect, communicate, and express
                    <br />
                    your ideas so you can get more done together.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div style={{ margin: "20px" }}>
            <Grid
              container
              justifyContent="space-evenly"
              alignItems="center"
              spacing={3}
            >
              <Grid lg={3} sm={6}>
                <div className="item">
                  <span className="icon feature_box_col_one ">
                    <ChatIcon fontSize="large" />
                  </span>
                  <h6>Chat</h6>
                  <p>
                    Included with your account, our chat solution simplifies
                    workflows, boosts productivity, and ensures employees can
                    collaborate securely, both internally and externally.
                  </p>
                </div>
              </Grid>
              <Grid lg={3} sm={6}>
                <div className="item">
                  <span className="icon feature_box_col_two">
                    <VideocamIcon fontSize="large" />
                  </span>
                  <h6>Meetings</h6>
                  <p>
                    Build stronger relationships, supercharge collaboration, and
                    create an engaging meeting experience with HD video and
                    audio for up to 256 participants.
                  </p>
                </div>
              </Grid>
              <Grid lg={3} sm={6}>
                <div className="item">
                  <span className="icon feature_box_col_three">
                    <PhoneIcon fontSize="large" />
                  </span>
                  <h6>Phone</h6>
                  <p>
                    Power your voice communications with our global cloud phone
                    solution with secure call routing, call queues, SMS, elevate
                    calls to meetings, and much more.
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      </section>
    </>
  );
};

export default Feature;
