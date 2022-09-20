import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../../movie-card/movie-card";
import Button from "react-bootstrap/Button";
import axios from "axios";

export class FaveMovie extends React.Component {
  removeFavorites(movieId, userId, setNewUser) {
    console.log(movieId);
    console.log(userId);
    const token = localStorage.getItem("token");
    axios({
      method: "delete",
      url: `https://fifilm.herokuapp.com/users/${userId}/movies/${movieId}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setNewUser(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const { myMovies, user, setNewUser } = this.props;
    console.log(user);
    if (myMovies && myMovies.length > 0) {
      return myMovies.map((movie) => (
        <Col md={4} lg={4} sm={6} xs={8} key={movie._id} className="d-inline">
          <Button
            onClick={() =>
              this.removeFavorites(movie._id, user._id, setNewUser)
            }
          >
            X
          </Button>
          <MovieCard movie={movie} user={user} />
        </Col>
      ));
    } else {
      return (
        <div>
          <h1>You have No Favorites</h1>{" "}
        </div>
      );
    }
  }
}

FaveMovie.propTypes = {
  myMovies: PropTypes.array,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string,
    birthday: PropTypes.string,
    favoriteMovies: PropTypes.array,
  }),
  setNewUser: PropTypes.func.isRequired,
};
