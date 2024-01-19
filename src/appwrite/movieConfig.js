import conf from '../conf/conf.js'
import { Client, ID, Databases, Query, Permission, Role } from 'appwrite'


class MovieService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client);

    }

    async createMovieDoc({ title, user_id, poster_path, id }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteMoviesCollectionId,
                ID.unique(), {
                title,
                user_id,
                poster_path,
                id,
            }
            );
        } catch (error) {
            console.log("movieService :: createMovieDoc :: Error", error);
        }
    }


    async deleteMovieDoc(slug) {
        try {
            this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteMoviesCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("movieService :: deleteMovieDoc :: error", error);
            return false
        }
    }


    async getMovieDoc(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteMoviesCollectionId,
                slug
            )
        } catch (error) {
            console.log("movieService :: getMovieDoc :: error", error);
            return false
        }
    }

    async getMovieDocs(user_id, docLimit, docOffset) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteMoviesCollectionId,
                [Query.equal("user_id", user_id),
                Query.limit(docLimit),
                Query.offset(docOffset)],
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }
}

const movieService = new MovieService();

export default movieService;
