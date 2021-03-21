import { Box, Button, Dialog, DialogTitle, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    updateBtn: {
        marginRight: "10px",
        float: "right",
    }
}))

const JobDetails = ({ job, jobUpdateOpen, closeDialog }) => {
   
    const {title, companyName, skills, createdAt, desccription, type, location, _id} = job
    
    console.log(job.user);
    const userInfo = job.user
   

    const auth = useSelector(state => state.auth)
    const {user , isAdmin} = auth
    
    if (userInfo) {
        var isPostUserMatch = user._id === userInfo._id
        console.log(isPostUserMatch); 
    }

    
    const handleClose = () => {
        closeDialog()
    }

    const handleUpdateOpen = () => {
        jobUpdateOpen()
    }

    
    
    const classes = useStyles()
  
    return (
        <Box>
        <Dialog fullWidth open={!!Object.keys(job).length}>
            <DialogTitle >
                <Box p={4} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>{title}</Typography>
                    <IconButton onClick={handleClose}>
                        <Close/>
                    </IconButton>
                </Box>
            </DialogTitle>
            <Box p={4}>
            {
                userInfo ? <Typography>{userInfo.name}</Typography> : <div></div>
            }
            <Typography>{_id}</Typography>
            <Typography>{companyName}</Typography>
            <Typography>
                {desccription}
            </Typography>
            <Typography>{type}</Typography>
            <Typography>{location}</Typography>
                
            </Box>
            <Box m={2}>
                {
                    isPostUserMatch 
                    ? <Button onClick={handleUpdateOpen}  color="secondary" variant="contained" className={classes.updateBtn}>Update</Button>
                    : "" 
                }
            </Box>
        </Dialog>
        </Box>
    )
}

export default JobDetails
