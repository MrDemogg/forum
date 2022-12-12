import React, {FC, useState} from 'react';
import {Box, Modal} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper'

import 'swiper/swiper.min.css'
import './swiper.css'

import ProfileEntryModalVariant from "./ProfileEntryModalVariant";
import {forumAPI} from "../service/ForumService";
import {
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import {useAppDispatch} from "../hooks/redux";
import {forumSlice} from "../store/reducers/ForumSlice";
import {IProfileResponse} from "../models/IProfileResponse";
import {SerializedError} from "@reduxjs/toolkit";

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

interface ProfileEntryModalProps {
  changeVisible: (bool: boolean) => void,
  visible: boolean
}

const ProfileEntryModal: FC<ProfileEntryModalProps> = ({changeVisible, visible}) => {
  const [login] = forumAPI.useLoginMutation()
  const [register] = forumAPI.useRegistrationMutation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [helperText, setHelperText] = useState('')
  const [error, setError] = useState(false)
  const dispatch = useAppDispatch()

  const usernameHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setUsername(e.target.value)
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setPassword(e.target.value)

  const isJsonString = (str: string) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const responseHandler = (res: {data: IProfileResponse | string} | {error: FetchBaseQueryError | SerializedError}) => {
    if ('error' in res) {
      if ('data' in res.error) {
        setError(true)
        setHelperText(res.error.data as string)
      } else if ('error' in res.error) {
        setError(true)
        setHelperText(res.error.error as string)
      }
    } else if ('data' in res) {
      if (isJsonString(res.data as string)) {
        const parsedData = JSON.parse(res.data as string)
        if (parsedData) {
          dispatch(forumSlice.actions.setId(parsedData.id))
          dispatch(forumSlice.actions.setToken(parsedData.token))
          localStorage.setItem('user', JSON.stringify({id: parsedData.id, token: parsedData.token}))
        }
      } else {
        setError(false)
      }
      changeVisible(false)
    }
  }

  const loginHandler = () => login({username: username, password: password})
    .then((res) => responseHandler(res))
  const registerHandler = () => register({username: username, password: password})
    .then((res) => responseHandler(res))

  const pagination = {
    clickable: true,
    renderBullet: (index: number) => {
      return '<span class="swiper-pagination-bullet swiper-pagination-bullet-active">' + (index === 0 ? 'Login' : 'Register') + "</span>";
    }
  };

  return (
    <Modal
      open={visible}
      onClose={changeVisible}
    >
      <Box sx={modalStyle}>
        <Swiper
          pagination={pagination}
          modules={[Pagination]}
        >
          <SwiperSlide>
            <ProfileEntryModalVariant
              title={'Login'}
              successHandler={loginHandler}
              usernameHandler={usernameHandler}
              passwordHandler={passwordHandler}
              username={username}
              password={password}
              helperText={helperText}
              error={error}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ProfileEntryModalVariant
              title={'Register'}
              successHandler={registerHandler}
              usernameHandler={usernameHandler}
              passwordHandler={passwordHandler}
              username={username}
              password={password}
              helperText={helperText}
              error={error}
            />
          </SwiperSlide>
        </Swiper>
      </Box>
    </Modal>
  );
};

export default ProfileEntryModal;