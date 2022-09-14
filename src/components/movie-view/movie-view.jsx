import React from "react";
import "./movie-view.scss";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import MapComponent from "../map-card/map-card";
import Container from "react-bootstrap/Container";
import { Card, CardGroup, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { propTypes } from "react-bootstrap/esm/Image";

export class MovieView extends React.Component {
  constructor() {
    super();
    //initialize state
    this.state = {
      checked: null,
    };
  }
  componentDidMount() {
    console.log(this.props);
    if (this.props.userData.favoriteMovies.includes(this.props.movie._id)) {
      this.setState({
        checked: true,
      });
    } else
      this.setState({
        checked: false,
      });
  }
  handleClick(movieId, userId, setNewUser, e) {
    const favor = e.currentTarget.checked;
    if (favor === true) {
      this.addToFavorites(movieId, userId, setNewUser);
      console.log("checked");
      this.setState({
        checked: favor,
      });
    } else {
      this.removeFavorites(movieId, userId, setNewUser);
      console.log("not checked");
      this.setState({
        checked: favor,
      });
    }
  }

  addToFavorites(movieId, userId, setNewUser) {
    const token = localStorage.getItem("token");
    axios({
      method: "post",
      url: `https://fifilm.herokuapp.com/users/${userId}/movies/${movieId}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        setNewUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
        console.log(token, userId, movieId);
      });
  }

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
    const { movie, onBackClick, userData, directors, genres, setNewUser } =
      this.props;
    const { checked } = this.state;

    if (
      !movie ||
      !directors ||
      !genres ||
      directors.length < 1 ||
      genres.length < 1
    )
      return <div>Hol'up</div>;
    return (
      <Container className="movie-view">
        <CardGroup>
          <Card className="bg-light">
            <ButtonGroup
              type="toggle"
              className="justify-content-end togglebar"
            >
              <ToggleButton
                id="toggle-check"
                type="checkbox"
                variant="primary"
                checked={checked}
                value="1"
                onChange={(e) =>
                  this.handleClick(movie._id, userData._id, setNewUser, e)
                }
              >
                Symbol
              </ToggleButton>
            </ButtonGroup>
            <Card.Img
              style={{ width: 75 + "%", margin: "auto" }}
              variant="top"
              className="d-block card-img-top img-thumbnail"
              src={movie.imageURL}
              crossOrigin="true"
            />
            <Card.Title className="align-self-center">{movie.title}</Card.Title>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <Link
                    className="d-flex flex-row justify-content-between"
                    to={`/director/${
                      directors.find((d) => d._id === movie.director).name
                    }`}
                  >
                    <Card.Subtitle className="d-flex flex-column justify-content-center">
                      director
                    </Card.Subtitle>
                    <Button variant="link">
                      {directors.find((d) => d._id === movie.director).name}
                    </Button>
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link
                    to={"/genres"}
                    className="d-flex flex-row justify-content-between"
                  >
                    <Card.Subtitle className="d-flex flex-column justify-content-center">
                      Genre:
                    </Card.Subtitle>
                    <Button variant="link">
                      {genres.find((g) => g._id === movie.genre).name}
                    </Button>
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex flex-row ">
                  <Card.Subtitle className="p-2 flex-grow-1">
                    Setting:{" "}
                  </Card.Subtitle>
                  <Card.Text className="p-2">
                    {movie.setting.location}
                  </Card.Text>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex flex-row">
                  <Card.Subtitle className="p-2 flex-grow-1">
                    Cities:
                  </Card.Subtitle>
                  {movie.filmingLocations.map((location, index) => (
                    <Card.Text className="p-2">{location.name}</Card.Text>
                  ))}
                </ListGroup.Item>
                <ListGroup.Item className="bg-white">
                  <ListGroup.Item className="bg-light">
                    <Card.Subtitle className="label">
                      Filming Locations {}
                    </Card.Subtitle>
                  </ListGroup.Item>
                  <MapComponent movie={movie} />
                </ListGroup.Item>
              </ListGroup>
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
        </CardGroup>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    setting: PropTypes.shape({
      location: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string,
    birthday: PropTypes.string.isRequired,
    favoriteMovies: PropTypes.array.isRequired,
  }).isRequired,
  directors: PropTypes.array,
  genres: PropTypes.array,
  setNewUser: PropTypes.func,
};
