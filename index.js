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

io.on("connection",(socket)=>{
     
    console.log("Connected To Server "+socket.id)

    socket.on('join-call', (path) => {
		if(connections[path] === undefined){
			connections[path] = []
		}
		connections[path].push(socket.id)


		for(let a = 0; a < connections[path].length; ++a){
			io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
		}

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
        console.log("Connection left")
    })
})

//body parser middleware for accepting json
app.use(express.json({ limit: "80mb", extended: true }));
//middleware for accepting data from forms
app.use(express.urlencoded({ limit: "80mb", extended: true }));

app.use('/api/v1/auth',require('./routes/auth'))

server.listen(PORT,()=>console.log(`Listening on ${PORT}`))