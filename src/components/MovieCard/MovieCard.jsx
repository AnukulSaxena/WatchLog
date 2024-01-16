import React, { useEffect, useState } from 'react';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import movieService from '../../appwrite/movieConfig.js';
import { setMovieData } from '../../store/movieSlice.js';


const MovieCard = ({ data }) => {
    const { url } = useSelector((state) => state.home);
    const posterUrl = url.poster + data.poster_path;
    const [isChecked, setIsChecked] = useState(false);
    const { status, userData } = useSelector(state => state.auth)
    const { movieData } = useSelector(state => state.movie)
    const movieMode = useSelector(state => state.movie.mode)
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const findMovieById = (moviesObject, movieId) => {
        return moviesObject.hasOwnProperty(movieId);
    };

    useEffect(() => {
        if (status) {
            const targetMovieId = data.id;
            if (movieData) {
                const movieExists = findMovieById(movieData.moviesObject, targetMovieId);

                if (movieExists) setIsChecked(true)
            }
        }
    }, [])

    const deleteMovieDocFromAppwrite = () => {
        console.log("delete Movie", movieMode);
        setIsChecked(prev => !prev)
    }

    const refreshReduxStore = (movie) => {
        const oldTotal = movieData.total + 1;
        const oldMovieObject = { ...movieData.moviesObject };

        oldMovieObject[movie.movie_id] = {
            title: movie.title,
            poster_url: movie.poster_url,
            movie_id: movie.movie_id,
            user_id: movie.user_id,
            slug: movie.$id
        }

        dispatch(setMovieData({ total: oldTotal, moviesObject: oldMovieObject }))
        console.log("addmovieAppwrite :: refreshreduxstore ", oldTotal, "oldmoviedata", oldMovieObject)
    }

    const addMovieDocInAppwrite = () => {
        console.log("Add Movie ", movieMode);
        setIsChecked(prev => !prev)
        movieService.createMovieDoc({
            title: data.title,
            poster_url: data.poster_path,
            movie_id: data.id,
            user_id: userData.$id
        }).then((movie) => {
            console.log("create doc response : ", movie)
            refreshReduxStore(movie);
        })
    }

    const handleCheckboxToggle = () => {
        if (status) {
            // console.log(`id : ${data.id} poster : ${data.poster_path}
            //  title : ${data.title} isChecked : ${isChecked} userData : ${userData.$id}`);

            if (isChecked) {
                movieMode ? deleteMovieDocFromAppwrite() : console.log("Please Change the Mode");
            } else {
                !movieMode ? addMovieDocInAppwrite() : console.log("Please Change the Mode");
            }




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
