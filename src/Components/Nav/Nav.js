import React, { useState, useEffect }  from 'react'
import {  AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import useStyles from './style';
import  memories from '../../images/memories.png'
import {Link, useHistory, useLocation } from 'react-router-dom';
import * as actionType from '../../constants/actionTypes';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

export const Nav = ()=> {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    console.log(user)
    const history = useHistory();
    const dispatch = useDispatch()
    const location = useLocation();
    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
    
        history.push('/');
    
        setUser(null);
      };

      
    useEffect(()=> {
       
        const token = user?.token
        if (token) {
            const decodedToken = decode(token);
      
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
          }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])
    const classes = useStyles()
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
            <Typography component={Link} to='/' className ={classes.heading} variant="h2" text-align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt="memories" height="60"/>
            </div>
            <Toolbar>
                {user ?
                (<div className={classes.profile} >
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                    {user.result.name.charAt(0)}
                </Avatar>
                <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                <Button variant='contianed' classes={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                </div>) 
                : (<Button component={Link} to='/auth' varaint='contained' color='primary'>Sign In</Button>)
                }
            </Toolbar>
      </AppBar>
    )
}