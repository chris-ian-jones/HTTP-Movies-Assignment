import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Button } from 'semantic-ui-react'

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  editHandler = () => {
    this.props.history.push(`/update-movie/${this.props.match.params.id}`)
  }

  deleteHandler = () => {
    const movieIdToDelete = this.props.match.params.id
    axios
      .delete(`http://localhost:5000/api/movies/${movieIdToDelete}`, movieIdToDelete)
      .then(result => {
        console.log("✅ axios 'delete' by movie id: ", result)
        this.props.history.push(`/`)
      })
      .catch(error => console.log("❌ axios 'delete' by movie id: ", error))
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <Button onClick={this.editHandler} color='blue'>Edit</Button>
        <Button onClick={this.deleteHandler} color='red'>Delete</Button>
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
      </div>
    );
  }
}
