import { emailService } from "../models/emailSchema.js"
import { emailServicesMonthlyplans } from "../models/emailServiceMonthlySchema.js"

export const createEmailMonthlyPlans = async(req,res)=>{
    try{
        console.log("month")
        
            const{ subscriptionsId,planDuration,prices,taxes} = req.body
            
            const emailServices = await emailService.findById(subscriptionsId)
            console.log(emailServices)
            
            // console.log(total)
            if(!emailServices){
                return res.status(400).json({
                    Success:true,
                    message:"no plan for this id"
                })
            }
            const newMonthlyPlan = await new  emailServicesMonthlyplans({
                subscriptionsId,planDuration,prices,taxes
            }).save()

            // console.log(newMonthlyPlan)

            res.status(200).json({
                Success:true,
                message:"created"
                ,newMonthlyPlan
            })
    }
    catch(err){
        res.status(500).json({
            Success:false,
            message:err
        })
    }
}

export const updateEmailMonthlyPlan = async(req,res)=>{
    try
    {
            const {planDuration,prices,taxes} = req.body
            // if()
            const monthlyPlan= await emailServicesMonthlyplans.findByIdAndUpdate(
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

export const deleteEmailMonthlyPlan = async(req,res)=>{
    try{
        const deleted = await emailServicesMonthlyplans.findByIdAndDelete(req.params.id);
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

export const getAllEmailMonthlySubscriptions = async (req,res)=>{
    try{
       
        const data = await emailServicesMonthlyplans.findById(req.params.id)      
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