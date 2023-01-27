// this file is same as postMessage.js

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    caption: String,
    creator: String,
    tags: [String],
    selectedFile: String, // image to string
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Post = mongoose.model("Post", postSchema);

export default Post;