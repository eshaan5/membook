import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

const initialState = {
    posts: [],
    user: null,
    token: null,
}; // state which is shared all over the app

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await api.fetchPosts();
    return data;
});

export const createPost = createAsyncThunk('posts/createPost', async (newPost) => {
    const { data } = await api.createPost(newPost);
    return data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({currentId, postData}) => { // this accepts single argument
    const { data } = await api.updatePost(currentId, postData);
    return data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    await api.deletePost(id);
    return id;
});

export const likePost = createAsyncThunk('posts/likePost', async (id) => {
    const { data } = await api.likePost(id);
    return data;
});

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload.posts; // here we're not mutating the state, under the hood redux toolkit has a library called immer which allows us to mutate the state
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) {
                    return action.payload.post;
                }
                return post;
            });
            state.posts = updatedPosts;
        },
    },

    extraReducers: {
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts = action.payload;
        },
        [fetchPosts.rejected]: (state, action) => {
            console.log(action.error.message);
        },
        [fetchPosts.pending]: (state, action) => {
            console.log('pending');
        },
        [createPost.fulfilled]: (state, action) => {
            state.posts.push(action.payload);
        },
        [createPost.rejected]: (state, action) => {
            console.log(action.error.message);
        },
        [createPost.pending]: (state, action) => {
            console.log('pending');
        },
        [updatePost.fulfilled]: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload._id) {
                    return action.payload;
                }
                return post;
            });
            state.posts = updatedPosts;
        },
        [updatePost.rejected]: (state, action) => {
            console.log(action.error.message);
        },
        [updatePost.pending]: (state, action) => {
            console.log('pending');
        },
        [deletePost.fulfilled]: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload);
        },
        [deletePost.rejected]: (state, action) => {
            console.log(action.error.message);
        },
        [deletePost.pending]: (state, action) => {
            console.log('pending');
        },
        [likePost.fulfilled]: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload._id) {
                    return action.payload;
                }
                return post;
            });
            state.posts = updatedPosts;
        },
        [likePost.rejected]: (state, action) => {
            console.log(action.error.message);
        },
        [likePost.pending]: (state, action) => {
            console.log('pending');
        },
    },
});

//export const { setPosts, setLogin, setLogout, setPost } = appSlice.actions;
export default appSlice.reducer;