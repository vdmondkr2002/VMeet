import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Container, Paper, Avatar, Button, Typography, Grid } from "@material-ui/core";
import CallPageFooter from "./CallPageFooter/CallPageFooter";
import JoiningPage from "../JoiningPage/JoiningPage.js"
import ReactPlayer from 'react-player'
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ADD_CONN, SET_AUDIOTRACK, SET_SOCKETID, SET_STREAM, SET_VIDEOTRACK } from "../../constants/actions";
import People from "./PeopleDrawer/People";
import Chat from "./ChatDrawer/Chat";
import Info from "./InfoDrawer/Info";
import useStyles from "./styles";
import { letterSpacing } from "@material-ui/system";
import { useBeforeunload } from 'react-beforeunload';


const CallPage = () => {
    /*
      States and Varaibles Initializaitons
      */

    const classes = useStyles();
    const dispatch = useDispatch();
    const myStream = useRef();
    const mySocket = useRef()
    const history = useHistory();
    const profile = useSelector((state) => state.profile);
    const user = useSelector((state) => state.user);
    const [isJoined, setIsJoined] = useState(false);
    const [usersInCall, setUsersInCall] = useState([])
    // const server_url = "https://meetv-v1.herokuapp.com/";
    const server_url = "localhost:5000"; //URL Where room will be created
    var connections = {}; //Stores all the users(connections) joined
    // const connections = useSelector(state=>state.connections)
    var senders = {};
    // connection = Reducer
    var socket = null; //To initialize socket in the client Side
    //File

    var socketId = null; //To store socket's Id ,later used for comparing
    //User.sockerId

    var elms = 0; //No. of users Joined the meet
    //call.elems
    const [peopleOpen, setPeopleOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);


    useEffect(() => {
        if (mySocket.current && isJoined) {
            if (!user.videoOn) {
                console.log(mySocket.current.id)
                // console.log(connections)
                // connections[mySocket.current.id].removeTrack(senders[mySocket.current.id])
                console.log("video turning off request sent")
                mySocket.current.emit("video-off", window.location.href)
            } else {
                if (user.clicked !== 0) {
                    console.log(user.clicked)
                    console.log("video turn on request sent")
                    mySocket.current.emit("video-on", window.location.href)

                }


                // console.log(mySocket.current.id)
                // console.log("video turning on request sent")

            }
        }
    }, [isJoined, user.videoOn])





    useEffect(() => {
        if (isJoined && mySocket.current) {
            console.log("i am called1")
            // myStream.current.srcObject = user.stream
            // setVideoStreams([...videoStreams,user.stream])
            setUsersInCall([...usersInCall, mySocket.current.id])
        }
    }, [isJoined])

    useEffect(() => {
        console.log(usersInCall)
    }, [usersInCall])

    useEffect(() => {
        console.log("i am called2")
        var vid;
        if(mySocket.current)
            vid = document.getElementById(usersInCall[usersInCall.indexOf(mySocket.current.id)]);
        if (isJoined && usersInCall.length === 1 && vid) {
            vid.srcObject = user.stream
        }
    }, [usersInCall])

    useBeforeunload(() => {
        "Are you sure to End this Call?"
        handleEndCall();
    });
    // window.addEventListener("beforeunload", (ev) => 
    // {  
    //     handleEndCall();
    // });
    const connectToSocketServer = async () => {
        //connects to the socket
        socket = io.connect(server_url, { secure: true });
        mySocket.current = socket;
        //Whenver signal event is emmitted from server fire gotMessageServer with sender's Id and his/her localDescription
        socket.on("signal", (fromId, message) => {
            console.log("GOT SIGNAL");
            gotMessageFromServer(fromId, message);
        });






        //Events involved while connecting...

        socket.on("connect", () => {
            //emits join call event with the URL
            socket.emit("join-call", window.location.href);

            //Store Socket's Id as SocketId
            socketId = socket.id;


            socket.on('user-left', (id) => {
                console.log("userLeftL " + id)
                // const users = [...usersInCall]
                // const index = users.indexOf(id)
                // if (index !== -1) {
                //     users.splice(index, 1);
                //     setUsersInCall(users)
                // }
                setUsersInCall(usersInCall=>usersInCall.filter(socId=>socId!==id))
                // var video = document.getElementById(id)
                // video.parentNode.parentNode.removeChild(video.parentNode)
                //   console.log(usersInCall)
                //   console.log(connections)
                //   delete connections[id];
                //   console.log(connections)
                //   delete senders[id];

            })
            //Events when user is joined
            /**
             * This event is emmited from server when user joins the call
             * which sends id of the user joined and all the people present in the meet
             */
            socket.on("user-joined", async (id, clients) => {
                console.log("user joined :" + id)
                console.log(clients);
                console.log(usersInCall)
                setUsersInCall(clients)
                console.log("i am called4")
                setUsersInCall([...usersInCall, id]);
                usersInCall.push(id);
                //For every Client/person in the meet make a new RTCPeerConnection
                clients.forEach((socketListId) => {

                    // dispatch({type:ADD_CONN,payload:{socketId:socketListId,peer:new RTCPeerConnection(
                    //     peerConnectionConfig
                    // )}})
                    connections[socketListId] = new RTCPeerConnection(
                        peerConnectionConfig
                    );
                    // console.log(connections[socketListId]);
                    // Wait for their ice candidate
                    /*
                    * This happens whenever the local ICE agent needs to deliver a message to the other peer
                    *  through the signaling server.
                    * Once connection is established between two peers ,they communicate through ice candidates
                    */

                    connections[socketListId].onicecandidate = async (event) => {
                        if (event.candidate != null) {
                            console.log(event.candidate)
                            await socket.emit(
                                "signal",
                                socketListId,
                                JSON.stringify({ "ice": event.candidate })
                            );
                        }
                    };

                    /**
                     * Now Showing Video Stream of all the users in on my screen
                    */
                    connections[socketListId].ontrack = (event) => {
                        console.log("ontrack function called" + socketListId)
                        console.log(event.streams[0]);
                        var searchVideo = document.querySelector(
                            `[data-socket="${socketListId}"]`
                        );
                        console.log(usersInCall)
                        if (searchVideo !== null) {
                            console.log("Not null")
                            // if i don't do this check it make an empyt square
                            // console.log(searchVideo);
                            searchVideo.srcObject = event.streams[0]; //currStream
                        } else {
                            console.log("null")
                            // setVideoStreams([...videoStreams,event.streams[0]])
                            console.log("i am called3")
                            setUsersInCall([...usersInCall, socketListId]);
                            usersInCall.push(socketListId)
                            // videoStreams.push(event.streams[0])
                            console.log("creating new video....");

                            //Stream assigned to video
                            // console.log(video);
                            // elms = clients.length;
                            // let main = document.getElementById("main");
                            // let video = document.createElement("video");
                            // video.style.setProperty("width", "400px");
                            // video.style.setProperty("border", "5px solid #1a73e8");
                            // video.style.setProperty("border-radius", "20px");
                            // video.style.setProperty("margin", "1    0px");
                            // video.setAttribute("data-socket", socketListId);
                            // //Stream assigned to video
                            // video.srcObject = event.streams[0];
                            // video.autoplay = true;
                            // video.playsinline = true;
                            // main.style.setProperty("display", "grid");
                            // main.style.setProperty("width", "1000px");
                            // main.style.setProperty("grid-template-columns", "auto auto auto");
                            // main.appendChild(video);
                            // console.log(video);
                        }
                    };

                    connections[socketListId].onremoveTrack = (e) => {
                        console.log("event happened")
                    }

                    // Add the local video stream
                    if (window.localStream !== undefined && window.localStream !== null) {
                        console.log("local Stream is working")
                        window.localStream?.getTracks().forEach((track) => {
                            senders[socketListId] = connections[socketListId].addTrack(track, window.localStream);
                        });
                    } else {
                        console.log("local stream is stopped")
                        let video = document.getElementsById("my-id");
                        video.style.setProperty("background", "black");
                        video.style.setProperty("border", "1px solid green");
                        // window.localStream?.getTracks().forEach((track) => {
                        //     connections[socketListId].addTrack(track, window.localStream);
                        // });

                    }

                });


                /**
                 * Above code is to display All user's stream to me
                 * Now what every other user will see ?
                 * following code does just that
                 */

                if (id === socketId) {
                    console.log(connections);
                    // for(let id in connections){
                    //     if(id===socketId) continue;
                    //     try {
                    //         connections[id].removeTrack(senders[id])
                    //     } catch (e) {
                    //         console.log(e.message);
                    //     }
                    // }
                    for (let id2 in connections) {
                        if (id2 === socketId) continue;
                        console.log(window.localStream.getAudioTracks())
                        try {
                            window.localStream.getTracks().forEach((track) => {
                                connections[id2].addTrack(track, window.localStream);
                                console.log(connections[id2]);
                            });
                        } catch (e) {
                            console.log(e.message);
                        }

                        connections[id2].createOffer().then((description) => {
                            connections[id2]
                                .setLocalDescription(description)
                                .then(() => {
                                    socket.emit(
                                        "signal",
                                        id2,
                                        JSON.stringify({ sdp: connections[id2].localDescription })
                                    );
                                })
                                .catch((e) => console.log(e));
                        });
                        console.log(connections);
                    }
                }
                
            });


        socket.on("video-off", async (id, clients) => {
            console.log(connections)
            // connections[id].removeTrack(senders[id])
            // connections[id]=null;
            var searchVideo = document.getElementById(id);
            console.log(searchVideo)
            searchVideo.srcObject = null
            searchVideo.style.setProperty("background", "black");
            searchVideo.style.setProperty("border", "5px solid #1a73e8");
            searchVideo.style.setProperty("width", "100%");
            searchVideo.style.setProperty("height", "100%");
        })

        socket.on("video-on", async (id, clients) => {
            console.log(connections)
            console.log(senders)
            // window.localStream = user.stream;
            console.log(window.localStream)
            for (let id in connections) {
                if (id === socketId) continue;
                try {
                    connections[id].removeTrack(senders[id])
                } catch (e) {
                    console.log(e.message);
                }
            }
            console.log("after")
            console.log(connections)
            console.log(senders)
            // console.log(senders)
            for (let id2 in connections) {
                if (id2 === socketId) continue;

                try {
                    window.localStream.getTracks().forEach((track) => {
                        senders[id2] = connections[id2].addTrack(track, window.localStream);
                        console.log(connections[id2]);
                    });
                } catch (e) {
                    console.log(e.message);
                }

                connections[id2].createOffer().then((description) => {
                    connections[id2]
                        .setLocalDescription(description)
                        .then(() => {
                            socket.emit(
                                "signal",
                                id2,
                                JSON.stringify({ sdp: connections[id2].localDescription })
                            );
                        })
                        .catch((e) => console.log(e));
                });
                console.log(connections);
            }

        })





    });
};

/* 
   * Following Function takes the currStream, 
      Stops previous streams if any and add currstreams all the tracks to all the connections (people) by using for loop 
   *  
   */
const getUserMediaSuccess = (stream) => {
    console.log("I am in getUserMedia success")
    try {
        if (window.localStream) {
            console.log("devices found")
            window.localStream.getTracks().forEach((track) => track.stop());
        }

    } catch (e) {
        console.log(e);
    }

    window.localStream = stream; //store curremt stream to winow.localstream  (?)
    // myStream.current.srcObject = stream;

    console.log(window.localStream);
    for (let id in connections) {
        // if (id === socketId) continue; //If one user is already in connections, then don't add him/her
        console.log(window.localStream);
        console.log("I am here")
        window.localStream?.getTracks().forEach((track) => {
            //Add Audio and videoTracks to all the connections
            connections[id].addTrack(track);
            console.log(connections[id]);
        });

        //Creating a Offer/Call and settting description of that offer as the local Descritio.
        //emit my local Information to the socket and eventually to all the users as a SDP (session Description Protocol)

        // Change : Call Back Async Await

        connections[id].createOffer().then((description) => {
            connections[id]
                .setLocalDescription(description)
                .then(() => {
                    //Sends every Peer Current user's Description
                    socket.emit(
                        "signal",
                        id,
                        JSON.stringify({ sdp: connections[id].localDescription })
                    );
                })
                .catch((e) => console.log(e));
        });
    }
    // stream.getTracks().forEach(track => track.onended = () => {
    //     try {
    //         let tracks = myStream.current.srcObject.getTracks()
    //         tracks.forEach(track => track.stop())
    //     } catch (e) { console.log(e) }
    //     console.log("Now here")
    //     window.localStream = null
    //     myStream.current.srcObject = window.localStream
    // })

};

/*Config required to make Peer Connection */
const peerConnectionConfig = {
    'iceServers': [
        // { 'urls': 'stun:stun.services.mozilla.com' },
        { urls: "stun:stun.l.google.com:19302" },
    ],
};

/*  This Function Will Execute when one user gets "Message"(means description of other user as SDP) from the socket
     from ID : Whose description
    Message : Description SDP
*/
//Message and FromId = Redux
const gotMessageFromServer = (fromId, message) => {
    //since we emmitted message as string we parse it and store it in some object
    var signal = JSON.parse(message);

    if (fromId !== socketId) {
        //Doubt about this check

        //If Message's sdp exists then set that Description as Remote Description of of curr user

        if (signal?.sdp) {
            //Setting Remote Description
            connections[fromId]
                .setRemoteDescription(new RTCSessionDescription(signal.sdp))
                .then(() => {
                    //Checking is if is of type offer
                    if (signal.sdp.type === "offer") {
                        //If it is off type offer then create answer
                        connections[fromId]
                            .createAnswer()
                            .then((description) => {
                                //and set that ans as curr users local description
                                connections[fromId]
                                    .setLocalDescription(description)
                                    .then(() => {
                                        //Creating curr users local Description and storing it as local sdp
                                        //and emmiting so as to allow other users to store this as their remote description
                                        socket.emit(
                                            "signal",
                                            fromId,
                                            JSON.stringify({
                                                sdp: connections[fromId].localDescription,
                                            })
                                        );
                                    })
                                    .catch((e) => console.log(e));
                            })
                            .catch((e) => console.log(e));
                    }
                })
                .catch((e) => console.log(e));
        }
        //
        if (signal.ice) {
            connections[fromId]
                .addIceCandidate(new RTCIceCandidate(signal.ice))
                .catch((e) => console.log(e));
        }
    }
};
/*  Main Function to handle socket Events */

const handleEndCall = () => {

    try {
        let tracks = myStream.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())

    } catch (e) { }
    window.location.reload();
    console.log("call ended");
};



