import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        url: {},
        mediaType: "movie",
        movieGenre: [],
        tvGenre: []
    },
    reducers: {
        setApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        setMediaType: (state, action) => {
            state.mediaType = action.payload;
        },
        setMovieGenre: (state, action) => {
            state.movieGenre = action.payload;
        },
        setTvGenre: (state, action) => {
            state.tvGenre = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setApiConfiguration, setMediaType, setMovieGenre, setTvGenre } = homeSlice.actions;

export default homeSlice.reducer;