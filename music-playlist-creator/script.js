import {data} from './data/data.js';

function generateCard(){
    console.log("Here")
}

function loadCards(){
    const cardDeck = document.getElementById('playlist-cards');
    data.playlists.forEach(card => {
        const newCard = generateCard(card);
    })
}

loadCards();
