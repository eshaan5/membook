import axios from 'axios';  // for api calls

const API = axios.create({ baseURL: 'https://membook-server.vercel.app' });  // create an instance of axios to use baseURL

API.interceptors.request.use((req) => {  // this callback function will run before every request
    if(localStorage.getItem('token')) {  // if user is logged in
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;  // add token to headers
    }

    return req;  // return request
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const commentPost = (comment, id) => API.post(`/posts/${id}/commentPost`, { comment });

export const signIn = (formData) => API.post('/user/signin', formData);  // for signing in
export const signUp = (formData) => API.post('/user/signup', formData);  // for signing up