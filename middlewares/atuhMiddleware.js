 import { User } from "../models/userSchema.js"
 import jwt from 'jsonwebtoken'
 export const isSignedIn = async(req,res,next)=>{

    try{
        const decode =  jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user = decode;
        // console.log(req.user.user.id)
        next();
            }
            catch(error){
                console.log(error);
        
            }
    

 }
 export const isAdmin = async(req,res,next) =>{
    try{
        // const id = req.user._id
        // console.log(id)
        const user = await User.findById(req.user.user.id);
        if(user.role !== 1){
            return res.status(401).json({
                Success:false,
                message:"You are not admin"
            })
        }
        else{
            // console.log(user)
            next();
        }
        
           
    }
    catch(err){
        res.status(500).json({
            Success:false,
            message:err
        })
    }
 }