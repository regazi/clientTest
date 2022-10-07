import React from "react";
import PropTypes from "prop-types";
import "./movie-card.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  const { user, directors } = state;
  return { user, directors };
};

class MovieCard extends React.Component {
  render() {
    const { movie, user } = this.props;
    if (user.favoriteMovies && user.favoriteMovies.includes(movie)) {
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
export default connect(mapStateToProps)(MovieCard);
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    setting: PropTypes.shape({
      location: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    birthday: PropTypes.string,
    favoriteMovies: PropTypes.array,
  }),
};
