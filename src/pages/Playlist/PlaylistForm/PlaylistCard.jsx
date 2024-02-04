import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function PlaylistCard({ data }) {
    const navigate = useNavigate()
    const [isActice, setIsActive] = useState(false)
    function handleClick() {
        console.log("click")
        navigate(`/watched/${data._id}/${data.name}`)

    }
    useEffect(() => {
        if (data.movieId.length || data.tvId.length)
            setIsActive(true)

    }, [])

    return (
        <div

            className=" bg-neutral-800 rounded-md hover:shadow-2xl mb-5 md:mb-0 w-5/12 h-52 sm:w-72 sm:h-80">
            <div
                onClick={handleClick}
                className='w-full h-1/2 border hover:cursor-pointer  border-neutral-950 rounded-t-md'>

            </div>

            <div className="sm:p-4 text-start sm:pt-2  px-2 h-1/2 no-scrollbar bg-transparent rounded-b-md overflow-y-scroll ">

                <h5 className="sm:mb-2 sm:text-2xl text-lg sm:font-bold font-semibold  text-white">{data.name}</h5>

                <p className="font-normal text-gray-400">{data.description}</p>

            </div>

        </div>

    )
}

export default PlaylistCard