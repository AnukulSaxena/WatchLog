import { useEffect, useState } from 'react';
import './App.css';
import { fetchDataFromApi } from './utils/api';
import { useDispatch } from 'react-redux';
import { getApiConfiguration } from './store/homeSlice.js';
import authService from './appwrite/auth.js';
import { login, logout } from './store/authSlice.js';
import movieService from './appwrite/movieConfig.js';
import { setMovieData as setMovieDataState } from './store/movieSlice.js';
import { Header, Footer } from '../src/components'
import { Outlet } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log("confid data", res);
      const url = {
        poster: res.images.secure_base_url + "w342",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const setMovieState = (userData) => {
    movieService.getMovieDocs(userData.$id, 10000, 0)
      .then(response => {
        const moviesObject = response.documents.reduce((acc, movie) => {
          acc[movie.id] = {
            id: movie.id,
            slug: movie.$id
          };
          return acc;
        }, {});
        dispatch(setMovieDataState({ total: response.total, moviesObject }));
        console.log("setMovieState :: getMovieDOcs :: then ")
      })
      .finally(() => setLoading(false))
  }

  const checkStatus = () => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
          setMovieState(userData);
        } else {
          dispatch(logout())
          setLoading(false)
        }
      })
      .catch(error => {
        console.log("useEffect :: checkStatus :: error ", error)
      })
  }

  useEffect(() => {
    fetchApiConfig();
    checkStatus();
  }, []);

  return !loading && (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
