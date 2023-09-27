const API_LINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d32701552f64fdb188e01892ccc58ca9&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=d32701552f64fdb188e01892ccc58ca9&query=";

const MAIN = document.getElementById("section");
const FORM = document.getElementById("form")
const QUERY = document.getElementById("query");

returnMovies(API_LINK);

function returnMovies(url) {
    fetch(url).then(res => res.json())
    .then(function(data){
        console.log(data.results);
        data.results.forEach(element => {
            const DIV_CARD = document.createElement('div');
            DIV_CARD.setAttribute('class', 'card');

            const DIV_ROW = document.createElement('div');
            DIV_ROW.setAttribute('class','row');

            const DIV_COLUMN = document.createElement('div');
            DIV_COLUMN.setAttribute('class','column');

            const IMAGE = document.createElement('img');
            IMAGE.setAttribute('class', 'thumbnail');
            IMAGE.setAttribute('id','image');

            const TITLE = document.createElement('h3');
            IMAGE.setAttribute('id','title');

            const CENTER = document.createElement('div');

            TITLE.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
            IMAGE.src = IMG_PATH + element.poster_path;

            CENTER.appendChild(IMAGE);
            DIV_CARD.appendChild(CENTER);
            DIV_CARD.appendChild(TITLE);

            DIV_COLUMN.appendChild(DIV_CARD);

            DIV_ROW.appendChild(DIV_COLUMN);

            MAIN.appendChild(DIV_ROW);
        });
    });
}

FORM.addEventListener('submit', (e) => {
    e.preventDefault();
    MAIN.innerHTML = '';

    const SEARCH_ITEM = QUERY.value;

    if(SEARCH_ITEM) {
        returnMovies(SEARCH_API + SEARCH_ITEM);
        QUERY.value = '';
    }
});