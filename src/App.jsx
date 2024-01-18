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

  const fetchApiConfig = async () => {
    return
  };

  // .then((res) => {
  //   console.log("confid data", res);
  //   checkStatus()

  //   const url = {
  //     poster: res.images.secure_base_url + "w342",
  //   };
  //   dispatch(getApiConfiguration(url));
  // });


  const checkStatus = async () => {
    return
  }

  // .then((userData) => {
  //   console.log("App :: Getting User :: userData ", userData)
  //   if (userData) {
  //     
  //   }
  // })
  // .catch(error => {
  //   console.log("useEffect :: checkStatus :: error ", error)
  // })



  function handleResponse(response) {
    if (response[0].status === 'fulfilled') {
      console.log(response)
      const url = {
        poster: response[0].value.images.secure_base_url + "w342",
      };
      dispatch(getApiConfiguration(url));
    }
    if (response[1].status === 'fulfilled') {
      dispatch(login(response[1].value))
    } else {
      dispatch(logout())
    }
  }

  useEffect(() => {
    Promise.allSettled([
      fetchDataFromApi("/configuration"),
      authService.getCurrentUser(),
    ])
      .then((response) => {
        handleResponse(response);
      }).finally(() => setLoading(false))


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
