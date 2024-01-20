import React from 'react'
import Img from './Img'
import { fetchDataFromApi } from '../../utils/api'
import { useNavigate } from 'react-router-dom'

function Avatar({ imgUrl, item }) {
    const navigate = useNavigate()

    async function handleClick() {
        navigate(`/movie_credits/${item.id}`)

    }

    return (
        <div key={item.id} className="text-center min-w-20 max-w-20 md:min-w-32  text-white">
            <div
                onClick={handleClick}

                className="md:w-32  md:min-h-48 hover:cursor-pointer overflow-hidden mb-3">
                <Img src={imgUrl} className={"rounded-xl"} />
            </div>
            <p className="truncate text-center mt-3 md:text-xl dark:text-zinc-300">{item.name}</p>
            <div className="truncate text-center mt-1 px-2 md:px-5 text-md dark:text-zinc-400">{item.character || item.job}</div>
        </div>
    )
}

export default Avatar