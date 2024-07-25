import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"studymat44@gmail.com",
        pass:"irpbasujtdblgxqp"
    }
});

export const sendEmail = async (req,res ,to,subject,text) => {
  const mailOptions = {
    from:" studymat44@gmail.com",
    to,
    subject,
    text,
  };


 transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(`Error sending email: ${error.message}`);
      return res.status(500).json({
        Success:false,
        message:error
      })
     
    }
    console.log(`Email sent: ${info.response}`);
    res.status(200).json({
        Success:true,
        message:"Email has been sended"
    })


}
    )
}

