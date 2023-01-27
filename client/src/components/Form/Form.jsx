import React, { useEffect, useState } from "react";
import { TextField, Paper, Button, Typography } from "@material-ui/core";
import FileBase from "react-file-base64";

import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../state/index";

import useStyles from "./style";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    caption: "",
    tags: "",
    selectedFile: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  const post = useSelector((state) => currentId ? state.app.posts.find((p) => p._id === currentId) : null);

  useEffect(() => {
    if(post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(currentId) {
      dispatch(updatePost({currentId, postData}));
    } else {
    dispatch(createPost(postData));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      caption: "",
      tags: "",
      selectedFile: "",
    });
  };

  return <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
          <Typography variant="h6" className={classes.heading}>Let's Create a Memory!</Typography>
          <TextField name="creator" variant="outlined" label="Creator" fullWidth
            value={postData.creator} 
            onChange={(e) => setPostData({ ...postData, creator: e.target.value })} // spread operator to keep the other values
          />
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