import React from "react";
import useStyles from "./style";

import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";

import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../state/index";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h5">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: "white" }} size="small" onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <CardContent>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.title}>
          {post.caption}
        </Typography>
        <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => {return dispatch(likePost(post._id))}}>
          <ThumbUpOffAltIcon fontSize="small" /> &nbsp; {/* &nbsp; is a non-breaking space */}
          {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => {
          dispatch(deletePost(post._id));
          setCurrentId(null);
        }}>
          <DeleteIcon fontSize="small" />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
