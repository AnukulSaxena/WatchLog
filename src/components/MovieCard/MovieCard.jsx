import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import movieService from '../../render/movieconfig.js';
import { useNavigate } from 'react-router-dom';
import { Img, Rating, DropdownMenu, Toggle } from '../../components'
import FakeImage from './FakeImage.jsx';


const MovieCard = ({ data, initStatus, crossCheck,
    mediaType
}) => {
    const { url } = useSelector((state) => state.home);
    const posterUrl = url.poster + data.poster_path;
    const [isChecked, setIsChecked] = useState(initStatus);
    const [loading, setLoading] = useState(false)
    const { status, userData } = useSelector(state => state.auth)
    const { movieData, mode } = useSelector(state => state.movie)

    const navigate = useNavigate()


    const deleteMovieDocInRender = async () => {
        setIsChecked(false);
        try {
            const isDeleted = await movieService.deleteMovieDoc({
                id: data.id,
                user_id: userData.$id
            }, mediaType)
            console.log("MovieCard :: deletmovieDocFA :: response", isDeleted)

        } catch (error) {
            console.error("MovieCard :: deleteMovieInDB :: Error ", error)
            setIsChecked(true);
        }
    }

    const addMovieDocInRender = async () => {
        setIsChecked(true)
        try {
            const movie = await movieService.createMovieDoc({
                title: data?.title || data?.name,
                poster_path: data?.poster_path || " ",
                id: data.id,
                user_id: userData.$id,
                vote_average: data.vote_average
            }, mediaType)
            console.log("Moviecard :: addmovieInAppwrite :: response ", movie)

        } catch (error) {
            console.error("MovieCard :: addMoveDocInDB :: Error", error);
            setIsChecked(false);
        }
    }

    const handleCheckboxToggle = () => {
        if (status) {
            if (isChecked) {
                mode ? deleteMovieDocInRender() : window.alert("Please Change the Mode");
            } else {
                !mode ? addMovieDocInRender() : window.alert("Please Change the Mode");
            }
        } else {
            window.alert("Please Login First.")
        }
    };

    const handleImgClick = () => {
        navigate(`/${mediaType}/${data.id}`)
    }

    async function checkStatus() {
        try {
            if (status) {
                const targetKey = 'id';
                const targetValue = data.id;
                const foundObject = await movieData?.data?.find(obj => obj[targetKey] === targetValue);
                if (foundObject) {
                    setIsChecked(true);
                }
            }
            setLoading(false);
        } catch (error) {
            console.error("MovieCard :: checkStatus :: Error", error)
        }
    }

    useEffect(() => {
        checkStatus();
        return () => {

            setIsChecked(false)
        }
    }, [movieData])


    return (
        <div className=" max-w-44 min-w-44 md:min-w-48 md:max-w-48 h-fit relative">
            {
                data.poster_path && data.poster_path !== " " ?
                    <div
                        className=' min-h-64 md:min-h-72 max-h-72'
                        onClick={handleImgClick}
                    >
                        <Img
                            className=" w-auto cursor-pointer rounded-xl z-0"
                            src={posterUrl}
                            alt={data.poster_path}
                        />
                    </div>
                    :
                    <FakeImage
                        title={data.title || data.name}
                    />
            }
            <DropdownMenu
                className='absolute h-9 bottom-2  md:bottom-1 right-0'
            />
            <Rating
                movieRating={data.vote_average}
                className={'absolute top-0 m-1 bg-neutral-700 rounded-lg px-1 '}
            />
            {!loading &&
                <div
                    className='absolute h-10 cursor-pointer w-14 bottom-1 md:bottom-0 left-0'
                    onClick={handleCheckboxToggle}
                >
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
            }

        </div>
    );
};

export default MovieCard;
