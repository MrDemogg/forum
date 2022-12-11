import React, {useEffect} from 'react';
import {forumAPI} from "../service/ForumService";
import {Alert, Box, LinearProgress} from "@mui/material";

const Posts = () => {
  const {data: posts, error, isError, isLoading, refetch} = forumAPI.useFindPostsQuery(undefined)
  console.log(error)
  useEffect(() => {
    setInterval(() => {
      refetch()
    }, 60000)
  }, [])
  return (
    <div>
      {isLoading
        ? <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        : isError
          ? <Alert variant="filled" severity="error">
              This is an error alert — check it out!
            </Alert>
          : posts && posts.length > 0
            ? posts.map(post =>
              <div key={post._id}>
                <div>{post.title}</div>
                <img src={post.image} alt={'img'} />
                <div>{post.description}</div>
              </div>
            )
            : <div>Ничего нет</div>
      }
    </div>
  );
};

export default Posts;