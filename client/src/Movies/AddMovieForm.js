import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Input, Label, Button, Form, Divider } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const AddMovieForm = props => {
  const [newMovieData, setNewMovieData] = useState({
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ''
  })

  const onChangeHandler = event => {
    setNewMovieData({
      ...newMovieData, 
      [event.target.name]: event.target.value
    })
  }

  const onSubmitHandler = event => {
    event.preventDefault()

    const tempNewMovieData = {
      id: newMovieData.id,
      title: newMovieData.title,
      director: newMovieData.director,
      metascore: newMovieData.metascore,
      stars: newMovieData.stars.split(",")
    }
    
    axios
    .post(`http://localhost:5000/api/movies`, tempNewMovieData)
    .then(result => {
      console.log("✅ axios 'new movie: ", result)
      setNewMovieData({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
      })
      props.history.push('/')
    })
    .catch(error => console.log("❌ axios new movie: ", error))
  }

  return (
    <>
      <div className="movie-card">
        <Form onSubmit={onSubmitHandler}>
          <Form.Field>
            <Input name='title' value={newMovieData.title} onChange={onChangeHandler}/>
            <Label pointing>Please enter new title</Label>
          </Form.Field>
          <Divider />
          <Form.Field>
          <Input name='director' value={newMovieData.director} onChange={onChangeHandler} />
            <Label pointing>Please enter new director</Label>
          </Form.Field>
          <Divider />
          <Form.Field>
          <Input name='metascore' value={newMovieData.metascore} onChange={onChangeHandler} />
            <Label pointing>Please enter new metascore</Label>
          </Form.Field>
          <Divider />
          <Form.Field>
          <Input name='stars' value={newMovieData.stars} onChange={onChangeHandler} />
            <Label pointing>Please enter new stars seperated by a comma</Label>
          </Form.Field>
          <Divider />
          <Button onClick={onSubmitHandler} color='green'>Add Movie</Button>
        </Form>
      </div>
    </>
  )
}

export default AddMovieForm