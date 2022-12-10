import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const NavBar = () => {
  const router = useNavigate()

  return (
    <Navbar bg="dark" variant={'dark'} expand="lg">
      <Container>
        <Navbar.Brand onClick={() => router('/posts')}>Forum</Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link onClick={() => router('/posts')}>Posts</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;