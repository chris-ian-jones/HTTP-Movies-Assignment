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

  const [updatedMovieData, setUpdatedMovieDate] = useState({
    id: 'test',
    title: 'test',
    director: 'test',
    metascore: 'test',
    stars: []
  })
  
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${movieId}`)
      .then(result => {
        console.log('✅ axios get by movie id: ', result.data)
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
    // axios.
  }

  return (
      <StyledForm onSubmit={onSubmitHandler}>
        <label>Title</label>
        <input name='title' placeholder={updatedMovieData.title} value={updatedMovieData.title} onChange={onChangeHandler}/>
        <label>Director</label>
        <input name='director' placeholder={updatedMovieData.director} value={updatedMovieData.director} onChange={onChangeHandler} />
        <label>Metascore</label>
        <input name='metascore' placeholder={updatedMovieData.metascore} value={updatedMovieData.metascore} onChange={onChangeHandler} />
        {/* Todo stars array input */}
        {/* <label>Stars</label> */}
        {/* <input name='stars' placeholder={updatedMovieData.stars} value={updatedMovieData.title} /> */}
        <button onClick={onSubmitHandler}>Update</button>
      </StyledForm>
  )
}

export default UpdateMovieForm