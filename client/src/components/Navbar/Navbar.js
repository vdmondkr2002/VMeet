import React, { useEffect, useState } from 'react';
import { makeStyles,AppBar,Toolbar,Typography,Button,IconButton,Box,Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import {GoogleLogin} from 'react-google-login'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {googleSignIn,logOut} from '../../actions/auth'
import GoogleIcon from './GoogleIcon'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  date:{
    marginLeft:'auto'
  }
}));
const Navbar = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [loggedIn,setLoggedIn] = useState(false)
  const [time,setTime] = useState(Date.now())
  const user = useSelector(state => state.user)

  useEffect(()=>{
    if(user.name){
      setLoggedIn(true)
    }
  },[user])

  useEffect(() => {
    const timer = setInterval(() => {
        setTime(Date.now())
    }, 60000)
    return () => {
        clearInterval(timer)
    }
}, [])
  const googleSuccess = async (res) => {
    console.log(res)
    try {
  
      dispatch(googleSignIn({
        googleId:res.profileObj.googleId,
        displayName:res.profileObj.name,
        firstName:res.profileObj.givenName,
        lastName:res.profileObj.familyName,
        image:res.profileObj.imageUrl,
        email:res.profileObj.email
      }))
    }catch (err){
      console.log(err)
    }
  };

  const googleError = () => {
    alert("Google Sign In was unsuccessful. Try again later");
  };

  const logout = ()=>{
    dispatch(logOut(history))
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          V Meet
        </Typography>
        <Typography variant="h6" className={classes.date}>
          {moment(time).format(' h:mm a ⚈ MMMM Do YYYY')}
        </Typography>
        {
          loggedIn?(
            <>
            <IconButton>
              <Avatar alt={`${user.name}`} src={user.profilePic} >
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </Avatar>
            </IconButton>
            <Button color="secondary" variant="contained" onClick={logout}>
              Logout
            </Button>
            </>
          ):(
            <GoogleLogin
                clientId="716279671550-uhbhnkiocr43jt3don07qtr9inmi4hk7.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Box align="center">
                    <Button
                      color="secondary"
                      fullWidth
                      className={classes.customLogin}
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      startIcon={<GoogleIcon />}
                      variant="contained"
                    >
                      Sign In with Google
                    </Button>
                  </Box>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              />
          )
        }
        
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
