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

const JobPostModal = ({jobPostOpen, closejobPost, fetchJobData}) => {
    const [post, setPost] = useState(initialState)
    const [loading, setLoading] = useState(false)

    const token = useSelector(state => state.token)

    const { title, type, location, companyName, companyUrl, link, desccription, skills } = post

    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(value);
        setPost({...post, [name]:value})
    }
   

    

    const addRemoveSkills = (skill) => {
        post.skills.includes(skill)
        ? setPost({...post, skills: post.skills.filter((s) => s !== skill)})
        : setPost({...post, skills: post.skills.concat(skill)})
    }

    const closeModal = () => {
        setPost(initialState)
        setLoading(false)
        closejobPost()
    }
    const jobPost = async () => {
        try {
            const res = await axios.post('/api/jobpost', { title, type, location, companyName, companyUrl, link, desccription, skills }, {
                headers: {Authorization: token}
            })
            setPost({...post, res})
            console.log("post Data",post);
            fetchJobData()
            setPost(initialState)
            
        } catch (err) {
            console.log(err);
        }
    }

    const handleJobPost = () => {
        setLoading(true)
        jobPost()
        closeModal()
    }

    const skillss = ["javascript", "react", "node", "Mongo", "express"]
    const classes = useStyles()

    return (
        <Dialog open={jobPostOpen} fullWidth> 
            <DialogTitle>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6"> Post A Job</Typography>
                <Button onClick={closeModal}>
                    <Close/>
                </Button>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FilledInput fullWidth name="title" value={title} placeholder="Job Title" onChange={handleChange} disableUnderline/>
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput fullWidth name="companyName" value={companyName} placeholder="Company Name" onChange={handleChange} disableUnderline/>
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput fullWidth name="companyUrl" value={companyUrl} placeholder="Company Url" onChange={handleChange} disableUnderline/>
                    </Grid>
                    <Grid item xs={6}>
                    <Select fullWidth  name="location" value={location} onChange={handleChange}  disableUnderline variant="filled">
                            <MenuItem value="Remote" >Remote</MenuItem>
                            <MenuItem value="In office">In office</MenuItem>
                    </Select>
                    </Grid>
                    <Grid item xs={6}>
                    <Select  name="type" value={type} onChange={handleChange} fullWidth disableUnderline variant="filled">
                            <MenuItem value="Full time" >Full time</MenuItem>
                            <MenuItem value="Part tiem">Part time</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                    </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput fullWidth name="link" value={link} placeholder="Link" onChange={handleChange} disableUnderline/>
                    </Grid>
                    <Grid item xs={12}>
                    <TextareaAutosize name="desccription" value={desccription} onChange={handleChange}  style={{ width: "100%" }} aria-label="minimum height"  rowsMin={4} placeholder="Description"/>
                    </Grid>
                    
                </Grid>
                <Box mt={5}>
                    <Typography>Skills</Typography>
                    <Box display="flex">
                        {
                            skillss.map((skil) => (
                                <Box key={skil} onClick={()=> addRemoveSkills(skil)} >
                                    <Typography className={`${classes.skill} ${post.skills.includes(skil) && classes.include}`}>{ skil }</Typography>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
                <Box  mt={2} mx={13}>
                    <Button onClick={handleJobPost}  style={{width: "350px", padding:"15px 0px"}} variant="contained" disableElevation color="primary" disabled={loading}>
                        {
                            loading ? <CircularProgress color="secondary" size={22}/>:("Post A Job")
                        }
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default JobPostModal
