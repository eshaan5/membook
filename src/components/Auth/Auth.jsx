import React, { useState } from "react";
import { Avatar, Button, Typography, Container, Grid, Paper } from "@material-ui/core";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Input from "./Input";

import useStyles from "./styles";

import { signin, signup } from "../../state/index"

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = ({ signInWithGoogle }) => {
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleChange = (e) => {

    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(isSignup) {
      dispatch(signup(formData, navigate));
      console.log('signup started')
    }
    else {
      dispatch(signin(formData, navigate));
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={signInWithGoogle}>
          Sign In with Google <GoogleIcon />
        </Button>
        <form className={classes.form} onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus={!isSignup} />
            <Input name="password" label="Password" type={showPassword ? "text" : "password"} handleChange={handleChange} handleShow={handlePassword} password={showPassword} />
            {isSignup && <Input name="confirmPassword" label="Confirm Password" type="password" handleChange={handleChange} />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode} variant="outlined">
                {!isSignup ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
