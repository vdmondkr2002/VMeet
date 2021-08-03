const mongoose = require('mongoose')

//Connect to database
const connectDB = async()=>{
    try{
        console.log("DATABASE CONNECTing")
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false
        })
        console.log("DATABASE CONNECTED")
        console.log(`MongoDB connected ${conn.connection.host} `)
    }catch(err){
        console.log(err)
        console.log(`Error occured:${err}`)
        process.exit(1)
    } 
}

module.exports = connectDB

// mongodb+srv://videomeet:videomeet@321@cluster0.xuhzj.mongodb.net/videoMeet?retryWrites=true&w=majority
