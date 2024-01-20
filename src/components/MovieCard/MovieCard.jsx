import React, { useEffect, useState } from 'react';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import movieService from '../../render/movieconfig.js';
import { useNavigate } from 'react-router-dom';
import { Img } from '../../components'


const MovieCard = ({ data, initStatus, crossCheck }) => {
    const { url, mediaType } = useSelector((state) => state.home);
    const posterUrl = url.poster + data.poster_path;
    const [isChecked, setIsChecked] = useState(initStatus);
    const { status, userData } = useSelector(state => state.auth)
    const { movieData, mode } = useSelector(state => state.movie)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const deleteMovieDocInRender = async () => {
        console.log("movieCard :: DMDFA :: crosscheck ", crossCheck, " :: slug ", { id: data.id, user_id: userData.$id });
        const isDeleted = await movieService.deleteMovieDoc({
            id: data.id,
            user_id: userData.$id
        })
        setIsChecked(false)
        console.log("MovieCard :: deletmovieDocFA :: response", isDeleted)
    }

    const addMovieDocInRender = async () => {
        const movie = await movieService.createMovieDoc({
            title: data.title,
            poster_path: data.poster_path,
            id: data.id,
            user_id: userData.$id
        })
        setIsChecked(true)
        console.log("Moviecard :: addmovieInAppwrite :: response ", movie)

    }

    const handleCheckboxToggle = () => {
        if (true) {
            if (isChecked) {
                mode ? deleteMovieDocInRender() : console.log("Please Change the Mode");
            } else {
                !mode ? addMovieDocInRender() : console.log("Please Change the Mode");
            }
        }
    };

    const handleImgClick = () => {
        navigate(`/${mediaType}/${data.id}`)
    }

    return (
        <div className=" w-48 relative ">
            <div className="w-auto min-h-72 "
                onClick={handleImgClick}
            >
                <Img className="rounded-xl hover:cursor-pointer"
                    src={posterUrl}

                />
            </div>
            <p className="truncate text-center mt-3 text-lg dark:text-zinc-300">
                {data.title}
            </p>
            <div className="checkbox-wrapper-10  absolute bottom-7 ml-3 ">
                <input
                    className="tgl tgl-flip"
                    id={`cb${data.id}`}
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxToggle}
                />
                <label
                    className="tgl-btn"
                    data-tg-off="UnWatched"
                    data-tg-on="Watched"
                    htmlFor={`cb${data.id}`}
                ></label>
            </div>
        </div>
    );
};

export default MovieCard;
