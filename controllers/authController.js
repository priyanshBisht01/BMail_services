import { User } from "../models/userSchema.js";
import { hashPassword, comparePassword } from "../helper/authHelper.js";
import jwt from "jsonwebtoken";


// register controller
export const RegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(req.body);
    if (!name || !email || !password) {
      return res.status(400).json({
        Success: false,
        message: "some fields are missing",
      });
    }
    // check if user exist
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(401).json({
        Success: false,
        message: "User Already exist",
      });
    }
    // create new user
    const hashedPassword = await hashPassword(password);
   const user = await new User({ name, email, password:hashedPassword }).save();

    // console.log(user);
    

    // Create JWT
    const payload = {
        user: {
          id: user._id,
        },
      };

    //  const jsonweb = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
    //     if (err) throw err;
    //     res.json({ token });
    //   });
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, function(err, token) {
        console.log(token);
      });
    //   console.log(jsonweb)

    res.status(200).json({
      success: true,
      message: "You are registered",
      user: user,
    
      
    });
  } catch (err) {
    res.status(500).json({
      Success: false,
      message: err,
    });
  }
};

// Login controller
 export const loginController = async(req,res)=>{

    try{
        const {email,password} = req.body
         //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
        // is user Registered or not

        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                Success:false,
                message:"please register first"
            })

        }
        
        const match = await comparePassword(password,user.password)
        
        if(!match){
            return res.status(401).json({
                Success:false,
                message:'invalid password'
            })
        }
   
       // Create JWT
    const payload = {
        user: {
          id: user._id,
        },
      };

    
       jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, function(err, token) {
        if (err) {
            console.error("Token generation error", err);
            return res.status(500).json({
              success: false,
              message: "Token generation failed",
            });
          }
        // console.log(token);
        res.status(200).json({
            Success:true,
            message:"user Logged In",
            user,
            token
           
        })
      });
       

    }
    catch(err){
        res.status(500).json({
            Success:true,
            message:err
        })
    }
 }

 // test controller

export const testController = (req,res)=>{
    console.log("protected Routes");
    
    res.send("rishu");
    }