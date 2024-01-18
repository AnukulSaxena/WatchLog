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
                if (movieData) {
                    setMovieData((prevData) => ({
                        ...res, results: [...prevData.results, ...res.results],
                    }));
                } else {
                    setMovieData(res)
                }
                setPageNum((prev) => (prev + 1));
                setLoading(false);
            });
    };


    function setMovieDataInStore(watchedMovieData) {
        const moviesObject = watchedMovieData.documents.reduce((acc, movie) => {
            acc[movie.id] = {
                id: movie.id,
                slug: movie.$id
            };
            return acc;
        }, {});
        dispatch(setMovieDataState({ total: watchedMovieData.total, moviesObject }));
    }

    useEffect(() => {
        if (status) {
            Promise.all([
                fetchDataFromApi(`/discover/movie`, { page: pageNum }),
                movieService.getMovieDocs(userData.$id, 10000, 0)
            ])
                .then((response) => {
                    console.log("Home :: Promise.all :: Response", response);

                    setMovieDataInStore(response[1])
                    setMovieData(response[0]);
                    setPageNum((prev) => (prev + 1));

                })
                .catch((error) => {
                    console.error("Home :: Promise.all :: Error", error)
                }).finally(() => {
                    console.log("Home :: Promise All :: finally")
                    setLoading(false);
                })
        } else {
            fetchNextPageData()
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