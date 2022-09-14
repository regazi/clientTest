import React from "react";
import { createRoot } from "react-dom/client";
import MainView  from "./components/main-view/main-view";
import Container from 'react-bootstrap/Container';
// Import Style
import "./index.scss";


// Main component 
class MyFlixApplication extends React.Component {


  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];
const root = createRoot(container);
// Tells React to render your app in the root DOM element
root.render(React.createElement(MyFlixApplication));