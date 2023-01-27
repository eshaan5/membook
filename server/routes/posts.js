import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost); // used for updating existing document
router.delete('/:id', deletePost); // used for deleting existing document
router.patch('/:id/likePost', likePost);

export default router;