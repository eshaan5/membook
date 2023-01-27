import React, { useEffect, useState } from "react";
import { Container, AppBar, Grow, Typography, Grid } from "@material-ui/core";
import logo from "./images/logo.png";

import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";

import useStyles from "./style";

import { useDispatch } from "react-redux";
//import { setPosts, setLogin, setLogout, setPost } from "./state/appSlice";
import { fetchPosts } from "./state/index";

const App = () => {

  const [currentId, setCurrentId] = useState(null);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, currentId]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          MemBook
        </Typography>
        <img className={classes.image} src={logo} alt="logo" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid className={classes.container} container justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
