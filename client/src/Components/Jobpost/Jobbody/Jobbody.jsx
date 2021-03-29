import { Box, Button, CircularProgress } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dispatchGetJobs, fetchAllJobs } from '../../redux/Actions/jobsAction'
import JobPostModal from '../JobForm/JobPostModal'
import JobUpdate from '../JobForm/JobUpdate'
import Jobcard from './Jobcard'
import JobDetails from './JobDetails'
import JobSearch from './Jobsearch'
const Jobbody = () => {
    const [searchJobs, setSearchJobs] = useState([])
    const [jobDetails, setJobDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [jobPostOpen, setJobPostOpen] = useState(false)
    const [customJobSearch, setCustomJobSearch] = useState(false)
    const [jobUpdateOpne, setJobUpdateOpne] = useState(false)

    const jobPosts = useSelector(state => state.jobPosts)
    const dispatch = useDispatch()

    const {jobs, isLoading} = jobPosts


    const fetchJobData = () => {
        setCustomJobSearch(false)
        fetchAllJobs().then(res => {
            dispatch(dispatchGetJobs(res))
        })
        
    }

    const fetchJobSearchData = (jobSearch) => {
        setLoading(true)
        setSearchJobs(jobs.filter((job) => job.type === jobSearch.type && job.location === jobSearch.location))
        setLoading(false)
        setCustomJobSearch(true)
    }

    useEffect(() => {
        fetchJobData()
    }, [])
 

    
    return (
        <Box px={4}>
            <JobSearch fetchJobSearchData={fetchJobSearchData} openJobPost={()=>setJobPostOpen(true)}/>
            <JobPostModal jobPostOpen={jobPostOpen} closejobPost={()=>setJobPostOpen(false)} fetchJobData={fetchJobData} />
            <JobDetails job={jobDetails} closeDialog={()=> setJobDetails({})} jobUpdateOpen={()=> setJobUpdateOpne(true)} />
            <JobUpdate closeDialog={()=> setJobDetails({})} fetchJobData={fetchJobData} closeJobUpdate = {() => setJobUpdateOpne(false)} openJobupdate={jobUpdateOpne} jobInfo={jobDetails} />
            {
                !isLoading
                ? <CircularProgress/>
                : (
                    <>
                    {
                        customJobSearch 
                        ? (
                            <>
                                {
                                    loading 
                                    ? <CircularProgress/> 
                                    : (
                                        <>
                                        <Box>
                                            <Button onClick={()=>fetchJobData()}>
                                                <Close size={20} />
                                                Custom Search
                                            </Button>
                                        </Box>
                                        {
                                            searchJobs.map((job) => (
                                                <Jobcard key={job._id} {...job} opneDialog={()=>setJobDetails(job)}/>
                                            ))
                                        }
                                        </>
                                    )
                                }
                            </>
                        )
                        : (
                            <>
                                {
                                    jobs.map((job) => (
                                        <Jobcard key={job._id} {...job} />
                                    ))
                                }
                            </>
                        )
                    }
                    </>
                )
            }
        </Box>
    )
}

export default Jobbody
