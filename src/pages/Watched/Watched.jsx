import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { InfiniteScrollComponent } from '../../components'
import { useParams } from 'react-router-dom';
import playlistService from '../../express/playlistConfig';
import EditForm from './EditForm/EditForm';
function Watched() {
    const { playlistId, name } = useParams();
    const { mediaType } = useSelector(state => state.home)
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
        results: [],
        total_results: 0
    });
    const [isOpen, setIsOpen] = useState(false);
    const [pageNum, setPageNum] = useState(1);

    function handleClose() {
        console.log("Clicked")
        setIsOpen(prev => !prev)
    }

    async function getNextPageData() {
        const response = await playlistService.getSinglePlaylistData(playlistId, mediaType, pageNum);
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
        playlistService.getSinglePlaylistData(playlistId, mediaType)
            .then((res) => {
                if (res) {
                    setData(res)

                    setPageNum(2)
                }
            })
            .finally(() => {
                setLoading(false)
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
        <div className='bg-neutral-700 min-h-screen pt-20'>
            {
                isOpen &&
                <EditForm
                    oldName={name}
                    handleClose={handleClose}
                />
            }
            <div
                className='w-full flex justify-end px-5'
            >
                <button
                    onClick={handleClose}
                    className="bg-gray-300 gap-1 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded inline-flex items-center">
                    <img src="/svg/edit.svg" alt="" />
                    <span>Edit</span>
                </button>

            </div>
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
