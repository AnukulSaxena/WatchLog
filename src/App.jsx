import { useEffect, useState } from 'react';
import './App.css';

import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from './components/MovieCard/MovieCard';
import { fetchDataFromApi } from './utils/api';
import { useDispatch } from 'react-redux';

import { getApiConfiguration } from './store/homeSlice';


function App() {
  const dispatch = useDispatch();
  const [movieData, setMovieData] = useState(null);
  // const [loading, setLoading] = useState(false);
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


  useEffect(() => {
    console.log("useEffect");
    fetchApiConfig();
    fetchInitialData();
    console.log("Movie Data: " + movieData);
  }, []);

  return (
    <div className='dark:bg-neutral-700'>
      <InfiniteScroll
        className='py-10 flex flex-wrap justify-center gap-4'
        dataLength={movieData?.results?.length || []}
        next={fetchNextPageData}
        hasMore={pageNum <= movieData?.total_pages}
        loader={<h4>Loading...</h4>}//{<Spinner />}
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
