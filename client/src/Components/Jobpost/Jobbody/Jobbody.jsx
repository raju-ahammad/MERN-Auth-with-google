import { Box, Button, CircularProgress } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import JobPostModal from '../JobForm/JobPostModal'
import Jobcard from './Jobcard'
import JobDetails from './JobDetails'
import JobSearch from './Jobsearch'
const Jobbody = () => {
    const [jobs, setJobs] = useState([])
    const [jobDetails, setJobDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [jobPostOpen, setJobPostOpen] = useState(false)
    const [customJobSearch, setCustomJobSearch] = useState(false)


    const fetchJobData = async () => {
        try {
            setCustomJobSearch(false)
            setLoading(true)
            const res = await axios.get('/api/')
            setJobs(res.data)
            setLoading(false)
        } catch (err) {
            console.log(err.message);
        }
    }

    const fetchJobSearchData = (jobSearch) => {
        setLoading(true)
        setJobs(jobs.filter((job) => job.type === jobSearch.type && job.location === jobSearch.location))
        setLoading(false)
        setCustomJobSearch(true)
    }

    

    useEffect(() => {
        fetchJobData()
    }, [])
    console.log(jobs);

    
    return (
        <Box px={4}>
            <JobSearch fetchJobSearchData={fetchJobSearchData} openJobPost={()=>setJobPostOpen(true)}/>
            <JobPostModal jobPostOpen={jobPostOpen} closejobPost={()=>setJobPostOpen(false)} fetchJobData={fetchJobData} />
            <JobDetails job={jobDetails} closeDialog={()=> setJobDetails({})} />
           {
               loading 
               ? <CircularProgress />
               : (
                   <>
                        {
                            customJobSearch && 
                            (
                                <Box>
                                    <Button onClick={fetchJobData}>
                                        <Close size={20} />
                                        Custom Search
                                    </Button>
                                </Box>
                            )
                        }
                        {
                            jobs.map((job) => (
                                <Jobcard key={job._id} {...job} opneDialog={()=>setJobDetails(job)}/>
                            ))
                        }
                   </>
               ) 
           }
        </Box>
    )
}

export default Jobbody
