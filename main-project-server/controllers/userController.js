const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//register
exports.registerController = async(req,res)=>{
    console.log("inside register controller");
    console.log(req.body);
    const {username,email,password}=req.body
    try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            res.status(406).json("already existing user...")
        }else{
            const newUser = new User({
                username,email,password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {

        console.log(err);
        
    }
   
    // res.status(200).json("register request received")
    
}

// login 
exports.loginController = async (req,res)=>{
    console.log("loginController");
    const {email,password}=req.body
    console.log(email,password);
    try {
        const existingUser = await User.findOne({email,password})
        if (existingUser) {
            const token = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({user:existingUser,token})          
        }else{
            res.status(404).json("incorrect email/password")
        }
    } catch (err) {
        res.status(401).json(err)
        
    }
    
    
}

// profile update
exports.editUserController = async (req, res) => {
    console.log("inside editUserController");
    
    const { username, email, password, profilePic } = req.body;
    const uploadProfilePic = req.file ? req.file.filename : profilePic;
    const userId = req.userId; // from JWT middleware
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId, // ✅ Correct: pass ID directly, not as object
        {
          username,
          email,
          password,
          profilePic: uploadProfilePic,
        },
        { new: true } // returns updated document
      );
  
      if (updatedUser) {
        await updatedUser.save(); // optional, usually not required with findByIdAndUpdate
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json("User not found");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error while updating profile");
    }
  };
  