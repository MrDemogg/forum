import React, {useState} from 'react';
import {Alert, Box, IconButton, LinearProgress} from "@mui/material";
import {forumSlice} from "../../store/reducers/ForumSlice";
import {Close} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

const VisualInfo = () => {
  const [errorClosed, setErrorClosed] = useState(false)
  const {globalIsError, errorInfo, globalIsLoading} = useAppSelector(state => state.forumReducer)
  const dispatch = useAppDispatch()
  console.log(globalIsLoading, globalIsError)
  return (
    <div>
      {globalIsLoading
        ? <Box sx={{width: '100%'}}>
          <LinearProgress/>
        </Box>
        : globalIsError && !errorClosed && <Alert variant="filled" severity="error">
          {errorInfo}
          <IconButton onClick={() => {
            setErrorClosed(true)
            dispatch(forumSlice.actions.setError(null))
          }}>
            <Close/>
          </IconButton>
        </Alert>
      }
    </div>
  );
};

export default VisualInfo;