import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        url: {},
    },
    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { getApiConfiguration } = homeSlice.actions;

export default homeSlice.reducer;