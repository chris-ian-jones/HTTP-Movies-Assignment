import React, { useState, useEffect } from 'react'

const UpdateMovieForm = props => {
  
  console.log('UpdateMovieForm props: ', props)

  const [updatedMovieData, setUpdatedMovieDate] = useState({
    id: 'test',
    title: 'test',
    director: 'test',
    metascore: 'test',
    stars: []
  })
  
  console.log('UpdateMovieForm updatedMovieData: ', updatedMovieData)

  const onchangeHandler = event => {
    setUpdatedMovieDate({
      ...updatedMovieData, 
      [event.target.name]: event.target.value
    })
  }

  return (
    <form>
      <input name='title' placeholder={updatedMovieData.title} value={updatedMovieData.title} onChange={onchangeHandler}/>
      <input name='director' placeholder={updatedMovieData.director} value={updatedMovieData.director} onChange={onchangeHandler} />
      <input name='metascore' placeholder={updatedMovieData.metascore} value={updatedMovieData.metascore} onChange={onchangeHandler} />
      {/* Todo stars array input */}
      {/* <input name='title' placeholder={updatedMovieData.title} value={updatedMovieData.title} /> */}
      <button>Update</button>
    </form>
  )
}

export default UpdateMovieForm