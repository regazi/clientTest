import React from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import MovieCard from "../movie-card/movie-card";
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  const { user, directors } = state;
  return { user, directors };
};

class DirMovieCard extends React.Component {
  render() {
    const { myMovies, history } = this.props;
    return myMovies.map((movie) => (
      <Col md={4} lg={4} sm={6} xs={8} key={movie._id} className="d-inline">
        <MovieCard
          movie={movie}
          onBackClick={() => history.goBack()}
          setNewUser={(data) => this.setNewUser(data, myMovies)}
        />
      </Col>
    ));
  }
}
export default connect(mapStateToProps)(DirMovieCard);

DirMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    setting: PropTypes.shape({
      location: PropTypes.string.isRequired,
    }),
  }),
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string,
    birthday: PropTypes.string,
    favoriteMovies: PropTypes.array,
  }),
};
