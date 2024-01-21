import React, { useEffect, useState } from 'react'
import { InfiniteScrollComponent } from '../components'
import { fetchDataFromApi } from '../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { setMovieData as setMovieDataState } from '../store/movieSlice'
import movieService from '../render/movieconfig'

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
            });
    };

    async function handleUseEffect() {
        const response = await fetchDataFromApi(`/discover/movie`, { page: pageNum });
        setMovieData(response);
        setPageNum((prev) => (prev + 1));
        if (status) {
            const responseData = await movieService.getMovieDocs(userData?.$id);
            console.log("Home :: handleUseEffect :: responseData ", responseData);
            dispatch(setMovieDataState(responseData));
        }
        setLoading(false);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        handleUseEffect();

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