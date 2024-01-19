import conf from '../conf/conf.js'

class MovieService {


    async createMovieDoc({ title, user_id, poster_path, id }) {
        try {
            const response = await fetch(`${conf.renderUrl}/api/v1/movie/watched/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    user_id,
                    poster_path,
                    id,
                }),
            });
            return await response.json();
        } catch (error) {
            console.log("movieService :: createMovieDoc :: Error", error);
            return false
        }
    }

    async deleteMovieDoc({ id, user_id }) {
        try {
            const response = await fetch(`${conf.renderUrl}/api/v1/movie/watched/delete/${id}/${user_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return await response.json();

        } catch (error) {
            console.log("movieService :: deleteMovieDoc :: error", error);
            return false
        }
    }


    async getMovieDoc(slug) {
        try {

        } catch (error) {
            console.log("movieService :: getMovieDoc :: error", error);
            return false
        }
    }

    async getMovieDocs(slug) {
        try {
            const response = await fetch(
                `${conf.renderUrl}/api/v1/movie/watched/getall/${slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return await response.json();

        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return null
        }
    }

    async getPaginatedMovieDocs({ user_id, pageNum, limit }) {
        try {
            const response = await fetch(
                `${conf.renderUrl}/api/v1/movie/watched/paginate/${user_id}/${pageNum}/${limit}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return await response.json();

        } catch (error) {
            console.log("RenderConfig :: PaginateDoc :: error", error)
            return null
        }
    }
}

const movieService = new MovieService();

export default movieService;

