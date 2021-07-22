const User = require('../models/User')

const googleSignIn = async(req,res)=>{
    try{
        const oldUser = await User.findOne({googleId:req.body.googleId})
        if(!oldUser){
            const newUser = await User.create({...req.body,createdAt:Date.now()})
            return res.status(200).json(newUser)
        }
        return res.status(200).json(oldUser)
    }catch(err){
        console.log(err)
    }
}

module.exports = {googleSignIn}