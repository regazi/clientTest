import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import DirMovieCard from "../director-view-movies/director-view-movies";
import "./director-view.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  const { user, directors, movies } = state;
  return { user, directors, movies };
};

class DirectorView extends React.Component {
  render() {
    const { movies, directors } = this.props;
    if (directors)
      return directors.map((director) => (
        <Accordion.Item key={director._id} eventKey={director._id}>
          <Card className="flex-column">
            <Accordion.Header lg={12} className="dirHeader">
              <Card.Title>{director.name}</Card.Title>
            </Accordion.Header>
            <Accordion.Body>
              <Card className="p-2 flex-row overflow-auto">
                <DirMovieCard
                  key={director._id}
                  myMovies={movies.filter(
                    (movie) => movie.director === director._id
                  )}
                />
              </Card>
              <div className="d-flex justify-content-center">
                <Link to={`/director/${director.name}`}>
                  <Button variant="primary">View Profile</Button>
                </Link>
              </div>
            </Accordion.Body>
          </Card>
        </Accordion.Item>
      ));
    else return <div />;
  }
}
export default connect(mapStateToProps)(DirectorView);
DirectorView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string,
    birthday: PropTypes.string,
    favoriteMovies: PropTypes.array.isRequired,
  }).isRequired,
  directors: PropTypes.array,
};
