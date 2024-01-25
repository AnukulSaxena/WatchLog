import React from 'react'

import SubDetail from './SubDetail'

function MovieDetail({ data }) {

    return (
        <div className=" w-full lg:pl-5 overflow-auto no-scrollbar webkit-scrollbar-thumb lg:flex-grow">
            <div className='my-5 lg:mb-5 lg:mt-0'>

                <h1
                    className="flex items-center text-3xl lg:text-5xl font-extrabold dark:text-white">
                    {data?.title || data?.name}
                </h1>
            </div>
            <div>

                <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
                    <p>{data?.tagline}</p>
                </blockquote>

            </div>
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-400"></hr>

            <div className='w-full'>
                <h4 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 lg:text-3xl dark:text-white">Overview</h4>
                <p className='mb-3 max-h-32 no-scrollbar overflow-y-scroll w-full text-gray-500 text-lg dark:text-gray-400'>{data?.overview}</p>
            </div>

            <div className='my-5'>
                <h4 className="mb-6 text-xl font-bold leading-none tracking-tight text-gray-900 lg:text-2xl dark:text-white">Genre</h4>
                <div>
                    {data?.genres?.map((genre) => {
                        return (
                            <span key={genre?.id} className='bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-1 rounded dark:bg-neutral-900 dark:text-gray-300'> {genre?.name} </span>
                        )
                    })}
                </div>

                <div className='lg:flex  flex-wrap lg:gap-8 pt-5 '>
                    <SubDetail
                        detailKey={'Status'}
                        detailInfo={data?.status}
                    />
                    <SubDetail
                        detailKey={'Release Date'}
                        detailInfo={data?.release_date}
                    />
                    <SubDetail
                        detailKey={'Runtime'}
                        detailInfo={data?.runtime}
                    />


                </div>
                <div className='lg:flex flex-wrap lg:gap-8 pt-5 '>
                    <SubDetail
                        detailKey={'Budget'}
                        detailInfo={data?.budget}
                    />
                    <SubDetail
                        detailKey={'Revenue'}
                        detailInfo={data?.revenue}
                    />

                </div>
                <div className='lg:flex  flex-wrap lg:gap-8 pt-5 '>
                    <SubDetail
                        detailKey={'Vote Average'}
                        detailInfo={data?.vote_average}
                    />
                    <SubDetail
                        detailKey={'Vote Count'}
                        detailInfo={data?.vote_count}
                    />

                </div>
            </div>




        </div>
    )
}

export default MovieDetail