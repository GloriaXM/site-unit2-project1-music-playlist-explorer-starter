import {data} from './data/data.js';
let songsToAdd = [];

//Handles generating the html for a single playlist card
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

//Loads the entire deck of playlist cards
function loadCards(){
    const cardDeck = document.getElementById('card-deck');
    data.playlists.forEach(card => {
        const newCard = generateCard(card);
    })

    //Add like bar functionality after loading
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

    //Add load playlist button
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

    // // Load in songs from data
    const songList = document.getElementById('song-list');
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

//Event handler for adding a playlist
function openForm(event) {
    const form = document.getElementById('form-overlay');
    form.style.display = 'block';
}

//Event handler to load song data on click
const addingButton = document.getElementById('add-song');
addingButton.onclick = function (event){
    event.preventDefault();

    const entries = document.getElementById('song-entries');
    const songTitle = document.getElementById('song-title');
    const album = document.getElementById('album');
    const artist = document.getElementById('artist');
    const duration = document.getElementById('duration');

    const song = {
        "songId": songsToAdd.length,
        "songTitle": songTitle.value,
        "album": album.value,
        "artist": artist.value,
        "cover_art": "./assets/img/song.png",
        "duration": duration.value
    }

    songsToAdd.push(song);
}

//Event handler to save playlist into data json
const submit = document.getElementById('submit-playlist');
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
    const playlistId = data.playlists.length;

    data.playlists.push({
        "playlistID": playlistId,
        "playlist-name": playlistName,
        "playlist_creator": creator,
        "playlist-art": "./assets/img/playlist.png",
        "likeCount": 0,
        "songs": songsToAdd
    });

    // TODO: loadCards into view
    // loadCards();
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

//Search bar functionality
const searchInput = document.getElementById('search');
searchInput.addEventListener("input", function(event){
    const input = searchInput.value.toLowerCase();
    const results = data.playlists.filter(function(item) {
        return item.playlist_name.toLowerCase().includes(input);
    });

    const cardDeck = document.getElementById('card-deck');
    cardDeck.innerHTML = "";

    for (const result of results){
        generateCard(result);
    }
})


document.addEventListener("DOMContentLoaded", () => {
    loadCards();
});
