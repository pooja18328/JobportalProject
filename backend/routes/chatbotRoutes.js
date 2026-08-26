const express = require("express");

const router = express.Router();



router.post("/message",(req,res)=>{


const {message}=req.body;



if(!message){

return res.json({

reply:"Please enter a message"

});

}



const userMessage = message.toLowerCase().trim();


let reply="";




// Greetings

if(
userMessage.includes("hi") ||
userMessage.includes("hello") ||
userMessage.includes("hey")
){

reply =
"Hello 👋 Welcome to Job Portal. How can I help you?";

}




// Register

else if(
userMessage.includes("register") ||
userMessage.includes("signup")
){

reply =
"To register, click Register and select Job Seeker or Employer.";

}





// Login

else if(
userMessage.includes("login")
){

reply =
"Enter your registered email and password to login.";

}






// Jobs

else if(
userMessage.includes("job") ||
userMessage.includes("search")
){

reply =
"Job seekers can view available jobs from All Jobs section.";

}






// Apply

else if(
userMessage.includes("apply")
){

reply =
"You can apply after checking your resume score. If eligible, click Apply Now.";

}






// Resume

else if(
userMessage.includes("resume") ||
userMessage.includes("score")
){

reply =
"Upload your resume in Resume Check. The system compares your skills with job requirements.";

}






// Employer

else if(
userMessage.includes("post") ||
userMessage.includes("employer")
){

reply =
"Employers can login and post jobs from Employer Dashboard.";

}





// About project

else if(
userMessage.includes("about") ||
userMessage.includes("project")
){

reply =
"This Job Portal connects job seekers and employers. Users can search jobs, apply and manage applications.";

}






// Unknown

else{


reply =
"Sorry, I can't understand. I can help you with Job Portal related queries only.";

}



res.json({

reply

});


});



module.exports = router;