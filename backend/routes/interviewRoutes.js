const express = require("express");
const router = express.Router();

const sendEmail = require("../utils/sendEmail");



router.post("/send", async (req, res) => {


    try {


        const { email } = req.body;



        if(!email){

            return res.status(400).json({

                message:"Email is required"

            });

        }




        await sendEmail(

            email,

            "AI Interview Practice Session 🤖",


            `

            <h2>Welcome to AI Interview Practice</h2>


            <p>
            Your practice session is ready.
            </p>


            <p>
            You will get 20 interview questions and performance feedback.
            </p>



            <a href="http://localhost:5173/interview">

            Click Here To Start Practice

            </a>


            `

        );




        res.status(200).json({

            success:true,

            message:"Practice link sent successfully"

        });



    } catch(error){


        console.log(error);


        res.status(500).json({

            message:"Email sending failed"

        });


    }


});



module.exports = router;