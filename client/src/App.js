import React, { useState } from "react";
import { Route } from "react-router-dom";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from './Movies/UpdateMovieForm'
import AddMovieForm from './Movies/AddMovieForm'

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie])
  }

  return (
    <>
      <SavedList list={savedList} />
      {/* <Route exact path="/" component={MovieList} /> */}
      <Route
        exact path="/"
        render={props => {
          return <MovieList {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return <UpdateMovieForm {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route
        path="/add-movie"
        render={props => {
          return <AddMovieForm {...props} addToSavedList={addToSavedList} />;
        }}
      />
    </>
  )
}

export default App;
