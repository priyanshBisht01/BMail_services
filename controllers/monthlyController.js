import { Subscriptions } from "../models/subscriptionSchema.js"
import { monthlyplans } from "../models/monthlySchema.js"
export const createMonthlyPlans = async(req,res)=>{
    try{
        console.log("month")
        
            const{ subscriptionsId,planDuration,prices,taxes} = req.body
            
            const subscription = await Subscriptions.findById(subscriptionsId)
            console.log(subscription)
            
            // console.log(total)
            if(!subscription){
                return res.status(400).json({
                    Success:true,
                    message:"no plan for this id"
                })
            }
            const newMonthlyPlan = await new  monthlyplans({
                subscriptionsId,planDuration,prices,taxes
            }).save()

            console.log(newMonthlyPlan)

            res.status(200).json({
                Success:true,
                message:"created"
            })
    }
    catch(err){
        res.status(500).json({
            Success:false,
            message:err
        })
    }
}

export const updateMonthlyPlan = async(req,res)=>{
    try
    {
            const {planDuration,prices,taxes} = req.body
            // if()
            const monthlyPlan= await monthlyplans.findByIdAndUpdate(
                req.params.id,
                {   
                    planDuration,prices,taxes
                 },
                { new: true }
                
              );
              if(!monthlyPlan){
                res.status(400).json({
                    Success:false,
                    message:"error in updating the monthly plans"
                })
              }
              res.status(200).json({
                Success:true,
                message:"updated the new plan in the database",
                monthlyPlan
              })
    }
    catch(err){
res.status(500).json({
    Success:false,
    message:err
})
    }
}
export const deleteMonthlyPlan = async(req,res)=>{
    try{
        const deleted = await monthlyplans.findByIdAndDelete(req.params.id);
        if (!deleted) {
          return res.status(404).json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, message: 'Subscription deleted successfully' });
    }
    catch(err){
        res.status(500).json({
            Success:false,
            message:err
    })
}
}
// get all monthly subscription
export const getAllMonthlySubscriptions = async (req,res)=>{
    try{
       
        const data = await monthlyplans.findById(req.params.id)
        if(!data){
           return  res.status(400).json({
                Success:false,
                message:"no data found"
            })
                                                             
        }
        res.status(200).json({
            Success:true,
            message:"data fetched",
            data
        })
       
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:err
        })
    }
}