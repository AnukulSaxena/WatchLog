import axios from 'axios';
import conf from "../conf/conf.js";

class PlaylistService {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: conf.expressUrl,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        this.setAuthTokenFromLocalStorage();
    }

    setAuthTokenFromLocalStorage() {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            this.setAuthToken(token);
        }
    }

    setAuthToken(token) {
        if (token) {
            this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token['accessToken']}`;
        } else {
            delete this.axiosInstance.defaults.headers.common['Authorization'];
        }
    }

    async createPlaylist(data) {
        try {
            const response = await this.axiosInstance.post(`/playlists/`, data);
            console.log('Playlist Created Successfully', response.data.data);
            return true;
        } catch (error) {
            console.log('movieService :: addToWatched :: Error', error);
            return false;
        }
    }

    async getUserPlaylists() {
        try {
            return (await this.axiosInstance.get('/playlists/')).data.data
        } catch (error) {
            console.error("playlistConfig :: getUserPlaylists :: Error", error)
            return []
        }
    }

    async getSinglePlaylistData(playlistId, mediaType, page = 1, limit = 20) {
        try {
            const response = await this.axiosInstance.get(`/playlists/${playlistId}/${mediaType}`, {
                params: {
                    page,
                    limit,
                }
            });
            return response.data.data;
        } catch (error) {
            console.log('movieService :: getWatched :: Error', error);
            return [];
        }
    }

    async deletePlaylist(playlistId) {
        try {
            const response = await this.axiosInstance.delete(`/playlists/${playlistId}`);
            return true
        } catch (error) {
            console.log('movieService :: getWatched :: Error', error);
            return false
        }
    }

    async updatePlaylist(data, playlistId) {
        try {
            const response = await this.axiosInstance.patch(`/playlists/${playlistId}`, data);
            return true;
        } catch (error) {
            console.log('movieService :: updatePlaylist :: Error', error);
            return false;
        }
    }

    async getPlaylistBD(playlistId, mediaType) {
        try {
            const response = await this.axiosInstance.get(`/playlists/backdrop/${playlistId}/${mediaType}`)

            return response.data.data
        } catch (error) {
            console.log("playlistService :: getPlaylistBD :: Error", error)
            return []
        }
    }

    async setPlaylistBD(playlistId, backdrop_path) {
        try {
            console.log(playlistId, backdrop_path)
            const response = await this.axiosInstance.patch(`/playlists/backdrop/${playlistId}/movie`, { backdrop_path });
            console.log(response)
            return true;
        } catch (error) {
            console.log('movieService :: setPlaylistBD :: Error', error);
            return false;
        }
    }
}

const playlistService = new PlaylistService();
export default playlistService;