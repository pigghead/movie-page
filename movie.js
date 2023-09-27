const url = new URL(location.href);  // creates a string based on the location the user is at
const movieId = url.searchParams.get('id');
const movieTitle = url.searchParams.get('title');

const API_LINK = 'https://localhost:8000/api/v1/reviews/';

const MAIN = document.getElementById("section");
const TITLE = document.getElementById("title");

console.log(url + '/movie/' + movieId);

TITLE.innerText = `${movieTitle}`;

returnReviews(API_LINK); 

function returnReviews(url) {
    fetch(url + 'movie/' + movieId).then(res => res.json())
    .then(function(data){
        console.log(data);
        data.forEach(element => {
            const DIV_CARD = document.createElement('div');

            DIV_CARD.innerHTML = `
            <div class="row">
                <div class="column">
                    <div class="card" id="${review._id}">
                        <p><strong>Review: <strong> ${review.review}</p>
                        <p><strong>User: <strong> ${review.user}</p>
                        <p>
                            <a href="#" onclick="editReview('${review._id}', '${review.review}', '${review.user}')">EDIT</a>
                            <a href="#" onclick="deleteReview('${review._id}')</a>
                        </p>
                    </div>
                </div>
            </div>
            `

            MAIN.appendChild(DIV_CARD);
        });
    });
}