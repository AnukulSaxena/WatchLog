import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../utils/api';
import { InfiniteScrollComponent } from '../components';
import { setMovieData } from '../store/movieSlice';
import { useSelector, useDispatch } from 'react-redux';
import playlistService from '../express/playlistConfig';
function Search() {
    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const { searchType, query } = useParams()


    const fetchNextPageData = async () => {
        fetchDataFromApi(`/search/${searchType}?query=${query}&page=${pageNum}`)
            .then((res) => {
                setPageNum((prev) => prev + 1);
                setLoading(false)
                setData((prevData) => ({
                    ...prevData,
                    results: [...prevData?.results, ...res?.results],
                }));
            })
            .catch(error => {
                console.error("Search :: fetchNextPageData :: error", error)
            })
    };


    async function initialFetch() {
        try {
            const response = await fetchDataFromApi(`/search/${searchType}?query=${query}&page=1`)
            console.log("Search Page :: initialFetch :: Response", response);
            setData(response);
            setPageNum(prev => prev + 1)
            setLoading(false)
        } catch (error) {
            console.error("Search :: initFetch :: Errro", error);

        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setPageNum(1)
        setLoading(true)
        initialFetch();
        if (status) {
            playlistService.getUserPlaylists()
                .then((res) => {
                    dispatch(setMovieData(res))
                })
        }


    }, [query, searchType])


    return (
        <div className='bg-neutral-700 min-h-screen pt-14'>
            {
                !loading &&
                <InfiniteScrollComponent
                    data={data?.results}
                    fetchNextPageData={fetchNextPageData}
                    pageNum={pageNum}
                    total_pages={data?.total_pages}
                    initStatus={false}
                    crossCheck={true}
                    searchType={searchType}
                />

            }
        </div>
    )
}

export default Search