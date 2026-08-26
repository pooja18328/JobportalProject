const nodemailer = require("nodemailer");


const sendEmail = async (to, subject, html) => {

  try {


    const transporter = nodemailer.createTransport({

      service: "gmail",

      auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS,

      },

    });



    // Check Gmail connection
    await transporter.verify();

    console.log("Email server connected");



    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: to,

      subject: subject,

      html: html,

    });



    console.log("Email sent successfully");


    return true;



  } catch (error) {


    console.log("Email Error:", error.message);


    return false;


  }

};


module.exports = sendEmail;