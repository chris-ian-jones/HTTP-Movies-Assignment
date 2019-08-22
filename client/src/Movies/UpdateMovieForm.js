import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const StyledForm = styled.form`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;;
`

const UpdateMovieForm = props => {
  const movieId = props.match.params.id
  console.log('UpdateMovieForm movieId: ', movieId)
  console.log('UpdateMovieForm props: ', props)

  const [currentMovieData, setCurrentMovieDate] = useState({
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
        setCurrentMovieDate(result.data)
        setUpdatedMovieDate(result.data)
      })
      .catch(error => console.log("❌ axios 'get' by movie id: ", error))
  }, [movieId])

  console.log('UpdateMovieForm updatedMovieData: ', updatedMovieData)

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
      stars: updatedMovieData.stars.split(",")
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
        <StyledForm onSubmit={onSubmitHandler}>
          <label>Title</label>
          <input name='title' placeholder={updatedMovieData.title} value={updatedMovieData.title} onChange={onChangeHandler}/>
          <label>Director</label>
          <input name='director' placeholder={updatedMovieData.director} value={updatedMovieData.director} onChange={onChangeHandler} />
          <label>Metascore</label>
          <input name='metascore' placeholder={updatedMovieData.metascore} value={updatedMovieData.metascore} onChange={onChangeHandler} />
          <label>Stars</label>
          <input name='stars' placeholder={updatedMovieData.stars} value={updatedMovieData.stars} onChange={onChangeHandler} />
          <button onClick={onSubmitHandler}>Update</button>
        </StyledForm>
      </div>
    </>
  )
}

export default UpdateMovieForm