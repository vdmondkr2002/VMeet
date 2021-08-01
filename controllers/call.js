const User = require('../models/User')
const Call = require('../models/Call')


const createLink = async(req,res)=>{
    try{
        const newCall = await Call.create({people:[],adminId:req.userId});
        console.log(newCall);
        return res.status(200).json({code:newCall._id})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Some Error occured"})
    }
}

module.exports = {createLink}