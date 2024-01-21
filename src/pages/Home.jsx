import React, { useEffect, useState } from 'react'
import { InfiniteScrollComponent } from '../components'
import { fetchDataFromApi } from '../utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { setMovieData as setMovieDataState } from '../store/movieSlice'
import movieService from '../render/movieconfig'

function Home() {
    const [data, setData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(true)
    const { userData, status } = useSelector(state => state.auth)
    const { mediaType } = useSelector(state => state.home)
    const dispatch = useDispatch()

    const fetchNextPageData = () => {
        fetchDataFromApi(`/discover/${mediaType}`, { page: pageNum })
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
        const response = await fetchDataFromApi(`/discover/${mediaType}`, { page: 1 });
        setData(response);
        setPageNum(2);
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
        return () => {
            console.log("MovieCard :: UseEffect :: return")
            setLoading(true)
        }

    }, [status, mediaType])
    return (
        <div className='dark:bg-neutral-700 min-h-screen pt-14'>
            {
                !loading &&
                <InfiniteScrollComponent
                    data={data?.results}
                    fetchNextPageData={fetchNextPageData}
                    pageNum={pageNum}
                    total_pages={data?.total_pages}
                    initStatus={false}
                    crossCheck={true}
                />

            }
        </div>
    )
}

export default Home