document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const resultContainer = document.getElementById("results");

    let movies = [];

    // Fetch movie data
    fetch("movies.json")
        .then(response => response.json())
        .then(data => movies = data)
        .catch(error => console.error("Error loading JSON:", error));

    // Search function
    function searchMovies() {
        const query = searchInput.value.toLowerCase().trim();
        if (query === "") {
            resultContainer.innerHTML = ""; // Clear results if input is empty
            return;
        }

        // Filter movies based on title or original_title
        let results = movies.filter(movie =>
            movie.title.toLowerCase().includes(query) ||
            movie.original_title.toLowerCase().includes(query)
        );

        // Sort results based on IMDb score (higher is better)
        results.sort((a, b) => b.imdb_score - a.imdb_score);

        // Limit results to 7 best matches
        results = results.slice(0, 7);

        // Display results
        displayResults(results);
    }

    // Display function
    function displayResults(results) {
        resultContainer.innerHTML = ""; // Clear previous results

        if (results.length === 0) {
            resultContainer.innerHTML = "<p>No results found.</p>";
            return;
        }

        results.forEach(movie => {
            const movieElement = document.createElement("li");
            movieElement.classList.add("movie-card");

            movieElement.innerHTML = `

            <img style="height :5rem ; float: left;" src="${movie.poster_url}" alt="movie poster">

                <h4 style="display:inline; ">
                    <a href="moviepage.html?title=${encodeURIComponent(movie.title)}"> 
                    ${movie.title} (${movie.release_year})IMDb Score: ${movie.imdb_score.toFixed(1)}
                    </a>
                </h4>
                
                
            `;

            resultContainer.appendChild(movieElement);
        });
    }

    // Event listeners
    searchButton.addEventListener("click", searchMovies);
    searchInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") searchMovies();
    });
    searchInput.addEventListener("focus",searchMovies)
});
