const User = require("../models/User");
const jwt = require("jsonwebtoken");


const getCurrentUser = async(req,res)=>{
    try{
        if(!req.userId)
            return res.status(401).json({msg:"Unauthorized"})
        // console.log("Hello")
        const user = await User.findOne({_id:req.userId})
        // console.log(user)
        // console.log(user)
        // return res.status(200).json(user)
        console.log("User is logged In")
        return res.status(200).json({firstName:user.firstName,lastName:user.lastName,profilePic:user.image,name:user.displayName,_id:user._id,email:user.email})
    }catch(err){
        return res.status(500).json({msg:"Something went wrong.."})
    }
}



const googleSignIn = async (req, res) => {
  try {
    const oldUser = await User.findOne({ googleId: req.body.googleId });

    if (!oldUser) {
      const newUser = await User.create({ ...req.body, createdAt: Date.now() });
      const payload = {
        email: newUser.email,
        id: newUser._id,
      };
      console.log("New user registered: "+newUser.displayName)
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        e2xpiresIn: "3h",
      });
      return res.status(200).json(token);
    }
    const payload = {
      email: oldUser.email,
      id: oldUser._id,
    };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "3h",
    });
    console.log(oldUser.displayName+"User logged IN")
    return res.status(200).json(token);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { googleSignIn, getCurrentUser };