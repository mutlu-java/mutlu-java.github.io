// Extract movie title from URL
const urlParams = new URLSearchParams(window.location.search);
const movieTitle = urlParams.get("id"); // 'id' contains the movie title

// Fetch movies JSON
fetch("movies.json")
    .then(response => response.json())
    .then(movies => {
        const movieData = movies.find(m => m.title === movieTitle);

        if (movieData) {
            // Create a Movie object
            const movie = new Movie(
                movieData.title,
                movieData.original_title,
                movieData.imdb_score,
                movieData.release_year,
                movieData.description,
                movieData.categories,
                movieData.directors,
                movieData.screenwriters,
                movieData.actors,
                movieData.countries,
                movieData.production_companies,
                movieData.poster_url
            );

            // Populate the HTML
            document.getElementById("moviePoster").src = movie.posterUrl;
            document.getElementById("movieTitle").textContent = movie.title;
            document.getElementById("originalTitle").textContent = movie.originalTitle;
            document.getElementById("movieDescription").textContent = movie.description;
            document.getElementById("imdbScore").textContent = movie.imdbScore;
            document.getElementById("releaseYear").textContent = movie.releaseYear;
            document.getElementById("categories").textContent = movie.categories;
            document.getElementById("directors").textContent = movie.directors;
            document.getElementById("screenwriters").textContent = movie.screenwriters;
            document.getElementById("actors").textContent = movie.actors;
            document.getElementById("countries").textContent = movie.countries;
            document.getElementById("productionCompanies").textContent = movie.productionCompanies;

            // Set an example trailer (if available, otherwise default)
            document.getElementById("movieTrailer").src = movie.iframe_url || "https://www.youtube.com/embed/defaultTrailerID";
        } else {
            document.body.innerHTML = "<h2>Movie not found</h2>";
        }
    })
    .catch(error => console.error("Error loading movie details:", error));
