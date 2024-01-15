import { useEffect, useState } from 'react';
import './App.css';

import conf from './conf/conf.js';
import movieService from './appwrite/movieConfig.js';

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







    // const createDoc = async () => {
    //   await movieService.createMovieDoc({
    //     title: "ram jaane",
    //     poster_url: "42344cfksdjfksd.jpg",
    //     movie_id: 2112342,
    //     user_id: "65a44c1219c3sddsff49a0"
    //   })
    //     .then((response) => {
    //       console.log("create Doc : ", response);
    //     })
    // }

    // createDoc()


    fetchInitialData();
    console.log("Movie Data: " + movieData);
  }, []);

  return (
    <div>
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
