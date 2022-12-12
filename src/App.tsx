import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Posts from "./components/Posts";
import Description from "./components/Description";
import CreatePosts from "./components/CreatePosts";
import NavBar from "./components/UI/NavBar";
import {useAppDispatch} from "./hooks/redux";
import {forumSlice} from "./store/reducers/ForumSlice";

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedData = JSON.parse(userData)
      if ('token' in parsedData && 'id' in parsedData && typeof parsedData.token === 'string' && typeof parsedData.id === "string") {
        dispatch(forumSlice.actions.setId(parsedData.id))
        dispatch(forumSlice.actions.setToken(parsedData.token))
      }
    }
  }, [])
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={'/post'} element={<Posts />} />
        <Route path={'/post/:id'} element={<Description />} />
        <Route path={'/create'} element={<CreatePosts />} />
        <Route path={'*'} element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;