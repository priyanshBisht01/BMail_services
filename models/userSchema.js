import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        country: { type: String },
      },
      subscriptionId:{
        type:mongoose.Schema.Types.ObjectId,
        default:null

      },
      monthlyPlanId:{
        type:mongoose.Schema.Types.ObjectId,
        default:null
      },
      planStatus:{
        type:String,
        enum: ['active', 'inactive'],
        default:'inactive'

      },

    role:{
type:Number,
default:0
    }

},{
    timestamps:true
}) 

export const  User = mongoose.model('User',userSchema)