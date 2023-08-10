import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
  posts: {
    isLoading: true,
    data: [],
    currentPage: 1,
    numberOfPages: 1,
    post: null,
  },
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}; // state which is shared all over the app

export const signin = createAsyncThunk("app/signin", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await api.signIn(formData);
    setLogin(data);
    //navigate('/');

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const signup = createAsyncThunk("app/signup", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await api.signUp(formData);

    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (page) => {
  const { data } = await api.fetchPosts(page);
  return data;
});

export const getPost = createAsyncThunk("posts/fetchPost", async (id) => {
  const { data } = await api.fetchPost(id);
  return data;
});

export const getPostsBySearch = createAsyncThunk("posts/getPostsBySearch", async (searchQuery) => {
  const { data } = await api.fetchPostsBySearch(searchQuery);
  return data;
});

export const createPost = createAsyncThunk("posts/createPost", async ({newPost, navigate}) => {
  const { data } = await api.createPost(newPost);
  navigate(`/posts/${data._id}`);
  return data;
});

export const updatePost = createAsyncThunk("posts/updatePost", async ({ currentId, postData, navigate }) => {
  // this accepts single argument
  const { data } = await api.updatePost(currentId, postData);
  navigate(`/posts/${data._id}`);
  return data;
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await api.deletePost(id);
  return id;
});

export const likePost = createAsyncThunk("posts/likePost", async (id) => {
  const { data } = await api.likePost(id);
  return data;
});

export const commentPost = createAsyncThunk("posts/commentPost", async ({finalComment, id}) => {

  const { data } = await api.commentPost(finalComment, id);
  return data;
});

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload.posts; // here we're not mutating the state, under the hood redux toolkit has a library called immer which allows us to mutate the state
    },
    setLogin: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;

      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
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
      state.posts = { isLoading: false, data: action.payload.data, currentPage: action.payload.currentPage, numberOfPages: action.payload.numberOfPages };
    },
    [fetchPosts.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    [fetchPosts.pending]: (state, action) => {
      state.posts.isLoading = true;
    },
    [createPost.fulfilled]: (state, action) => {
    state.posts.isLoading = false;
      state.posts.data.push(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    [createPost.pending]: (state, action) => {
      state.posts.isLoading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      const updatedPosts = state.posts.data.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
      state.posts.data = updatedPosts;
    },
    [updatePost.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    [updatePost.pending]: (state, action) => {
      console.log("pending");
    },
    [deletePost.fulfilled]: (state, action) => {
      state.posts.data = state.posts.data.filter((post) => post._id !== action.payload);
    },
    [deletePost.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    [deletePost.pending]: (state, action) => {
      console.log("pending");
    },
    [likePost.fulfilled]: (state, action) => {
      const updatedPosts = state.posts.data.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
      state.posts.data = updatedPosts;
    },
    [likePost.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    [likePost.pending]: (state, action) => {
      console.log("pending");
    },
    [signin.fulfilled]: (state, action) => {
      state.user = action.payload.result;
      state.token = action.payload.token;

      localStorage.setItem("user", JSON.stringify(action.payload.result));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.posts.isLoading = false;
    },
    [signin.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    [signin.pending]: (state, action) => {
      state.posts.isLoading = true;
    },
    [signup.fulfilled]: (state, action) => {
      state.user = action.payload.result;
      state.token = action.payload.token;

      localStorage.setItem("user", JSON.stringify(action.payload.result));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      state.posts.isLoading = false;
    },
    [signup.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    [signup.pending]: (state, action) => {
      state.posts.isLoading = true;
    },
    [getPostsBySearch.fulfilled]: (state, action) => {
      state.posts.data = action.payload.data;
      state.posts.isLoading = false;
    },
    [getPostsBySearch.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    [getPostsBySearch.pending]: (state, action) => {
      state.posts.isLoading = true;
    },
    [getPost.fulfilled]: (state, action) => {
      state.posts.post = action.payload;
      state.posts.isLoading = false;
    },
    [getPost.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    [getPost.pending]: (state, action) => {
      state.posts.isLoading = true;
    },
    [commentPost.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.posts.data = state.posts.data.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
    },
    [commentPost.rejected]: (state, action) => {
      console.log(action.error.message);
    },
    [commentPost.pending]: (state, action) => {
      console.log("pending");
    },
  },
});

export const { setPosts, setLogin, setLogout, setPost } = appSlice.actions;
export default appSlice.reducer;