import Movie from './classes/movie';
import MovieCollection from './classes/moviesCollection';

let form = document.getElementsByTagName('form')[0];
let movies = new Movie();
let moviesCollection = new MovieCollection();

//for the search button
document.getElementById("movieSearchBtn").addEventListener('click', (evt) => {
    evt.preventDefault()
    movies.findMovies();
});

//for the button "favMoviesList"
document.getElementById('favMoviesList').addEventListener('click', (evt) => {
    moviesCollection.loadFavMovies();
});
