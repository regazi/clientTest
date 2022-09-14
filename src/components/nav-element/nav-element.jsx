import React from "react";
import { Nav, Button, Container, Navbar, NavDropdown } from "react-bootstrap";

import { Link } from "react-router-dom";

export function NavElement({ user, onLoggedOut }) {
  const handleLogout = () => {
    onLoggedOut();
  };

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

  return (
    <Navbar bg="light" sticky="top">
      <Container sm={12} md={10}>
        <Navbar.Brand>
          <Link to="/">FIF</Link>
        </Navbar.Brand>
        <Nav className="align-self-end d-flex justify-content-center">
          <Nav.Item className="m4">
            <Link to="/directors">Directors</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/genres">Genres</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/">Movies</Link>
          </Nav.Item>
          <NavDropdown title={user} id="basic-nav-dropdown">
            {isAuth() && (
              <NavDropdown.Item>
                <Link to={`/users/${user}`}>Profile</Link>
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
