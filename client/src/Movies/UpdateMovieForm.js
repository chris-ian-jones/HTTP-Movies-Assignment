import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Input, Label, Button, Form, Divider } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const UpdateMovieForm = props => {
  const movieId = props.match.params.id

  const [currentMovieData, setCurrentMovieData] = useState({
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
  })

  const [updatedMovieData, setUpdatedMovieDate] = useState({
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ''
  })
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${movieId}`)
      .then(result => {
        console.log("✅ axios 'get' by movie id: ", result.data)
        setCurrentMovieData(result.data)
        setUpdatedMovieDate(result.data)
      })
      .catch(error => console.log("❌ axios 'get' by movie id: ", error))
  }, [movieId])

  const onChangeHandler = event => {
    setUpdatedMovieDate({
      ...updatedMovieData, 
      [event.target.name]: event.target.value
    })
  }

  const onSubmitHandler = event => {
    event.preventDefault()

    const tempUpdatedMovieData = {
      id: updatedMovieData.id,
      title: updatedMovieData.title,
      director: updatedMovieData.director,
      metascore: updatedMovieData.metascore,
      // conditional statement to check if the stars data has been updated, 
      // if it has, then convert the string of names into an array of names for the put request,
      // otherwise update movie data with original array of stars
      stars: updatedMovieData.stars === currentMovieData.stars ? currentMovieData.stars : updatedMovieData.stars.split(",")
    }
    
    axios
    .put(`http://localhost:5000/api/movies/${movieId}`, tempUpdatedMovieData)
    .then(result => {
      console.log("✅ axios 'put by movie id: ", result)
      setUpdatedMovieDate({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
      })
      props.history.push('/')
    })
    .catch(error => console.log("❌ axios 'put' by movie id: ", error))
  }

  return (
    <>
      <div className="movie-card">
        <h2>{currentMovieData.title}</h2>
        <div className="movie-director">
          Director: <em>{currentMovieData.director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{currentMovieData.metascore}</strong>
        </div>
        <h3>Actors</h3>

        {currentMovieData.stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div className="movie-card">
        <Form onSubmit={onSubmitHandler}>
          <Form.Field>
            <Input name='title' placeholder={updatedMovieData.title} value={updatedMovieData.title} onChange={onChangeHandler}/>
            <Label pointing>Please enter new title</Label>
          </Form.Field>
          <Divider />
          <Form.Field>
          <Input name='director' placeholder={updatedMovieData.director} value={updatedMovieData.director} onChange={onChangeHandler} />
            <Label pointing>Please enter new director</Label>
          </Form.Field>
          <Divider />
          <Form.Field>
          <Input name='metascore' placeholder={updatedMovieData.metascore} value={updatedMovieData.metascore} onChange={onChangeHandler} />
            <Label pointing>Please enter new metascore</Label>
          </Form.Field>
          <Divider />
          <Form.Field>
          <Input name='stars' placeholder={updatedMovieData.stars} value={updatedMovieData.stars} onChange={onChangeHandler} />
            <Label pointing>Please enter new stars</Label>
          </Form.Field>
          <Divider />
          <Button onClick={onSubmitHandler} color='green'>Update</Button>
        </Form>
      </div>
    </>
  )
}

export default UpdateMovieForm