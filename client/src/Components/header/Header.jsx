
import { AppBar, Box, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles( (theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: "2px",
      visibility: "hidden"
    },
    title: {
      flexGrow: 1,
    },
    link: {
        color: "white",
        textDecoration: "none",
        margin: "10px",
        "&:hover": {
            color: theme.palette.secondary.main,
            textDecoration: "none"
        }
    },
    iconLink: {
        color: theme.palette.secondary.main,
        textDecoration: "none",
        "&:hover": {
            color: theme.palette.primary.main,
            textDecoration: "none"
        }
    }

  }));

const Header = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const auth = useSelector(state => state.auth)
    const { isLogged } = auth

    const handleLogout = async () => {
        try {
            await axios.get('user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href="/"
        } catch (err) {
            window.location.href="/"
        }
    }


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit"  aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Box className={classes.title} display="flex"  alignItems="center">
                    <Typography variant="h6"> 
                        <Link className={classes.link} to="/">Jobup</Link>
                    </Typography>
                    <Typography > 
                        <Link className={classes.link} to="/">Home</Link>
                    </Typography>
                    
                </Box>
                <Box>
                    {
                        isLogged 
                        ? <Box>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}><Link to='/profile' className={classes.iconLink}>Profile</Link> </MenuItem>
                                <MenuItem onClick={handleClose}><Link className={classes.iconLink} to='/profile'>My Acount</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link className={classes.iconLink} to='/profile'>DashBoard</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link className={classes.iconLink} onClick={handleLogout} to='/'>Logout</Link></MenuItem>
                            </Menu>
                        </Box>
                        : <Box>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}><Link className={classes.iconLink} to='/login'>Login</Link></MenuItem>
                                <MenuItem onClick={handleClose}><Link className={classes.iconLink} to='/register'>Sign Up</Link></MenuItem>
                            </Menu>
                        </Box>
                    }
                </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header

