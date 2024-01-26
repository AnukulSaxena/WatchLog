import React, { useEffect, useState } from 'react'
import { Filters, InfiniteScrollComponent } from '../components'
import { fetchDataFromApi } from '../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { setMovieData as setMovieDataState } from '../store/movieSlice'
import movieService from '../render/movieconfig'

function Home() {
    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(true)
    const { userData, status } = useSelector(state => state.auth)
    const { mediaType, paramFilters } = useSelector(state => state.home)
    const dispatch = useDispatch()

    const fetchNextPageData = () => {
        fetchDataFromApi(`/discover/${mediaType}?page=${pageNum}`, paramFilters)
            .then((res) => {
                if (data) {
                    setData((prevData) => ({
                        ...res, results: [...prevData.results, ...res.results],
                    }));
                } else {
                    setData(res)
                }
                setPageNum((prev) => (prev + 1));
            });
    };

    async function handleUseEffect() {
        try {
            const response = await fetchDataFromApi(`/discover/${mediaType}?page=${1}`, paramFilters);
            setData(response);
            setPageNum(2);
            setLoading(false);
            if (status) {
                const responseData = await movieService.getMovieDocs(userData?.$id, mediaType);
                console.log("Home :: handleUseEffect :: responseData ", responseData);
                dispatch(setMovieDataState(responseData));
            }

        } catch (error) {
            console.error("Home :: HandleUseffect :: error", error)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        handleUseEffect();
        return () => {
            console.log("MovieCard :: UseEffect :: return")
            setLoading(true)
        }

    }, [status, mediaType, paramFilters])
    return (
        <div className='dark:bg-neutral-700 min-h-screen pt-20'>
            <Filters />
            {
                !loading &&
                <InfiniteScrollComponent
                    data={data?.results}
                    fetchNextPageData={fetchNextPageData}
                    pageNum={pageNum}
                    total_pages={data?.total_pages}
                    initStatus={false}
                    crossCheck={true}
                    searchType={mediaType}
                />

            }
        </div>
    )
}

export default Home