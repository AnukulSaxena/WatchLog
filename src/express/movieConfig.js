import axios from 'axios';
import conf from "../conf/conf.js";

class MovieService {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: conf.expressUrl,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
    }

    async addId(id, mediaType, playlistId) {
        try {
            const response = await this.axiosInstance.patch(`/playlists/addtowatched/${mediaType}`, {
                id, playlistId
            });
            console.log('Added Successfully', response.data.data);
            return true;
        } catch (error) {
            console.log('movieService :: addToWatched :: Error', error);
            return false;
        }
    }

    async removeId(id, mediaType, playlistId) {
        try {
            const response = await this.axiosInstance.patch(`/playlists/removefromwatched/${mediaType}`, {
                id, playlistId
            });
            console.log('Removed successfully', response.data.data);
            return true;
        } catch (error) {
            console.log('movieService :: removeFromWatched :: Error', error);
            return false;
        }
    }

    async getSingleWatched() {
        try {
            const response = await this.axiosInstance.get(`/playlists/singlewatched`);
            console.log('fetched successfully', response.data.data);
            return response.data.data;
        } catch (error) {
            console.log('movieService :: getWatched :: Error', error);
            return null
        }
    }
}

const movieServicex = new MovieService();
export default movieServicex;



