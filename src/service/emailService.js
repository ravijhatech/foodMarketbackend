
    import nodemailer from 'nodemailer'
    import dotenv from 'dotenv';
    dotenv.config({path:'.env'})

const sendOTPEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: 'gmail', 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Devloped By Ravi Blog API" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Reset Password',
    text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
    
  });
};


export default sendOTPEmail;