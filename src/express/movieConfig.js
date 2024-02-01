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

    async createMovieDocxxx(id, mediaType) {
        try {
            const response = await this.axiosInstance.patch(`/playlists/addtowatched/${mediaType}`, {
                id,
            });
            console.log('Added Successfully', response.data.data);
            return true;
        } catch (error) {
            console.log('movieService :: addToWatched :: Error', error);
            return false;
        }
    }

    async removeId(id, mediaType) {
        try {
            const response = await this.axiosInstance.patch(`/playlists/removefromwatched/${mediaType}`, {
                id,
            });
            console.log('Removed successfully', response.data.data);
            return true;
        } catch (error) {
            console.log('movieService :: removeFromWatched :: Error', error);
            return false;
        }
    }

    async getWatched(mediaType, page = 1, limit = 20) {
        try {
            const response = await this.axiosInstance.get(`/playlists/getwatched/${mediaType}`, {
                params: {
                    page,
                    limit,
                }

            });
            console.log('fetched successfully', response.data.data);
            return response.data.data;
        } catch (error) {
            console.log('movieService :: getWatched :: Error', error);
            return [];
        }
    }

    async getSingleWatched(name) {
        try {
            const response = await this.axiosInstance.get(`/playlists/singlewatched/${name}`, {


            });
            console.log('fetched successfully', response.data.data);
            return response.data.data;
        } catch (error) {
            console.log('movieService :: getWatched :: Error', error);
            return [];
        }
    }
}

const movieServicex = new MovieService();
export default movieServicex;



