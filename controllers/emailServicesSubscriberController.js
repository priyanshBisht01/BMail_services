import { emailServicesMonthlyplans } from "../models/emailServiceMonthlySchema.js";
import { User } from "../models/userSchema.js";
import { sendEmail } from "../helper/emailSender.js";

export const addemailServiceSubscription = async (req, res) => {
    try {
        const { emailSubscriptionId,emailMonthlyPlanId, emailPlanPrice,emailPlanDuration } = req.body;
  
        console.log("1")
        const choosenPlans = await emailServicesMonthlyplans.findById(emailMonthlyPlanId)
      // console.log(choosenPlans);
      // console.log(choosenPlans.prices)
      const emailEndDate = new Date()
      emailEndDate.setDate(emailEndDate.getDate() + emailPlanDuration*30);
  
      const addSub = await User.findByIdAndUpdate(
          req.params.id, // user Id
          {
            emailSubscriptionId,
             emailPlanPrice,
             emailPlanDuration,
          // monthlyPlanId,  
          emailPlanStatus: "active",
          emailEndDate
      },
      { new: true }
  );
  console.log("2")
  
  const to =addSub.email
  console.log(to);
  const subject = "subscribed"
  const text= "you are now subscribed to the email services"
  sendEmail(req,res,to,subject,text)
      res.status(200).json({
        Success: true,
        message: "subscribed",
        addSub,
      });
    } catch (err) {
      res.status(500).json({
        Success: false,
        message: err.message,
      });
    }
  };

  export const getEmailSubscriptionDetails = async(req,res)=>{
    try{
                 
                 const data = await User.findById(req.params.id)
                 console.log(data.emailPlanStatus)
                 if(data.emailPlanStatus !="active"){
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
            message: err.message
          });
    }
}

export const deleteUserEmailSubscription = async(req,res)=>{
    try{
        console.log("2")
  
                  // const currentDate = new Date();
                  // console.log(currentDate)
                  // console.log(currentDate.getDate())
                  const data = await User.findById(req.params.id)
                  if(data.emailPlanStatus ==="inactive"){
                    return res.status(400).json({
                      Success:false,
                      message:"no data found for the user "
                    })
                  }
                //   const planDuration = data.planDuration *30
                //   const startDate = data.startDate
                //   const endDate = data.endDate
  
                //    const diff = Math.round((endDate-startDate)/(1000*60*60*24))
                //   console.log(Math.round((endDate-startDate)/(1000*60*60*24)));
  
                //   if(planDuration -diff  !==0 || planDuration - diff<0){
                //     // console.log("data deleted")
                //    return res.status(401).json({
                //     Success:false,
                //     message:"subscription is not over yet"
                //    })
                //   }
                  const updateEndDate  = await User.findByIdAndUpdate(req.params.id
                    ,{emailPlanStatus:'inactive',
                        emailSubscriptionId:null,
                        emailPlanPrice:null,
                        emailPlanDuration:null,
                        endDate:null},
                    {new:true}
                  )
                  if(!updateEndDate){
                    return res.status(402).json({
                      Success:false,
                      message:"problem in updating the endDate",
  
                    })
                  }
                  res.status(200).json({
                    Success:true,
                    message:"date",
                  data
                  })
    }
    catch(err){
      res.status(500).json({
        Success: false,
        message: err.message,
      });
    }
  }
  