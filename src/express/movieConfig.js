import axios from 'axios';
import conf from "../conf/conf.js";

class MovieService {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: conf.expressUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async createMovieDocxxx(id, mediaType) {
        try {
            const response = await this.axiosInstance.patch(`/playlists/addtowatched/${mediaType}`, {
                id,
            }, {

                withCredentials: true,
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
            }, {
                withCredentials: true,
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
                },
                withCredentials: true,
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

                withCredentials: true,
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



// [
//     {
//         '$match': {
//             'owner': new ObjectId('65ba6f38ccfb462a0214765e')
//         }
//     }, {
//         '$unwind': {
//             'path': '$movieId'
//         }
//     }, {
//         '$group': {
//             '_id': '$movieId'
//         }
//     }, {
//         '$lookup': {
//             'from': 'movies',
//             'localField': '_id',
//             'foreignField': 'id',
//             'as': 'watchedMovies'
//         }
//     }, {
//         '$project': {
//             'watchedMovies.title': 1,
//             'watchedMovies.id': 1,
//             'watchedMovies.poster_path': 1
//         }
//     }
// ]