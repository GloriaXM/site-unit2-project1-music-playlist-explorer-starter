import {data} from './data/data.js';

function generateCard(card){
    const newCard = document.createElement('button');
    newCard.className = 'card';
    const boundOpenModal = openModal.bind(this, card);
    newCard.addEventListener('click', boundOpenModal)
    newCard.innerHTML = `
        <img class="playlist-thumbnail" src="${card.playlist_art}">
        <h2> ${card.playlist_name}</h2>
        <p> ${card.playlist_creator}</p>
        <div class="like-bar">
            <img class="like">
            <p>Like Count</p>
        </div>
    `;
    return newCard;
}

function loadCards(){
    const cardDeck = document.getElementById('card-deck');
    data.playlists.forEach(card => {
        const newCard = generateCard(card);
        cardDeck.appendChild(newCard);
    })
}

function openModal(card){
    const newModal = document.createElement('div');
    newModal.className = 'modal-overlay';
    newModal.innerHTML = `
        <div id="unique-view' class="modal-content">
            <button id="close-button" class="close" onclick="this.parentNode.remove()">x</button>  <!-- Code taken from https://stackoverflow.com/questions/19704477/adding-close-button-in-div-to-close-the-box -->
                <img id="single-thumbnail" class="playlist-thumbnail" src="${card.playlist_art}">
                <div>
                    <h2>${card.playlist_name}</h2>
                    <h3> Created by ${card.playlist_creator}</h3>
                    <div id="song-list">
                    </div>

                </div>

        </div>
    `;

    document.body.appendChild(newModal);

    // Load in songs
    const songList = document.getElementById('song-list');
    card.songs.forEach(song => {
        const songCard = document.createElement('div');
        songCard.className = 'song-card';
        songCard.innerHTML = `
            <img class="cover-art" src= ${song.cover_art}>
            <p> ${song.artist}</p>
            <p> ${song.album}</p>
            <p> ${song.duration}</p>
        `;
        songList.appendChild(songCard);
    })




}


loadCards();
