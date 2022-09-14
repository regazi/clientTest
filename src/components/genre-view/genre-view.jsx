import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { DirMovieCard } from "../director-view-movies/director-view-movies";

export class GenreView extends React.Component {
  render() {
    const { movies, userData, genres } = this.props;
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
                userData={userData}
              />
            </Card>
          </Accordion.Body>
        </Card>
      </Accordion.Item>
    ));
  }
}
