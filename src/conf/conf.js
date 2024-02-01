const conf = {
    tmdbToken: String(import.meta.env.VITE_APP_TMDB_TOKEN),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteMoviesCollectionId: String(import.meta.env.VITE_APPWRITE_MOVIES_COLLECTION_ID),
    renderUrl: String(import.meta.env.VITE_APP_RENDER_URL),
    expressUrl: String(import.meta.env.VITE_APP_EXPRESS_URL)
}

export default conf