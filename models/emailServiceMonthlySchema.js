
import mongoose from "mongoose";

const emailServiceMonthsSchema = mongoose.Schema({
    subscriptionsId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subscriptions",
        required:true,

    },
    planDuration:{
           type:[Number],
           required:true
    },
    prices:{
type:[Number],
required:true
    },
    
    taxes:{
        type:Number,
        requierd:true,

    },
    // total:{
    //     type:Number
    
    // }



})
export const emailServicesMonthlyplans = mongoose.model('emailServicesMonthlyplans',emailServiceMonthsSchema)