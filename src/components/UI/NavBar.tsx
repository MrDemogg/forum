import React, {useState} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import ProfileEntryModal from "../ProfileEntryModal";
import {Button} from "@mui/material";
import {useAppSelector} from "../../hooks/redux";

const NavBar = () => {
  const router = useNavigate()
  const [modalVisible, setModalVisible] = useState(false)
  const {token} = useAppSelector(state => state.forumReducer)

  return (
    <div>
      <Navbar bg="dark" variant='dark' expand='sm' className="mb-3 position-fixed w-100 top-0" style={{zIndex: 1}}>
        <Navbar.Brand color={'#fff'} style={{marginLeft: 250}}>Forum</Navbar.Brand>
        <Container fluid>
          <Nav>
            <Nav.Link onClick={() => router('/post')}>Posts</Nav.Link>
          </Nav>
          {token
            ? <div style={{display: 'flex', flexDirection: 'row'}}>
                <Button variant={'outlined'} color={'warning'} style={{marginRight: 20}}>Post new Post</Button>
                <Button variant={'outlined'} color={'error'}>Logout</Button>
              </div>
            : <Button variant="outlined" color="info" onClick={() => setModalVisible(true)}>Login or Register</Button>
          }
          <ProfileEntryModal visible={modalVisible} changeVisible={setModalVisible} />
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;