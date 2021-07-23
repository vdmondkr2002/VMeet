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

io.on("connection",(socket)=>{
    console.log("new Connection "+socket.id)
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