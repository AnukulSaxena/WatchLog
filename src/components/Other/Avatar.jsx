import React from 'react'
import Img from './Img'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Avatar({ item }) {
    const navigate = useNavigate()
    const { url } = useSelector(state => state.home)
    let imgUrl = url.backdrop + item.profile_path;

    async function handleClick() {
        navigate(`/movie_credits/${item.id}`)

    }

    return (
        <div key={item.id} className="text-center min-w-20 max-w-20 md:min-w-32  text-white">
            <div
                onClick={handleClick}

                className="md:w-32 min-h-32 md:min-h-48 hover:cursor-pointer overflow-hidden mb-3">
                {
                    !item?.profile_path ?
                        <div role="status" className=" rounded shadow animate-pulse md:p-6">
                            <div className="flex items-center justify-center h-32 md:mb-4 bg-gray-300 rounded dark:bg-gray-700">
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                    <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                </svg>
                            </div>
                            <p
                                className='text-center text-white text-lg truncate'
                            >{item?.title}</p>

                        </div>
                        :
                        <Img src={imgUrl} className={"rounded-xl"} />
                }
            </div>
            <p className="truncate text-center mt-3 md:text-xl dark:text-zinc-300">{item.name}</p>
            <div className="truncate text-center mt-1 px-2 md:px-5 text-md dark:text-zinc-400">{item.character || item.job}</div>
        </div>
    )
}

export default Avatar