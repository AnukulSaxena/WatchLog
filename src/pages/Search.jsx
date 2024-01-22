import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../utils/api';
import { Spinner, MovieCard, InfiniteScrollComponent } from '../components';


function Search() {
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const { searchType, query } = useParams()

    const fetchNextPageData = async () => {


        console.log("page ", pageNum, " searchType ", searchType, " Loading ", loading, " data ", data);
        fetchDataFromApi(`/search/${searchType}?query=${query}&page=${pageNum}`)
            .then((res) => {
                setPageNum((prev) => prev + 1);
                setLoading(false)
                setData((prevData) => ({
                    ...prevData,
                    results: [...prevData?.results, ...res?.results],
                }));
            }).then(() => {
                console.log("page ", pageNum, " searchType ", searchType, " Loading ", loading, " data ", data);

            })


        // try {
        //     const res = await ;




        // } catch (error) {
        //     console.log("Search :: fetchNextPageData :: Error", error);
        // }
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
        console.log("skdfksfksdjfksdkfsjdkfdskj")

    }, [query, searchType])


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
                    searchType={searchType}
                />

            }
        </div>
    )
}

export default Search