class MovieCollection {

    loadFavMovies() {
        let selectedMovies = localStorage.getItem('favMovies');
        let formatedObj = JSON.parse(selectedMovies);

        if (formatedObj) {
            this.displayTheList(formatedObj);
        }
    }

    displayTheList(obj) {
        const markup = `
            ${obj.map((movie, index) => `
                <div class="col-md-3 col-lg-3 col-xl-3">
                    <div class="card mb-4 box-shadow">
                        <img class="card-img-top" src="https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}" alt="${movie.title}">
                        <div class="card-body">
                            <h6 class="card-title">${movie.title}</h6>
                            <p class="card-text"><small><i>Release Data:</i> ${movie.release_date} / Ratings: ${movie.vote_average}</small></p>
                            <div class="d-flex justify-content-between">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary" id="removeBtn" data-index=${index} data-id=${movie.id}>Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        `;
        document.getElementById("results-wrapper").innerHTML = markup;

        //for the remove button
        document.getElementById("removeBtn").addEventListener('click', (evt) => {
            //console.log('remove');
        });
    }
}

export default MovieCollection;
