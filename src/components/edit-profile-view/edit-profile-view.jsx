import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Card, CardGroup, Container } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

function EditProfileView(props) {
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
      setEmailErr("Please Enter a Valid Email");
      isReq = false;
    } else if (password.length < 5 && password.length > 1) {
      setPasswordErr("Password Must Have Minimum of 5 Characters");
    }

    return isReq;
  };

  //invalid states

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    const token = localStorage.getItem("token");
    if (isReq) {
      const id = props.user._id;
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
          localStorage.setItem("user", newUsername);
          alert("Your profile has been updated");
          props.setNewUser(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (isReq && password.length < 1) {
      const id = props.user._id;
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
          let newUsername = response.data.username;
          alert("Your profile has been updated");
          localStorage.setItem("user", newUsername);
          props.setNewUser(response.data);
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
                    placeholder={props.user.username}
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
                    placeholder={props.user.email}
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
export default connect(mapStateToProps)(EditProfileView);
EditProfileView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string,
    birthday: PropTypes.string,
    favoriteMovies: PropTypes.array,
  }).isRequired,
  movies: PropTypes.array,
};
