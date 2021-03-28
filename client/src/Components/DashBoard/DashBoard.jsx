import { Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import DescriptionIcon from '@material-ui/icons/Description';
import React from 'react';
import { BrowserRouter as Router, Link, Route, useLocation } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import UserCv from './Cv/UserCv';
import UserProfile from './Profile/UserProfile';
import './styles.css';
import UserDashboard from './UserDashboard/UserDashboard';



const DashBoard = () => {

    const location = useLocation()
    const path = location.pathname
    console.log(path);
    return (
        <Router>
        <div className="App">
            <Tabs>
                <TabList>
                <Tab>
                <Link to={`${path}`}> <Typography variant="subtitle1"> <DashboardIcon/>  DashBoard  </Typography></Link>
                </Tab>
                
                <Tab>
                <Link to={`${path}/profile`}>  <Typography variant="subtitle1"> <AccountCircleIcon/> Profile  </Typography></Link>
                </Tab>
                <Tab>
                <Link to={`${path}/cv`}> <Typography variant="subtitle1"> <DescriptionIcon/>  CV  </Typography></Link>
                </Tab>
                
                </TabList>
                <TabPanel>
                    <div className="panel-content">
                        <Route path={`${path}`} component={UserDashboard} />
                    </div>
                </TabPanel>

                <TabPanel>
                <div className="panel-content">
                    <Route path={`${path}/profile`} component={UserProfile} />
                </div>
                </TabPanel>
                <TabPanel>
                <div className="panel-content">
                    <Route path={`${path}/cv`} component={UserCv}/>
                </div>
                </TabPanel>
                
            </Tabs>
        </div>
        </Router>
    )
}

export default DashBoard
