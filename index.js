const express = require('express')
const app = express()
const server = require('http').createServer(app);
const dotenv = require('dotenv')
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({path:'./config/config.env'})

const io = require('socket.io')(
    server,{
        cors:{
            origin:"*",
            methods:["GET","POST"]
        } 
    }
);

connectDB()
app.use(cors());

const PORT = process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.send("Server is running")
})


connections = {}
meetJoined = {}

io.on("connection",(socket)=>{
     
    console.log("Connected To Server "+socket.id)

    socket.on('join-call', (path) => {
		if(connections[path] === undefined){
			connections[path] = []
		}
        
        //const currCall =  await   Call.findOne({_id:path})
        //connections[path] is equivalent to currCall.people
        //currCall.people.push(socket.id)
        //await Call.findOneAndUpdate({_id:path},{people:currCall.people},{new:true})
		connections[path].push(socket.id)
        meetJoined[socket.id] = path;
        for(const socketId of connections[path]){
            io.to(socketId).emit("user-joined",socket.id,connections[path]);
        }
		// for(let i = 0; i < connections[path].length; ++i){   
		// 	io.to(connections[path][i]).emit("user-joined", socket.id, connections[path])
        //     //CurrCall.people
		// }
        console.log(connections)
		// console.log(path, connections[path])
	})

    socket.on('signal', (toId, message) => {
        console.log("message")
        console.log(message)
        console.log(socket.id)
        console.log(toId)
		io.to(toId).emit('signal', socket.id, message)
        console.log("EMMIITED")
	})

    socket.on("disconnect",()=>{
        const path = meetJoined[socket.id]
        console.log(path)
        connections[path] = connections[path].filter(id=>id!==socket.id)
        // delete connections[path][socket.id]
        console.log(connections)
        console.log("Connection left")
    })
})

//body parser middleware for accepting json
app.use(express.json({ limit: "80mb", extended: true }));
//middleware for accepting data from forms
app.use(express.urlencoded({ limit: "80mb", extended: true }));

app.use('/api/v1/auth',require('./routes/auth'))
app.use('/api/v1/call',require('./routes/call'))

server.listen(PORT,()=>console.log(`Listening on ${PORT}`))