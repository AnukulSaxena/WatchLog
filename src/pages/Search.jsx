import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../utils/api';
import { InfiniteScrollComponent } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import movieService from '../render/movieconfig';
import { setMovieData as setMovieDataState } from '../store/movieSlice';


function Search() {
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const dispatch = useDispatch()
    const { searchType, query } = useParams()
    const { status, userData } = useSelector(state => state.auth)


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
            if (status && searchType !== 'person') {
                const responseData = await movieService.getMovieDocs(userData?.$id, searchType);
                console.log("Home :: handleUseEffect :: responseData ", responseData);
                dispatch(setMovieDataState(responseData));
            }
        } catch (error) {
            console.error("Search :: initFetch :: Errro", error);

        }
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        setPageNum(1)
        setLoading(true)
        initialFetch();

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