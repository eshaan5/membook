import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";

import { commentPost } from "../../state/index";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const commentsRef = useRef();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.app.user);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const finalComment = `${user.displayName ? user.displayName : user.name}: ${comment}`;

    const newPost = await dispatch(commentPost({finalComment, id: post._id}));
    setComments(newPost.payload.comments);
    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });

  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((comment, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              <strong>{comment.split(": ")[0]}</strong>
              {comment.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user && (
        <div style={{ width: "70%" }}>
          <Typography gutterBottom variant="h6">
            Write a Comment!
          </Typography>
          <TextField fullWidth minRows={4} variant="outlined" label="Comment..." multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <Button style={{ marginTop: "10px" }} fullWidth disabled={!comment} variant="contained" onClick={handleCommentSubmit} color="primary">
            Comment
          </Button>
        </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
