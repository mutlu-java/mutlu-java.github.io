

function Movie(title, originalTitle, imdb_score, release_year, description, categories,
     directors, screenwriters, actors, countries, production_companies, poster_url,iframe_url) {

    this.title = title || "Unknown Title";
    this.originalTitle = originalTitle || "Unknown Original Title";
    this.imdb_score = imdb_score || "N/A";
    this.release_year = release_year || "Unknown Year";
    this.description = description || "No description available.";
    this.categories = categories || "Uncategorized";
    this.directors = directors || "Unknown Director";
    this.screenwriters = screenwriters || "Unknown Screenwriter";
    this.actors = actors || "Unknown Cast";
    this.countries = countries || "Unknown Country";
    this.production_companies = production_companies || "Unknown Production Company";
    this.poster_url = poster_url || "https://image.tmdb.org/t/p/w500/q125RHUDgR4gjwh1QkfYuJLYkL.jpg";
    this.iframe_url = iframe_url ;
}



let movies = []; 
let currentPage = 1;
const moviesPerPage = 15;

// Function to generate pagination structure
function updatePagination() {
    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(movies.length / moviesPerPage);
    
    if (totalPages <= 1) return; // No pagination needed if there's only one page

    // Create "Previous" button
    const prevButton = document.createElement("button");
    prevButton.textContent = "« Previous";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => changePage(currentPage - 1));
    paginationContainer.appendChild(prevButton);

    // Display first 5 pages or dynamic range based on current page
    let startPage = 1;
    let endPage = 5;

    if (currentPage > 3) {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
    }

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, totalPages - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.classList.add("page-btn");
        if (i === currentPage) {
            pageButton.classList.add("active");
        }
        pageButton.addEventListener("click", () => changePage(i));
        paginationContainer.appendChild(pageButton);
    }

    // Add "..." and "Last Page" button if not already included
    if (endPage < totalPages) {
        const dots = document.createElement("span");
        dots.textContent = "...";
        paginationContainer.appendChild(dots);

        const lastPageButton = document.createElement("button");
        lastPageButton.textContent = totalPages;
        lastPageButton.addEventListener("click", () => changePage(totalPages));
        paginationContainer.appendChild(lastPageButton);
    }

    // Create "Next" button
    const nextButton = document.createElement("button");
    nextButton.textContent = "Next »";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => changePage(currentPage + 1));
    paginationContainer.appendChild(nextButton);
}

// Function to change page
function changePage(newPage) {
    currentPage = newPage;
    displayMoviePosters();
    updatePagination();
}

// Function to display movies based on page
function displayMoviePosters() {
    const movieListSection = document.querySelector(".movie-list");
    movieListSection.innerHTML = "";

    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const moviesToDisplay = movies.slice(startIndex, endIndex);

    moviesToDisplay.forEach(movie => {
        const movieItem = document.createElement("div");
        movieItem.classList.add("movie-item");
        
        const movieLink = document.createElement("a");
        movieLink.href = `moviepage.html?title=${encodeURIComponent(movie.title)}`; // Use title to 
        
        const movieImage = document.createElement("img");
        movieImage.src = movie.poster_url;
        movieImage.alt = movie.title;
        
        const movieTitle = document.createElement("p");
        movieTitle.textContent = movie.title;
        
        movieLink.appendChild(movieImage);
        movieLink.appendChild(movieTitle);
        movieItem.appendChild(movieLink);
        movieListSection.appendChild(movieItem);
    });
}


// Fetch and display movies
function fetchMovies() {
    fetch("movies.json")
        .then(response => response.json())
        .then(data => {
            movies = data.map(movie => new Movie(
                movie.title, movie.original_title, movie.imdb_score, 
                movie.release_year, movie.description, movie.categories, 
                movie.directors, movie.screenwriters, movie.actors, 
                movie.countries, movie.production_companies, movie.poster_url, movie.iframe_url
            ));
            displayMoviePosters();
            updatePagination();
        })
        .catch(error => console.error("Error loading movies:", error));
}

// Call fetchMovies when the page loads
window.onload = fetchMovies;
