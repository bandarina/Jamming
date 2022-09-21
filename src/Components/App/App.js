import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

export class App extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      SearchResults: [],
      playlistName: '', playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount(){
    Spotify.getAccessToken();
  }
  
  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    else{
      this.setState(prevState => ({playlistTracks: [...prevState.playlistTracks, track]}))
    }
  }

  removeTrack(track){
    const filteredProperties = this.state.playlistTracks.filter(element => element.id !== track.id);
    this.setState({playlistTracks: filteredProperties});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(element => element.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({playlistName: '', playlistTracks: []});
  }

 async search(searchTerm){
    const results = await Spotify.search(searchTerm);
    const newResults = results.tracks.items.map(element => {
      const object = {}
      object.id = element.id;
      object.name = element.name;
      object.artist = element.artists[0].name;
      object.album = element.album.name;
      object.uri = element.uri;

      return object;
    })
    this.setState({SearchResults: newResults});
  }
  
  render(){
  return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch = {this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults = {this.state.SearchResults} onAdd = {this.addTrack}/>
            <Playlist playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} onRemove = {this.removeTrack} onNameChange = {this.updatePlaylistName} onSave = {this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
