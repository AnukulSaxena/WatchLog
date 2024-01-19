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
        <div key={item.id} className="text-center text-white">
            <div
                onClick={handleClick}

                className="w-32 rounded-full hover:cursor-pointer overflow-hidden mb-3">
                <Img src={imgUrl} />
            </div>
            <div className="">{item.name}</div>
            <div className="">{item.character || item.job}</div>
        </div>
    )
}

export default Avatar