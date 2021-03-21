import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Moment from 'react-moment';
const useStyles = makeStyles((theme) => ({
    // wrapper: {
    //     border: '1px solid #e8e8e8',
    //     margin: "10px 8px"
    // },
    wrapper: {
        background: '#fff',
        display: 'flex',
        boxShadow: ' 0px 1px 5px rgba(0,0,0,0.1)',
        borderRadius: '5px',
        cursor: "pointer"
       
    },
    companyName: {
        fontSize: "13.5px",
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(0.75),
        borderRadius: "5px",
        display: "inline-block",
        fontWeight: 600,
        color: "white"
    },
    skill: {
        fontSize: "13.5px",
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(0.75),
        borderRadius: "5px",
        display: "inline-block",
        fontWeight: 600,
        color: "white",
        margin: "5px"
    }
}))

const Jobcard = (props) => {
    const classes = useStyles()
    const {createdAt} = props
    const open = props.opneDialog
    
    
    return (
        <Box p={2} mt={2} className={classes.wrapper} onClick={open}>
            <Grid container alignItems="center">
                <Grid item xs>
                    <Typography variant="subtitle1">
                        {props.title}
                    </Typography>
                    <Typography>{props.user.name}</Typography>
                    <Typography className={classes.companyName} variant="subtitle2">
                        {props.companyName}
                    </Typography>
                </Grid>
                <Grid item container xs>
                    {
                        props.skills.map((skil, index) => (
                            <Grid key={index} item>
                                <Typography className={classes.skill}>{ skil }</Typography>
                            </Grid>
                        ))
                    }
                    
                    
                </Grid>
                <Grid item container direction="column" alignItems="flex-end" xs>
                    <Grid item>
                        <Typography variant="caption"><Moment fromNow>{createdAt}</Moment> ago | {props.location}</Typography>
                    </Grid>
                    <Grid item>
                        <Box mt={2}>
                            <Button variant="outlined" >Save</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Jobcard
