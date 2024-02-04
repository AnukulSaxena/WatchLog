import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import playlistService from '../../express/playlistConfig';
import { Spinner, MovieCard } from '../../components';
import EditForm from './EditForm/EditForm';
import { fetchPlaylistData } from '../../utils/api';
function Watched() {

    const { playlistId, name } = useParams();
    const { mediaType } = useSelector(state => state.home)
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const { movieData } = useSelector(state => state.movie)
    const [dataLength, setDataLength] = useState(0)
    const [playlistIndex, setPlaylistIndex] = useState(-1)
    function handleClose() {
        console.log("Clicked")
        setIsOpen(prev => !prev)
    }

    async function fetchNextPageData() {
        console.log(pageNum, dataLength, pageNum <= Math.ceil(dataLength / 20), playlistIndex);
        const response = await fetchPlaylistData(mediaType, movieData[playlistIndex], pageNum)
        if (response.length) {
            setData((prevData) => ([...prevData, ...response]));
            setPageNum(prev => prev + 1)
        }
    }

    useEffect(() => {
        setLoading(true)
        window.scrollTo(0, 0);
        const sip = movieData.findIndex((element) => (element.name === name))
        setPlaylistIndex(sip)

        if (sip !== -1) {
            fetchPlaylistData(mediaType, movieData[sip])
                .then(res => {
                    console.log("Watched :: useEffect :: res", res)
                    setData(res)
                    setPageNum(2)
                    setDataLength(movieData[sip][`${mediaType}Id`].length)
                }).finally(() => {
                    setLoading(false)

                })
        }


        return () => {

            setPageNum(1)
            setLoading(true)
            setData([])
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
                <InfiniteScroll
                    className='py-4 flex flex-wrap justify-center gap-3'
                    dataLength={dataLength || []}
                    next={fetchNextPageData}
                    hasMore={data.length < dataLength}
                    loader={<Spinner />}
                    endMessage={
                        <p className='text-center w-full text-white'>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {data?.map((item, index) => {
                        return (!(item.status === 'fulfilled')) ? <></> :
                            <MovieCard
                                key={index}
                                data={item.value}
                                initStatus={true}
                                crossCheck={false}
                                mediaType={mediaType}
                            />
                    })}
                </InfiniteScroll>
            }
        </div>
    );
}

export default Watched;
