import { Subscriptions } from "../models/subscriptionSchema.js";
import { monthlyplans } from "../models/monthlySchema.js";
import { User } from "../models/userSchema.js";

export const addSubscription = async (req, res) => {
  try {
      const { subscriptionId, monthlyPlanId } = req.body;
      console.log("1")
    const addSub = await User.findByIdAndUpdate(
        req.params.id, // user Id
        {
        subscriptionId,
        monthlyPlanId,
        planStatus: "active",
    },
    { new: true }
);
console.log("2")
    res.status(200).json({
      Success: true,
      message: "subscribed",
      addSub,
    });
  } catch (err) {
    res.status(500).json({
      Success: false,
      message: err,
    });
  }
};
export const getSubscriptionDetails = async(req,res)=>{
    try{
                 
                 const data = await User.findById(req.params.id)
                 console.log(data.planStatus)
                 if(data.planStatus !="active"){
                    return res.status(400).json({
                        Success:false,
                        message:"you have no subscription right now"
                    })
                 }
            res.status(200).json({
                Success:true,
                message:"all details for the subscription that a user have",
                data
            })
    }
    catch(err){
        res.status(500).json({
            Success: false,
            message: err,
          });
    }
}
