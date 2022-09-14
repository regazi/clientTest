import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../../movie-card/movie-card";
import Button from "react-bootstrap/Button";
import axios from "axios";

export class FaveMovie extends React.Component {
  removeFavorites(movieId, userId, setNewUser) {
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
    const { myMovies, userData, setNewUser } = this.props;
    if (myMovies && myMovies.length > 0) {
      return myMovies.map((movie) => (
        <Col md={4} lg={4} sm={6} xs={8} key={movie._id} className="d-inline">
          <Button
            onClick={() =>
              this.removeFavorites(movie._id, userData._id, setNewUser)
            }
          >
            X
          </Button>
          <MovieCard movie={movie} userData={userData} />
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
  userData:
    PropTypes.array ||
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      password: PropTypes.string,
      birthday: PropTypes.string.isRequired,
      favoriteMovies: PropTypes.array.isRequired,
    }),
  setNewUser: PropTypes.func.isRequired,
};
