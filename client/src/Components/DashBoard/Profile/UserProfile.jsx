import { Box, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Jobcard from '../../Jobpost/Jobbody/Jobcard'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        boxShadow: ' 0px 1px 5px rgba(0,0,0,0.1)',
        borderRadius: '5px',
    },
    upperBox: {
        background: "#a0b4b7",
        height: "200px"
    },
    imag: {
        height: "200px",
        width: "200px",
        borderRadius: "50%",
        marginTop: "-100px",
        marginLeft: "10px"
    },
    userInfo: {
        marginLeft: "50px",
    }


}))

const UserProfile = () => {
    const [jobDetails, setJobDetails] = useState({})
    
    const auth = useSelector(state => state.auth)
    const { user } = auth
    console.log("jdtls",jobDetails);

    console.log("post",user);
    const isUser = user.length === 0

    const jobs = user.jobPosts

    const classes = useStyles()
    return (
        <div>
            <Box className={classes.wrapper}>
                <Box className={classes.upperBox}>
                </Box>
                <img className={classes.imag} src={ user.avator } alt=""/>
                <Box className={classes.userInfo}>
                    <Typography variant="h6">{ user.name }</Typography>
                    <Link to="/">Home</Link>
                    {/* <Typography>{ user.cv.education ? user.cv.education.univarsityName: "" }</Typography> */}

                </Box>
            </Box>
            <Box textAlign="center" marginTop="10px" >
                <Typography variant="h5" >Your All Job Post</Typography>
            </Box>

            <Box className={classes.wrapper}>
            {
                !isUser  
                ? jobs.map((job) => (
                    <Jobcard key={job._id} {...job} />
                ))
                : "Loading ..."
            }
            </Box>
            
        </div>
    )
}

export default UserProfile
