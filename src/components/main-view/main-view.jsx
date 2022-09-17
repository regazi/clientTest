import React from "react";
import axios from "axios";
//import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { NavElement } from "../nav-element/nav-element";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { DirectorView } from "../director-view/director-view";
import { SingleDirectorView } from "../director-view/single-director";
import { EditProfileView } from "../edit-profile-view/edit-profile-view";
import { GenreView } from "../genre-view/genre-view";
import "./main-view.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

//redux
import { connect } from "react-redux";
import { setMovies, setGenres, setDirectors } from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";
//end redux

class MainView extends React.Component {
  constructor() {
    super();
    //initialize state
    this.state = {
      selectedMovie: null,
      userData: [],
      favorites: [],
    };
  }

  //here I fetch user data again and assign to userData. passing the data from the auth response would speed things up.
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

      this.getMovies(accessToken, newData);
      this.getDirectors(accessToken);
      this.getGenres(accessToken);

      this.setState({
        user: myName,
      });
      this.setState({
        userData: newData.data,
      });
    }
  }

  setUserData(newData) {
    console.log(newData);
    this.setState({
      userData: newData.data,
    });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    // return <Redirect to="/" />;
  }

  // this function updates the users favorite movies component
  setNewUser(data, movies) {
    console.log(data);
    this.setState({
      userData: data,
      user: data.username,
      favorites: data.favoriteMovies.map((fave) =>
        movies.find((movie) => movie._id === fave)
      ),
    });
    console.log("it should have updated");
  }
  //this is probably not needed
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData.user.username);
    this.setState({
      user: authData.user.username,
      userData: authData.user,
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    this.getMovies(authData.token);
    this.getDirectors(authData.token);
    this.getGenres(authData.token);
  }
  onRegSignIn(authData) {
    console.log(authData.user.username);
    this.setState({
      user: authData.user.username,
      userData: authData.user,
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.username);
    this.getMovies(authData.token);
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
        console.log(response.data);
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

  getMovies(token, userData) {
    axios
      .get("https://fifilm.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(userData);
        if (
          userData.data.favoriteMovies &&
          userData.data.favoriteMovies.length > 0
        ) {
          // THERE IS A PROBLEM HERE SOMEWHERE I THINK-------------------
          const re = response.data;
          const favorite = userData.data.favoriteMovies.map((favoriteMovie) =>
            re.find((movie) => movie._id === favoriteMovie)
          );
          this.props.setMovies(response.data);
          this.setState({
            favorites: favorite,
          });
          //------------------------------------------------------
        } else {
          console.log("empty");
          this.props.setMovies(response.data);
          this.setState({
            favorites: [],
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { userData, favorites, setNewUser, user } = this.state;
    let { movies, directors, genres } = this.props;
    return (
      <Router>
        <NavElement user={user} onLoggedOut={() => this.onLoggedOut()} />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
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
              return <MoviesList movies={movies} userData={userData} />;
            }}
          />
          <Route
            path="/register"
            render={({ history }) => {
              if (user) return <Redirect to="/" />;
              return (
                <Col md={8}>
                  <RegistrationView
                    user={user}
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
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    userData={userData}
                    movie={movies.find(
                      (movie) => movie._id === match.params.movieId
                    )}
                    onBackClick={() => history.goBack()}
                    setNewUser={(data) => this.setNewUser(data, movies)}
                    directors={directors}
                    genres={genres}
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
                      <GenreView
                        movies={movies}
                        onBackClick={() => history.goBack()}
                        userData={userData}
                        genres={genres}
                        director={directors}
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
                    movies={movies}
                    userData={userData}
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
                        userData={userData}
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
            path={`/users/${user}`}
            render={({ history }) => {
              if (!user) return <Redirect to="/" />;
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <ProfileView
                    user={user}
                    movies={movies}
                    favorites={favorites}
                    userData={userData}
                    onBackClick={() => history.goBack()}
                    onLoggedOut={() => this.onLoggedOut}
                  />
                </Col>
              );
            }}
          />
          <Route
            path={`/users/edit/${user}`}
            render={({ history }) => {
              if (!user) return <Redirect to="/" />;
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={10} lg={12}>
                  <EditProfileView
                    user={user}
                    userData={userData}
                    onBackClick={() => history.goBack()}
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
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
