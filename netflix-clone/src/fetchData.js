//import React from 'react'

const fetchData = (request) => {
    return fetch(`https://api.themoviedb.org/3${request}`)
} 

export default fetchData