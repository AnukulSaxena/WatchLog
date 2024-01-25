import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: "home",
    initialState: {
        url: {},
        mediaType: "movie",
        filterData: {},
        paramFilters: {
            with_genres: '',
            with_origin_country: '',
            with_original_language: '',
            sort_by: 'popularity.desc'
        }
    },
    reducers: {
        setApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        setMediaType: (state, action) => {
            state.mediaType = action.payload;
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload;
        },
        setParamFilters: (state, action) => {
            state.paramFilters = action.payload;
        }

    },
});

// Action creators are generated for each case reducer function
export const { setApiConfiguration, setMediaType, setFilterData, setParamFilters } = homeSlice.actions;

export default homeSlice.reducer;