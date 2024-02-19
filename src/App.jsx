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


  async function checkCurrentUser() {
    const response = await authService.getCurrentUser();
    if (response) {
      dispatch(login(response.data.data))
    } else {
      dispatch(logout())
    }
  }


  useEffect(() => {
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
        !loading ?
          <>
            <main>
              <Outlet />
            </main>
            <Footer />

          </>
          :
          <div
            className='mt-60 flex justify-center mx-auto w-fit text-white px-10 py-2 rounded-sm items-center bg-neutral-800'
          >
            {` The Movie Database(TMDB) is Down :( `}
          </div>
      }

    </div>
  );
}

export default App;
