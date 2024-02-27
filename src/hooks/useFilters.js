import React, { useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";
import { useDispatch } from "react-redux";
import { setFilterData } from "../store/homeSlice";
function useFilters() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchFilters() {
      try {
        const movieGenreData = await fetchDataFromApi("/genre/movie/list");
        const tvGenreData = await fetchDataFromApi("/genre/tv/list");
        const countryData = await fetchDataFromApi("/configuration/countries");
        const languageData = await fetchDataFromApi("/configuration/languages");

        const filters = {
          genre: {
            movieGenre: movieGenreData.genres,
            tvGenre: tvGenreData.genres,
          },
          country: countryData.map((item) => ({
            id: item.iso_3166_1,
            name: item.english_name,
          })),
          sort: [
            { id: "popularity.desc", name: "Popularity Descending" },
            { id: "popularity.asc", name: "Popularity Ascending" },
            { id: "revenue.desc", name: "Revenue Descending" },
            { id: "revenue.asc", name: "Revenue Ascending" },
            {
              id: "primary_release_date.desc",
              name: "Release Date Descending",
            },
            { id: "primary_release_date.asc", name: "Release Date Ascending" },
            { id: "vote_average.desc", name: "Vote Average Descending" },
            { id: "vote_average.asc", name: "Vote Average Ascending" },
            { id: "vote_count.desc", name: "Vote Count Descending" },
            { id: "vote_count.asc", name: "Vote Count Ascending" },
          ],
          language: languageData.map((item) => ({
            id: item.iso_639_1,
            name: item.english_name,
          })),
        };

        dispatch(setFilterData(filters));
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    }

    fetchFilters();
  }, []);

  return true;
}

export default useFilters;
