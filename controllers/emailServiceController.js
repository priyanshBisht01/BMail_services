import { emailService } from "../models/emailSchema.js"


export const createEmailServices = async(req,res)=>{
    try{
    const {userId,planName,oldPrice,newPrice,features,status} = req.body
    console.log("1")
    // end date 
    // let result = new Date();
    //     result.setDate(result.getDate() + 5);
       
    const services = await new emailService({
        userId,
        planName,
        features,
        oldPrice,
        newPrice,
        status
       
    
    //     startDate:new Date(),
    //    endDate:result,
       
    }).save()
    // console.log(new Date())
    console.log('2')
    res.status(200).json({
        Success:true,
        message:"Email service provided",
        services
    })
    }
    catch(err){
        res.status(500).json({
            Success:false,
            message:err
        })
    }
    }

    export const updateEmailServices = async (req,res)=>{
        try{
         
            const {planName,status,oldPrice,newPrice,features} = req.body
            
            const services = await emailService.findByIdAndUpdate(
                req.params.id,
                {   planName,
                    status,
                    oldPrice,
                    newPrice,
                    features
                 },
                { new: true }
                
              );

              if (!services) {
                return res.status(404).json({ success: false, message: 'Subscription not found' });
              }
              res.status(200).json({ success: true, services });
        }
        catch(err){
            res.status(500).json({
                Success:false,
                message:err
            })
    
        }
    
    }

    export const  getAllEmailServices = async(req,res)=>{
        try {
            const services = await  emailService.find() // Populate user details
            res.status(200).json({ success: true, services });
          } catch (error) {
            res.status(500).json({ success: false, message: 'Error retrieving subscriptions', error });
          }
    }
    
    export const deleteEmailservices = async (req,res)=>{
        try {
            const services = await emailService.findByIdAndDelete(req.params.id);
            if (!services) {
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