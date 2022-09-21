import React from "react";
const clientID = 'INSERT CLIENT ID HERE';

const scope = 'user-read-private playlist-modify-private playlist-modify-public'

const redirect_uri = 'http://localhost:3000/';

let url = 'https://accounts.spotify.com/authorize'
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(clientID);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

let accessToken;
let expiresIn;

export class Spotify extends React.Component {

    static getAccessToken(){
        if(accessToken){
            return accessToken;
        }else if(window.location.href.match(/access_token=([^&]*)/)){
            accessToken = window.location.href.match(/access_token=([^&]*)/)?.[1];
            expiresIn = window.location.href.match(/expires_in=([^&]*)/)?.[1];
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        }else{
            window.location.replace(url);
        }
    }

    static async search(term){
       return await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
          }).then(response => response.json()).then(response => response);
    }

    static async savePlaylist(name, tracksArray){
        const userID = await fetch('https://api.spotify.com/v1/me', {
            headers: {Authorization: `Bearer ${accessToken}`}
          }).then(response => response.json()).then(response => response.id);
    
        const playlistID = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
            method: 'POST',
            headers: {Authorization: `Bearer ${accessToken}`},
            body: JSON.stringify({name: name})
        }).then(response => response.json()).then(response => response.id);

        fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`,{
            method: 'POST',
            headers: {Authorization: `Bearer ${accessToken}`},
            body: JSON.stringify({uris: tracksArray.map((element)=> element)})
        }).then(response => response.json());
    }
}