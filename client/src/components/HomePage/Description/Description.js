import React, { useState,useEffect } from "react";
import { useHistory } from "react-router";
import Button from "@material-ui/core/Button";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import useStyles from "./styles.js";
import Carousel from "react-material-ui-carousel";
import descData from "./descData.js";
import KeyboardIcon from "@material-ui/icons/Keyboard";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import {useDispatch,useSelector} from 'react-redux'
import { Typography, Grid } from "@material-ui/core";
import {createLink,joinCall1} from '../../../actions/call'
import MeetDialog from '../MeetDialog/MeetDialog'
import Alert from '../../Utils/Alert'

const Description = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch()
  const [code, setCode] = useState("");
  const call = useSelector(state => state.call)
  const alert = useSelector(state => state.alert)
  const profile = useSelector(state => state.profile)
  const user = useSelector(state => state.user)
  const [openDialog,setOpenDialog] = useState(false)
  const [openAlert,setOpenAlert] = useState(false)

  useEffect(()=>{
    if(call.code){
      setOpenDialog(true)
    }
  },[call.code])

  useEffect(()=>{
    if(alert.msg){
      setOpenAlert(true)
    }
  },[alert.msg])

  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };

  const handleJoin = () => {
    history.push("/join");
  };

  const createNewMeet = ()=>{
    dispatch(createLink())
  }

  const handleClickJoinMeet = ()=>{
    console.log("Joining...")
    history.push(`${code}`);
    window.location.reload();
    dispatch(joinCall1(history,code,profile._id))
    
  }

  const Item = (props) => {
    return (
      <div className={`${classes.card} ${classes.frontCard}`}>
        <img src={props.item.img} alt="user" className={classes.img} />
        <Typography component="span" align="center" variant="h5">
          {props.item.heading}
        </Typography>
        <Typography
          component="span"
          align="center"
          variant="subtitle1"
          style={{ padding: "0 0.25rem" }}
        >
          {props.item.subHeading}
        </Typography>
      </div>
    );
  };

  return (
    <>
      <section id="description">
        <Alert vertical='bottom' horizontal='left' openAlert={openAlert} setOpenAlert={setOpenAlert} />
        <MeetDialog open={openDialog} code={call.code} setOpen={setOpenDialog}/>
        <div style={{ margin: "10px auto" }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item sm={6} xs={12}>
              <div className={classes.left}>
                <div className={classes.YpQfNc}>
                  Premium video meetings. Now free for everyone.
                </div>
                <div className={classes.rH9mRb}>
                  We re-engineered the service we built for secure business
                  meetings, Google Meet, to make it free and available for all.
                </div>

                <Grid
                  container
                  spacing={3}
                  alignItems="stretch"
                  justifyContent="flex-start"
                >
                  <Grid item sm={12} xs={12} md={6}>
                    <Button
                      fullwidth
                      variant="contained"
                      startIcon={<VideoCallIcon style={{ fontSize: "20px" }} />}
                      className={classes.buttoncolor}
                      onClick={createNewMeet}
                    >
                      <Typography className={classes.newmeeting}>
                        New Meeting
                      </Typography>
                    </Button>
                  </Grid>

                  <Grid item sm={12} xs={12} md={6}>
                    <FormControl
                      variant="outlined"
                      className={classes.codeinput}
                    >
                      <OutlinedInput
                        style={{ width: "100%", height: "50px" }}
                        value={code}
                        onChange={handleChangeCode}
                        placeholder="Enter a code"
                        startAdornment={
                          <InputAdornment position="start">
                            <KeyboardIcon />
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <Button
                              disabled={!code}
                              className={classes.codearrow}
                              onClick={handleClickJoinMeet}
                            >
                              Join
                            </Button>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item sm={6} xs={12}>
              <div className={classes.right}>
                <Carousel
                  indicators={true}
                  animation="fade"
                  autoPlay={true}
                  interval={10000}
                  stopAutoPlayOnHover={false}
                  navButtonsAlwaysInvisible={true}
                >
                  {descData.map((item, index) => (
                    <Item key={index} item={item} />
                  ))}
                </Carousel>
              </div>
            </Grid>
          </Grid>
        </div>
      </section>
    </>
  );
};

export default Description;
