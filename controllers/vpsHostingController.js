import { vpsHosting } from "../models/vpsHostingSchema.js"

export const createVpsHosting = async(req,res)=>{
    try{
    const {userId,planName,oldPrice,newPrice,features,status} = req.body
    console.log("1")
    // end date 
    // let result = new Date();
    //     result.setDate(result.getDate() + 5);
       
    const hosting = await new vpsHosting({
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
        message:"vps hosting provided",
        hosting
    })
    }
    catch(err){
        res.status(500).json({
            Success:false,
            message:err.message
        })
    }
    }

    export const updateVpsHosting = async (req,res)=>{
        try{
         
            const {planName,status,oldPrice,newPrice,features} = req.body
            
            const hosting = await vpsHosting.findByIdAndUpdate(
                req.params.id,
                {   planName,
                    status,
                    oldPrice,
                    newPrice,
                    features
                 },
                { new: true }
                
              );

              if (!hosting) {
                return res.status(404).json({ success: false, message: 'Subscription not found' });
              }
              res.status(200).json({ success: true, message:"updated",hosting });
        }
        catch(err){
            res.status(500).json({
                Success:false,
                message:err.message
            })
    
        }
    
    }

    export const  getAllVpsHosting = async(req,res)=>{
        try {
            const hosting = await  vpsHosting.find() // Populate user details
            res.status(200).json({ success: true, hosting });
          } catch (error) {
            res.status(500).json({ success: false, message: err.message });
          }
    }

    export const deleteVpsHosting = async (req,res)=>{
        try {
            const hosting = await vpsHosting.findByIdAndDelete(req.params.id);
            if (!hosting) {
              return res.status(404).json({ success: false, message: 'Subscription not found' });
            }
            res.status(200).json({ success: true, message: 'Subscription deleted successfully',hosting });
          }
    
        catch(err){
            res.status(500).json({
                Success:false,
                message:err
            })
        }
    }