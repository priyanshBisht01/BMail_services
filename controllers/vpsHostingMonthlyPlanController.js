import { vpsHostingMonthlyplans } from "../models/vpsHostingMonthlySchema.js"
import { vpsHosting } from "../models/vpsHostingSchema.js"

export const createVpsHostingMonthlyPlans = async(req,res)=>{
    try{
        console.log("month")
        
            const{ subscriptionsId,planDuration,prices,taxes} = req.body
            
            const hosting = await vpsHosting.findById(subscriptionsId)
            console.log(hosting)
            
            // console.log(total)
            if(!hosting){
                return res.status(400).json({
                    Success:true,
                    message:"no plan for this id"
                })
            }
            const newMonthlyPlan = await new vpsHostingMonthlyplans({
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
            message:err.message
        })
    } 
}

export const updateVpsHostingMonthly = async(req,res)=>{
    try
    {
            const {planDuration,prices,taxes} = req.body
            // if()
            const monthlyPlan= await vpsHostingMonthlyplans.findByIdAndUpdate(
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

export const deleteVpsHostingMonthlyPlan = async(req,res)=>{
    try{
        const deleted = await vpsHostingMonthlyplans.findByIdAndDelete(req.params.id);
        if (!deleted) {
          return res.status(404).json({ success: false, message: 'Subscription not found' });
        }
        res.status(200).json({ success: true, message: 'Subscription deleted successfully' });
    }
    catch(err){
        res.status(500).json({
            Success:false,
            message:err.message
    })
}
}

export const getVpsHostingMonthlyPlan = async (req,res)=>{
    try{
       
        const data = await vpsHostingMonthlyplans.findById(req.params.id)      
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