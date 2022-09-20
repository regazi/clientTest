import React from "react";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import VisibilityFilterInput from "../../visibility-filter-input/visibility-filter-input";
import { MovieCard } from "../movie-card/movie-card";

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  console.log(props.user);
  const { movies, visibilityFilter, user } = props;
  let filteredMovies = movies;
  //search bar logic
  if (visibilityFilter !== "") {
    filteredMovies = movies.filter((m) =>
      m.title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col md={12} style={{ margin: "1em" }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((m) => (
        <Col md={3} key={m._id}>
          <MovieCard movie={m} user={user} />
        </Col>
      ))}
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);
MoviesList.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string,
    birthday: PropTypes.string,
    favoriteMovies: PropTypes.array,
  }).isRequired,
  movies: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string,
};
