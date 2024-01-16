import React, { useEffect, useState } from 'react';
import './styles.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import movieService from '../../appwrite/movieConfig.js';


const MovieCard = ({ data }) => {
    const { url } = useSelector((state) => state.home);
    const posterUrl = url.poster + data.poster_path;
    const [isChecked, setIsChecked] = useState(false);
    const { status, userData } = useSelector(state => state.auth)
    const { movieData } = useSelector(state => state.movie)

    const navigate = useNavigate();

    const findMovieById = (moviesObject, movieId) => {
        return moviesObject.hasOwnProperty(movieId);
    };

    useEffect(() => {
        if (status) {
            const targetMovieId = data.id;
            if (movieData) {
                const movieExists = findMovieById(movieData.moviesObject, targetMovieId);
                console.log(movieExists, data.title);
                if (movieExists) setIsChecked(true)
            }
        }
    }, [])

    const handleCheckboxToggle = () => {
        if (status) {
            console.log(`id : ${data.id} poster : ${data.poster_path} title : ${data.title} isChecked : ${isChecked} userData : ${userData.$id}`);
            setIsChecked(prev => !prev)
            movieService.createMovieDoc({
                title: data.title,
                poster_url: data.poster_path,
                movie_id: data.id,
                user_id: userData.$id
            }).then((response) => {
                console.log("create doc response : ", response)

            })

        } else {
            navigate('/login')
        }

    };

    return (
        <div className=" w-48 relative">
            <div className="w-auto">
                <img className="rounded-xl" src={posterUrl} alt={data.poster_path} />
            </div>
            <p className="truncate text-center mt-3 text-lg font-serif dark:text-zinc-300">
                {data.title || data.name}
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
