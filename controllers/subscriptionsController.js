import { Subscriptions } from "../models/subscriptionSchema.js";

export const createSubscription = async(req,res)=>{
try{
const {userId,planName,oldPrice,newPrice,features} = req.body
console.log("1")
// end date 
// let result = new Date();
//     result.setDate(result.getDate() + 5);
   
const subscriber = await new Subscriptions({
    userId,
    planName,
    features,
    oldPrice,
    newPrice,
   

//     startDate:new Date(),
//    endDate:result,
   
}).save()
// console.log(new Date())
console.log('2')
res.status(200).json({
    Success:true,
    message:"subscribed",
    subscriber
})
}
catch(err){
    res.status(500).json({
        Success:false,
        message:err
    })
}
}

export const updateSubscription = async (req,res)=>{
    try{
     
        const {planName,status,oldPrice,newPrice,features} = req.body
        const subscription = await Subscriptions.findByIdAndUpdate(
            req.params.id,
            {   planName,
                status,
                oldPrice,
                newPrice,
                features
             },
            { new: true }
            
          );
          if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found' });
          }
          res.status(200).json({ success: true, subscription });
    }
    catch(err){
        res.status(500).json({
            Success:false,
            message:err
        })

    }

}
export const  getAllSubscriptions = async(req,res)=>{
    try {
        const subscriptions = await  Subscriptions.find() // Populate user details
        res.status(200).json({ success: true, subscriptions });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving subscriptions', error });
      }
}

export const deleteSubscriptions = async (req,res)=>{
    try {
        const subscription = await Subscriptions.findByIdAndDelete(req.params.id);
        if (!subscription) {
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