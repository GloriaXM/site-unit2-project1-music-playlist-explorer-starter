import {data} from './data/data.js';

function generateCard(card){
    const newCard = document.createElement('button');
    newCard.className = 'card';
    const boundOpenModal = openModal.bind(this, card);
    newCard.addEventListener('click', boundOpenModal);
    newCard.innerHTML = `
        <img class="playlist-thumbnail" src="${card.playlist_art}">
        <h2 class="playlist-name"> ${card.playlist_name}</h2>
        <p> ${card.playlist_creator}</p>
        <span class="like-bar">
            <span class="like-icon">&#9829</h4>
            <span class="like-count">${card.likeCount}</span>
        </span>
    `;

    const cardDeck = document.getElementById('card-deck');
    cardDeck.appendChild(newCard);
    return newCard;
}

function loadCards(){
    const cardDeck = document.getElementById('card-deck');
    data.playlists.forEach(card => {
        const newCard = generateCard(card);
        // cardDeck.appendChild(newCard);
    })

    let likes = document.getElementsByClassName("like-bar")
    for (const single of likes){
        let clicked = false;
        single.addEventListener("click", function(event) {
            let likeCount = event.target.parentNode.querySelector('.like-count').textContent;
            if (!clicked){
                ++likeCount;
                event.target.parentNode.querySelector('.like-count').textContent = likeCount;
                event.target.parentNode.querySelector('.like-count').style.color = "#c30000";
            } else {
                --likeCount;
                event.target.parentNode.querySelector('.like-count').textContent = likeCount;
                event.target.parentNode.querySelector('.like-count').style.color = "#495159";
            }
            clicked = !clicked;

            event.stopPropagation();
        });
    }

    const addPlaylist = document.createElement('button');
    addPlaylist.id = 'add-playlist';
    addPlaylist.className = 'card';
    addPlaylist.innerHTML = `
        <h2 class="playlist-name"> Add Playlist </h2>
    `;
    addPlaylist.onclick = openForm;
    cardDeck.appendChild(addPlaylist);
}

function openModal(card){
    const newModal = document.getElementById('modal-overlay');
    newModal.innerHTML = `
    <div id="unique-view" class="modal-content">
        <button id="close-button" class="close" onclick="this.parentNode.parentNode.style.display='none';">x</button>
        <img id="single-thumbnail" class="playlist-thumbnail" src="${card.playlist_art}">
        <h2>${card.playlist_name}</h2>
        <h3> Created by ${card.playlist_creator}</h3>
        <div>
            <h3 id="shuffle-button"> Shuffle </h3>
            <div id="song-list">
            </div>
        </div>
    </div>
    `;

    // // Load in songs
    const songList = document.getElementById('song-list');
    // //Load using index
    for (let i = 0; i < card.songs.length; i++) {
        const song = card.songs[i];
        const songCard = document.createElement('div');
        songCard.className = 'song-card';
        songCard.innerHTML = `
             <img class="cover-art" src= ${song.cover_art}>
             <div class="song-info">
                <p> ${song.artist}</p>
                <p> ${song.album}</p>
                <p> ${song.duration}</p>
             </div>
        `;
        songList.appendChild(songCard);
    }

    const shuffleButton = document.getElementById('shuffle-button');
    const boundShuffle = shuffle.bind(this, card.songs);
    shuffleButton.addEventListener('click', boundShuffle);

    newModal.style.display = 'block';
}

//shuffle algo taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    const songList = document.getElementById('song-list');

    // //Load using index

    songList.innerHTML='';
    for (let i = 0; i < array.length; i++) {
        const song = array[i];
        const songCard = document.createElement('div');
        songCard.className = 'song-card';
        songCard.innerHTML = `
            <img class="cover-art" src= ${song.cover_art}>
            <div class="song-info">
            <p> ${song.artist}</p>
            <p> ${song.album}</p>
            <p> ${song.duration}</p>
            </div>
        `;
        songList.appendChild(songCard);
    }

    return array;
}

function openForm(event) {
    const form = document.getElementById('form-overlay');
    form.style.display = 'block';
}

const addingButton = document.getElementById('add-song');
//Add another section to enter another song into the playlist
addingButton.onclick = function (event){
    event.preventDefault();

    // const entries = document.getElementById('song-entries');
    // console.log(entries.innerHTML);
    // entries.innerHTML += `
    // <label for="song-title"> Song Title: </label>
    // <input type="text" id="song-title" >
    // <label for="album"> Album: </label>
    // <input type="text" id="album" >
    // <label for="artist"> Artist: </label>
    // <input type="text" id="artist" >
    // <label for="duration"> Duration: </label>
    // <input type="text" id="duration" >

    // `;
}

const submit = document.getElementById('submit');
submit.onclick = function (event){
    event.preventDefault();

    //Load data from form
    const form = document.getElementById('form-content').value;
    const playlistName = document.getElementById('playlist-name').value;
    const creator = document.getElementById('creator').value;
    const songTitles = document.getElementsByClassName('song-titles');
    const albums = document.getElementsByClassName('album');
    const artists = document.getElementsByClassName('artist');
    const durations = document.getElementsByClassName('duration');

    let songs = [];
    console.log(songs);
    for (let i = 0; i < songTitles.length; ++i){
        songs.push({
            "songID": i,
            "title": songTitles[i].value,
            "artist": artists[i].value,
            "album" : albums[i].value,
            "cover_art": "./assets/images/song.png",
            "duration": durations[i].value
        })
    }
    console.log(songs);

}

// TODO: figure out why the below fxn definition doesn't work
// assumption: using onclick in HTML was not properly handing off the event
// function addSong(event){
//     console.log("submitting")
//     event.preventDefault();
//     const entries = document.getElementById('song-entries');
//     entries.innerHTML += `
//     <label for="song-title"> Song Title: </label>
//     <input type="text" id="song-title" >
//     <label for="artist"> Artist: </label>
//     <input type="text" id="artist" >
//     <label for="duration"> Duration: </label>
//     <input type="text" id="duration" >

//     `;
// }

//Event listener for submit search button
// const searchButton = document.getElementById('submit');
// searchButton.onSubmit = function (event){
//     console.log(searchButton);
//     console.log(document.getElementById('search-bar'));
//     const searchWord = document.getElementById('search-bar').value;
//     console.log(searchWord);
// }

const searchInput = document.getElementById('search');
searchInput.addEventListener("input", function(event){
    const input = searchInput.value.toLowerCase();
    const results = data.playlists.filter(function(item) {
        return item.playlist_name.toLowerCase().includes(input);
    });

    const cardDeck = document.getElementById('card-deck');
    cardDeck.innerHTML = "";

    for (const result of results){
        console.log(result);
        generateCard(result);
    }
})


document.addEventListener("DOMContentLoaded", () => {
    loadCards();
});
