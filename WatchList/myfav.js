var sideOption = document.getElementById("side");
function showMenu() {
    sideOption.style.left = "0";
}
function hideMenu() {
    sideOption.style.left = "-300px";
}


const API_KEY = 'api_key=49e3be45df1c1a483b5eb9560e3c73ab';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const BASE_URL = 'https://api.themoviedb.org/3';

 
var storageData = localStorage.getItem('MovieArray');
var favMovieArray = JSON.parse(storageData);
 
favMovieArray.forEach(async id => {
    let link = `/movie/${id}?language=en-US&`;
    let url = BASE_URL + link + API_KEY;
    await apiCall(url, id);
});



function apiCall(url, id) {
    const x = new XMLHttpRequest();
    x.open('get', url);
    x.send();
    x.onload = function () {
        var resp = x.response;
        var jsonRes = JSON.parse(resp);
        console.log(jsonRes)
        favMovieData(jsonRes, id);
    }
}


function favMovieData(jsonResp, id) {
    var eachListItem = document.createElement('div');
    eachListItem.classList.add('list-item');
    eachListItem.innerHTML = `
        <div class="movie-details">

            <div class="thumbnail">
                <a href="../MoviePage/moviePage.html?id=${id}">
                    <img id="movieimg" src=${IMAGE_URL + jsonResp.poster_path} alt="Thumbnail">
                <a/>
            </div>
            <div id="details">
                <div class="title">
                <a href="moviePage.html?id=${id}"> ${jsonResp.title} </a> 
                </div>
            
                <div class="remove-movie" id='${id}' onclick="deleteMovie(${id})">
                <i id="removeicon" class="far fa-trash-alt"></i>
                </div>
            </div>
        </div>

    `;
    document.getElementById('list-container').appendChild(eachListItem);
}


document.getElementById('clear-whole-list').addEventListener('click', function () {
    if (window.confirm("Clear All Favorite Movie List")) {
        localStorage.clear();
        window.location.reload();
    }
});


async function deleteMovie(id) {
    if (window.confirm('Delete this Movie from Favorite List')) {
        var temp = await JSON.parse(localStorage.getItem('MovieArray'));
        var i = await temp.indexOf(id.toString());
        await temp.splice(i, 1);
        await localStorage.setItem('MovieArray', JSON.stringify(temp));
        await window.location.reload();
    }
}