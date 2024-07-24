import mongoose from "mongoose";

const dbConnection = async()=>{
try{
await mongoose.connect(process.env.MONGO_URI)
console.log('database connected ')
}
catch(err){
console.log("connecting error",err)
}
}
export default dbConnection