import React, {FC, useEffect, useState} from 'react';
import DescriptionCard from "./DescriptionCard";
import {forumAPI} from "../service/ForumService";
import {forumSlice} from "../store/reducers/ForumSlice";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {Button, TextField, Typography} from "@mui/material";

interface CommentProps {
  postId: string
}

const Comments: FC<CommentProps> = ({postId}) => {
  const {data: comments, isError, error, isLoading, refetch} = forumAPI.useFindCommentsQuery(undefined)
  const {globalRefetch, token, userId} = useAppSelector(state => state.forumReducer)
  const [commentText, setCommentText] = useState('')
  const [postComment] = forumAPI.usePostCommentMutation()

  const dispatch = useAppDispatch()

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

  const commentTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setCommentText(e.target.value)
  const commentPostHandler = () => postComment({text: commentText, post: postId, token: token!, userId: userId!})

  return (
    <div style={{marginTop: 15}}>
      {comments &&
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          {token && userId
            && <div style={{display: 'flex', alignSelf: 'center', width: '70%', justifyContent: 'space-between'}}>
                  <TextField
                    label="Comment"
                    multiline
                    maxRows={6}
                    value={commentText}
                    onChange={commentTextHandler}
                    sx={{width: '78%'}}
                  />
                  <Button sx={{width: '20%'}} variant={'outlined'} color={'success'} onClick={commentPostHandler}>Post</Button>
                </div>
          }
          {comments.filter(comment => comment.post === postId).length > 0
          ? <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <Typography variant={'h4'} style={{textAlign: 'center', paddingBottom: 15}}>Комментарии: {comments.filter(comment => comment.post === postId).length} шт.</Typography>
                {comments.map(comment =>
                  postId === comment.post
                  && <div key={comment._id} style={{marginTop: 15}}><DescriptionCard
                    username={comment.username}
                    datetime={comment.datetime}
                    text={comment.text}
                  /></div>)}
            </div>
          : <Typography variant={'h3'} style={{textAlign: 'center'}}>Комментариев не обнаружено</Typography>}
        </div>
      }
    </div>
  );
};

export default Comments;