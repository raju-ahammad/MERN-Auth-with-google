import { Box, Grid, Typography } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const JobDescription = () => {

    const [jobDetails, setJobDetails] = useState({})

    const param = useParams()
    const id = param.jobid;
    console.log("param",id);

    const fetchJobDetails = async () => {
        const res = await axios.get(`/api/${id}`)
        console.log(res.data);
        setJobDetails(res.data)
    }

    useEffect(() => {
        fetchJobDetails()
    }, [id])

    const {companyName, companyUrl, createdAt, desccription, link, location, skills, title, type, updatedAt, user} = jobDetails

    console.log("details",jobDetails);
    const img = user.avator


    return (
        <Box>
            <Grid container>
                <Grid item xs={4}>
                    Job Match
                </Grid>
                <Grid item xs={8}>
                    <Box>
                        <Grid container>
                            <Grid item xs={5}>
                                <img style={{ width:"200px", height:"200px" }} src={img} alt=""/>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="subtitle1"> { title } </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Typography>{ desccription }</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default JobDescription