const handleJoin = async () => {
    setIsJoined(true);
    // await initWebRTC();
    getUserMediaSuccess(user.stream);
    connectToSocketServer();
};


return (
    <div className={classes.root}>
        {!isJoined ?
            (
                <>
                    <JoiningPage handleJoin={handleJoin} />
                </>
            )
            :
            (<Container
                className={clsx(classes.content, {
                    [classes.contentShift]: peopleOpen || chatOpen || infoOpen,
                })}
            >

                <Grid container className={classes.usersCont} spacing={2}>
                    {
                        usersInCall.map((socId, index) => (
                            <Grid item sm={6} xs={12} className={classes.userCont}>
                                {/* <ReactPlayer playsinline muted className={user.videoOn?classes.myVid:classes.offvideo} autoPlay url={stream}/> */}
                                <video data-socket={socId} id={socId} playsInline className={user.videoOn ? classes.video : classes.offvideo} muted={socId === mySocket.current.id} autoPlay />
                                {
                                    !user.videoOn ? (
                                        <Paper className={classes.userPaper}>
                                            <Avatar src={profile?.profilePic} className={clsx(classes.largeAvatar)} alt={profile?.userName}>
                                                {profile?.firstName?.charAt(0)} {profile?.lastName?.charAt(0)}
                                            </Avatar>
                                            <div className={classes.bottomline}>
                                                <Typography variant="body1">
                                                    {profile.name}
                                                </Typography>
                                            </div>

                                        </Paper>
                                    ) : null
                                }
                            </Grid>
                        ))
                    }
                </Grid>
                {/* {

                              !user.videoOn?(
                                  <Paper className={classes.userPaper}>
                                      <Avatar src={profile?.profilePic} className={clsx(classes.largeAvatar)} alt={profile?.userName}>
                                              {profile?.firstName?.charAt(0)} {profile?.lastName?.charAt(0)}
                                      </Avatar>
                                      <div className={classes.bottomline}>
                                          <Typography variant="body1">
                                              {profile.name}
                                          </Typography>
                                      </div>
                                      
                                  </Paper>
                              ):null
                          } */}
                {/* <Paper className={classes.userPaper}> */}
                {/* User 1 */}{/* </Paper> */}
                {/* {!user.videoOn ? (
                        <Paper className={classes.userPaper}>
                            <Avatar
                                src={profile?.profilePic}
                                className={clsx(classes.largeAvatar)}
                                alt={profile?.userName}
                            >
                                {profile?.firstName?.charAt(0)} {profile?.lastName?.charAt(0)}
                            </Avatar>
                        </Paper>
                    ) : null}
                    <div id="main">
                        <video id="my-video" ref={myStream} className={classes.myVid} autoPlay muted></video>
                    </div> */}
                <div className={classes.drawerHeader} />
                {/* <div>
                      <Button style={{fontSize:"30px",padding:"10px"}} color="secondary" onClick={handleEndCall}>
                        Leave
                      </Button>
                    </div> */}
                <CallPageFooter
                    handleEndCall={handleEndCall}
                    myStream={myStream}
                    peopleOpen={peopleOpen}
                    infoOpen={infoOpen}
                    chatOpen={chatOpen}
                    setPeopleOpen={setPeopleOpen}
                    setInfoOpen={setInfoOpen}
                    setChatOpen={setChatOpen}
                    socketId={mySocket.current.id}
                />
            </Container>
            )}
        <Info open={infoOpen} setDrawerOpen={setInfoOpen} />
        <People open={peopleOpen} setDrawerOpen={setPeopleOpen} />
        {/* <Info open={infoOpen} setDrawerOpen={setInfoOpen} /> */}
        <Chat open={chatOpen} setDrawerOpen={setChatOpen} />

    </div>

);
};

export default CallPage;


/*
   * This function will be called when page refreshed  and when new user joins
      Takes Users Media and set it as curr Stream
      call getMediaSucccess which sets currStream as localStream i.e window.localStream and creates offer and set its Localdescription
   */
// const initWebRTC = async () => {
  //   const currStream = await navigator.mediaDevices.getUserMedia({
  //     audio: user.micOn,
  //     video: user.videoOn,
  //   });
  //   getUserMediaSuccess(currStream);
  //   dispatch({ type: SET_STREAM, payload: currStream });
  //   const audioTrack = currStream.getAudioTracks()[0];
  //   const videoTrack = currStream.getVideoTracks()[0];
  //   dispatch({type:SET_VIDEOTRACK,payload:videoTrack})
  //   dispatch({type:SET_AUDIOTRACK,payload:audioTrack})
  // };