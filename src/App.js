import React from "react";
import { Container } from "@material-ui/core";
import { Routes, Route, Navigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

import { useDispatch, useSelector } from "react-redux";
import { setLogin, setLogout } from "./state";

import { auth } from "./firebase";

const App = () => {

  const googleProvider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.app.user);

  const signInWithGoogle = async () => {
    !user &&
      signInWithPopup(auth, googleProvider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.idToken;
          dispatch(setLogin({...result.user, token}));
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
  };

  const logout = () => {
    dispatch(setLogout());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
      <Container maxWidth="xl">
        <Navbar logout={logout} />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={!user ? <Auth signInWithGoogle={signInWithGoogle} /> : <Navigate to="/posts" /> } />
        </Routes>
      </Container>
  );
};

export default App;
