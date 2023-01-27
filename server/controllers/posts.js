// here we have all the logic for the routes

import Post from "../models/post.js";
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        return (res.status(200).json(posts));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {

    const newPost = new Post(req.body);

    try {
        
        await newPost.save();

        res.status(201).json(newPost);

    } catch (error) {
        
        res.status(409).json({ message: error.message });

    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id'); // validating the received id

    const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true })

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id'); // validating the received id

    await Post.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id'); // validating the received id

    const post = await Post.findById(id);
    if(!post.likeCount)
    post.likeCount = post.likeCount + 1;

    post.save();

    res.json(post);
}