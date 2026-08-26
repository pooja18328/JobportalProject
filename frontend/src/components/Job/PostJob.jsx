import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const PostJob = () => {

  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");


  const handlePostJob = async (e) => {

    e.preventDefault();


    if (
      !title ||
      !country ||
      !location ||
      !category ||
      !skills ||
      !description
    ) {

      toast.error("Please fill all fields!");
      return;

    }


    try {

      const token = localStorage.getItem("token");


      if(!token){

        toast.error("Please login first!");
        return;

      }



      const { data } = await axios.post(

        "http://localhost:5000/api/v1/job/post",

        {
          title,
          country,
          location,
          category,
          skills,
          description,
        },


        {

          headers: {

            "Content-Type":"application/json",

            Authorization:`Bearer ${token}`

          }

        }

      );



      toast.success(data.message);



      // clear form

      setTitle("");
      setCountry("");
      setLocation("");
      setCategory("");
      setSkills("");
      setDescription("");



    } catch(error){


      console.log(error);



      toast.error(

        error.response?.data?.message ||
        "Failed to post job."

      );


    }


  };



  return (

    <section className="postJobPage">


      <div className="postJobContainer">


        <h2>Post a New Job</h2>



        <form onSubmit={handlePostJob}>


          <input

            type="text"

            placeholder="Job Title"

            value={title}

            onChange={(e)=>setTitle(e.target.value)}

          />



          <input

            type="text"

            placeholder="Country"

            value={country}

            onChange={(e)=>setCountry(e.target.value)}

          />



          <input

            type="text"

            placeholder="Location"

            value={location}

            onChange={(e)=>setLocation(e.target.value)}

          />




          <select

            value={category}

            onChange={(e)=>setCategory(e.target.value)}

          >


            <option value="">
              Select Category
            </option>


            <option value="MERN Stack Developer">
              MERN Stack Developer
            </option>


            <option value="Software Developer">
              Software Developer
            </option>


            <option value="Frontend Developer">
              Frontend Developer
            </option>


            <option value="Backend Developer">
              Backend Developer
            </option>


            <option value="Data Analyst">
              Data Analyst
            </option>


            <option value="UI/UX Designer">
              UI/UX Designer
            </option>


          </select>





          <input

            type="text"

            placeholder="Required Skills (HTML,CSS,JavaScript,React)"

            value={skills}

            onChange={(e)=>setSkills(e.target.value)}

          />





          <textarea


            placeholder="Job Description"


            value={description}


            onChange={(e)=>setDescription(e.target.value)}


          ></textarea>





          <button type="submit">

            Post Job

          </button>




        </form>



      </div>



    </section>


  );


};


export default PostJob;