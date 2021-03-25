import { Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, FilledInput, Grid, makeStyles, MenuItem, Select, TextareaAutosize, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'


const useStyles = makeStyles((theme)=> ({
    skill: {
        fontSize: "13.5px",
        border: `1px solid ${theme.palette.primary.main}`,
        padding: theme.spacing(0.75),
        borderRadius: "5px",
        display: "inline-block",
        fontWeight: 600,
        color: theme.palette.primary.main,
        margin: "5px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "white"
        }
    },
    include: {
        backgroundColor: theme.palette.primary.main,
        color: "white"
    }
}) )

const initialState = {
    title:"",
    type:"Full time",
    location:"Remote",
    companyName:"",
    companyUrl:"",
    link:"",
    desccription:"",
    skills:[]
    
}

const JobUpdate = ({openJobupdate, closeJobUpdate, fetchJobData, jobInfo, closeDialog}) => {

    const [postUpdate, setPostUpdate] = useState(initialState)
    const [loading, setLoading] = useState(false)

    const token = useSelector(state => state.token)



    const { title, type, location, companyName, companyUrl, link, desccription, skills } = postUpdate
    console.log(jobInfo);
    

    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(value);
        setPostUpdate({...postUpdate, [name]:value})
    }
   

    

    const addRemoveSkills = (skill) => {
        postUpdate.skills.includes(skill)
        ? setPostUpdate({...jobInfo, skills: postUpdate.skills.filter((s) => s !== skill)})
        : setPostUpdate({...jobInfo, skills: postUpdate.skills.concat(skill)})
    }

    const closeModal = () => {
        setPostUpdate(initialState)
        setLoading(false)
        closeJobUpdate()
    }
    const id = jobInfo._id
    console.log("Skill Length",skills.length);
    const skillLength = skills.length === 0
    console.log(skillLength);
    const jobPostUpdate = async () => {
        try {
            const res = await axios.put(`api/update/${id}`, 
            { title: title ? title:jobInfo.title, 
              type: type ? type:jobInfo.type, 
              location: location ? location: jobInfo.location, 
              companyName: companyName ? companyName: jobInfo.companyName, 
              companyUrl: companyName ? companyUrl : jobInfo.companyUrl, 
              link: link ? link:jobInfo.link, 
              desccription: desccription ? desccription:jobInfo.desccription, 
              skills: skillLength ? jobInfo.skills: skills
            }, 
            
            {
                headers: {Authorization: token}
            })
            setPostUpdate({...postUpdate, res})
            console.log("post Data",postUpdate);
            setPostUpdate(initialState)
           
            
            
        } catch (err) {
            console.log(err);
        }
    }

    const handleJobPostUpdate = () => {
        setLoading(true)
        jobPostUpdate()
        closeDialog()
        fetchJobData()
        closeModal()
        //closeDialog()
    }

    const skillss = ["javascript", "react", "node", "Mongo", "express"]
    const classes = useStyles()

    return (
        <Dialog open={openJobupdate} fullWidth> 
            <DialogTitle>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">Update Job Info</Typography>
                <Button onClick={closeModal}>
                    <Close/>
                </Button>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FilledInput fullWidth name="title" defaultValue={jobInfo.title} placeholder="Job Title" onChange={handleChange} disableUnderline/>
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput fullWidth name="companyName" defaultValue={jobInfo.companyName} placeholder="Company Name" onChange={handleChange} disableUnderline/>
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput fullWidth name="companyUrl" defaultValue={jobInfo.companyUrl} placeholder="Company Url" onChange={handleChange} disableUnderline/>
                    </Grid>
                    <Grid item xs={6}>
                    <Select fullWidth  name="location" defaultValue={jobInfo.location} onChange={handleChange}  disableUnderline variant="filled">
                            <MenuItem value="Remote" >Remote</MenuItem>
                            <MenuItem value="In office">In office</MenuItem>
                    </Select>
                    </Grid>
                    <Grid item xs={6}>
                    <Select  name="type" defaultValue={jobInfo.type} onChange={handleChange} fullWidth disableUnderline variant="filled">
                            <MenuItem value="Full time" >Full time</MenuItem>
                            <MenuItem value="Part tiem">Part time</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                    </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput fullWidth name="link" defaultValue={jobInfo.link} placeholder="Link" onChange={handleChange} disableUnderline/>
                    </Grid>
                    <Grid item xs={12}>
                    <TextareaAutosize name="desccription" defaultValue={jobInfo.desccription} onChange={handleChange}  style={{ width: "100%" }} aria-label="minimum height"  rowsMin={4} placeholder="Description"/>
                    </Grid>
                    
                </Grid>
                <Box mt={5}>
                    <Typography>Skills</Typography>
                    <Box display="flex">
                        {
                            skillss.map((skil) => (
                                <Box key={skil} onClick={()=> addRemoveSkills(skil)} >
                                    <Typography className={`${classes.skill} ${postUpdate.skills.includes(skil) && classes.include}`}>{ skil }</Typography>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
                <Box  mt={2} mx={13}>
                    <Button onClick={handleJobPostUpdate}  style={{width: "350px", padding:"15px 0px"}} variant="contained" disableElevation color="primary" disabled={loading}>
                        {
                            loading ? <CircularProgress color="secondary" size={22}/>:("Post A Job")
                        }
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}


export default JobUpdate

