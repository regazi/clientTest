import React from "react";
import PropTypes from "prop-types";
import "./movie-card.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { propTypes } from "react-bootstrap/esm/Image";

export class MovieCard extends React.Component {
  render() {
    const { movie, userData } = this.props;
    if (
      userData.favoriteMovies &&
      userData.favoriteMovies.includes(movie._id)
    ) {
      return (
        <Card className="p-1 bg-info">
          <Card.Img
            variant="top"
            style={{ height: 25 + "%" }}
            className="card-img-top img-thumbnail p-3"
            crossOrigin="true"
            src={movie.imageURL}
          />
          <Card.Body className="p-4">
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>Setting: {movie.setting.location}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Open</Button>
            </Link>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card className="p-1">
          <Card.Img
            variant="top"
            style={{ height: 25 + "%" }}
            className="card-img-top img-thumbnail p-3"
            crossOrigin="true"
            src={movie.imageURL}
          />
          <Card.Body className="p-4">
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>Setting: {movie.setting.location}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Open</Button>
            </Link>
          </Card.Body>
        </Card>
      );
    }
  }
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    setting: PropTypes.shape({
      location: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  userData:
    PropTypes.array ||
    PropTypes.shape({
      _id: propTypes.string,
      username: propTypes.string,
      birthday: propTypes.string,
      favoriteMovies: propTypes.array,
    }),
};
