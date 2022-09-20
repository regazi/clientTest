import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
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
        this.props.onLoggedOut();
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { user, setNewUser } = this.props;
    return (
      <CardGroup>
        <Card className="p-4">
          <Card.Header className="p-2">
            <Card.Title>{user.username}</Card.Title>
            <Card.Subtitle>{user.birthday}</Card.Subtitle>
            <Card.Subtitle>{user.email}</Card.Subtitle>
            <Link to={`/users/edit/${user.username}`}>Edit Details</Link>
          </Card.Header>
          <Card.Body>
            <Card.Title>{user.username}'s Favorites</Card.Title>
            <Card className="p-2 flex-row overflow-auto">
              <FaveMovie
                key={user._id}
                myMovies={user.favoriteMovies}
                setNewUser={(data) => setNewUser(data)}
                user={user}
              />
            </Card>
          </Card.Body>
          <Button
            onClick={() => {
              this.deleteUser(user._id);
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
  user: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    birthday: PropTypes.string,
    favoriteMovies: PropTypes.array,
  }),
  setNewUser: PropTypes.func,
};
