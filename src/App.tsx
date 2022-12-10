import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Posts from "./components/Posts";
import Description from "./components/Description";
import CreatePosts from "./components/CreatePosts";

const App = () => {
  return (
    <BrowserRouter>
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