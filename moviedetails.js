// Extract movie title from URL
const urlParams = new URLSearchParams(window.location.search);
const movieTitle = urlParams.get("title"); // Get title from URL

// Fetch movies JSON
fetch("movies.json")
    .then(response => response.json())
    .then(movies => {
        // Find the movie by title
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
                movieData.poster_url,
                movieData.iframe_url
            );

            // Populate the HTML
           
            document.getElementById("title").textContent = movie.title;
            // document.getElementById("original_title").textContent = movie.original_title;
            document.getElementById("description").textContent = movie.description;
            document.getElementById("imdb_score").textContent = movie.imdb_score.toFixed(1);
            document.getElementById("release_year").textContent = movie.release_year;
            document.getElementById("categories").textContent = movie.categories;
            document.getElementById("directors").textContent = movie.directors;
            document.getElementById("screenwriters").textContent = movie.screenwriters;
            document.getElementById("actors").textContent = movie.actors;
            document.getElementById("countries").textContent = movie.countries;
            document.getElementById("production_companies").textContent = movie.production_companies;
            document.getElementById("poster_url").src = movie.poster_url;

            // Set an example trailer (if available, otherwise default)
            document.getElementById("iframe_url").src = movie.iframe_url || "https://www.youtube.com/embed/U8jzfQUJuKM";
        } else {
            document.body.innerHTML = "<h2>Movie not found</h2>";
        }
    })
    .catch(error => console.error("Error loading movie details:", error));
