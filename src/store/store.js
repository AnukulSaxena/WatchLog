import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./homeSlice.js";
import authSlice from "./authSlice.js";
import movieSlice from "./movieSlice.js";

export const store = configureStore({
    reducer: {
        home: homeSlice,
        auth: authSlice,
        movie: movieSlice,
    },
});