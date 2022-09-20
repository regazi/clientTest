import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { DirMovieCard } from "../director-view-movies/director-view-movies";
import PropTypes from "prop-types";

export class SingleDirectorView extends React.Component {
  render() {
    const { movies, director, userData, onBackClick } = this.props;
    console.log(director);
    if (director)
      return (
        <Container className="single-director-view">
          <Card className="flex-column">
            <Card.Header lg={12}>
              <Card.Title>{director.name}</Card.Title>
              <Card.Text> Bio: {director.about}</Card.Text>
            </Card.Header>
            <Card.Body>
              <Card className="p-2 flex-row overflow-auto">
                <DirMovieCard
                  userData={userData}
                  key={director._id}
                  myMovies={movies.filter(
                    (movie) => movie.director === director._id
                  )}
                />
              </Card>
            </Card.Body>
            <Button
              varient="primary"
              type="button"
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
          </Card>
        </Container>
      );
    else return <div>not loaded</div>;
  }
}

SingleDirectorView.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    userData: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      password: PropTypes.string,
      birthday: PropTypes.string,
      favoriteMovies: PropTypes.array.isRequired,
      movies: PropTypes.array.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func,
  }),
};
