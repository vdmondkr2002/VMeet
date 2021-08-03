import React, { useEffect, useRef, useState } from "react";
import { Container, Grid, Paper, Avatar, Typography } from "@material-ui/core";
import useStyles from "./styles";
import CallPageFooter from "./CallPageFooter/CallPageFooter";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SET_STREAM } from "../../constants/actions";
import People from "./PeopleDrawer/People";
import Chat from "./ChatDrawer/Chat";

const CallPage = () => {
  const classes = useStyles();
  const myStream = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const initWebRTC = async () => {
    const currStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    dispatch({ type: SET_STREAM, payload: currStream });

    myStream.current.srcObject = currStream;
  };

  useEffect(() => {
    if (!user.isAdmin) {
      history.push("/join");
    }
  }, []);

  return (
    <>
      <div className={classes.main}>
        <Container
          className={clsx(classes.content, {
            [classes.contentShift]: peopleOpen || chatOpen,
          })}
        >
          <Grid container className={classes.usersCont} spacing={2}>
            <Grid item sm={6} xs={12} className={classes.userCont}>
              <video
                playsInline
                className={user.videoOn ? classes.video : classes.offvideo}
                muted
                ref={myStream}
                autoPlay
              />
              {!user.videoOn ? (
                <Paper className={classes.userPaper}>
                  <Avatar
                    src={profile?.profilePic}
                    className={clsx(classes.largeAvatar)}
                    alt={profile?.userName}
                  >
                    {profile?.firstName?.charAt(0)}{" "}
                    {profile?.lastName?.charAt(0)}
                  </Avatar>
                  <div className={classes.bottomline}>
                    <Typography variant="body1">{profile.name}</Typography>
                  </div>
                </Paper>
              ) : null}
            </Grid>
            <Grid item sm={6} xs={12} className={classes.userCont}>
              <video
                playsInline
                className={user.videoOn ? classes.video : classes.offvideo}
                muted
                ref={myStream}
                autoPlay
              />
              {!user.videoOn ? (
                <Paper className={classes.userPaper}>
                  <Avatar
                    src={profile?.profilePic}
                    className={clsx(classes.largeAvatar)}
                    alt={profile?.userName}
                  >
                    {profile?.firstName?.charAt(0)}{" "}
                    {profile?.lastName?.charAt(0)}
                  </Avatar>
                </Paper>
              ) : null}
            </Grid>
            <Grid item sm={6} xs={12} className={classes.userCont}>
              <video
                playsInline
                className={user.videoOn ? classes.video : classes.offvideo}
                muted
                ref={myStream}
                autoPlay
              />
              {!user.videoOn ? (
                <Paper className={classes.userPaper}>
                  <Avatar
                    src={profile?.profilePic}
                    className={clsx(classes.largeAvatar)}
                    alt={profile?.userName}
                  >
                    {profile?.firstName?.charAt(0)}{" "}
                    {profile?.lastName?.charAt(0)}
                  </Avatar>
                </Paper>
              ) : null}
            </Grid>
            <Grid item sm={6} xs={12} className={classes.userCont}>
              <video
                playsInline
                className={user.videoOn ? classes.video : classes.offvideo}
                ref={myStream}
                autoPlay
              />
              {!user.videoOn ? (
                <Paper className={classes.userPaper}>
                  <Avatar
                    src={profile?.profilePic}
                    className={clsx(classes.largeAvatar)}
                    alt={profile?.userName}
                  >
                    {profile?.firstName?.charAt(0)}{" "}
                    {profile?.lastName?.charAt(0)}
                  </Avatar>
                </Paper>
              ) : null}
            </Grid>
          </Grid>
          <div className={classes.drawerHeader} />
        </Container>
        <People open={peopleOpen} setDrawerOpen={setPeopleOpen} />
        <Chat open={chatOpen} setDrawerOpen={setChatOpen} />
        <CallPageFooter
          peopleOpen={peopleOpen}
          setChatOpen={setChatOpen}
          setPeopleOpen={setPeopleOpen}
          myStream={myStream}
        />
      </div>
    </>
  );
};

export default CallPage;

// stop both mic and camera
// function stopBothVideoAndAudio(stream) {
//     stream.getTracks().forEach(function(track) {
//         if (track.readyState == 'live') {
//             track.stop();
//         }
//     });
// }

// // stop only camera
// function stopVideoOnly(stream) {
//     stream.getTracks().forEach(function(track) {
//         if (track.readyState == 'live' && track.kind === 'video') {
//             track.stop();
//         }
//     });
// }

// // stop only mic
// function stopAudioOnly(stream) {
//     stream.getTracks().forEach(function(track) {
//         if (track.readyState == 'live' && track.kind === 'audio') {
//             track.stop();
//         }
//     });
// }
