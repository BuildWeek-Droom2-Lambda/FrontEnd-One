  
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SeekerMainUI = () => {
    const [jobs, setJobs] = useState([]);
    const [savedJob, setSavedJob] = useState({
        job_id: null,
        name: "",
        location: "",
        description: "",
        company_id: null
    });
    console.log("Saved Jobs ", savedJob);

    console.log("Jobs ", jobs);

    useEffect(() => {
        axios
        .get("https://droom-node-server.herokuapp.com/api/jobs")

        .then(res => {
            console.log(res);
            setJobs(res.data);
        })

        .catch(err => {
            console.log(err);
        })
    }, [])

    const userID = localStorage.getItem("userid");
    
    useEffect(() => {
        axios
        .post(`https://droom-node-server.herokuapp.com/api/seekers/${userID}/saved`, savedJob)

        .then(res => {
            console.log(res);
        }) 

        .catch(err => {
            console.log(err.message);
        })
    },[savedJob, userID ])
    
    const ClickHandler = (e) => {
        const jobID = e.target.value;
        console.log(jobID);
        const theJob = jobs[jobID - 1];
        console.log(theJob);
        setSavedJob({
            job_id: theJob.id,
            name: theJob.name,
            location: theJob.location,
            description: theJob.description,
            company_id: theJob.company_id
        });
    }

    const handleDelete = (e) => {
        const id = e.target.value;
        const index = id - 1;
        const newJobs = jobs.filter(job => {
            return job.id - 1 !== index;
        });
        setJobs(newJobs);
    }
        
    return (
        <div className="main-ui-container">
            <nav>
                <h3>Droom</h3>
                <div>
                    <Link to="/seekerprofilepage">Profile</Link>
                    <Link to="/seekermatchespage">Matches</Link>
                    <Link to="/seekermainui">Home</Link>
                </div>
            </nav>

            <div className="main-ui">
                <h1>Find Jobs</h1>
                <div className="jobs">
                    {jobs.map(job => {
                        return (
                            <div key={job.id} className="job-card">
                                <h1>{job.name}</h1>
                                <h2>{job.location}</h2>
                                <p>{job.description}</p>
                                <div>
                                    <button value={job.id} onClick={(e) => handleDelete(e)} >X</button>
                                    <button value={job.id} onClick={(e) => ClickHandler(e)}>Save</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            
        </div>
    )
}

export default SeekerMainUI;