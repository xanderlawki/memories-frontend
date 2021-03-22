
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch} from 'react-redux'
import { signin, signup } from '../../actions/auth';
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import Input from './input';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import useStyle from "./style";
import { AUTH } from '../../constants/actionTypes';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
const Auth = () => {
    const [form, setForm] = useState(initialState);
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const classes = useStyle();
    const [isSignUp, setIsSignup] = useState(false);
    const history = useHistory();
   
    const switchMode = () => {
        setIsSignup((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
      };

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isSignUp) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
    console.log(form)
  };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const googleSuccess = async (res) => {
      console.log(res)
  

     try {
        const result = res?.profileObj
        const token = res?.tokenId;
      dispatch({ type: AUTH, data: { result, token } });

      history.push('/');
     } catch (error) {
      console.log(error);
 }
  };

  const googleError = async(error) => console.log('Google Sign In was unsuccessful. Try again later', error);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "sign up" : "sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={3}>
          { isSignUp && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignUp ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId="821852316779-a683jn78qf0t7r8sg50c3jaov1tcpiua.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
