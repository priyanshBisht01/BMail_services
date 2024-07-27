import { sendEmail } from "../helper/emailSender.js";
import { User } from "../models/userSchema.js";
import { vpsHostingMonthlyplans } from "../models/vpsHostingMonthlySchema.js";

export const addVpsSubscription = async (req, res) => {
    try {
        const { vpsSubscriptionId,vpsMonthlyPlanId, vpsPlanPrice,vpsPlanDuration } = req.body;
  
        console.log("1")
        const choosenPlans = await vpsHostingMonthlyplans.findById(vpsMonthlyPlanId)
      // console.log(choosenPlans);
      // console.log(choosenPlans.prices)
      const vpsEndDate = new Date()
      vpsEndDate.setDate(vpsEndDate.getDate() + vpsPlanDuration*30);
  
  
      const addSub = await User.findByIdAndUpdate(
          req.params.id, // user Id
          {
          vpsSubscriptionId,
          // monthlyPlanId,
          vpsPlanPrice,
          vpsPlanDuration,
          vpsPlanStatus: "active",
          vpsEndDate ,
          vpsStartDate:new Date()
      },
      { new: true }
  );
  console.log("2")
  
  const to =addSub.email
  console.log(to);
  const subject = "subscribed"
  const text= "you are now subscribed"
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
  export const getVpsSubscriptionDetails = async(req,res)=>{
      try{
                   
                   const data = await User.findById(req.params.id)
                   console.log(data.planStatus)
                   if(data.vpsPlanStatus !="active"){
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
              message: err.message,
            });
      }
  }
  
  export const deleteUserVpsSubscription = async(req,res)=>{
    try{
  
                  // const currentDate = new Date();
                  // console.log(currentDate)
                  // console.log(currentDate.getDate())
                  const data = await User.findById(req.params.id)
                  if(!data){
                    return res.status(400).json({
                      Success:false,
                      message:"no data found for the user "
                    })
                  }
                  const planDuration = data.planDuration *30
                  const startDate = data.vpsStartDate
                  const endDate = data.vpsEndDate
  
                   const diff = Math.round((endDate-startDate)/(1000*60*60*24))
                  console.log(`date ${diff}`);
  
                  if(  diff==0 || diff<0){
                    console.log("date deleted")
                    console.log(Math.abs(planDuration-diff))
                    const updatedDate  = await User.findByIdAndUpdate(req.params.id
                        ,{vpsEndDate:null,
                            vpsStartDate:null
                        },
                        {new:true}
                      )
                      if(!updatedDate){
                        return res.status(402).json({
                          Success:false,
                          message:"problem in updating the endDate",
      
                        })
                      }
                      return res.status(200).json({
                        Success:true,
                        message:"date",
                      updatedDate
                      })
                }
                 res.status(401).json({
                 Success:false,
                 message:"subscription is not over yet"
                })
                  
    }
    catch(err){
      res.status(500).json({
        Success: false,
        message: err.message,
      });
    }
  }
  