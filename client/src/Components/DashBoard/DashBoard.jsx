import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { NavLink, Route, useLocation, useRouteMatch } from "react-router-dom";
import UserCv from './Cv/UserCv';
import UserProfile from './Profile/UserProfile';
//import './styles.css';
import UserDashboard from './UserDashboard/UserDashboard';


const DashBoard = () => {
    const {url, path} = useRouteMatch()
    const loc = useLocation().pathname

    console.log(loc);
    const style = {
        fontWeight: "bold",
        color: "red"
      }

    const isPath = url === loc
    console.log("Path true", isPath);  
    
    return (
        <Box>
            <Grid container>
                <Grid item xs={3}>
                    <Box p={3}>
                        <Typography><NavLink to={`${url}`} activeStyle={ isPath ? style : "" }> Dashboard </NavLink></Typography>
                        <Typography><NavLink to={`${url}/userprofile`} activeStyle={style} > Profile </NavLink></Typography>
                        <Typography><NavLink to={`${url}/cv`} activeStyle={style} > CV </NavLink></Typography>
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <Route path={`${url}`} exact component={UserDashboard} />
                    <Route path={`${url}/userprofile`} component={UserProfile} />
                    <Route path={`${url}/cv`} component={UserCv} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default DashBoard
