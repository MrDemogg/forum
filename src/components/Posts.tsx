import React, {useEffect} from 'react';
import {forumAPI} from "../service/ForumService";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {forumSlice} from "../store/reducers/ForumSlice";

const Posts = () => {
  const {data: posts, error, isLoading, isError, refetch} = forumAPI.useFindPostsQuery(undefined)
  const {globalIsLoading} = useAppSelector(state => state.forumReducer)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!isError) {
      setInterval(() => {
        refetch()
      }, 200000)
    }
    if (isError && error) {
      if ('originalStatus' in error && 'data' in error && error.originalStatus !== 200) {
        dispatch(forumSlice.actions.setError(error.data))
      } else if ('status' in error && error['status'] === 'FETCH_ERROR') {
        if ('error' in error) {
          dispatch(forumSlice.actions.setError(error['error']))
        } else if ('message' in error && error['message']) {
          dispatch(forumSlice.actions.setError(error['message']))
        }
      }
    }
    if (isLoading) {
      dispatch(forumSlice.actions.changeGlobalIsLoading(true))
    } else {
      dispatch(forumSlice.actions.changeGlobalIsLoading(false))
    }
  }, [isError, isLoading])
  dispatch(forumSlice.actions.changeGlobalIsError(isError))
  return (
    <div style={{marginTop: 55}}>
      {(!globalIsLoading && !globalIsLoading) && posts && posts.length > 0
            ? posts.map((post, index) =>
              <Card sx={{ display: 'flex', width: '70%', margin: 'auto', marginTop: index > 0 ? 20 : 0 }} key={post._id}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={post.image}
                  alt="Post image"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant={'h5'}>{post.datetime} by {post.username}</Typography>
                  <CardContent>
                    <Typography variant={'h2'}>{post.title}</Typography>
                  </CardContent>
                </Box>
              </Card>
            )
            : <Typography variant={'h1'} style={{textAlign: 'center'}}>Ничего нет</Typography>
      }
    </div>
  );
};

export default Posts;