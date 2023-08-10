import React, { useState } from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";

import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../state/index";
import useStyles from "./style";

import Pagination from "../Pagination";

import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input"; // this is for giving tag like look to the input

function useQuery() {
  return new URLSearchParams(useLocation().search);
} // this is for searching something from the url

const Home = () => {
  const [currentId, setCurrentId] = useState(null);

  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const page = query.get("page") || 1; // search for page in the url if not found then set it to 1
  const searchQuery = query.get("searchQuery"); // search for searchQuery in the url

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") })); // tags are converted to string and then passed
      navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
    } else navigate("/"); // if search is empty then navigate to the home page
  };

  const handleAdd = (tag) => setTags([...tags, tag]); // adding tag to the tags array
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete)); // deleting tag from the tags array

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={`${classes.gridContainer} ${classes.container}`} container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField name="search" value={search} label="Let's Search some Memories!" fullWidth onChange={(e) => setSearch(e.target.value)} variant="outlined" />
              <ChipInput style={{ margin: "10px 0" }} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags!" variant="outlined" />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary" fullWidth>
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
