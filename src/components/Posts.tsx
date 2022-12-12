import React, {useEffect} from 'react';
import {forumAPI} from "../service/ForumService";
import {Alert, Box, LinearProgress} from "@mui/material";

const Posts = () => {
  const {data: posts, error, isError, isLoading, refetch} = forumAPI.useFindPostsQuery(undefined)
  console.log(error)
  useEffect(() => {
    setInterval(() => {
      refetch()
    }, 200000)
  }, [])
  return (
    <div style={{marginTop: 55}}>
      {isLoading
        ? <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
        : isError
          ? <Alert variant="filled" severity="error">
              {error
                ? 'data' in error && 'originalStatus' in error && error.originalStatus !== 200 && error.data
                : 'status' in error && error['status'] === 'FETCH_ERROR' && 'error' in error
                  ? error['error']
                  : 'message' in error && error['message']
              }
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