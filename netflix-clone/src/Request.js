// API KEy
const apiKey = "ea902c4e0b1eb8cb642973e0bca249b5"

const Requests = {
    fetchTrending: `/trending/all/week?api_key=${apiKey}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${apiKey}&language=en-US`,
    fetchTopRated: `/movie/top_rated/?api_key=${apiKey}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${apiKey}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${apiKey}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${apiKey}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${apiKey}&with_genres=10749`,
    fetchDocumentairies: `/discover/movie?api_key=${apiKey}&with_genres=99`,
}
export default Requests
