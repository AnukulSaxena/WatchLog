import React, { useEffect, useState } from 'react'
import movieService from '../render/movieconfig';
import { useSelector } from 'react-redux'
import { InfiniteScrollComponent } from '../components'
import movieServicex from '../express/movieConfig';
function Watched() {
    const { status, userData } = useSelector(state => state.auth);
    const { mediaType } = useSelector(state => state.home)
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        results: [],
        total_results: 0
    });
    const [pageNum, setPageNum] = useState(1);

    // async function getNextPageData(page = pageNum) {
    //     try {
    //         const response = await movieService.getPaginatedMovieDocs({
    //             user_id: userData?.$id,
    //             pageNum: page,
    //             limit: 25
    //         }, mediaType)
    //         console.log("Watched :: getNextPageData :: response", response)
    //         setPageNum(prev => prev + 1);
    //         setData((prevData) => ({
    //             ...response, data: [...prevData?.data, ...response?.data],
    //         }));
    //         setLoading(false);
    //     } catch (error) {
    //         console.error("Watched :: getNextPageData :: Error", error)
    //     }
    // }

    async function getNextPageData() {
        try {
            const response = await movieServicex.getWatched(mediaType, pageNum);
            setData((prevData) => ({
                ...response, results: [...prevData?.results, ...response?.results],
            }));
            setPageNum(prev => prev + 1)

        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        setLoading(true)
        window.scrollTo(0, 0);
        movieServicex.getWatched(mediaType)
            .then((res) => {
                setData(res)
                setLoading(false)
                setPageNum(2)
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
