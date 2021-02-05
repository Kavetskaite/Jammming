import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      PlaylistName: 'PlaylistName',
      PlaylistTracks: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.PlaylistTracks;
    if(tracks.find(savedTrack => savedTrack.id === track.id)) {
      return track;
    }

    tracks.push(track);
    this.setState({PlaylistTracks: tracks});
  }

  removeTrack(track) {
    let tracks = this.state.PlaylistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({PlaylistTracks: tracks});
  }

  updatePlaylistName(name) {
    this.setState({PlaylistName: name});
  }

  savePlaylist() {
    const trackUris = this.state.PlaylistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.PlaylistName, trackUris).then(() => {
      this.setState(
        {
        PlaylistName: 'New Playlist',
        PlaylistTracks: []
        })
      }
    );
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search}/>
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} 
                              onAdd={this.addTrack}/>
              <Playlist playlistName={this.state.PlaylistName} 
                        playlistTracks={this.state.PlaylistTracks}
                        onRemove={this.removeTrack}
                        onNameChange={this.updatePlaylistName}
                        onSave={this.savePlaylist}/>
            </div>
          </div>
        </div>
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
