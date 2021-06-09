import React from "react"
import Banner from '../components/Banner';
import Requests from '../Request';
import Row from '../components/Row'
import Navbar from "../components/Navbar";

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <Banner / >
            <Row title = "Netflix Originals" fetchUrl = { Requests.fetchNetflixOriginals }isLargeRow = { true }/> 
            <Row title = "Trending" fetchUrl = { Requests.fetchTrending } /> 
            <Row title = "Top Rated" fetchUrl = { Requests.fetchTopRated } />
            <Row title = "Action Movies" fetchUrl = { Requests.fetchActionMovies }/>  
            <Row title = "Comedy Movies" fetchUrl = { Requests.fetchComedyMovies }/> 
            <Row title = "Horror movies" fetchUrl = { Requests.fetchHorrorMovies }/> 
            <Row title = "Romance Movies" fetchUrl = { Requests.fetchRomanceMovies }/>
            <Row title = "Documentairies" fetchUrl = { Requests.fetchDocumentairies }/>
        </div>
    )
}

export default Dashboard