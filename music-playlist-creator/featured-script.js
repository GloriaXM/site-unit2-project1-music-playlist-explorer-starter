import {data} from './data/data.js';

function loadData() {
    const playlistImg = document.getElementById("playlist-img");
    const playlistTitle = document.getElementById("playlist-title");
    const creatorName = document.getElementById("creator-name");
    const likeCount = document.getElementById("like-count");
    const songList = document.getElementById("song-list");
    const playlist = data.playlists[Math.floor(Math.random() * (data.playlists.length - 1))];

    playlistImg.src = playlist.playlist_art;
    playlistTitle.textContent = playlist.playlist_name;
    creatorName.textContent = playlist.playlist_creator;
    likeCount.textContent = playlist.likeCount;
    songList.innerHTML="";
    // //Load using index
    for (let i = 0; i < playlist.songs.length; i++) {
        const song = playlist.songs[i];
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
}



document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");
    loadData();
});
