import mongoose from "mongoose";
 const subscriberSchema = mongoose.Schema({
    subscriberId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    subscriptionsId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Subscriptions",
        required:true
    },

    MonthlyPlanId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"monthlyplans",
        required:true
    },
    startDate: {
        type: Date,
        default: Date.now,
      },
      endDate: {
        type: Date,
        required: true
      }


 },{Timestamps:true}
 )