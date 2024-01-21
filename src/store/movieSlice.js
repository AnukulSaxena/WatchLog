import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movieData: null,
        mode: false,
    },
    reducers: {
        setMovieData: (state, action) => {
            state.movieData = action.payload;
        },
        setMode: (state, action) => {
            state.mode = action.payload;
        }
    }
})

export const { setMovieData, setMode } = movieSlice.actions;

export default movieSlice.reducer