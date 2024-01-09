document.addEventListener("DOMContentLoaded", function () {
  let container = document.getElementById("container");
  let searchBox = document.getElementById("srchBox");
  let searchButton = document.getElementById("srchBtn");

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'YOUR_ACCESS_TOKEN'
    }
  };

  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    .then(response => response.json())
    .then(popMovieData => {
      popMovieData.results.forEach(makeCard);

      let cards = document.getElementsByClassName("card-body");
      let Count = document.getElementById("count");
      Count.innerText = cards.length + "건";

      searchButton.addEventListener("click", () => performSearch(popMovieData));
      searchBox.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          performSearch(popMovieData);
        }
      });
    })
    .catch(err => console.error(err));

  function makeCard(cardContent) {
    let newCardDiv = document.createElement("div");
    newCardDiv.className = "card";
    newCardDiv.style.width = "18rem";
    newCardDiv.style.marginBottom = "30px";
    newCardDiv.setAttribute('id', cardContent.id);

    let cardBodyDiv = document.createElement("div");
    cardBodyDiv.className = "card-body";

    let imgElement = document.createElement("img");
    imgElement.src = "https://image.tmdb.org/t/p/original/" + cardContent.poster_path;
    imgElement.className = "poster";
    imgElement.setAttribute('id', cardContent.id);
    imgElement.style.maxWidth = "15.38rem";
    imgElement.style.display = "flex";
    imgElement.style.marginBottom = "10px";

    let orginlTitle = document.createElement("h5");
    orginlTitle.className = "orginlTitle";
    orginlTitle.textContent = cardContent.original_title;

    let title_en = document.createElement("h6");
    title_en.className = "title_en";
    title_en.textContent = cardContent.title;

    let overview = document.createElement("p");
    overview.className = "overview";
    overview.textContent = cardContent.overview;

    let rating = document.createElement("p");
    rating.className = "rating";
    rating.textContent = "Rating: " + cardContent.vote_average;

    let rlsDate = document.createElement("p");
    rlsDate.className = "rlsDate";
    rlsDate.textContent = cardContent.release_date;

    cardBodyDiv.appendChild(imgElement);
    cardBodyDiv.appendChild(orginlTitle);
    cardBodyDiv.appendChild(title_en);
    cardBodyDiv.appendChild(overview);
    cardBodyDiv.appendChild(rating);
    cardBodyDiv.appendChild(rlsDate);
    newCardDiv.appendChild(cardBodyDiv);
    container.appendChild(newCardDiv);

    cardBodyDiv.addEventListener('click', function () {
      let movieID = newCardDiv.getAttribute('id');
      alert("This movie's ID is " + movieID + ".");
    });
  }
  function performSearch(data) {
    let searchTerm = searchBox.value.trim().toLowerCase();

    if (searchTerm !== "") {
      let filteredMovies = data.results.filter(function (movie) {
        return (
          movie.original_title.toLowerCase().includes(searchTerm) ||
          movie.title.toLowerCase().includes(searchTerm) ||
          movie.overview.toLowerCase().includes(searchTerm)
        );
      });

      function renderMovies(movies) {
        container.innerHTML = '';
        movies.forEach(makeCard);

        let cards = document.getElementsByClassName("card-body");
        let count = document.getElementById("count");
        count.innerText = cards.length + "건";

        // Display alert if no search results
        if (movies.length === 0) {
          alert("No search results found.");
        }
      }

      renderMovies(filteredMovies);
    }
  };

  searchBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      performSearch(popMovieData);
    }
  });

  // Add event listener for "click" event
  searchButton.addEventListener("click", () => performSearch(popMovieData));
});