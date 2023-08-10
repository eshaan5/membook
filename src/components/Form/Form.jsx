import React, { useEffect, useState } from "react";
import { TextField, Paper, Button, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";

import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../state/index";

import useStyles from "./style";

import { useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    caption: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.app.user);

  const post = useSelector((state) => currentId ? state.app.posts.data.find((p) => p._id === currentId) : null);

  useEffect(() => {
    if(post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(currentId) {
      dispatch(updatePost(currentId, {...postData, name: `${user.name ? user.name : user.displayName}`}, navigate));
    } else {
    dispatch(createPost({...postData, name: `${user.name ? user.name : user.displayName}`}, navigate));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      caption: "",
      tags: "",
      selectedFile: "",
    });
  };

  if(!user?.name && !user?.displayName) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like others' memories!
        </Typography>
      </Paper>
    )
  }

  return <Paper className={classes.paper} elevation={6} >
      <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
          <Typography variant="h6" className={classes.heading}>Let's {currentId ? 'Edit' : 'Create'} a Memory!</Typography>
          <TextField name="title" variant="outlined" label="Title" fullWidth 
            value={postData.title} 
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
            />
          <TextField name="caption" variant="outlined" label="Caption" fullWidth 
            value={postData.caption} 
            onChange={(e) => setPostData({ ...postData, caption: e.target.value })}
            />
          <TextField name="tags" variant="outlined" label="Tags" fullWidth
            value={postData.tags} 
            onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
            />
          <div className={classes.fileInput}>
              <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
          </div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" fullWidth onClick={clear} >Clear</Button>
      </form>
  </Paper>;
};

export default Form;