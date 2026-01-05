import axios from 'axios';
import AuthService from './AuthService';

//When moving to to Azure and connecting the sites to each other we have to change the url
const USER_API_URL = 'http://localhost:3000/';

class UserService {
   async getPublicContent() {
    return await axios.get(USER_API_URL + 'content/public',{ headers: AuthService.authHeader() });
  }

  async getAllPlaylistsForUser() {
    return await axios.get(USER_API_URL + 'api/playlists', { headers: AuthService.authHeader() });
  }

  async addPlaylistForUser(playlist) {
    return await axios.post(USER_API_URL + 'api/playlists', playlist, { headers: AuthService.authHeader() }); 
  }

  async changePlaylistForUser(playlistId, playlist) {
    return await axios.put(USER_API_URL + `api/playlists/${playlistId}`, playlist, { headers: AuthService.authHeader() });
  }

  async deletePlaylistForUser(playlistId) { 
    return await axios.delete(USER_API_URL + `api/playlists/${playlistId}`, { headers: AuthService.authHeader() });
  }

  async getAllSongsForPlaylist(playlistId) {
    return await axios.get(USER_API_URL + `api/playlists/${playlistId}/songs`, { headers: AuthService.authHeader() });
  }

  async changeSongForPlaylist(playlistId, songId, song) {
    return await axios.put(USER_API_URL + `api/playlists/${playlistId}/songs/${songId}`, song, { headers: AuthService.authHeader() });
  }

  async addSongForPlaylist(playlistId, song) {
    return await axios.post(USER_API_URL + `api/playlists/${playlistId}/songs`, song, { headers: AuthService.authHeader() });
  }

  async deleteSongForPlaylist(playlistId, songId) {
    return await axios.delete(USER_API_URL + `api/playlists/${playlistId}/songs/${songId}`, { headers: AuthService.authHeader() });
  }
}

export default new UserService();