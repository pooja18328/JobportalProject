import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./ViewJobs.css";

const ViewJobs = () => {

  const [jobs, setJobs] = useState([]);

  const [editingId, setEditingId] = useState(null);


  const [editData, setEditData] = useState({
    title: "",
    country: "",
    location: "",
    category: "",
    description: "",
  });



  const fetchJobs = async () => {

    try {

      const { data } = await axios.get(
        "http://localhost:5000/api/v1/job/all"
      );


      setJobs(data.jobs);


    } catch (error) {

      console.log(error);

      toast.error("Failed to load jobs");

    }

  };



  useEffect(() => {

    fetchJobs();

  }, []);




  const deleteJob = async (id) => {

    try {


      const { data } = await axios.delete(
        `http://localhost:5000/api/v1/job/delete/${id}`
      );


      toast.success(data.message);


      fetchJobs();



    } catch(error){

      console.log(error);

      toast.error("Delete failed");

    }

  };





  const updateJob = async (id) => {


    try {


      const { data } = await axios.put(

        `http://localhost:5000/api/v1/job/update/${id}`,

        editData,

        {

          headers:{
            "Content-Type":"application/json",
          },

        }

      );



      toast.success(data.message);



      setEditingId(null);



      fetchJobs();



    } catch(error){


      console.log(error);


      toast.error("Update failed");


    }

  };






  return (

    <section className="postedJobsPage">


      <div className="postedJobsContainer">


        <h2>All Posted Jobs</h2>



        {
          jobs.length === 0 ? (

            <p>No jobs posted yet.</p>


          ) : (


            jobs.map((job)=>(


              <div 
                className="postedJobCard" 
                key={job._id}
              >




                {
                  editingId === job._id ? (


                    <>


                      <input

                        type="text"

                        value={editData.title}

                        onChange={(e)=>

                          setEditData({

                            ...editData,

                            title:e.target.value

                          })

                        }

                      />




                      <input

                        type="text"

                        value={editData.country}

                        onChange={(e)=>

                          setEditData({

                            ...editData,

                            country:e.target.value

                          })

                        }

                      />





                      <input

                        type="text"

                        value={editData.location}

                        onChange={(e)=>

                          setEditData({

                            ...editData,

                            location:e.target.value

                          })

                        }

                      />





                      <input

                        type="text"

                        value={editData.category}

                        onChange={(e)=>

                          setEditData({

                            ...editData,

                            category:e.target.value

                          })

                        }

                      />





                      <textarea

                        value={editData.description}

                        onChange={(e)=>

                          setEditData({

                            ...editData,

                            description:e.target.value

                          })

                        }

                      />






                      <button

                        onClick={()=>
                          updateJob(job._id)
                        }

                      >

                        Save

                      </button>



                    </>




                  ) : (



                    <>


                      <h3>
                        {job.title}
                      </h3>



                      <p>
                        <strong>Country:</strong> {job.country}
                      </p>



                      <p>
                        <strong>Location:</strong> {job.location}
                      </p>



                      <p>
                        <strong>Category:</strong> {job.category}
                      </p>



                      <p>
                        <strong>Description:</strong> {job.description}
                      </p>




                      <div className="postedJobButtons">





                        <button

                          onClick={()=>{


                            setEditingId(job._id);



                            setEditData({

                              title:job.title,

                              country:job.country,

                              location:job.location,

                              category:job.category,

                              description:job.description,

                            });



                          }}

                        >

                          Edit

                        </button>






                        <button

                          onClick={()=>
                            deleteJob(job._id)
                          }

                        >

                          Delete

                        </button>





                      </div>



                    </>


                  )

                }




              </div>



            ))


          )

        }




      </div>



    </section>

  );

};



export default ViewJobs;