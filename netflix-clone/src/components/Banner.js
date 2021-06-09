import React, { useEffect, useState } from 'react'
import fetchData from '../fetchData'
import Requests from '../Request'

const Banner = () => {
    const [randomMovie, setRandomMovie] = useState({})

    useEffect(() => {
        const fetchMovie = async () => {
            const request = await fetchData(Requests.fetchNetflixOriginals)
            const {results} = await request.json()
            setRandomMovie(results[Math.floor(Math.random() * results.length -1)])
        }
        fetchMovie()
    }, [])
    const truncate = (text, number=60) =>{
        if (text !== null && text !== undefined){
            if(text.length > number){
                return text.substr(0, number) + "..."
            } else{
                return text
            }
        } else return ""
    }
    const style = {
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${randomMovie?.backdrop_path}")`,   
        height: "448px",
    }
    
    return (
            <div className="banner" style={style}>
                
                <h1 className="banner__title">{randomMovie ? randomMovie.name : ""}</h1>
                <div className="banner__button">
                    <button>Play</button>
                    <button>Add List</button>
                </div>
                <p className="banner__description">{truncate(randomMovie.overview, 120)}</p>
                <div className="banner__footer"></div>
        
            </div>
    
    )
}

export default Banner
