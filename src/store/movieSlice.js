import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movieData: [],
        mode: false,
        movieDataIndex: 0,
    },
    reducers: {
        setMovieData: (state, action) => {
            state.movieData = action.payload;
        },
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        setMovieDataIndex: (state, action) => {
            state.movieDataIndex = action.payload;
        }
    }
})

export const { setMovieData, setMode, setMovieDataIndex } = movieSlice.actions;

export default movieSlice.reducer