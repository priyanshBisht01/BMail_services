import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zip: { type: String },
      country: { type: String },
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    // monthlyPlanId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //   default: null,
    // },
    planPrice: {
      type: Number,
      
    },
    planDuration: {
      type: Number,
      
    },
    planStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    startDate:{
      type:Date,
      default:Date.now
    },
    endDate:{
type:Date,
default:null
    },

    // for email services 
    
    emailSubscriptionId:{
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    emailPlanPrice:{
type:Number
    },
    emailPlanDuration:{
type:Number
    },
    emailPlanStatus:{
type:String,
enum:["active","inactive"],
default:"inactive"
    },
    emailStartDate:{
      type:Date,
      default:Date.now
    },
    emailEndDate:{
type:Date,
default:null
    },

    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
