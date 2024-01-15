import { configureStore } from "@reduxjs/toolkit";

import homeSlice from "./homeSlice.js";
import authSlice from "./authSlice.js";

export const store = configureStore({
    reducer: {
        home: homeSlice,
        auth: authSlice,
    },
});