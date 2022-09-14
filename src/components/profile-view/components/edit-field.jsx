import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Card, CardGroup, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export function EditField(props) {
  const [inputField, setField] = useState(null);
  const [fType, setType] = useState("text");
  //

  const setF = (thing) => {
    if (thing === "birthday") {
      setType("date");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    // const isReq = validate();
    const id = props.userData._id;
    const fieldToEdit = props.fieldToEdit;
    if (isReq && props.fieldToEdit) {
      /* Send request to the server for authentication */
      axios;
      axios({
        method: "put",
        url: `https://fifilm.herokuapp.com/users/${id}`,
        data: {
          username: inputField,
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

  // const { fieldToEdit, userData } = this.props;
  return (
    <Card>
      <Form className="align-self-center">
        <Form.Group controlId="formEditUsername">
          {props.fieldToEdit}
          <Form.Control
            value={props.fieldToEdit}
            type={setF(props.fieldToEdit)}
            placeholder={props.fieldToEdit}
            onChange={(e) => setField(e.target.value)}
          />
          {/*         {fieldErr && <p className="alert alert-danger">{fieldErr}</p>}  */}
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Create Account
        </Button>
      </Form>
    </Card>
  );
}
