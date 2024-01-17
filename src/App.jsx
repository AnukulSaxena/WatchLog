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

      checkStatus()

      const url = {
        poster: res.images.secure_base_url + "w342",
      };
      dispatch(getApiConfiguration(url));
    });
  };


  const checkStatus = () => {
    authService.getCurrentUser()
      .then((userData) => {
        console.log("App :: Getting User :: userData ", userData)
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .catch(error => {
        console.log("useEffect :: checkStatus :: error ", error)
      }).finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchApiConfig();

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
