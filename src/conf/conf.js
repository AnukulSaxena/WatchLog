const conf = {
    tmdbToken: String(import.meta.env.VITE_APP_TMDB_TOKEN),
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteMoviesCollectionId: String(import.meta.env.VITE_APPWRITE_MOVIES_COLLECTION_ID),

}

export default conf