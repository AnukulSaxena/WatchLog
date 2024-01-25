import { useEffect, useState } from 'react';
import './App.css';
import { fetchDataFromApi } from './utils/api';
import { useDispatch } from 'react-redux';
import { setApiConfiguration, setFilterData } from './store/homeSlice.js';
import authService from './appwrite/auth.js';
import { login, logout } from './store/authSlice.js';
import movieService from './appwrite/movieConfig.js';
import { setMovieData as setMovieDataState } from './store/movieSlice.js';
import { Header, Footer } from '../src/components'
import { Outlet } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  let filters = {
    genre: {
      movieGenre: [],
      tvGenre: []
    }
  }

  function handleResponse(response) {
    if (response[0].status === 'fulfilled') {
      const url = {
        poster: response[0].value.images.secure_base_url + "w342",
        backdrop: response[0].value.images.secure_base_url + "original",
        profile: response[0].value.images.secure_base_url + "original"
      };
      dispatch(setApiConfiguration(url));
    }

    if (response[1].status === 'fulfilled') {
      dispatch(login(response[1].value))
    } else {
      dispatch(logout())
    }
  }

  async function getFilters() {
    const movieGenreData = await fetchDataFromApi('/genre/movie/list')
    filters.genre.movieGenre = movieGenreData.genres;
    const tvGenreData = await fetchDataFromApi('/genre/tv/list')
    filters.genre.tvGenre = tvGenreData.genres;
    const countryData = await fetchDataFromApi('/configuration/countries')
    filters['country'] = countryData.map(item => ({ id: item.iso_3166_1, name: item.english_name }))
    filters['sort'] = [
      { id: 'popularity.desc', name: 'Popularity Descending' },
      { id: 'popularity.asc', name: 'Popularity Ascending' },

      { id: 'revenue.desc', name: 'Revenue Descending' },
      { id: 'revenue.asc', name: 'Revenue Ascending' },

      { id: 'primary_release_date.desc', name: 'Release Date Descending' },
      { id: 'primary_release_date.asc', name: 'Release Date Ascending' },

      { id: 'vote_average.desc', name: 'Vote Average Descending' },
      { id: 'vote_average.asc', name: 'Vote Average Ascending' },

      { id: 'vote_count.desc', name: 'Vote Count Descending' },
      { id: 'vote_count.asc', name: 'Vote Count Ascending' },

    ]
    const languageData = await fetchDataFromApi('/configuration/languages')
    filters['language'] = languageData.map(item => ({ id: item.iso_639_1, name: item.english_name }))

    console.log(filters)
    dispatch(setFilterData(filters))
  }

  useEffect(() => {
    getFilters();
    Promise.allSettled([
      fetchDataFromApi("/configuration"),
      authService.getCurrentUser(),
    ])
      .then((response) => {
        handleResponse(response);
      }).finally(() => setLoading(false))
  }, []);

  return !loading && (
    <div >
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
