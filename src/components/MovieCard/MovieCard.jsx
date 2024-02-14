import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';
import { Img, Rating, DropdownMenu, Toggle } from '../../components'
import FakeImage from './FakeImage.jsx';
import movieServicex from '../../express/movieConfig.js';

const MovieCard = ({ data, initStatus = true, mediaType, crossCheck = true }) => {
    let { playlistId } = useParams()
    const { url } = useSelector((state) => state.home);
    const posterUrl = url.poster + data.poster_path;
    const [isChecked, setIsChecked] = useState(initStatus);
    const [loading, setLoading] = useState(false)
    const { status } = useSelector(state => state.auth)
    const { movieData, mode, movieDataIndex } = useSelector(state => state.movie)

    const navigate = useNavigate()


    const deleteMovieDocInExpress = async () => {
        if (!playlistId) {
            playlistId = movieData[movieDataIndex]._id
        }
        setIsChecked(false);
        const isDeleted = await movieServicex.removeId(data.id, mediaType, playlistId)
        if (!isDeleted)
            setIsChecked(true)
    }

    const addMovieDocInExpress = async () => {
        if (!playlistId) {
            playlistId = movieData[movieDataIndex]._id
        }
        setIsChecked(true)
        const isAdded = await movieServicex.addId(data.id, mediaType, playlistId)
        if (!isAdded)
            setIsChecked(false)
    }

    const handleCheckboxToggle = (e) => {
        e.stopPropagation()
        if (status) {
            if (isChecked) {
                mode ? deleteMovieDocInExpress() : window.alert("Please Change the Mode");
            } else {
                !mode ? addMovieDocInExpress() : window.alert("Please Change the Mode");
            }
        } else {
            window.alert("Please Login First.")
        }
    };

    const handleImgClick = () => {
        navigate(`/${mediaType}/${data.id}`)
    }



    useEffect(() => {
        setLoading(true)
        if (crossCheck && movieData.length) {
            const targetValue = data.id;
            const foundObject = movieData[movieDataIndex][`${mediaType}Id`]?.find(item => item === targetValue);
            if (foundObject) {
                setIsChecked(true);
            }
        }
        setLoading(false)
        return () => {
            setIsChecked(initStatus)
        }
    }, [movieData, mediaType, movieDataIndex])


    return (
        <div className=" w-44 flex items-center justify-center md:w-48 md:h-72 h-64 rounded-md overflow-hidden">
            <div
                onClick={handleImgClick}
                className='h-full w-full hover:cursor-pointer relative'>
                <Rating
                    movieRating={data.vote_average}
                    className='absolute z-10 bg-neutral-800 top-1 left-1 px-1 rounded-md'
                />

                <Img
                    className=" rounded-md"
                    src={posterUrl}
                    alt={data.poster_path}

                />
                <div
                    onClick={handleCheckboxToggle}
                    className='h-10 w-14 absolute bottom-0 left-0'>

                    <button
                        className={`absolute bottom-1 left-1  inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-lg  transition-colors ease-in-out duration-200 focus:outline-none ${isChecked ? 'bg-neutral-500' : 'bg-gray-200'
                            }`}

                    >
                        <span
                            className={`inline-block h-5 w-5 rounded-lg bg-neutral-800 shadow transform ring-0 transition-transform ease-in-out duration-200 ${isChecked ? 'translate-x-5' : 'translate-x-0'
                                }`}
                        ></span>
                    </button>
                </div>
                <DropdownMenu
                    id={data.id}
                    mediaType={mediaType}

                />
            </div>

        </div >
    );
};

export default MovieCard;

{/* <div
    className=' w-full min-h-full'
    onClick={handleImgClick}
>

    <div
        className=' absolute inset-0 flex items-end justify-center opacity-0 hover:opacity-70 bg-neutral-800 transition-opacity duration-300 ease-in-out'>

    </div>
</div> */}


// {
//     data.poster_path && data.poster_path !== " " ?
//         <div
//             className=' min-h-64 md:min-h-72 max-h-72'
//             onClick={handleImgClick}
//         >
//             <Img
//                 className=" w-auto cursor-pointer rounded-xl z-0"
//                 src={posterUrl}
//                 alt={data.poster_path}
//             />
//         </div>
//         :
//         <FakeImage
//             title={data.title || data.name}
//         />
// }

// <Rating
//     movieRating={data.vote_average}
//     className={'absolute top-0 m-1 bg-neutral-700 rounded-lg px-1 '}
// />
// {!loading &&
{/* <div
    className='absolute h-10 cursor-pointer w-14 bottom-1 md:bottom-0 left-0'
    onClick={handleCheckboxToggle}
>

</div>
// } */}