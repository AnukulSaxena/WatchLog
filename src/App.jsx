import { useEffect, useState } from 'react';
import { fetchDataFromApi } from './utils/api';
import { useDispatch } from 'react-redux';
import { setApiConfiguration, setFilterData } from './store/homeSlice.js';
import authService from './express/authConfig.js';
import { login, logout } from './store/authSlice.js';
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
  async function checkCurrentUser() {
    const response = await authService.getCurrentUser();
    if (response) {
      dispatch(login(response.data.data))
    } else {
      dispatch(logout())
    }
  }


  useEffect(() => {
    getFilters();
    checkCurrentUser();
    fetchDataFromApi("/configuration")
      .then(response => {
        const url = {
          poster: response.images.secure_base_url + "w342",
          backdrop: response.images.secure_base_url + "w780",
          profile: response.images.secure_base_url + "original"
        };
        dispatch(setApiConfiguration(url))
      })
      .finally(() => {
        setLoading(false)
      })
  }, []);

  return (
    <div className='min-h-screen relative'>
      <Header />
      {
        !loading &&
        <main>
          <Outlet />
        </main>
      }
      <Footer />
    </div>
  );
}

export default App;
