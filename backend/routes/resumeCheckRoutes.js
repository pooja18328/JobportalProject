const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");

const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const pdf = require("pdf-poppler");




// =======================
// MULTER STORAGE
// =======================


const storage = multer.diskStorage({

destination:(req,file,cb)=>{

cb(null,"uploads/");

},


filename:(req,file,cb)=>{

cb(null,Date.now()+"-"+file.originalname);

}


});



const upload = multer({

storage

});









// =======================
// PDF TO IMAGE
// =======================


const convertPDFtoImage = async(pdfPath)=>{


const options = {


format:"png",

out_dir:"uploads",

out_prefix:"resume",

page:1


};



await pdf.convert(pdfPath,options);



return "uploads/resume-1.png";


};









// =======================
// CLEAN TEXT
// =======================


const cleanText = (text)=>{


return text

.toLowerCase()

.replace(/[^a-z0-9]/g,"");


};









router.post(

"/check",

upload.single("resume"),


async(req,res)=>{


try{


const {skills}=req.body;




if(!req.file || !skills){


return res.status(400).json({

success:false,

message:"Resume and skills required"

});


}






let resumeText="";









// =======================
// PDF HANDLING
// =======================


if(req.file.mimetype==="application/pdf"){



console.log("PDF uploaded");



const buffer = fs.readFileSync(req.file.path);




// try pdf text extraction


try{


const pdfData = await pdfParse(buffer);


resumeText = pdfData.text;



}

catch(error){


console.log("PDF parse failed");

resumeText="";


}






// if no text use OCR


if(resumeText.trim().length < 50){



console.log("Using OCR for PDF");



const imagePath = await convertPDFtoImage(

req.file.path

);





const result = await Tesseract.recognize(

imagePath,

"eng"

);



resumeText = result.data.text;



}



}









// =======================
// IMAGE HANDLING
// =======================


else{


console.log("Image uploaded");



const result = await Tesseract.recognize(

req.file.path,

"eng"

);



resumeText=result.data.text;



}









console.log("RAW RESUME TEXT");

console.log(resumeText);








// clean resume text


const cleanedResume = cleanText(resumeText);







// skills from frontend


const requiredSkills = JSON.parse(skills)

.map(skill=>skill.trim());







let matchedSkills=0;

let matched=[];







// =======================
// SKILL MATCHING
// =======================


requiredSkills.forEach(skill=>{


const cleanedSkill = cleanText(skill);





if(cleanedResume.includes(cleanedSkill)){


matchedSkills++;

matched.push(skill);


}



});









const score = Math.round(

(matchedSkills / requiredSkills.length) * 100

);







console.log("MATCHED SKILLS");

console.log(matched);



console.log("SCORE");

console.log(score);









return res.json({

success:true,

score,

matchedSkills,

totalSkills:requiredSkills.length,

matched,

eligible:score>=85


});




}



catch(error){


console.log("Resume Check Error:",error);



return res.status(500).json({

success:false,

message:"Resume checking failed"

});


}



}



);






module.exports = router;