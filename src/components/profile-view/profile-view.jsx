import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Card, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
//import { DirMovieCard } from "../director-view-movies/director-view-movies";
import { FaveMovie } from "./components/favorite-movies.jsx";
//import { EditField } from "./components/edit-field.jsx";
export class ProfileView extends React.Component {
  deleteUser(id) {
    const token = localStorage.getItem("token");

    axios({
      method: "delete",
      url: `https://fifilm.herokuapp.com/users/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        this.props.onLoggedOut();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { user, userData, favorites, setNewUser, onLoggedOut } = this.props;
    return (
      <CardGroup>
        <Card className="p-4">
          <Card.Header className="p-2">
            <Card.Title>{user}</Card.Title>
            <Card.Subtitle>{userData.birthday}</Card.Subtitle>
            <Card.Subtitle>{userData.email}</Card.Subtitle>
            <Link to={`/users/edit/${user}`}>Edit Details</Link>
          </Card.Header>
          <Card.Body>
            <Card.Title>{user}'s Favorites</Card.Title>
            <Card className="p-2 flex-row overflow-auto">
              <FaveMovie
                key={user}
                myMovies={favorites}
                setNewUser={(data) => setNewUser(data)}
                userData={userData}
              />
            </Card>
          </Card.Body>
          <Button
            onClick={() => {
              this.deleteUser(this.props.userData._id);
              console.log(userData);
            }}
          >
            {" "}
            Delete Profile
          </Button>
          <Link to={"/"}>
            <Button variant="link">Home</Button>
          </Link>
        </Card>
      </CardGroup>
    );
  }
}
ProfileView.propTypes = {
  favorites: PropTypes.array,
  userData: PropTypes.array,
  setNewUser: PropTypes.func,
};
