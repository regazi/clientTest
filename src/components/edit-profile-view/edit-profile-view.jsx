import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Card, CardGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export function EditProfileView(props) {
  const [username, setNewUsername] = useState("");
  const [password, setNewPassword] = useState("");
  const [email, setNewEmail] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const validate = () => {
    let isReq = true;
    if (username.length > 0 && username.length < 5) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (email.length > 0 && email.indexOf("@") === -1) {
      console.log(email.indexOf("@"));
      setEmailErr("Please Enter a Valid Email");
      isReq = false;
    }

    return isReq;
  };

  //invalid states

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    const token = localStorage.getItem("token");
    if (isReq) {
      console.log(props.userData._id);
      const id = props.userData._id;
      const data = {};
      if (username) {
        data["username"] = username;
      }
      if (password) {
        data["password"] = password;
      }
      if (email) {
        data["email"] = email;
      }
      axios({
        method: "put",
        url: `https://fifilm.herokuapp.com/users/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: data,
      })
        .then((response) => {
          let newUsername = response.data.username;
          alert("Your profile has been updated");
          localStorage.setItem("user", newUsername);
          // props.changeUserInfo(newUsername)
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (isReq && password.length < 1) {
      const id = props.userData._id;
      axios({
        method: "put",
        url: `https://fifilm.herokuapp.com/users/${id}`,
        headers: { Authorization: `Bearer ${token}` },
        data: {
          username: username,
          email: email,
        },
      })
        .then((response) => {
          const data = response.data;
          let newUsername = response.data.username;
          alert("Your profile has been updated");
          localStorage.setItem("user", newUsername);
          // props.changeUserInfo(newUsername);
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <Container fluid className="main-container p-5">
      <Row className="d-flex flex-row justify-content-center p-5">
        <Col xs={12} sm={6} md={4} lg={4} className="justify-content-center p3">
          <CardGroup xs={12} sm={6} md={4} lg={4} className="epvCard">
            <Card className="item-align-center">
              <Card.Title className="align-self-center">
                Edit Account Details
              </Card.Title>
              <Form className="align-self-center">
                <Form.Group controlId="formEditUsername">
                  Username:
                  <Form.Control
                    value={username}
                    type="text"
                    placeholder={props.userData.username}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                  {usernameErr && (
                    <p className="alert alert-danger">{usernameErr}</p>
                  )}
                </Form.Group>
                <Form.Group controlId="formEditEmail">
                  Email:
                  <Form.Control
                    value={email}
                    type="text"
                    placeholder={props.userData.email}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                  {emailErr && <p className="alert alert-danger">{emailErr}</p>}
                </Form.Group>
                <Form.Group controlId="formEditPassword">
                  Password:
                  <Form.Control
                    type="text"
                    placeholder="********"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {passwordErr && (
                    <p className="alert alert-danger">{passwordErr}</p>
                  )}
                </Form.Group>

                <nav className="navbar">
                  <Button onClick={props.onBackClick}>Back</Button>
                  <Button type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </nav>
              </Form>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

EditProfileView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
};
