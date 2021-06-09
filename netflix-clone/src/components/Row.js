import React, { useEffect, useState } from 'react'
import fetchData from '../fetchData'

function Row({title, fetchUrl, isLargeRow=false}) {
    const [isPending, setIsPending] = useState(true);
    const [movies, setMovies] = useState({})
    const baseUrl = 'https://image.tmdb.org/t/p/original'
    useEffect(() => {
        const fetchMovie = async () => {
            const request = await fetchData(fetchUrl)
            const {results} = await request.json()
            setMovies(results)
            setIsPending(false)
            return results
        }
        fetchMovie()
    }, [fetchUrl])
    
    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__images">
               {isPending ? 'Loading...' : movies.map((movie) => 
                 <img className={`row__image ${isLargeRow && "row__isLargeRow"}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    key={movie.id} 
                    src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                    alt=""
                />)}
            </div>
        </div>
    )
}

export default Row
