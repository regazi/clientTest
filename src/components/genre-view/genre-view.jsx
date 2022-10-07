import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import DirMovieCard from "../director-view-movies/director-view-movies";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  const { user, movies, genres } = state;
  return { user, movies, genres };
};

class GenreView extends React.Component {
  render() {
    const { movies, user, genres } = this.props;
    return genres.map((genre) => (
      <Accordion.Item key={genre._id} eventKey={genre._id}>
        <Card className="flex-column">
          <Accordion.Header lg={12} className="dirHeader">
            <Card.Title>{genre.name}</Card.Title>
            <Card.Text className="dirBio"> Bio: {genre.description}</Card.Text>
          </Accordion.Header>
          <Accordion.Body>
            <Card className="p-2 flex-row overflow-auto">
              <DirMovieCard
                key={genre._id}
                myMovies={movies.filter((movie) => movie.genre === genre._id)}
                user={user}
              />
            </Card>
          </Accordion.Body>
        </Card>
      </Accordion.Item>
    ));
  }
}
export default connect(mapStateToProps)(GenreView);

GenreView.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string,
    birthday: PropTypes.string,
    favoriteMovies: PropTypes.array,
  }).isRequired,
  movies: PropTypes.array.isRequired,
  genres: PropTypes.array.isRequired,
};
