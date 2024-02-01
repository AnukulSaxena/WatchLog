import conf from "../conf/conf.js";

class MovieService {

    async createMovieDocxxx(id, mediaType, accessToken) {
        try {

            const response = await fetch(`${conf.expressUrl}/playlists/addtowatched/${mediaType}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                body: JSON.stringify({ id }),
            });
            const xx = await response.json()
            console.log("Added Successfully", xx.data)
            return true
        } catch (error) {
            console.log("movieService :: addToWatched :: Error", error);
            return false
        }
    }

    async removeId(id, mediaType, accessToken) {
        try {

            const response = await fetch(`${conf.expressUrl}/playlists/removefromwatched/${mediaType}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
                body: JSON.stringify({ id }),
            });
            const xx = await response.json()
            console.log("Removed successfully", xx.data)
            return true
        } catch (error) {
            console.log("movieService :: removeFromWatched :: Error", error);
            return false
        }
    }

    async getWatched(accessToken, mediaType, page = 1, limit = 20) {
        try {
            const response = await fetch(`${conf.expressUrl}/playlists/getwatched/${mediaType}?page=${page}&limit=${limit}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            });
            const resData = await response.json()
            console.log("fetched successfully", resData.data)
            return resData.data
        } catch (error) {
            console.log("movieService :: getWatched :: Error", error);
            return []
        }
    }

    async getSingleWatched(name, accessToken) {
        try {
            const response = await fetch(`${conf.expressUrl}/playlists/singlewatched/${name}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            });
            const resData = await response.json()
            console.log("fetched successfully", resData.data)
            return resData.data
        } catch (error) {
            console.log("movieService :: getWatched :: Error", error);
            return []
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