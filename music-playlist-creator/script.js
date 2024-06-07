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
    return newCard;
}

function loadCards(){
    const cardDeck = document.getElementById('card-deck');
    data.playlists.forEach(card => {
        const newCard = generateCard(card);
        cardDeck.appendChild(newCard);
    })

    let likes = document.getElementsByClassName("like-bar")
    for (const single of likes){
        single.addEventListener("click", function(event) {
            console.log(event.target);
            let likeCount = event.target.parentNode.querySelector('.like-count').textContent;
            ++likeCount;
            event.target.parentNode.querySelector('.like-count').textContent = likeCount;
            event.target.parentNode.querySelector('.like-count').style.color = "#c30000";
            event.stopPropagation();
        });
    }
}

function openModal(card){
    const newModal = document.getElementById('modal-overlay');
    newModal.innerHTML = `
    <div id="unique-view" class="modal-content">
        <button id="close-button" class="close" onclick="this.parentNode.parentNode.style.display='none';">x</button>
        <img id="single-thumbnail" class="playlist-thumbnail" src="${card.playlist_art}">
        <div>
            <h2>${card.playlist_name}</h2>
            <h3> Created by ${card.playlist_creator}</h3>
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
                <p> ${song.artist}</p>
                <p> ${song.album}</p>
                <p> ${song.duration}</p>
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
    songList.innerHTML='';
    for (let i = 0; i < array.length; i++) {
        const song = array[i];
        const songCard = document.createElement('div');
        songCard.className = 'song-card';
        songCard.innerHTML = `
             <img class="cover-art" src= ${song.cover_art}>
                <p> ${song.artist}</p>
                <p> ${song.album}</p>
                <p> ${song.duration}</p>
        `;
        songList.appendChild(songCard);
    }

    return array;
  }


document.addEventListener("DOMContentLoaded", () => {
    loadCards();
});
