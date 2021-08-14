import React, { useEffect, useRef, useState,useMemo } from "react";
import io from "socket.io-client";
import { Container, Paper, Avatar, Button, Typography, Grid } from "@material-ui/core";
import CallPageFooter from "./CallPageFooter/CallPageFooter";
import JoiningPage from "../JoiningPage/JoiningPage.js"
import ReactPlayer from 'react-player'
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ADD_CONN, SET_AUDIOTRACK, SET_SOCKETID, SET_STREAM, SET_USERS, SET_USER_LEFT, SET_VIDEOTRACK, SET_VIDEO_OFF, SET_VIDEO_ON } from "../../constants/actions";
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
    // const myStream = useRef(null);
    const mySocket = useRef(null)
    const history = useHistory();
    const profile = useSelector((state) => state.profile);
    const user = useSelector((state) => state.user);
    const [isJoined, setIsJoined] = useState(false);
    // const [usersInCall, setUsersInCall] = useState([])
    const usersInCall = useSelector(state=>state.usersInCall)
    const [userVidToChange,setUserVidToChange] = useState("")
    // const server_url = "https://meetv-v1.herokuapp.com/";
    // var users = []
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
        console.log("Handling my video")
        console.log(mySocket.current)
        if (mySocket.current!==null && isJoined) {
            if (!user.videoOn) {
                console.log("Helo")
                console.log(mySocket.current.id)
                // console.log(connections)
                // connections[mySocket.current.id].removeTrack(senders[mySocket.current.id])
                console.log("video turning off request sent")
                mySocket.current.emit("video-off", window.location.href)
                console.log(user.videoOn)
                // setUserVidToChange(mySocket.current.id)
                console.log(usersInCall.map(user=>user.id===mySocket.current.id?{...user,videoOn:false}:user))
                // setUsersInCall(usersInCall.map(user=>user.id===mySocket.current.id?{...user,videoOn:false}:user))
                dispatch({type:SET_VIDEO_OFF,payload:mySocket.current.id})
                // let ind= users.findIndex(user=>user.id===mySocket.current.id)
                // console.log(users)
                // users[ind].videoOn = false
            } else {
                console.log("Helo")
                if (user.clicked !== 0) {
                    console.log(user.clicked)
                    console.log("video turn on request sent")
                    mySocket.current.emit("video-on", window.location.href)
                    // setUserVidToChange(mySocket.current.id)
                    // let ind = users.findIndex(user=>user.id===mySocket.current.id)
                    // setUsersInCall(usersInCall.map(user=>user.id===mySocket.current.id?{...user,videoOn:true}:user))
                    dispatch({type:SET_VIDEO_ON,payload:mySocket.current.id})
                    // users[ind].videoOn = true
                }
 
            }
        }
    }, [isJoined, user.videoOn])
 


 
    useEffect(() => {
        console.log(usersInCall)
        // console.log(users)
    }, [usersInCall])
    
    
    useEffect(() => {
        console.log("i am called2")
        var vid;
        
        if(mySocket.current){
            var ind = usersInCall.findIndex(user=>user.id===mySocket.current.id)
            if(ind!==-1){
                vid = document.getElementById(usersInCall[ind].id);
            }
        }
            
        console.log(vid)
        if (isJoined && usersInCall.length === 1 && vid) {
            console.log(user.stream)
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
            socket.emit("join-call", window.location.href,profile.name,profile.profilePic,user.videoOn);
 
            //Store Socket's Id as SocketId
            socketId = socket.id;
 
 
            socket.on('user-left', (id) => {
                console.log("userLeft: " + id)
                // const index = users.indexOf({id:id})
                // if (index !== -1) {
                //     users.splice(index, 1);
                //     setUsersInCall(users)
                // }
                dispatch({type:SET_USER_LEFT,payload:id})
                
                // setUsersInCall(usersInCall=>usersInCall.filter(socId=>socId!==id))
                // var video = document.getElementById(id)
                // video.parentNode.parentNode.removeChild(video.parentNode)
                //   console.log(usersInCall)
                  delete connections[id];
                  delete senders[id];
 
            })
            //Events when user is joined
            /**
             * This event is emmited from server when user joins the call
             * which sends id of the user joined and all the people present in the meet
             */
            socket.on("user-joined", async (id, clients,name,profilePic,videoOn) => {
                console.log("user joined :" + id)
                console.log(clients);
                
                console.log(usersInCall)
                console.log("i am called4")
                // setUsersInCall([...users,id])
                // setUsersInCall([...users, {id,name,profilePic,videoOn}]);
                dispatch({type:SET_USERS,payload:{id,name,profilePic,videoOn}})
                // users.push({id,name,profilePic,videoOn})
                // users.push(id)
                // usersInCall.push({id,name,profilePic,videoOn});
                // usersInCall.push(id)
                //For every Client/person in the meet make a new RTCPeerConnection
                clients.forEach(({socketListId,name,profilePic,videoOn}) => {
                    console.log(socketListId,name,profilePic,videoOn)
                    connections[socketListId] = new RTCPeerConnection(
                        peerConnectionConfig
                    );
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
                        console.log(event)
                        console.log(event.track)
                        console.log(event.track.muted)
                        console.log("ontrack function called" + socketListId)
                        // console.log(event.streams[0]);
                        // console.log(event.streams[0].getVideoTracks()[0])
                        let muted = event.streams[0].getVideoTracks()[0].muted
                        var searchVideo = document.querySelector(
                            `[data-socket="${socketListId}"]`
                        );
                        if (searchVideo !== null) {
                            console.log("Not null")
                            console.log(muted)
                            if(!muted)
                            dispatch({type:SET_VIDEO_ON,payload:socketListId})  
                            
                            searchVideo.srcObject = event.streams[0];//currStream
                        } else {
                            console.log("null")
                            // setVideoStreams([...videoStreams,event.streams[0]])
                            console.log("i am called3")
                            // setUsersInCall([...users, {id:socketListId,name,profilePic,videoOn}]);
                            dispatch({type:SET_USERS,payload:{id:socketListId,name,profilePic,videoOn}})
                            // users.push({id:socketListId,name,profilePic,videoOn})
                            // usersInCall.push({id:socketListId,name,profilePic,videoOn})
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

                    connections[socketListId].onmute = (e)=>{
                        console.log("muted")
                    }
 
 
                    // Add the local video stream
                    if (window.localStream !== undefined && window.localStream !== null) {
                        console.log("local Stream is working")
                        window.localStream?.getTracks().forEach((track) => {
                            senders[socketListId] = connections[socketListId].addTrack(track, window.localStream);
                        });
                    } else {
                        console.log("local stream is stopped")
                        // let video = document.getElementById("my-id");
                        // video.style.setProperty("background", "black");
                        // video.style.setProperty("border", "1px solid green");
                        // // window.localStream?.getTracks().forEach((track) => {
                        // //     connections[socketListId].addTrack(track, window.localStream);
                        // // });
 
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
                        // console.log(window.localStream.getAudioTracks())
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
 
 
        socket.on("video-off", async (id) => {
            console.log(id+"turned off video")
            console.log(connections)
                console.log(usersInCall)
                // connections[id].removeTrack(senders[id])
                // connections[id]=null;
                var searchVideo = document.getElementById(id);
                console.log(searchVideo)
                if(searchVideo){
                    searchVideo.srcObject = null
                    // setUsersInCall(usersInCall.map(user=>user.id===id?{...user,videoOn:false}:user))
                    dispatch({type:SET_VIDEO_OFF,payload:id})
                    // setUserVidToChange(id);
                    // var ind= users.findIndex(user=>user.id===mySocket.current.id)
                    // users[ind].videoOn = false
                    // usersInCall.filter(user=>user.id===id)[0].videoOn =false
                    // searchVideo.style.setProperty("background", "black");
                    searchVideo.style.setProperty("border", "5px solid #1a73e8");
                    searchVideo.style.setProperty("width", "100%");
                    searchVideo.style.setProperty("height", "100%");
                }
                
        })
 
        socket.on("video-on", async (id, clients) => {
            console.log(connections)
            console.log(senders)
            
            // window.localStream = user.stream;
            console.log(window.localStream.getVideoTracks()[0])
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
                        console.log(track)
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

    // window.localStream = stream; //store curremt stream to winow.localstream  (?)
    // myStream.current.srcObject = stream;
 
    
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
 
    // try {
    //     // let tracks = myStream.current.srcObject.getTracks()
    //     tracks.forEach(track => track.stop())
 
    // } catch (e) { }
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
                        usersInCall.map(({id:socId,name,profilePic,videoOn}, index) => (
                            <Grid item sm={6} xs={12} className={classes.userCont}>
                                {/* <ReactPlayer playsinline muted className={user.videoOn?classes.myVid:classes.offvideo} autoPlay url={stream}/> */}
                                <video data-socket={socId} id={socId} playsInline className={videoOn ? classes.video : classes.offvideo} muted={socId === mySocket.current.id} autoPlay />
                                {
                                    !videoOn ? (
                                        <Paper className={classes.userPaper}>
                                            <Avatar src={profilePic} className={clsx(classes.largeAvatar)} alt={name}>
                                                {/* {profile?.firstName?.charAt(0)} {profile?.lastName?.charAt(0)} */}
                                                {name}
                                            </Avatar>
                                            <div className={classes.bottomline}>
                                                <Typography variant="body1">
                                                    {name}
                                                </Typography>
                                            </div>
 
                                        </Paper>
                                    ) : null
                                }
                            </Grid>
                        ))
                    }
                </Grid>
               
                <div className={classes.drawerHeader} />
               
                <CallPageFooter
                    handleEndCall={handleEndCall}
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
