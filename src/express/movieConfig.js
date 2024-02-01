import conf from "../conf/conf.js";
class MovieService {

    async createMovieDocxxx(id, mediaType) {
        try {

            const response = await fetch(`${conf.expressUrl}/playlists/addtowatched/${mediaType}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
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

    async removeId(id, mediaType) {
        try {

            const response = await fetch(`${conf.expressUrl}/playlists/removefromwatched/${mediaType}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJhNmYzOGNjZmI0NjJhMDIxNDc2NWUiLCJlbWFpbCI6ImNvcG9wb2NvQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiY29wb3BvY28iLCJmdWxsTmFtZSI6ImNvcG8gcG9jbyIsImlhdCI6MTcwNjcxNjk5OCwiZXhwIjoxNzA2ODAzMzk4fQ.vzVDeif2h8bjdZc4rUkJRIW93pEzyvyA_TGNddGnTys"
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

    async getWatched(mediaType, page = 1, limit = 20) {
        try {
            const response = await fetch(`${conf.expressUrl}/playlists/getwatched/${mediaType}?page=${page}&limit=${limit}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
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

    async getSingleWatched(name) {
        try {
            const response = await fetch(`${conf.expressUrl}/playlists/singlewatched/${name}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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