import React, { useEffect } from "react";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

import useStyles from "./style";
import logo from "../../images/logo.png";
import { useSelector } from "react-redux";

import decode from "jwt-decode";

const Navbar = ({ logout }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const user = useSelector((state) => state.app.user);
  const token = useSelector((state) => state.app.token);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  // this is to check if the token is expired or not
  useEffect(() => {
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  }, [token]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer} style={{ textDecoration: 'none' }}>
        <Typography className={classes.heading} variant="h2" align="center">
          MemBook
        </Typography>
        <img className={classes.image} src={logo} alt="logo" height="60" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.displayName?.charAt(0) || user.name[0]} src={user.photoURL}>
              {user.displayName?.charAt(0) || user.name[0]}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.displayName || user?.name}
            </Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
