import { useEffect, useState } from 'react';
import { fetchDataFromApi } from './utils/api';
import { useDispatch } from 'react-redux';
import { setApiConfiguration, setFilterData } from './store/homeSlice.js';
import authService from './express/authConfig.js';
import { login, logout } from './store/authSlice.js';
import { Header, Footer } from '../src/components'
import { Outlet } from 'react-router-dom';
import useFilters from './hooks/useFilters.js';

function App() {
  const testFilterData = useFilters();
  console.log(testFilterData, "testFilterData")
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
        !loading &&
        <>
          <main>
            <Outlet />
          </main>
          <Footer />
        </>
      }

    </div>
  );
}

export default App;
