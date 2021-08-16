const User = require('../models/User')
const Call = require('../models/Call');
const mongoose = require('mongoose');


const createLink = async(req,res)=>{
    try{
        const newCall = await Call.create({people:[],adminId:req.userId});
        console.log("Created New Link")
        console.log(newCall);
        return res.status(200).json({code:newCall._id})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Some Error occured"})
    }
}

const checkJoinCall = async(req,res)=>{
    try{
        const code = req.body.code;

        if(!mongoose.isValidObjectId(code)){
            console.log("Not a valid object id")
            return res.status(400).json({msg:"Couldn't find the meeting that you are trying to join."})
        }
        const call = await Call.findOne({_id:code})
        
        if(!call){
            return res.status(400).json({msg:"Couldn't find the meeting that you are trying to join."})
        }
        console.log("call",call)
        console.log("code",code)
        return res.status(200).json({adminId:call.adminId})
    }catch(err){
        console.log(err)
        return res.status(500)
    }
}

module.exports = {createLink,checkJoinCall}