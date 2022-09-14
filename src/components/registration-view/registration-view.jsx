import React, { useState } from "react";
import "./registration-view.scss";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Card, CardGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  //invalid states
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username Has 5 Character Minimum");
      isReq = false;
    }

    if (email.indexOf("@") === -1) {
      setEmailErr("Please Enter a Valid Email");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send request to the server for authentication */
      //axios;
      axios({
        method: "post",
        url: "https://fifilm.herokuapp.com/users/",
        data: {
          username: username,
          password: password,
          email: email,
          birthday: birthday,
        },
      })
        .then((response) => {
          const data = response.data;
          console.log(data);
          onReg();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const onReg = () => {
    axios
      .post("https://fifilm.herokuapp.com/login?", {
        username: username,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        // setLoginErr("Could Not Login With Those Credentials");
        console.log(e);
      });
  };

  return (
    <Container fluid className="main-container">
      <Row className="d-flex flex-row justify-content-center p-2">
        <Col xs={12} sm={6} md={4} lg={4} className="justify-content-center">
          <CardGroup xs={12} sm={6} md={4} lg={4} className="caCard">
            <Card className="item-align-center">
              <Card.Title className="align-self-center">
                Create Account
              </Card.Title>
              <Form className="align-self-center">
                <Form.Group controlId="formUsername">
                  Username:
                  <Form.Control
                    value={username}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {usernameErr && (
                    <p className="alert alert-danger">{usernameErr}</p>
                  )}
                </Form.Group>
                <Form.Group controlId="formEmail">
                  Email:
                  <Form.Control
                    value={email}
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailErr && <p className="alert alert-danger">{emailErr}</p>}
                </Form.Group>
                <Form.Group controlId="formBirthdate">
                  Birthdate:
                  <Form.Control
                    value={birthday}
                    type="date"
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  Password:
                  <Form.Control
                    type="text"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordErr && (
                    <p className="alert alert-danger">{passwordErr}</p>
                  )}
                </Form.Group>

                <nav className="navbar">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Create Account
                  </Button>
                  <Link to="/">Return to Login</Link>
                </nav>
              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
};
