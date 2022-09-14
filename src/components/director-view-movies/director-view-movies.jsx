import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import { MovieCard } from "../movie-card/movie-card";

export class DirMovieCard extends React.Component {
  render() {
    const { myMovies, userData, directors, history } = this.props;
    return myMovies.map((movie) => (
      <Col md={4} lg={4} sm={6} xs={8} key={movie._id} className="d-inline">
        <MovieCard
          movie={movie}
          userData={userData}
          onBackClick={() => history.goBack()}
          setNewUser={(data) => this.setNewUser(data, myMovies)}
          directors={directors}
        />
      </Col>
    ));
  }
}

DirMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    setting: PropTypes.shape({
      location: PropTypes.string.isRequired,
    }),
  }),
  userData: PropTypes.array,
};
