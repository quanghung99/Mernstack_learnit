import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import learnItlogo from '../../assests/images/logo.svg';
import logoutIcon from '../../assests/images/logout.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';

const NavbarMenu = () => {
  const { logOutUser } = useContext(AuthContext);
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  return (
    <Navbar expand="lg" bg="primary" className="shadow px-2" variant="dark">
      <Navbar.Brand className="font-weight-bolder text-white">
        <img
          src={learnItlogo}
          alt="learnItlogo"
          width="32"
          height="32"
          className="mr-2"
        />
        Learn it
      </Navbar.Brand>
      <Navbar.Toggle arial-control="basic-react-navbar"></Navbar.Toggle>
      <Navbar.Collapse id="basic-react-navbar">
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/dashboard"
            as={Link}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>
        <Nav className="font-weight-bolder text-white" disabled>
          <Nav.Link>Welcome {username} </Nav.Link>
          <Button
            variant="secondary "
            className="font-weight-bolder text-weight"
            onClick={logOutUser}
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="32"
              height="32"
              className="mr-2"
            />{' '}
            Log out
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
