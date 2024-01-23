import { useEffect, useState } from 'react';
import './App.css';
import { fetchDataFromApi } from './utils/api';
import { useDispatch } from 'react-redux';
import { setApiConfiguration, setMovieGenre, setTvGenre } from './store/homeSlice.js';
import authService from './appwrite/auth.js';
import { login, logout } from './store/authSlice.js';
import movieService from './appwrite/movieConfig.js';
import { setMovieData as setMovieDataState } from './store/movieSlice.js';
import { Header, Footer } from '../src/components'
import { Outlet } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  function handleResponse(response) {
    if (response[0].status === 'fulfilled') {
      console.log(response)
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
    if (response[2].status === 'fulfilled') {
      dispatch(setMovieGenre(response[2].value.genres))
    }
    if (response[3].status === 'fulfilled') {
      dispatch(setTvGenre(response[3].value.genres))
    }
  }

  useEffect(() => {
    Promise.allSettled([
      fetchDataFromApi("/configuration"),
      authService.getCurrentUser(),
      fetchDataFromApi('/genre/movie/list'),
      fetchDataFromApi('/genre/tv/list')
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
