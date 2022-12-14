import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Posts from "./components/Posts";
import Description from "./components/Description";
import CreatePosts from "./components/CreatePosts";
import NavBar from "./components/UI/NavBar";
import {useAppDispatch} from "./hooks/redux";
import {forumSlice} from "./store/reducers/ForumSlice";
import {forumAPI} from "./service/ForumService";

const App = () => {
  const dispatch = useAppDispatch()
  const [userIsExists] = forumAPI.useIsUserExistsMutation()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedData = JSON.parse(userData)
      if ('token' in parsedData && 'id' in parsedData) {
        userIsExists(parsedData.id).then(res => {
          if ('error' in res && 'status' in res.error && res.error.status === 404) {
            localStorage.removeItem('user')
          } else {
            dispatch(forumSlice.actions.setId(parsedData.id))
            dispatch(forumSlice.actions.setToken(parsedData.token))
          }
        })
      }
    }
  }, [])
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path={'/posts'} element={<Posts />} />
        <Route path={'/posts/:id'} element={<Description />} />
        <Route path={'/create'} element={<CreatePosts />} />
        <Route path={'*'} element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;