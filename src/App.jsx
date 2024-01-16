import { useEffect, useState } from 'react';
import './App.css';

import InfiniteScroll from 'react-infinite-scroll-component';
import { MovieCard, Spinner } from './components/index.js';

import { fetchDataFromApi } from './utils/api';
import { useDispatch } from 'react-redux';

import { getApiConfiguration } from './store/homeSlice.js';
import authService from './appwrite/auth.js';
import { login, logout } from './store/authSlice.js';
import movieService from './appwrite/movieConfig.js';
import { setMovieData as setMovieDataState } from './store/movieSlice.js';


function App() {
  const dispatch = useDispatch();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);



  const fetchInitialData = async () => {
    fetchDataFromApi('/discover/movie', '').then((res) => {
      setMovieData(res);
      setPageNum((prev) => prev + 1);
    });
  };


  const fetchNextPageData = () => {
    fetchDataFromApi(`/discover/movie`, { page: pageNum })
      .then((res) => {
        setMovieData((prevData) => ({
          ...res,
          results: [...prevData.results, ...res.results],
        }));
        setPageNum((prev) => (prev + 1));
      });
  };


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
    movieService.getMovieDocs(userData.$id)
      .then(response => {
        const moviesObject = response.documents.reduce((acc, movie) => {
          acc[movie.movie_id] = {
            title: movie.title,
            poster_url: movie.poster_url,
            movie_id: movie.movie_id,
            user_id: movie.user_id,
            slug: movie.$id
          };
          return acc;
        }, {});
        dispatch(setMovieDataState({ total: response.total, moviesObject }));
        console.log("setMovieState :: getMovieDOcs :: then ")
      }).then(() => {
        fetchInitialData();
      }).finally(() => setLoading(false))
  }


  const checkStatus = () => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
          setMovieState(userData);
        } else {
          dispatch(logout())
          fetchInitialData()
          setLoading(false)
        }
      })
      .catch(error => {
        console.log("useEffect :: checkStatus :: error ", error)

      })

  }


  useEffect(() => {
    console.log("useEffect");
    fetchApiConfig();
    checkStatus();
  }, []);

  return (
    <div className='dark:bg-neutral-700 min-h-96 pt-14'>
      {loading && <Spinner height='h-96' />}
      <InfiniteScroll
        className='py-10 flex flex-wrap justify-center gap-4'
        dataLength={movieData?.results?.length || []}
        next={fetchNextPageData}
        hasMore={pageNum <= movieData?.total_pages}
        loader={<Spinner />}
      >
        {movieData?.results?.map((item, index) => {

          return <MovieCard
            key={index}
            data={item}
          />
        })}

      </InfiniteScroll>

    </div>
  );
}

export default App;
