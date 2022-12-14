import React, {useEffect} from 'react';
import {forumAPI} from "../service/ForumService";
import {
  Box,
  Card, CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {forumSlice} from "../store/reducers/ForumSlice";
import {useNavigate} from "react-router-dom";

const Posts = () => {
  const {data: posts, error, isLoading, isError, refetch} = forumAPI.useFindPostsQuery(undefined)
  const {globalIsLoading, globalRefetch} = useAppSelector(state => state.forumReducer)
  const router = useNavigate()
  const dispatch = useAppDispatch()
  console.log(globalRefetch)
  useEffect(() => {
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
    if (globalRefetch) {
      refetch()
      dispatch(forumSlice.actions.globalRefetch(false))
    }
  }, [isError, isLoading, globalRefetch])
  dispatch(forumSlice.actions.changeGlobalIsError(isError))
  return (
    <div style={{marginTop: 55, display: 'flex', flexDirection: 'column', width: '50%', margin: '0 auto'}}>
      {(!globalIsLoading && !globalIsLoading) && posts && posts.length > 0 && posts.map(post =>
              <Card sx={{ margin: '20px auto', width: '100%', backgroundColor: '#212121' }} key={post._id}>
                <CardActionArea
                 onClick={() => router('/posts/' + post._id + '?info=' +
                   JSON.stringify({username: post.username, datetime: post.datetime, description: post.description, title: post.title}))}
                 style={{display: 'flex', width: '100%', justifyContent: 'left'}}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 151, backgroundColor: post.image === "https://cdn-icons-png.flaticon.com/512/2639/2639965.png" ? '#fff' : '#212121' }}
                    image={post.image}
                    alt="Post image"
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{color: '#eeeeee'}} variant={'h5'}>{post.datetime} by {post.username}</Typography>
                    <CardContent>
                      <Typography sx={{color: '#eeeeee'}} variant={'h2'}>{post.title}</Typography>
                    </CardContent>
                  </Box>
                </CardActionArea>
              </Card>
            )
      }
    </div>
  );
};

export default Posts;