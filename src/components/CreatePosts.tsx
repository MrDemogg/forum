import React, {useState} from 'react';
import {Box, Button, Card, TextField} from "@mui/material";
import {forumAPI} from "../service/ForumService";
import {useAppSelector} from "../hooks/redux";

const CreatePosts = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [post] = forumAPI.usePostPostMutation()
  const {token, userId} = useAppSelector(state => state.forumReducer)

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTitle(e.target.value)
  const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDescription(e.target.value)
  const imageHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setImage(e.target.value)
  const postHandler = () => {
    post({
      title: title,
      description: description.length > 0 ? description : undefined,
      image: image.length > 0 ? image : undefined,
      token: token!,
      userId: userId!
    })
      .then(res => {
        console.log(res)
      })
  }

  return (
    <Card style={{width: '100%'}}>
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <TextField
          required
          label="Title"
          value={title}
          onChange={titleHandler}
          sx={{mt: 1}}
        />
        <TextField
          label="Description"
          multiline
          maxRows={6}
          value={description}
          onChange={descriptionHandler}
          sx={{mt: 3}}
        />
        <TextField
          label="Image"
          value={image}
          onChange={imageHandler}
          sx={{mt: 3}}
        />
        <Button onClick={postHandler} variant={'outlined'} color={'success'} sx={{mt: 2}}>Post new post</Button>
      </Box>
    </Card>
  );
};

export default CreatePosts;