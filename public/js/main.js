class Movies {
    constructor() {
        this.api_key = '16442dd8e0e780eaccac0dc888797d66';
        this.loader = document.getElementById("loading");
        this.searchElement = document.getElementById('search');
        this.resultWrapper = document.getElementById("results-wrapper");
    }

    toggleLoader(value) {
        this.loader.style.display = value;
    }

    toggleInputError(flag) {
        if(flag) {
            this.searchEle.classList.add("is-invalid");
        } else {
            this.searchEle.classList.remove("is-invalid");
        }
    }

    findMovies() {
        let searchText = this.searchElement.value;
        if (!searchText) {
            this.toggleInputError(true);
            this.toggleLoader('none');
            return false;
        }

        this.fetchMovies(searchText);
    }

    fetchMovies(searchText) {

        let self = this;

        fetch("https://api.themoviedb.org/3/search/movie?api_key=" + this.api_key + "&include_adult=false&query=" + searchText)
        .then(res => {
            return res.json();
        })
        .then(data => {
            self.listMovies(data);
        });
    }

    listMovies(data) {
        let movies = data.results;
        console.log(movies);
        const markup = `
            <div class="container-fluid">
                ${movies.map(movie => `
                    <div class="row single-movie">
                        <div class='col-md-3 col-lg-3 col-xl-3'>
                            <div class="poster-img-container">
                                <img class="poster-img" src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}" alt="${movie.title}">
                            </div>
                        </div>

                        <div class="col-md-9 col-lg-9 col-xl-9">
                            <div class="poster-img-description">
                                <h3 class="card-title">${movie.title}</h3>
                                <p>
                                    <small><i>Release Data:</i> ${movie.release_date} / Ratings: ${movie.vote_average}</small>
                                </p>
                                <p class="card-text">${movie.overview}</p>
                                <a href="#">
                                    <i class="fas fa-heart fa-2x"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        document.getElementById("results-wrapper").innerHTML = markup;
    }
}

(function(){
    let form = document.getElementsByTagName('form')[0];
    let movies = new Movies();

    form.addEventListener('submit', function(evt) {
        evt.preventDefault()
        movies.findMovies();
    });
}());
