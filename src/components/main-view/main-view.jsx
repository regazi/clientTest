import React from "react";
import axios from "axios";
//import { MovieCard } from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import NavElement from "../nav-element/nav-element";
import { RegistrationView } from "../registration-view/registration-view";
import ProfileView from "../profile-view/profile-view";
import DirectorView from "../director-view/director-view";
import { SingleDirectorView } from "../director-view/single-director";
import EditProfileView from "../edit-profile-view/edit-profile-view";
import GenreView from "../genre-view/genre-view";
import "./main-view.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import MoviesList from "../movies-list/movies-list";
//redux
import { connect } from "react-redux";
import {
  setMovies,
  setGenres,
  setDirectors,
  setUser,
} from "../../actions/actions";

//end redux
class MainView extends React.Component {
  constructor() {
    super();
    //initialize state
    this.state = {};
  }

  async componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      const myName = localStorage.getItem("user");
      const newData = await axios
        .get(`https://fifilm.herokuapp.com/users/${myName}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .catch(function (error) {
          console.log(error);
        });

      this.getMovies(accessToken, newData.data);
      this.getDirectors(accessToken);
      this.getGenres(accessToken);
      this.props.setUser(newData.data);
    }
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setUser("");
    //might throw an error
    return <Redirect to="/" />;
  }

  // this function updates the users favorite movies component
  setNewUser(data, movies) {
    this.props.setUser({
      _id: data._id,
      username: data.username,
      birthday: data.birthday,
      password: data.password,
      email: data.email,
      favoriteMovies: data.favoriteMovies.map((fave) =>
        movies.find((movie) => movie._id === fave)
      ),
    });
  }

  onLoggedIn(authData) {
    this.props.setUser(authData.user);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    this.getMovies(authData.token, authData.user);
    this.getDirectors(authData.token);
    this.getGenres(authData.token);
  }
  onRegSignIn(authData) {
    this.props.setUser(authData.user);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    this.getMovies(authData.token, authData.user);
    this.getDirectors(authData.token);
    this.getGenres(authData.token);
  }
  getDirectors(token) {
    axios
      .get("https://fifilm.herokuapp.com/directors", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setDirectors(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getGenres(token) {
    axios
      .get("https://fifilm.herokuapp.com/genres", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setGenres(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMovies(token, newData) {
    axios
      .get("https://fifilm.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (newData.favoriteMovies && newData.favoriteMovies.length > 0) {
          const re = response.data;
          const favorite = newData.favoriteMovies.map((favoriteMovie) =>
            re.find((movie) => movie._id === favoriteMovie)
          );
          this.props.setUser({
            _id: newData._id,
            username: newData.username,
            birthday: newData.birthday,
            password: newData.password,
            email: newData.email,
            favoriteMovies: favorite,
          });
          this.props.setMovies(response.data);
          //------------------------------------------------------
        } else {
          console.log("empty");
          this.props.setMovies(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, directors, user } = this.props;
    return (
      <Router>
        <NavElement onLoggedOut={() => this.onLoggedOut()} />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList />;
            }}
          />
          <Route
            path="/register"
            render={({ history }) => {
              if (user) return <Redirect to="/" />;
              return (
                <Col md={8}>
                  <RegistrationView
                    onBackClick={() => history.goBack()}
                    onLoggedIn={(user) => this.onLoggedIn(user)}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find(
                      (movie) => movie._id === match.params.movieId
                    )}
                    onBackClick={() => history.goBack()}
                    setNewUser={(data) => this.setNewUser(data, movies)}
                  />
                </Col>
              );
            }}
          />
          <Route
            exact
            path="/genres"
            render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8} lg={12}>
                  <Card>
                    <Accordion>
                      <GenreView onBackClick={() => history.goBack()} />
                    </Accordion>
                    <Button
                      varient="primary"
                      type="button"
                      onClick={() => history.goBack()}
                    >
                      Back
                    </Button>
                  </Card>
                </Col>
              );
            }}
          />
          <Route
            path="/director/:name"
            render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <SingleDirectorView
                    director={directors.find(
                      (d) => d.name === match.params.name
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/directors"
            render={({ history, match }) => {
              if (movies.length === 0) return <div className="main-view" />;
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8} lg={12}>
                  <Card>
                    <Accordion>
                      <DirectorView
                        movies={movies}
                        onBackClick={() => history.goBack()}
                        directors={directors}
                        user={user}
                      />
                    </Accordion>
                    <Button
                      varient="primary"
                      type="button"
                      onClick={() => history.goBack()}
                    >
                      Back
                    </Button>
                  </Card>
                </Col>
              );
            }}
          />

          <Route
            path={`/users/${user.username}`}
            render={({ history }) => {
              if (!user.username) return <Redirect to="/" />;
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <ProfileView
                    setNewUser={(data) => this.setNewUser(data, movies)}
                    onBackClick={() => history.goBack()}
                    onLoggedOut={() => this.onLoggedOut}
                  />
                </Col>
              );
            }}
          />
          <Route
            path={`/users/edit/${user.username}`}
            render={({ history }) => {
              if (!user.username) return <Redirect to="/" />;
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={10} lg={12}>
                  <EditProfileView
                    onBackClick={() => history.goBack()}
                    setNewUser={(data) => this.setNewUser(data, movies)}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    directors: state.directors,
    genres: state.genres,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  setMovies,
  setDirectors,
  setGenres,
  setUser,
})(MainView);
