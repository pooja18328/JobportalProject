import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AllJobs.css";


const AllJobs = () => {


  const [jobs,setJobs] = useState([]);

  const [selectedJob,setSelectedJob] = useState(null);

  const [resumePopup,setResumePopup] = useState(false);

  const [resumeJob,setResumeJob] = useState(null);

  const [resumeFile,setResumeFile] = useState(null);

  const [score,setScore] = useState(null);

  const [eligible,setEligible] = useState(false);


  const userRole = localStorage.getItem("role");

  const navigate = useNavigate();





  const fetchJobs = async()=>{


    try{


      const {data} = await axios.get(
        "http://localhost:5000/api/v1/job/all"
      );


      if(data.success){

        setJobs(data.jobs);

      }


    }
    catch(error){

      console.log(error);

    }


  };






  useEffect(()=>{

    fetchJobs();

  },[]);









  const handleResumeCheck = async()=>{


    if(!resumeFile){

      alert("Please upload resume");

      return;

    }



    try{


      const formData = new FormData();



      formData.append(
        "resume",
        resumeFile
      );






      const skillsArray = resumeJob.skills

      .split(",")

      .map(skill=>skill.trim());






      formData.append(

        "skills",

        JSON.stringify(skillsArray)

      );







      const {data} = await axios.post(


        "http://localhost:5000/api/v1/resume/check",


        formData,


        {

          headers:{

            "Content-Type":"multipart/form-data"

          }

        }


      );





      console.log("Resume Result:",data);




      setScore(Number(data.score));


      setEligible(data.score >= 85);



    }

    catch(error){


      console.log(error);


      alert("Resume check failed");


    }



  };













return (

<section className="allJobsPage">


<div className="allJobsContainer">



<h2>
All Jobs
</h2>






<div className="jobsGrid">


{

jobs.map((job)=>(



<div className="jobCard" key={job._id}>


<h3>
{job.title}
</h3>




<div className="jobButtons">





<button

onClick={()=>setSelectedJob(job)}

>

Job Details

</button>







{

userRole==="Job Seeker" &&



<button

onClick={()=>{


setResumePopup(true);

setResumeJob(job);

setResumeFile(null);

setScore(null);

setEligible(false);


}}


>

Resume Check

</button>



}



</div>



</div>



))


}



</div>













{

selectedJob &&



<div

className="jobDetailsPopup"

onClick={()=>setSelectedJob(null)}

>


<div

className="jobDetailsPopupContent"

onClick={(e)=>e.stopPropagation()}

>



<h3>

{selectedJob.title}

</h3>




<p>

<strong>
Category:
</strong>

{selectedJob.category}

</p>





<p>

<strong>
Country:
</strong>

{selectedJob.country}

</p>





<p>

<strong>
Location:
</strong>

{selectedJob.location}

</p>





<p>

<strong>
Required Skills:
</strong>

<br/>

{selectedJob.skills}

</p>





<p>

<strong>
Description:
</strong>

{selectedJob.description}

</p>





<button

onClick={()=>setSelectedJob(null)}

>

Close

</button>



</div>


</div>



}
















{

resumePopup &&



<div

className="jobDetailsPopup"

>


<div

className="jobDetailsPopupContent"

>





<h3>

Resume Skill Check

</h3>







<p>

Required Skills:

<br/>


<strong>

{resumeJob.skills}

</strong>


</p>








<input


type="file"


accept=".pdf,.jpg,.jpeg,.png"


onChange={(e)=>{


setResumeFile(e.target.files[0]);


}}


/>







{

resumeFile &&

<p>

Selected File:

<br/>

<strong>

{resumeFile.name}

</strong>


</p>


}







<br/><br/>






<button

onClick={handleResumeCheck}

>

Check Resume

</button>









{

score !== null &&



<>



<h3>

Resume Score : {score}%

</h3>







{

eligible ?



<>


<p style={{color:"green"}}>


🎉 {score}% Match.

You can apply for this job.


</p>





<button


onClick={()=>navigate(

"/apply-job",

{

state:{

job:resumeJob

}

}

)}



>

Apply Now

</button>




</>



:




<p style={{color:"red"}}>


❌ {score}% Match.


Not eligible.


Minimum 85% required.


</p>



}





</>



}










<br/><br/>





<button


onClick={()=>setResumePopup(false)}


>

Close

</button>





</div>


</div>



}







</div>


</section>


);


};



export default AllJobs;