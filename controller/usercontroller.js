const usermodel = require("../models/usermodel")

const bcrypt = require('bcryptjs'); // or 'bcrypt' — depending on which you installed
const jwt = require('jsonwebtoken');

exports.adduser= async (req,res)=>{
    const {name,email,username,password,usertype}=req.body
     console.log("Received body:", req.body);
const hashedpassword=await bcrypt.hash(password,10)
if(!name||!email||!username||!password||!usertype)
    return res.status(400).json({message:"all fields required"})
const existingUser = await usermodel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }
try{
    const newuser=new usermodel({name,email,username,password:hashedpassword,usertype})
    await newuser.save()
    return res.status(200).json({message:"success",user:newuser})

}catch(err){
    return res.status(500).json({message:`server error,${err.message}`})
}
}


exports.loginUser=async (req,res)=>{
    try{
        const {email,username,password}=req.body
        const user= await usermodel.findOne({email})
        if(!user)
        {return res.status(400).json({message:'user Not Found'})}
        const ismatch=await bcrypt.compare(password,user.password)
        if(!ismatch)
        {return res.status(400).json({message:"Invalid Password"})}
        
        const token=jwt.sign({
            id:user._id,
            username:user.username,
            email:user.email,
            usertype:user.usertype},
            process.env.secretekey)

            const safeuser={
                id:user._id,
                username:user.username,
                email:user.email,
                usertype:user.usertype
            }
            res.cookie("token",token,{
    httpOnly: true,
    sameSite: "lax",
    secure: false, // true in production
  })
            console.log("...........",token)
            return res.status(200).json({message:"Login successful",token,user:safeuser})

    } catch(err){
        res.status(500).json({message:err.message})
    }
}
exports.logoutuser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "none",
        secure: true, // only true if using HTTPS (set to false for localhost)
    });
    return res.status(200).json({ message: "Logout successful" });
};



exports.getuser = async (req, res) => {
  try {
    const users = await usermodel.find()
    return res.status(200).json(users) // ✅ directly send array
  } catch (err) {
    return res.status(500).json({ message: `server error ${err.message}` })
  }
}


exports.updateuser=async(req,res)=>{
    try{
    const {id}=req.params
    console.log(id)
    const {name,email,username,password,usertype}=req.body
        const updateduser=await usermodel.findByIdAndUpdate(id,{name,email,username,password})
        console.log(`....${updateduser}`)
    if(!updateduser)
            return res.status(404).json({message:"not found"})
        return res.status(200).json({message:"success",data:updateduser})
}
    catch(err){
        return res.status(500).json({message:`server error ${err.message}`})
    }
}


exports.deleteduser=async(req,res)=>{
    try{
    const {id}=req.params
    console.log(id)
        const deleteduser=await usermodel.findByIdAndDelete(id)
    console.log(deleteduser)
    if(!deleteduser)
            return res.status(404).json({message:"not found"})
    return res.status(200).json({message:"success",data:deleteduser})

}
    catch(err){
        return res.status(500).json({message:`server error ${err.message}`})
    }
}

