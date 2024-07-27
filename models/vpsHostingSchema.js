import mongoose from "mongoose";
const vpsHostingSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    planName: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'canceled'],
      default: 'inactive'
    },
    // startDate: {
    //   type: Date,
    //   default: Date.now
    // },
    // endDate:{
    //     type:Date,
      
    // },
  
    oldPrice:{
        type:String,
        required:true
    },
    newPrice:{
      type:String,
      required:true
    },
    // duration: { type: String, required: true }, // e.g., 'monthly', 'yearly'
    features:{                // List of features included in the plan
     type: [String], 
     required:true
    } 


  },{timestamps:true});

  export const vpsHosting = mongoose.model('vpsHosting',vpsHostingSchema)