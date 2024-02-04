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
            console.log('PlaylistConfig :: getSinglePlaylist :: response ', response.data.data);
            return response.data.data;
        } catch (error) {
            console.log('movieService :: getWatched :: Error', error);
            return [];
        }
    }

    async deletePlaylist(playlistId) {
        try {
            const response = await this.axiosInstance.delete(`/playlists/${playlistId}`);
            console.log('PlaylistConfig :: deletePlaylist :: response ', response);
            return true
        } catch (error) {
            console.log('movieService :: getWatched :: Error', error);
            return false
        }
    }

}

const playlistService = new PlaylistService();
export default playlistService;