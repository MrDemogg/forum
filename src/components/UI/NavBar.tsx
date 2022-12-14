import React, {useState} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import ProfileEntryModal from "../ProfileEntryModal";
import {Button, IconButton} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import VisualInfo from "./VisualInfo";
import {Refresh} from "@mui/icons-material";
import {forumSlice} from "../../store/reducers/ForumSlice";
import {forumAPI} from "../../service/ForumService";

const NavBar = () => {
  const [profileModalVisible, setProfileModalVisible] = useState(false)
  const {token, userId} = useAppSelector(state => state.forumReducer)
  const [logout] = forumAPI.useLogoutMutation()
  const dispatch = useAppDispatch()
  const router = useNavigate()

  const logoutHandler = () => {
    token && userId && logout({token: token, userId: userId})
      .then(() => {
        dispatch(forumSlice.actions.setId(null))
        dispatch(forumSlice.actions.setToken(null))
        localStorage.removeItem('user')
      })
  }

  return (
    <div>
      <Navbar bg="dark" variant='dark' expand='sm' className="mb-3 position-fixed w-100 top-0" style={{zIndex: 1}}>
        <Navbar.Brand color={'#fff'} style={{marginLeft: 250}}>Forum</Navbar.Brand>
        <Container fluid>
          <Nav>
            <Nav.Link onClick={() => router('/post')}>Posts</Nav.Link>
            <IconButton onClick={() => {
              dispatch(forumSlice.actions.globalRefetch(true))
            }}>
              <Refresh color={'info'} />
            </IconButton>
          </Nav>
          {token && userId
            ? <div style={{display: 'flex', flexDirection: 'row'}}>
                <Button variant={'outlined'} color={'warning'} style={{marginRight: 20}} onClick={() => router('/create')}>Post new Post</Button>
                <Button variant={'outlined'} color={'error'} onClick={logoutHandler}>Logout</Button>
              </div>
            : <Button variant="outlined" color="info" onClick={() => setProfileModalVisible(true)}>Login or Register</Button>
          }
          <ProfileEntryModal visible={profileModalVisible} changeVisible={setProfileModalVisible} />
        </Container>
      </Navbar>
      <VisualInfo />
    </div>
  );
};

export default NavBar;