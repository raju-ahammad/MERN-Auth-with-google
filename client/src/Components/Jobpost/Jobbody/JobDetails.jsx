import { Box, Dialog, DialogTitle, IconButton, Typography } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React from 'react'

const JobDetails = (props) => {
   
    
    const {title, companyName, skills, createdAt, desccription} = props.job
    const close = props.closeDialog
    
    console.log(props.job.user);
    const userInfo = props.job.user
  
    return (
        <Box>
        <Dialog fullWidth open={!!Object.keys(props.job).length}>
            <DialogTitle >
                <Box p={4} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography>{title}</Typography>
                    <IconButton onClick={close}>
                        <Close/>
                    </IconButton>
                </Box>
            </DialogTitle>
            <Box p={4}>
            {
                userInfo ? <Typography>{userInfo.name}</Typography> : <div></div>
            }
            <Typography>{companyName}</Typography>
                <Typography>
                    {desccription}
                </Typography>
                
            </Box>
        </Dialog>
        </Box>
    )
}

export default JobDetails
