// import io from 'socket.io-client'
// const server_url = "localhost:5000";
// var connections = {}
// var socket = null;
// var socketId = null;
// var elms = 0;


// const peerConnectionConfig = {
//     'iceServers': [
//         // { 'urls': 'stun:stun.services.mozilla.com' },
//         { 'urls': 'stun:stun.l.google.com:19302' },
//     ]
// }
// const gotMessageFromServer = (fromId, message) => {
//     console.log("fromId")
//     console.log(fromId)
//     console.log(message)
//     console.log("Signal REceived from server")

//     var signal = JSON.parse(message)


//     if (fromId !== socketId) {
//         if (signal?.sdp) {
//             connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
//                 if (signal.sdp.type === 'offer') {
//                     connections[fromId].createAnswer().then((description) => {
//                         connections[fromId].setLocalDescription(description).then(() => {
//                             socket.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
//                         }).catch(e => console.log(e))
//                     }).catch(e => console.log(e))
//                 }
//             }).catch(e => console.log(e))
//         }

//         if (signal?.ice) {
//             connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
//         }   
//     }
// }

// export const connectToSocketServer = async () => {
//         console.log("Joined")
//         socket = io.connect(server_url, { secure: true })
    
        
//         socket.on('signal', (fromId,message) =>{
//             console.log("GOT SIGNAL")
//             gotMessageFromServer(fromId,message)
//         })
//         socket.on('connect', () => {
//             console.log("Connecting... ")
//             socket.emit('join-call', window.location.href)
//             socketId = socket.id
           
//             socket.on('user-joined', async (id, clients) => {
//                 console.log(id)
//                 console.log(clients)
//                 clients.forEach((socketListId) => {
//                     connections[socketListId] = new RTCPeerConnection(peerConnectionConfig)
//                     console.log(connections[socketListId])
//                     // Wait for their ice candidate       
//                     connections[socketListId].onicecandidate = async function (event) {
                      
//                         if (event.candidate != null) {
//                         console.log("Event candidate Signal Emmitted")
//                         await socket.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
//                         }   
//                     }
    
//                     // Wait for their video stream
//                 connections[socketListId].ontrack = (event) => {
//                         // TODO mute button, full screen button
//                         console.log("event")
//                         console.log(event.streams[0])
//                         var searchVidep = document.querySelector(`[data-socket="${socketListId}"]`)
//                         if (searchVidep !== null) { // if i don't do this check it make an empyt square
//                             searchVidep.srcObject = event.streams[0]
//                             console.log(searchVidep)
//                         } else {
//                             console.log("creating new video....")
//                             elms = clients.length
//                             let main = document.getElementById('main')
//                             // let cssMesure = changeCssVideos(main)
    
//                             let video = document.createElement('video')
    
//                             // let css = {minWidth: cssMesure.minWidth, minHeight: cssMesure.minHeight, maxHeight: "100%", margin: "10px",
//                             //     borderStyle: "solid", borderColor: "#bdbdbd", objectFit: "fill"}
//                             // for(let i in css) video.style[i] = css[i]
//                             // console.log(video)
//                             // video.style.setProperty("width", cssMesure.width)
//                             // video.style.setProperty("height", cssMesure.height)
//                             video.setAttribute('data-socket', socketListId)
//                             // video.setAttribute('ref', event.stream)
//                             video.srcObject = event.streams[0]
//                             console.log(event.stream)
//                             video.autoplay = true
//                             video.playsinline = true
    
//                             main.appendChild(video)
//                             console.log(video)
//                         }
//                     }
                
//                     console.log(connections)
                    
//                     // Add the local video stream
// 					if (window.localStream !== undefined && window.localStream !== null) {
//                         window.localStream?.getTracks().forEach((track) =>{
                        
//                             connections[socketListId].addTrack(track,window.localStream)
//                         })
// 					} else {
						
// 						    window.localStream = null;
//                             window.localStream?.getTracks().forEach((track) =>{
                            
//                                 connections[socketListId].addTrack(track,window.localStream)
//                             })
// 					}

                  
//                     // connections[socketListId].addTrack(window.localStream);
//                 })
            

//                 if (id === socketId) {
//                     console.log(connections);
//                     for (let id2 in connections) {
//                         if (id2 === socketId) continue
                        
//                         try {
//                             window.localStream.getTracks().forEach((track) =>{
//                                 connections[id2].addTrack(track,window.localStream)
//                                 console.log(connections[id2])
//                             })
                            
//                         } catch(e) {console.log(e.message)}

//                         connections[id2].createOffer().then((description) => {
//                             connections[id2].setLocalDescription(description)
//                                 .then(() => {
//                                     socket.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
//                                 })
//                                 .catch(e => console.log(e))
//                         })
//                         console.log(connections)

//                     }
//                 }
//             })
//         })
//     }
    