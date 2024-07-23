
import mongoose from "mongoose";

const monthsSchema = mongoose.Schema({
    subscriptionsId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subscriptions",
        required:true,

    },
    planDuration:{
           type:[String],
           required:true
    },
    
    taxes:{
        type:Number,
        requierd:true,

    },
    total:{
        type:Number
    
    }



})
export const monthlyplans = mongoose.model('monthlyplans',monthsSchema)