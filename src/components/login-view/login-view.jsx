import React, { useState } from "react";
import "./login-view.scss";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Card, CardGroup, Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export function LoginView(props) {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ loginErr, setLoginErr ] = useState("");

  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);  
    axios.post("https://fifilm.herokuapp.com/login?", {
      username: username,
      password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      setLoginErr("Could Not Login With Those Credentials")
      console.log(e)
    });
  };

  
 
  
 

  
  return (

    <Container fluid className="main-container">
    <Row className="d-flex flex-row justify-content-center p-2">
      <Col xs={12} sm={6} md={4} lg={4} className="justify-content-center">
      <CardGroup xs={12} sm={6} md={4} lg={4}>
        <Card>
        <Card.Title className="align-self-center">Login</Card.Title>
    <Form className="align-self-center">
      <Form.Group controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      {loginErr && <p className="alert alert-danger">{loginErr}</p>}
    </Form.Group>
    <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <nav className="navbar justify-content-center">
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Link to="/register" >
            <Button variant="primary" type="button" >Sign Up</Button>
        </Link>
      
      </nav>
    </Form>
    </Card>
      </CardGroup>
      </Col>
    </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  })
};