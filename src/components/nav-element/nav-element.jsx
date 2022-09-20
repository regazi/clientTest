import React from "react";
import { Nav, Button, Container, Navbar, NavDropdown } from "react-bootstrap";

import { Link } from "react-router-dom";

export function NavElement(props) {
  let userName = "";
  console.log(props);
  const { user } = props;
  const handleLogout = () => {
    props.onLoggedOut();
  };
  //console.log(props.user.user.username);
  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token") !== null) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };
  if (user !== null) {
    userName = user.username;
  }

  return (
    <Navbar bg="light" sticky="top">
      <Container sm={12} md={10}>
        <Navbar.Brand>
          <Link to="/">FIF</Link>
        </Navbar.Brand>
        <Nav variant="pills" className="align-self-end d-flex ">
          <Nav.Item>
            <Nav.Link href="/directors" eventKey="link-1">
              Directors
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/genres" eventKey="link-2">
              Genres
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/" eventKey="link-3">
              Movies
            </Nav.Link>
          </Nav.Item>
          <NavDropdown title={userName} id="basic-nav-dropdown">
            {isAuth() && (
              <NavDropdown.Item href={`/users/${userName}`}>
                Profile
              </NavDropdown.Item>
            )}
            <NavDropdown.Item>
              {isAuth() && (
                <Button variant="link" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </NavDropdown.Item>
            {!isAuth() && (
              <NavDropdown.Item href="/register">Register</NavDropdown.Item>
            )}

            {!isAuth() && <NavDropdown.Item href="/">Sign In</NavDropdown.Item>}
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
