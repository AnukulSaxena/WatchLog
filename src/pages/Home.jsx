import React, { useEffect, useState } from 'react'
import { InfiniteScrollComponent } from '../components'
import { fetchDataFromApi } from '../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { setMovieData as setMovieDataState } from '../store/movieSlice'
import movieService from '../appwrite/movieConfig'

function Home() {
    const [movieData, setMovieData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(true)
    const { userData, status } = useSelector(state => state.auth)
    const dispatch = useDispatch()

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

    const fetchInitialData = async () => {
        fetchDataFromApi('/discover/movie', '').then((res) => {
            console.log("Home :: fetchInitialData :: response ", res);
            setMovieData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false)
        });
    };


    const getMovieStateData = () => {
        movieService.getMovieDocs(userData.$id, 10000, 0)
            .then(response => {
                console.log("Home :: getMovieState :: response", response)
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
            .finally(() => fetchInitialData())
    }


    useEffect(() => {
        if (status) {
            getMovieStateData()
        } else {
            fetchInitialData()
        }

    }, [status])
    return (
        <div className='dark:bg-neutral-700 min-h-screen pt-14'>
            {
                !loading &&
                <InfiniteScrollComponent
                    movieData={movieData?.results}
                    fetchNextPageData={fetchNextPageData}
                    pageNum={pageNum}
                    total_pages={movieData?.total_pages}
                    initStatus={false}
                    crossCheck={true}
                />
            }
        </div>
    )
}

export default Home