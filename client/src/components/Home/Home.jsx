import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";

import { useDispatch } from "react-redux";
import { fetchPosts } from "../../state/index";
import useStyles from "./style";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, currentId]);
  
  return (
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
  );
};

export default Home;
