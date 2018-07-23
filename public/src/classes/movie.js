class Movie {
    constructor() {
        this.api_key = '16442dd8e0e780eaccac0dc888797d66';
        this.searchElement = document.getElementById('search');
        this.resultWrapper = document.getElementById("results-wrapper");
        this.totalMovies = [];
        this.favList = [];
    }

    findMovies() {
        let searchText = this.searchElement.value;
        this.fetchMovies(searchText);
    }

    fetchMovies(searchText) {
        const self = this;
        fetch("https://api.themoviedb.org/3/search/movie?api_key=" + this.api_key + "&include_adult=false&query=" + searchText)
        .then(res => {
            return res.json();
        })
        .then(data => {
            self.listMovies(data);
            this.totalMovies = data;
        }).then(() => {
            let elements = document.getElementsByClassName('favBtn');
            for (let i = 0; i < elements.length; i++) {
                elements[i].addEventListener('click', (evt) => {
                    let movieId = evt.currentTarget.getAttribute('data-id');
                    self.addMovieToFavList(self.totalMovies, movieId);
                });
            }
        });
    }

    addMovieToFavList(movies, id) {
        for (let i = 0; i < movies.results.length; i++) {
            if (movies.results[i].id === parseInt(id)) {
                this.favList.push({
                    title: movies.results[i].title,
                    id: movies.results[i].id,
                    release_date: movies.results[i].release_date,
                    poster_path: movies.results[i].poster_path,
                    vote_average: movies.results[i].vote_average
                });

                //save data to local
                this.saveToLocal(this.favList);
            }
        }
    }

    saveToLocal(lists) {
        localStorage.setItem('favMovies', JSON.stringify(lists));
    }

    listMovies(data) {
        let movies = data.results;
        const markup = `
            ${movies.map(movie => `
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <div class="card mb-4 box-shadow">
                        <img class="card-img-top" src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}" alt="${movie.title}">
                        <div class="card-body">
                            <h6 class="card-title">${movie.title}</h6>
                            <p class="card-text"><small><i>Release Data:</i> ${movie.release_date} / Ratings: ${movie.vote_average}</small></p>
                            <div class="d-flex justify-content-between">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary favBtn" data-id=${movie.id}>Add to Favourite</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        `;
        document.getElementById("results-wrapper").innerHTML = markup;
    }
}

export default Movie;
