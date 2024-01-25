import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { MovieCard, Spinner } from '..'
import Avatar from './Avatar'

function InfiniteScrollComponent({
    data,
    fetchNextPageData,
    pageNum,
    total_pages,
    initStatus,
    crossCheck,
    searchType
}) {

    return (
        <div>
            <InfiniteScroll
                className='py-4 flex flex-wrap justify-center gap-3'
                dataLength={data?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= total_pages}
                loader={<Spinner />}
                endMessage={
                    <p className='text-center w-full dark:text-white'>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {data?.map((item, index) => {
                    return (searchType === 'person') ? <Avatar key={item.id} item={item} /> :
                        <MovieCard
                            key={item.id}
                            data={item}
                            initStatus={initStatus}
                            crossCheck={crossCheck}
                            mediaType={searchType}
                        />
                })}
            </InfiniteScroll>
        </div>
    )
}

export default InfiniteScrollComponent