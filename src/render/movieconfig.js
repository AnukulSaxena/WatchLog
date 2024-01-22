import { useSelector } from 'react-redux';
import conf from '../conf/conf.js'
import homeSlice from '../store/homeSlice.js';

class MovieService {



    async createMovieDoc({ title, user_id, poster_path, id, vote_average }, mediaType) {
        try {
            const response = await fetch(`${conf.renderUrl}/api/v1/${mediaType}/watched/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    user_id,
                    poster_path,
                    id,
                    vote_average
                }),
            });
            return await response.json();
        } catch (error) {
            console.log("movieService :: createMovieDoc :: Error", error);
            throw error
        }
    }

    async deleteMovieDoc({ id, user_id }, mediaType) {
        try {
            const response = await fetch(`${conf.renderUrl}/api/v1/${mediaType}/watched/delete/${id}/${user_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();

        } catch (error) {
            console.log("movieService :: deleteMovieDoc :: error", error);
            throw error
        }
    }

    async getMovieDoc(slug) {
        try {

        } catch (error) {
            console.log("movieService :: getMovieDoc :: error", error);
            return false
        }
    }

    async getMovieDocs(slug, mediaType) {
        try {
            const response = await fetch(
                `${conf.renderUrl}/api/v1/${mediaType}/watched/getall/${slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return await response.json();

        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            throw error
        }
    }

    async getPaginatedMovieDocs({ user_id, pageNum, limit }, mediaType) {
        try {
            const response = await fetch(
                `${conf.renderUrl}/api/v1/${mediaType}/watched/paginate/${user_id}/${pageNum}/${limit}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return await response.json();

        } catch (error) {
            console.log("RenderConfig :: PaginateDoc :: error", error)
            throw error
        }
    }
}

const movieService = new MovieService();

export default movieService;

