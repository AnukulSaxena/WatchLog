import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        url: {},
        mediaType: "movie"
    },
    reducers: {
        setApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        setMediaType: (state, action) => {
            state.mediaType = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setApiConfiguration, setMediaType } = homeSlice.actions;

export default homeSlice.reducer;