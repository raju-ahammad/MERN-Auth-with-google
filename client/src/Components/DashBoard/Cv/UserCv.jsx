import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { EmailOutlined, Facebook, LinkedIn } from '@material-ui/icons';
import CallIcon from '@material-ui/icons/Call';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React from 'react';
import image from '../Cv/Raju.jpg';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        boxShadow: ' 0px 1px 5px rgba(0,0,0,0.1)',
        borderRadius: '5px',
        borderTop: "25px solid #5b9cd6",
        borderLeft: "15px solid #5b9cd6",
        borderRight: "15px solid #5b9cd6",

    },
    image: {
        width: "150px",
        height: "190px",
        border: "4px solid #5b9cd6",
       
       
    },
    imageWrapper:{
        marginTop: "30px",
        marginBottom: "30px"
    },
    line: {
        background: "#5b9cd6",
        height: "8px",
        width: "90%",
        textAlign: "center",
        margin: "auto"
    },
    title: {
        color: "#d2d0d1"
    },
    cvItem: {
        padding: "20px"
    }
    


}))

const UserCv = () => {
    const classes = useStyles()
    

    return (
        <Box className={classes.wrapper}>
            <Box textAlign="center" className={classes.imageWrapper}>
                <img className={classes.image} src={image} alt=""/>
                <Typography variant="h5" className={classes.title}>Raju Ahammad</Typography>
                <Typography className={classes.title}>Full Stack Developer</Typography>
            </Box>

            <Box className={classes.line}></Box>
            <Box className={classes.cvItem}>
                <Grid container>
                    <Grid item xs={5}>
                        <Typography variant="h6">
                            About Me
                        </Typography>
                        <Typography>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        </Typography>
                        <Typography variant="h6" >Contact</Typography>
                        <Typography > <LocationOnIcon/>   Location</Typography>
                        <Typography > <CallIcon/>   Call</Typography>
                        <Typography > <EmailOutlined/>   Email</Typography>
                        <Typography > <Facebook/>   Facebook</Typography>
                        <Typography > <LinkedIn/>   LinkdIn</Typography>
                        <Typography variant="h6">
                            Education
                        </Typography>
                        <Grid container>
                        <Grid item xs={5}>
                            <Typography>Univaersity Name</Typography>
                            <Typography>2016-17</Typography>
                            <Typography>Collage Name</Typography>
                            <Typography> 20124-15</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography>Course Details</Typography>
                            <Typography>Course Details</Typography>
                            
                        </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={7}>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography variant="h6">Career</Typography>
                                <Typography>2016-Present</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Box>
                                    <Typography>JobTitle</Typography>
                                    <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h6">Career</Typography>
                                <Typography>2016-Present</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Box>
                                    <Typography>JobTitle</Typography>
                                    <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h6">Career</Typography>
                                <Typography>2016-Present</Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Box>
                                    <Typography>JobTitle</Typography>
                                    <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Typography>
                                </Box>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default UserCv
