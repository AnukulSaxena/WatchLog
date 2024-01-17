import React, { useEffect, useState } from 'react'
import { InfiniteScrollComponent } from '../components'
import { fetchDataFromApi } from '../utils/api'

function Home() {
    const [movieData, setMovieData] = useState(null)
    const [pageNum, setPageNum] = useState(1)
    const [loading, setLoading] = useState(true)

    const fetchNextPageData = () => {
        fetchDataFromApi(`/discover/movie`, { page: pageNum })
            .then((res) => {
                setMovieData((prevData) => ({
                    ...res,
                    results: [...prevData.results, ...res.results],
                }));
                setPageNum((prev) => (prev + 1));
                setLoading(false)
            });
    };

    const fetchInitialData = async () => {
        fetchDataFromApi('/discover/movie', '').then((res) => {
            setMovieData(res);
            setPageNum((prev) => prev + 1);
            setLoading(false)
        });
    };

    useEffect(() => {
        fetchInitialData();
    }, [])
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