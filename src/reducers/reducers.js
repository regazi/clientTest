// src/reducers/reducers.js
import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_GENRES, SET_DIRECTORS, SET_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}



function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}
function directors(state = [], action) {
  switch (action.type) {
    case SET_DIRECTORS:
      return action.value;
    default:
      return state;
  }
}
function genres(state = [], action) {
  switch (action.type) {
    case SET_GENRES:
      return action.value;
    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    //|| localStorage.getItem('user')
    default:
      return state;
  }
}


const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  genres,
  directors,
  user
});


export default moviesApp;