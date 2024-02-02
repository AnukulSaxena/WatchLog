import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { InfiniteScrollComponent } from '../components'
import movieServicex from '../express/movieConfig';
function Watched() {
    const { mediaType } = useSelector(state => state.home)
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        results: [],
        total_results: 0
    });
    const [pageNum, setPageNum] = useState(1);


    async function getNextPageData() {
        const response = await movieServicex.getWatched(mediaType, pageNum);
        if (response) {
            setData((prevData) => ({
                ...response, results: [...prevData?.results, ...response?.results],
            }));
            setPageNum(prev => prev + 1)
        }
    }

    useEffect(() => {
        setLoading(true)
        window.scrollTo(0, 0);
        movieServicex.getWatched(mediaType)
            .then((res) => {
                if (res) {
                    setData(res)
                    setLoading(false)
                    setPageNum(2)
                }
            })


        return () => {

            setPageNum(1)
            setLoading(true)
            setData({
                results: [],
                total_results: 0
            })
        }

    }, [mediaType]);


    return (
        <div className='bg-neutral-700 min-h-screen pt-14'>
            {
                !loading &&
                <InfiniteScrollComponent
                    data={data?.results}
                    fetchNextPageData={getNextPageData}
                    pageNum={pageNum}
                    total_pages={Math.ceil(data?.total_results / 20)}
                    initStatus={true}
                    crossCheck={false}
                    searchType={mediaType}

                />
            }
        </div>
    );
}

export default Watched;
